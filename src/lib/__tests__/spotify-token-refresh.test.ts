import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SpotifyService } from '../spotify-service.js';

// Mock the environment configuration
vi.mock('../env.js', () => ({
    spotifyConfig: {
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret',
        redirectUri: 'https://example.com/callback',
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token'
    },
    validateSpotifyConfig: vi.fn()
}));

// Mock the Spotify SDK
vi.mock('@spotify/web-api-ts-sdk', () => ({
    SpotifyApi: {
        withAccessToken: vi.fn().mockReturnValue({
            currentUser: {
                topItems: vi.fn(),
                followedArtists: vi.fn()
            },
            player: {
                getCurrentlyPlayingTrack: vi.fn(),
                pausePlayback: vi.fn(),
                startResumePlayback: vi.fn()
            }
        })
    }
}));

// Mock the error handler
vi.mock('../spotify-error-handler.js', () => ({
    SpotifyErrorHandler: {
        validateConfiguration: vi.fn(),
        executeWithErrorHandling: vi.fn().mockImplementation(async (fn, name) => {
            try {
                const result = await fn();
                return result;
            } catch (error) {
                throw new Error(`${name} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),
        logError: vi.fn()
    }
}));

describe('Spotify Token Refresh', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    describe('refreshAccessToken', () => {
        it('should successfully refresh access token', async () => {
            // Mock successful token refresh
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    access_token: 'new-access-token',
                    expires_in: 3600,
                    token_type: 'Bearer'
                })
            });

            const service = new SpotifyService();
            const newToken = await service.refreshAccessToken();

            expect(newToken).toBe('new-access-token');
            expect(global.fetch).toHaveBeenCalledWith(
                'https://accounts.spotify.com/api/token',
                expect.objectContaining({
                    method: 'POST',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': expect.stringContaining('Basic ')
                    })
                })
            );
            
            // Check that the body contains the refresh token parameters
            const fetchCall = (global.fetch as any).mock.calls[0];
            const body = fetchCall[1].body;
            expect(body.toString()).toContain('grant_type=refresh_token');
            expect(body.toString()).toContain('refresh_token=test-refresh-token');
        });

        it('should handle refresh token response with new refresh token', async () => {
            // Mock token refresh with new refresh token
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    access_token: 'new-access-token',
                    refresh_token: 'new-refresh-token',
                    expires_in: 3600,
                    token_type: 'Bearer'
                })
            });

            const service = new SpotifyService();
            const newToken = await service.refreshAccessToken();

            expect(newToken).toBe('new-access-token');
        });

        it('should handle refresh token failure', async () => {
            // Mock failed token refresh
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 400,
                statusText: 'Bad Request',
                json: () => Promise.resolve({
                    error: 'invalid_grant',
                    error_description: 'Refresh token expired'
                })
            });

            const service = new SpotifyService();
            
            await expect(service.refreshAccessToken()).rejects.toThrow(
                'refreshAccessToken failed:'
            );
        });

        it('should handle network errors during refresh', async () => {
            // Mock network error
            global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

            const service = new SpotifyService();
            
            await expect(service.refreshAccessToken()).rejects.toThrow();
        });

        it('should handle missing access token in response', async () => {
            // Mock response without access token
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    expires_in: 3600,
                    token_type: 'Bearer'
                    // Missing access_token
                })
            });

            const service = new SpotifyService();
            
            await expect(service.refreshAccessToken()).rejects.toThrow(
                'refreshAccessToken failed:'
            );
        });
    });

    describe('executeWithTokenRefresh', () => {
        it('should execute API call successfully without refresh', async () => {
            const service = new SpotifyService();
            const mockApiCall = vi.fn().mockResolvedValue('success');

            const result = await service.executeWithTokenRefresh(mockApiCall);

            expect(result).toBe('success');
            expect(mockApiCall).toHaveBeenCalledOnce();
        });

        it('should refresh token and retry on 401 error', async () => {
            // Mock successful token refresh
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    access_token: 'new-access-token',
                    expires_in: 3600,
                    token_type: 'Bearer'
                })
            });

            const service = new SpotifyService();
            const mockApiCall = vi.fn()
                .mockRejectedValueOnce(new Error('401 Unauthorized'))
                .mockResolvedValueOnce('success after refresh');

            const result = await service.executeWithTokenRefresh(mockApiCall);

            expect(result).toBe('success after refresh');
            expect(mockApiCall).toHaveBeenCalledTimes(2);
            expect(global.fetch).toHaveBeenCalledOnce(); // Token refresh called
        });

        it('should refresh token and retry on expired token error', async () => {
            // Mock successful token refresh
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    access_token: 'new-access-token',
                    expires_in: 3600,
                    token_type: 'Bearer'
                })
            });

            const service = new SpotifyService();
            const mockApiCall = vi.fn()
                .mockRejectedValueOnce(new Error('The access token expired'))
                .mockResolvedValueOnce('success after refresh');

            const result = await service.executeWithTokenRefresh(mockApiCall);

            expect(result).toBe('success after refresh');
            expect(mockApiCall).toHaveBeenCalledTimes(2);
            expect(global.fetch).toHaveBeenCalledOnce(); // Token refresh called
        });

        it('should not retry on non-auth errors', async () => {
            const service = new SpotifyService();
            const mockApiCall = vi.fn().mockRejectedValue(new Error('404 Not Found'));

            await expect(service.executeWithTokenRefresh(mockApiCall)).rejects.toThrow('404 Not Found');
            expect(mockApiCall).toHaveBeenCalledOnce();
            expect(global.fetch).not.toHaveBeenCalled(); // No token refresh
        });

        it('should handle token refresh failure during retry', async () => {
            // Mock failed token refresh
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 400,
                statusText: 'Bad Request'
            });

            const service = new SpotifyService();
            const mockApiCall = vi.fn().mockRejectedValue(new Error('401 Unauthorized'));

            await expect(service.executeWithTokenRefresh(mockApiCall)).rejects.toThrow(
                'Authentication failed and token refresh unsuccessful'
            );
            expect(mockApiCall).toHaveBeenCalledOnce();
            expect(global.fetch).toHaveBeenCalledOnce();
        });
    });
});
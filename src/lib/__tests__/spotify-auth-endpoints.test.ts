import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the environment configuration
vi.mock('../env.js', () => ({
    spotifyConfig: {
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret',
        redirectUri: 'https://example.com/callback',
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token'
    }
}));

describe('Spotify Auth Endpoints', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    describe('Login Endpoint', () => {
        it('should redirect to Spotify authorization URL', async () => {
            // Import the login endpoint
            const { GET } = await import('../../pages/api/spotify/auth/login.js');
            
            const response = await GET();
            
            expect(response.status).toBe(302);
            
            const location = response.headers.get('Location');
            expect(location).toContain('https://accounts.spotify.com/authorize');
            expect(location).toContain('client_id=test-client-id');
            expect(location).toContain('redirect_uri=https%3A%2F%2Fexample.com%2Fcallback');
            expect(location).toContain('scope=user-read-playback-state%20user-modify-playback-state%20user-top-read%20user-follow-read');
            expect(location).toContain('response_type=code');
            expect(location).toContain('state=');
            
            // Check that state cookie is set
            const setCookie = response.headers.get('Set-Cookie');
            expect(setCookie).toContain('spotify_auth_state=');
            expect(setCookie).toContain('HttpOnly');
            expect(setCookie).toContain('Secure');
        });

        it('should handle errors gracefully', async () => {
            // Mock spotifyConfig to throw error
            vi.doMock('../env.js', () => ({
                spotifyConfig: {
                    get clientId() { throw new Error('Missing client ID'); }
                }
            }));
            
            const { GET } = await import('../../pages/api/spotify/auth/login.js');
            
            const response = await GET();
            
            expect(response.status).toBe(500);
            
            const body = await response.json();
            expect(body.success).toBe(false);
            expect(body.error).toContain('Authentication initialization failed');
        });
    });

    describe('Callback Endpoint', () => {
        it('should handle successful authorization callback', async () => {
            // Mock successful token exchange
            global.fetch = vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    access_token: 'new-access-token',
                    refresh_token: 'new-refresh-token',
                    expires_in: 3600,
                    token_type: 'Bearer',
                    scope: 'user-read-playback-state user-modify-playback-state'
                })
            });

            const { GET } = await import('../../pages/api/spotify/auth/callback.js');
            
            const mockRequest = {
                headers: {
                    get: (name: string) => {
                        if (name === 'cookie') {
                            return 'spotify_auth_state=test-state';
                        }
                        return null;
                    }
                }
            };

            const response = await GET({
                url: 'https://example.com/callback?code=test-code&state=test-state',
                request: mockRequest
            });
            
            expect(response.status).toBe(200);
            
            const body = await response.json();
            expect(body.success).toBe(true);
            expect(body.data.access_token).toBe('new-access-token');
            expect(body.data.refresh_token).toBe('new-refresh-token');
            
            // Check that fetch was called with correct parameters
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
        });

        it('should handle authorization errors', async () => {
            const { GET } = await import('../../pages/api/spotify/auth/callback.js');
            
            const mockRequest = {
                headers: {
                    get: () => null
                }
            };

            const response = await GET({
                url: 'https://example.com/callback?error=access_denied',
                request: mockRequest
            });
            
            expect(response.status).toBe(400);
            
            const body = await response.json();
            expect(body.success).toBe(false);
            expect(body.error).toContain('Spotify authorization failed: access_denied');
        });

        it('should handle missing parameters', async () => {
            const { GET } = await import('../../pages/api/spotify/auth/callback.js');
            
            const mockRequest = {
                headers: {
                    get: () => null
                }
            };

            const response = await GET({
                url: 'https://example.com/callback',
                request: mockRequest
            });
            
            expect(response.status).toBe(400);
            
            const body = await response.json();
            expect(body.success).toBe(false);
            expect(body.error).toContain('Missing required authorization parameters');
        });

        it('should handle invalid state parameter', async () => {
            const { GET } = await import('../../pages/api/spotify/auth/callback.js');
            
            const mockRequest = {
                headers: {
                    get: (name: string) => {
                        if (name === 'cookie') {
                            return 'spotify_auth_state=stored-state';
                        }
                        return null;
                    }
                }
            };

            const response = await GET({
                url: 'https://example.com/callback?code=test-code&state=different-state',
                request: mockRequest
            });
            
            expect(response.status).toBe(400);
            
            const body = await response.json();
            expect(body.success).toBe(false);
            expect(body.error).toContain('Invalid state parameter');
        });

        it('should handle token exchange failure', async () => {
            // Mock failed token exchange
            global.fetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 400,
                statusText: 'Bad Request',
                json: () => Promise.resolve({
                    error: 'invalid_grant',
                    error_description: 'Authorization code expired'
                })
            });

            const { GET } = await import('../../pages/api/spotify/auth/callback.js');
            
            const mockRequest = {
                headers: {
                    get: (name: string) => {
                        if (name === 'cookie') {
                            return 'spotify_auth_state=test-state';
                        }
                        return null;
                    }
                }
            };

            const response = await GET({
                url: 'https://example.com/callback?code=test-code&state=test-state',
                request: mockRequest
            });
            
            expect(response.status).toBe(400);
            
            const body = await response.json();
            expect(body.success).toBe(false);
            expect(body.error).toContain('Token exchange failed: Authorization code expired');
        });

        it('should handle network errors during token exchange', async () => {
            // Mock network error
            global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

            const { GET } = await import('../../pages/api/spotify/auth/callback.js');
            
            const mockRequest = {
                headers: {
                    get: (name: string) => {
                        if (name === 'cookie') {
                            return 'spotify_auth_state=test-state';
                        }
                        return null;
                    }
                }
            };

            const response = await GET({
                url: 'https://example.com/callback?code=test-code&state=test-state',
                request: mockRequest
            });
            
            expect(response.status).toBe(500);
            
            const body = await response.json();
            expect(body.success).toBe(false);
            expect(body.error).toContain('Authentication callback failed');
        });
    });
});
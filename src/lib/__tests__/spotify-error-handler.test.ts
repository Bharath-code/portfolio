import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SpotifyErrorHandler } from '../spotify-error-handler.js';

describe('SpotifyErrorHandler', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock console.error to avoid noise in tests
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('parseSpotifyError', () => {
        it('should parse 401 authentication errors', () => {
            const error = new Error('401 Unauthorized');
            const result = SpotifyErrorHandler.parseSpotifyError(error);
            
            expect(result.status).toBe(401);
            expect(result.code).toBe('SPOTIFY_AUTH_FAILED');
            expect(result.message).toContain('authentication failed');
        });

        it('should parse 403 permission errors', () => {
            const error = new Error('403 Forbidden');
            const result = SpotifyErrorHandler.parseSpotifyError(error);
            
            expect(result.status).toBe(403);
            expect(result.code).toBe('SPOTIFY_PERMISSION_DENIED');
            expect(result.message).toContain('Insufficient permissions');
        });

        it('should parse 404 not found errors', () => {
            const error = new Error('404 Not Found');
            const result = SpotifyErrorHandler.parseSpotifyError(error);
            
            expect(result.status).toBe(404);
            expect(result.code).toBe('SPOTIFY_RESOURCE_NOT_FOUND');
            expect(result.message).toContain('not found');
        });

        it('should parse 429 rate limit errors', () => {
            const error = new Error('429 Rate limit exceeded');
            const result = SpotifyErrorHandler.parseSpotifyError(error);
            
            expect(result.status).toBe(429);
            expect(result.code).toBe('SPOTIFY_RATE_LIMITED');
            expect(result.message).toContain('rate limit');
        });

        it('should parse no active device errors', () => {
            const error = new Error('No active device found');
            const result = SpotifyErrorHandler.parseSpotifyError(error);
            
            expect(result.status).toBe(404);
            expect(result.code).toBe('SPOTIFY_NO_DEVICE');
            expect(result.message).toContain('No active Spotify device');
        });

        it('should parse premium required errors', () => {
            const error = new Error('Premium required for this operation');
            const result = SpotifyErrorHandler.parseSpotifyError(error);
            
            expect(result.status).toBe(403);
            expect(result.code).toBe('SPOTIFY_PREMIUM_REQUIRED');
            expect(result.message).toContain('Premium subscription required');
        });

        it('should parse network errors', () => {
            const error = new Error('ENOTFOUND api.spotify.com');
            const result = SpotifyErrorHandler.parseSpotifyError(error);
            
            expect(result.status).toBe(503);
            expect(result.code).toBe('SPOTIFY_NETWORK_ERROR');
            expect(result.message).toContain('Unable to connect');
        });

        it('should parse token refresh errors', () => {
            const error = new Error('Failed to refresh token');
            const result = SpotifyErrorHandler.parseSpotifyError(error);
            
            expect(result.status).toBe(401);
            expect(result.code).toBe('SPOTIFY_TOKEN_REFRESH_FAILED');
            expect(result.message).toContain('refresh Spotify access token');
        });

        it('should handle generic errors', () => {
            const error = new Error('Some unknown error');
            const result = SpotifyErrorHandler.parseSpotifyError(error);
            
            expect(result.status).toBe(500);
            expect(result.code).toBe('SPOTIFY_API_ERROR');
            expect(result.message).toContain('Some unknown error');
        });

        it('should handle non-Error objects', () => {
            const error = 'String error';
            const result = SpotifyErrorHandler.parseSpotifyError(error);
            
            expect(result.status).toBe(500);
            expect(result.code).toBe('SPOTIFY_API_ERROR');
            expect(result.message).toContain('String error');
        });
    });

    describe('createErrorResponse', () => {
        it('should create proper error response', () => {
            const error = new Error('401 Unauthorized');
            const response = SpotifyErrorHandler.createErrorResponse(error);
            
            expect(response.status).toBe(401);
            expect(response.headers.get('Content-Type')).toBe('application/json');
            
            // Parse response body
            return response.text().then(body => {
                const parsed = JSON.parse(body);
                expect(parsed.success).toBe(false);
                expect(parsed.error).toContain('authentication failed');
                expect(parsed.code).toBe('SPOTIFY_AUTH_FAILED');
                expect(parsed.timestamp).toBeDefined();
            });
        });
    });

    describe('executeWithErrorHandling', () => {
        it('should execute successful operations', async () => {
            const operation = vi.fn().mockResolvedValue('success');
            
            const result = await SpotifyErrorHandler.executeWithErrorHandling(
                operation,
                'test operation'
            );
            
            expect(result).toBe('success');
            expect(operation).toHaveBeenCalledOnce();
        });

        it('should handle operation failures', async () => {
            const operation = vi.fn().mockRejectedValue(new Error('Operation failed'));
            
            await expect(
                SpotifyErrorHandler.executeWithErrorHandling(operation, 'test operation')
            ).rejects.toThrow('test operation failed: Spotify API error: Operation failed');
        });
    });

    describe('validateConfiguration', () => {
        const originalEnv = process.env;

        beforeEach(() => {
            process.env = { ...originalEnv };
        });

        afterEach(() => {
            process.env = originalEnv;
        });

        it('should pass with all required variables', () => {
            process.env.SPOTIFY_CLIENT_ID = 'test-client-id';
            process.env.SPOTIFY_CLIENT_SECRET = 'test-client-secret';
            process.env.SPOTIFY_REDIRECT_URI = 'https://example.com/callback';
            
            expect(() => SpotifyErrorHandler.validateConfiguration()).not.toThrow();
        });

        it('should throw for missing required variables', () => {
            delete process.env.SPOTIFY_CLIENT_ID;
            
            expect(() => SpotifyErrorHandler.validateConfiguration())
                .toThrow('Missing required environment variables: SPOTIFY_CLIENT_ID');
        });

        it('should validate redirect URI format', () => {
            process.env.SPOTIFY_CLIENT_ID = 'test-client-id';
            process.env.SPOTIFY_CLIENT_SECRET = 'test-client-secret';
            process.env.SPOTIFY_REDIRECT_URI = 'invalid-uri';
            
            expect(() => SpotifyErrorHandler.validateConfiguration())
                .toThrow('SPOTIFY_REDIRECT_URI must be a valid HTTP/HTTPS URL');
        });
    });

    describe('logError', () => {
        it('should log error with context', () => {
            const consoleSpy = vi.spyOn(console, 'error');
            const error = new Error('Test error');
            
            SpotifyErrorHandler.logError(error, 'test context');
            
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Spotify API Error in test context:'),
                expect.objectContaining({
                    code: 'SPOTIFY_API_ERROR',
                    status: 500,
                    message: expect.stringContaining('Test error'),
                    originalError: expect.stringContaining('Test error')
                })
            );
        });
    });
});
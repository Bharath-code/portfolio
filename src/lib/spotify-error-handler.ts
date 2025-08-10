import { SpotifyService } from './spotify-service.js';

export interface SpotifyError {
    status: number;
    message: string;
    code: string;
}

export class SpotifyErrorHandler {
    /**
     * Parse and categorize Spotify API errors
     */
    static parseSpotifyError(error: any): SpotifyError {
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        // Authentication errors
        if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
            return {
                status: 401,
                message: 'Spotify authentication failed. Please re-authenticate.',
                code: 'SPOTIFY_AUTH_FAILED'
            };
        }
        
        // Forbidden/Permission errors
        if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
            return {
                status: 403,
                message: 'Insufficient permissions for this Spotify operation.',
                code: 'SPOTIFY_PERMISSION_DENIED'
            };
        }
        
        // Not found errors
        if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
            return {
                status: 404,
                message: 'Requested Spotify resource not found.',
                code: 'SPOTIFY_RESOURCE_NOT_FOUND'
            };
        }
        
        // Rate limiting
        if (errorMessage.includes('429') || errorMessage.includes('Rate limit')) {
            return {
                status: 429,
                message: 'Spotify API rate limit exceeded. Please try again later.',
                code: 'SPOTIFY_RATE_LIMITED'
            };
        }
        
        // Bad request
        if (errorMessage.includes('400') || errorMessage.includes('Bad Request')) {
            return {
                status: 400,
                message: 'Invalid request to Spotify API.',
                code: 'SPOTIFY_BAD_REQUEST'
            };
        }
        
        // No active device (common playback error)
        if (errorMessage.includes('No active device') || errorMessage.includes('Device not found')) {
            return {
                status: 404,
                message: 'No active Spotify device found. Please open Spotify on a device.',
                code: 'SPOTIFY_NO_DEVICE'
            };
        }
        
        // Premium required
        if (errorMessage.includes('Premium required') || errorMessage.includes('Restricted device')) {
            return {
                status: 403,
                message: 'Spotify Premium subscription required for this operation.',
                code: 'SPOTIFY_PREMIUM_REQUIRED'
            };
        }
        
        // Network/Connection errors
        if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('ECONNREFUSED') || 
            errorMessage.includes('timeout') || errorMessage.includes('network')) {
            return {
                status: 503,
                message: 'Unable to connect to Spotify API. Please try again later.',
                code: 'SPOTIFY_NETWORK_ERROR'
            };
        }
        
        // Token refresh errors
        if (errorMessage.includes('refresh') && errorMessage.includes('token')) {
            return {
                status: 401,
                message: 'Failed to refresh Spotify access token. Please re-authenticate.',
                code: 'SPOTIFY_TOKEN_REFRESH_FAILED'
            };
        }
        
        // Generic server error
        return {
            status: 500,
            message: `Spotify API error: ${errorMessage}`,
            code: 'SPOTIFY_API_ERROR'
        };
    }
    
    /**
     * Create standardized error response
     */
    static createErrorResponse(error: any): Response {
        const spotifyError = this.parseSpotifyError(error);
        const response = SpotifyService.createResponse(undefined, spotifyError.message);
        
        return new Response(JSON.stringify({
            ...response,
            code: spotifyError.code,
        }, null, 2), {
            status: spotifyError.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    
    /**
     * Execute operation with comprehensive error handling
     */
    static async executeWithErrorHandling<T>(
        operation: () => Promise<T>,
        operationName: string
    ): Promise<T> {
        try {
            return await operation();
        } catch (error) {
            const spotifyError = this.parseSpotifyError(error);
            throw new Error(`${operationName} failed: ${spotifyError.message}`);
        }
    }
    
    /**
     * Validate environment configuration
     */
    static validateConfiguration(): void {
        // We'll pass the config object to avoid circular dependencies
        // This method should be called with the config from the caller
        console.warn('validateConfiguration should be called with config parameter');
    }

    /**
     * Validate environment configuration with provided config
     */
    static validateConfigurationWithConfig(config: { clientId: string; clientSecret: string; redirectUri: string }): void {
        const requiredVars = [
            'clientId',
            'clientSecret', 
            'redirectUri'
        ];
        
        const missing = requiredVars.filter(key => !config[key as keyof typeof config]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
        }
        
        // Validate redirect URI format
        const redirectUri = config.redirectUri;
        if (redirectUri && !redirectUri.startsWith('http')) {
            throw new Error('redirectUri must be a valid HTTP/HTTPS URL');
        }
    }
    
    /**
     * Log error for monitoring (in production, integrate with logging service)
     */
    static logError(error: any, context: string): void {
        const timestamp = new Date().toISOString();
        const errorInfo = this.parseSpotifyError(error);
        
        console.error(`[${timestamp}] Spotify API Error in ${context}:`, {
            code: errorInfo.code,
            status: errorInfo.status,
            message: errorInfo.message,
            originalError: error instanceof Error ? error.stack : error
        });
    }
}
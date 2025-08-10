import type { APIRoute } from 'astro';
import { spotifyConfig, getSpotifyRedirectUri } from '../../../../lib/env.js';

export const GET: APIRoute = async ({ url }) => {
    try {
        // Required scopes for the application
        const scopes = [
            'user-read-playback-state',
            'user-modify-playback-state', 
            'user-top-read',
            'user-follow-read'
        ].join(' ');

        // Generate state parameter for security
        const state = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);

        // Build Spotify authorization URL with dynamic redirect URI
        const requestUrl = new URL(url);
        const redirectUri = getSpotifyRedirectUri(requestUrl.host);
        
        const authUrl = new URL('https://accounts.spotify.com/authorize');
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('client_id', spotifyConfig.clientId);
        authUrl.searchParams.append('scope', scopes);
        authUrl.searchParams.append('redirect_uri', redirectUri);
        authUrl.searchParams.append('state', state);

        // Store state in cookie for validation (in production, use secure storage)
        return new Response(null, {
            status: 302,
            headers: {
                'Location': authUrl.toString(),
                'Set-Cookie': `spotify_auth_state=${state}; HttpOnly; SameSite=Lax; Max-Age=600`,
            },
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        
        return new Response(
            JSON.stringify({
                success: false,
                error: `Authentication initialization failed: ${errorMessage}`,
                timestamp: new Date().toISOString(),
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
};
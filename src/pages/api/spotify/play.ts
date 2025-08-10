import type { APIRoute } from 'astro';
import { SpotifyService } from '../../../lib/spotify-service.js';
import { SpotifyErrorHandler } from '../../../lib/spotify-error-handler.js';

export const POST: APIRoute = async ({ request }) => {
    try {
        const spotifyService = new SpotifyService();
        
        // Parse request body for playback options
        let contextUri: string | undefined;
        let uris: string[] | undefined;
        let deviceId: string | undefined;
        let trackId: string | undefined;

        try {
            const body = await request.json();
            contextUri = body?.contextUri;
            uris = body?.uris;
            deviceId = body?.deviceId;
            trackId = body?.trackId;

            // If trackId is provided, convert to URI format
            if (trackId && !uris && !contextUri) {
                uris = [`spotify:track:${trackId}`];
            }
        } catch {
            // No body or invalid JSON, will resume current playback
        }

        // Execute play with automatic token refresh
        await spotifyService.executeWithTokenRefresh(async () => {
            await spotifyService.startPlayback(contextUri, uris, deviceId);
        });

        // Prepare response data
        const responseData: any = { message: 'Playback started successfully' };
        
        if (trackId) {
            responseData.trackId = trackId;
        }
        if (contextUri) {
            responseData.contextUri = contextUri;
        }
        if (uris) {
            responseData.uris = uris;
        }

        return new Response(
            JSON.stringify(
                SpotifyService.createResponse(responseData, undefined)
            ),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        SpotifyErrorHandler.logError(error, 'POST /api/spotify/play');
        return SpotifyErrorHandler.createErrorResponse(error);
    }
};
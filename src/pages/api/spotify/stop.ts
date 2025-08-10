import type { APIRoute } from 'astro';
import { SpotifyService } from '../../../lib/spotify-service.js';
import { SpotifyErrorHandler } from '../../../lib/spotify-error-handler.js';

export const POST: APIRoute = async ({ request }) => {
    try {
        const spotifyService = new SpotifyService();
        
        // Parse request body for optional device ID
        let deviceId: string | undefined;
        try {
            const body = await request.json();
            deviceId = body?.deviceId;
        } catch {
            // No body or invalid JSON, continue without device ID
        }

        // Execute pause with automatic token refresh
        await spotifyService.executeWithTokenRefresh(async () => {
            await spotifyService.pausePlayback(deviceId);
        });

        return new Response(
            JSON.stringify(
                SpotifyService.createResponse(
                    { message: 'Playback paused successfully' },
                    undefined
                )
            ),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        SpotifyErrorHandler.logError(error, 'POST /api/spotify/stop');
        return SpotifyErrorHandler.createErrorResponse(error);
    }
};
import type { APIRoute } from 'astro';
import { SpotifyService, type Track, type CurrentlyPlayingResponse, type Artist } from '../../../lib/spotify-service.js';
import { SpotifyErrorHandler } from '../../../lib/spotify-error-handler.js';

export interface SpotifyData {
  topTracks: Track[];
  currentlyPlaying: CurrentlyPlayingResponse | null;
  followedArtists: Artist[];
}

export const GET: APIRoute = async () => {
  try {
    const spotifyService = new SpotifyService();

    // Fetch all data concurrently for better performance
    const [topTracks, currentlyPlaying, followedArtists] = await Promise.allSettled([
      spotifyService.executeWithTokenRefresh(() => spotifyService.getTopTracks()),
      spotifyService.executeWithTokenRefresh(() => spotifyService.getCurrentlyPlaying()),
      spotifyService.executeWithTokenRefresh(() => spotifyService.getFollowedArtists()),
    ]);

    // Process results and handle any failures gracefully
    const data: SpotifyData = {
      topTracks: topTracks.status === 'fulfilled' ? topTracks.value : [],
      currentlyPlaying: currentlyPlaying.status === 'fulfilled' ? currentlyPlaying.value : null,
      followedArtists: followedArtists.status === 'fulfilled' ? followedArtists.value : [],
    };

    // Check if any critical failures occurred
    const errors: string[] = [];
    if (topTracks.status === 'rejected') {
      errors.push(`Top tracks: ${topTracks.reason.message}`);
    }
    if (currentlyPlaying.status === 'rejected') {
      errors.push(`Currently playing: ${currentlyPlaying.reason.message}`);
    }
    if (followedArtists.status === 'rejected') {
      errors.push(`Followed artists: ${followedArtists.reason.message}`);
    }

    const response = SpotifyService.createResponse(data, errors.length > 0 ? errors.join('; ') : undefined);

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    SpotifyErrorHandler.logError(error, 'GET /api/spotify');
    return SpotifyErrorHandler.createErrorResponse(error);
  }
};
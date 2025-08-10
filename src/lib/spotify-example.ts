/**
 * Example usage of the Spotify service
 * This file demonstrates how to use the SpotifyService class and utility functions
 */

import { SpotifyService } from './spotify-service.js';
import {
  formatDuration,
  formatTrackDisplay,
  getBestImage,
  formatFollowerCount,
  isTrackPlaying,
  createMusicTasteSummary,
} from './spotify-utils.js';

/**
 * Example function showing how to fetch and display user's music data
 */
export async function fetchUserMusicData() {
  try {
    const spotifyService = new SpotifyService();

    // Fetch all data concurrently
    const [topTracks, currentlyPlaying, followedArtists] = await Promise.all([
      spotifyService.executeWithTokenRefresh(() => spotifyService.getTopTracks()),
      spotifyService.executeWithTokenRefresh(() => spotifyService.getCurrentlyPlaying()),
      spotifyService.executeWithTokenRefresh(() => spotifyService.getFollowedArtists()),
    ]);

    // Create a comprehensive response
    const musicData = {
      topTracks: topTracks.map(track => ({
        ...track,
        displayName: formatTrackDisplay(track),
        duration: formatDuration(track.duration_ms),
        albumImage: getBestImage(track.album.images),
      })),
      currentlyPlaying: currentlyPlaying ? {
        ...currentlyPlaying,
        isPlaying: isTrackPlaying(currentlyPlaying),
        trackDisplay: currentlyPlaying.item ? formatTrackDisplay(currentlyPlaying.item) : null,
      } : null,
      followedArtists: followedArtists.map(artist => ({
        ...artist,
        followerCount: formatFollowerCount(artist.followers.total),
        profileImage: getBestImage(artist.images),
      })),
      summary: createMusicTasteSummary(topTracks, followedArtists),
    };

    return SpotifyService.createResponse(musicData);
  } catch (error) {
    console.error('Error fetching music data:', error);
    return SpotifyService.createResponse(
      undefined,
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

/**
 * Example function for controlling playback
 */
export async function controlPlayback(action: 'play' | 'pause', trackUri?: string) {
  try {
    const spotifyService = new SpotifyService();

    if (action === 'pause') {
      await spotifyService.executeWithTokenRefresh(() => spotifyService.pausePlayback());
      return SpotifyService.createResponse({ message: 'Playback paused successfully' });
    } else if (action === 'play') {
      if (trackUri) {
        await spotifyService.executeWithTokenRefresh(() => 
          spotifyService.startPlayback(undefined, [trackUri])
        );
        return SpotifyService.createResponse({ message: `Started playing track: ${trackUri}` });
      } else {
        await spotifyService.executeWithTokenRefresh(() => spotifyService.startPlayback());
        return SpotifyService.createResponse({ message: 'Resumed playback' });
      }
    }

    return SpotifyService.createResponse(undefined, 'Invalid action');
  } catch (error) {
    console.error('Error controlling playback:', error);
    return SpotifyService.createResponse(
      undefined,
      error instanceof Error ? error.message : 'Playback control failed'
    );
  }
}

/**
 * Example function for getting specific time range data
 */
export async function getTopTracksForPeriod(timeRange: 'short_term' | 'medium_term' | 'long_term') {
  try {
    const spotifyService = new SpotifyService();
    const tracks = await spotifyService.executeWithTokenRefresh(() => 
      spotifyService.getTopTracks(timeRange)
    );

    const periodLabels = {
      short_term: 'Last 4 weeks',
      medium_term: 'Last 6 months',
      long_term: 'All time',
    };

    return SpotifyService.createResponse({
      period: periodLabels[timeRange],
      tracks: tracks.map(track => ({
        name: track.name,
        artist: track.artists[0].name,
        popularity: track.popularity,
        duration: formatDuration(track.duration_ms),
        spotifyUrl: track.external_urls.spotify,
      })),
    });
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return SpotifyService.createResponse(
      undefined,
      error instanceof Error ? error.message : 'Failed to fetch top tracks'
    );
  }
}
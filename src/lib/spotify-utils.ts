import type { Track, Artist, CurrentlyPlayingResponse } from './spotify-service.js';

/**
 * Utility functions for Spotify data transformation and formatting
 */

/**
 * Format track duration from milliseconds to MM:SS format
 */
export function formatDuration(durationMs: number): string {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Get the best quality image from an array of images
 */
export function getBestImage(images: Array<{ url: string; height: number; width: number }>): string | null {
  if (!images || images.length === 0) return null;
  
  // Sort by size (area) and return the largest
  const sortedImages = images.sort((a, b) => (b.height * b.width) - (a.height * a.width));
  return sortedImages[0].url;
}

/**
 * Get a medium-sized image from an array of images
 */
export function getMediumImage(images: Array<{ url: string; height: number; width: number }>): string | null {
  if (!images || images.length === 0) return null;
  
  // Try to find an image around 300px, otherwise return the middle one
  const mediumImage = images.find(img => img.height >= 250 && img.height <= 350);
  if (mediumImage) return mediumImage.url;
  
  // Fallback to middle image
  const middleIndex = Math.floor(images.length / 2);
  return images[middleIndex].url;
}

/**
 * Format track for display with artist names
 */
export function formatTrackDisplay(track: Track): string {
  const artistNames = track.artists.map(artist => artist.name).join(', ');
  return `${track.name} by ${artistNames}`;
}

/**
 * Calculate playback progress percentage
 */
export function calculateProgress(currentlyPlaying: CurrentlyPlayingResponse): number {
  if (!currentlyPlaying.item || !currentlyPlaying.progress_ms) return 0;
  
  const progress = currentlyPlaying.progress_ms;
  const duration = currentlyPlaying.item.duration_ms;
  
  return Math.round((progress / duration) * 100);
}

/**
 * Format playback progress as "current / total" duration
 */
export function formatPlaybackProgress(currentlyPlaying: CurrentlyPlayingResponse): string {
  if (!currentlyPlaying.item || !currentlyPlaying.progress_ms) return '0:00 / 0:00';
  
  const current = formatDuration(currentlyPlaying.progress_ms);
  const total = formatDuration(currentlyPlaying.item.duration_ms);
  
  return `${current} / ${total}`;
}

/**
 * Get top genres from a list of artists
 */
export function getTopGenres(artists: Artist[], limit: number = 5): string[] {
  const genreCount = new Map<string, number>();
  
  artists.forEach(artist => {
    artist.genres.forEach(genre => {
      genreCount.set(genre, (genreCount.get(genre) || 0) + 1);
    });
  });
  
  return Array.from(genreCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([genre]) => genre);
}

/**
 * Format follower count in a human-readable way
 */
export function formatFollowerCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Check if a track is currently playing
 */
export function isTrackPlaying(currentlyPlaying: CurrentlyPlayingResponse | null): boolean {
  return currentlyPlaying?.is_playing === true && currentlyPlaying?.item !== null;
}

/**
 * Get device type icon/emoji based on device type
 */
export function getDeviceIcon(deviceType: string): string {
  const deviceIcons: Record<string, string> = {
    'Computer': '💻',
    'Smartphone': '📱',
    'Speaker': '🔊',
    'TV': '📺',
    'Tablet': '📱',
    'Automobile': '🚗',
    'Game Console': '🎮',
  };
  
  return deviceIcons[deviceType] || '🎵';
}

/**
 * Sanitize track data for safe JSON serialization
 */
export function sanitizeTrackData(track: Track): Track {
  return {
    id: track.id,
    name: track.name,
    artists: track.artists.map(artist => ({
      id: artist.id,
      name: artist.name,
      external_urls: {
        spotify: artist.external_urls.spotify,
      },
    })),
    album: {
      id: track.album.id,
      name: track.album.name,
      images: track.album.images,
    },
    uri: track.uri,
    external_urls: {
      spotify: track.external_urls.spotify,
    },
    duration_ms: track.duration_ms,
    popularity: track.popularity,
  };
}

/**
 * Create a summary of user's music taste based on top tracks and artists
 */
export function createMusicTasteSummary(tracks: Track[], artists: Artist[]): {
  topGenres: string[];
  averagePopularity: number;
  totalFollowers: number;
  uniqueArtists: number;
} {
  const topGenres = getTopGenres(artists);
  const averagePopularity = tracks.reduce((sum, track) => sum + track.popularity, 0) / tracks.length;
  const totalFollowers = artists.reduce((sum, artist) => sum + artist.followers.total, 0);
  const uniqueArtists = new Set(tracks.flatMap(track => track.artists.map(artist => artist.id))).size;
  
  return {
    topGenres,
    averagePopularity: Math.round(averagePopularity),
    totalFollowers,
    uniqueArtists,
  };
}
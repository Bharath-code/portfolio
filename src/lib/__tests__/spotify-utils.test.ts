import { describe, it, expect } from 'vitest';
import {
  formatDuration,
  getBestImage,
  getMediumImage,
  formatTrackDisplay,
  calculateProgress,
  formatPlaybackProgress,
  getTopGenres,
  formatFollowerCount,
  isTrackPlaying,
  getDeviceIcon,
  sanitizeTrackData,
  createMusicTasteSummary,
} from '../spotify-utils.js';
import type { Track, Artist, CurrentlyPlayingResponse } from '../spotify-service.js';

describe('Spotify Utils', () => {
  describe('formatDuration', () => {
    it('should format duration correctly', () => {
      expect(formatDuration(180000)).toBe('3:00');
      expect(formatDuration(125000)).toBe('2:05');
      expect(formatDuration(65000)).toBe('1:05');
      expect(formatDuration(5000)).toBe('0:05');
    });
  });

  describe('getBestImage', () => {
    it('should return the largest image', () => {
      const images = [
        { url: 'small.jpg', height: 64, width: 64 },
        { url: 'large.jpg', height: 640, width: 640 },
        { url: 'medium.jpg', height: 300, width: 300 },
      ];
      
      expect(getBestImage(images)).toBe('large.jpg');
    });

    it('should return null for empty array', () => {
      expect(getBestImage([])).toBeNull();
    });
  });

  describe('getMediumImage', () => {
    it('should return medium-sized image when available', () => {
      const images = [
        { url: 'small.jpg', height: 64, width: 64 },
        { url: 'medium.jpg', height: 300, width: 300 },
        { url: 'large.jpg', height: 640, width: 640 },
      ];
      
      expect(getMediumImage(images)).toBe('medium.jpg');
    });

    it('should return middle image when no medium size available', () => {
      const images = [
        { url: 'small.jpg', height: 64, width: 64 },
        { url: 'large.jpg', height: 640, width: 640 },
      ];
      
      expect(getMediumImage(images)).toBe('large.jpg');
    });
  });

  describe('formatTrackDisplay', () => {
    it('should format track with single artist', () => {
      const track: Track = {
        id: '1',
        name: 'Test Song',
        artists: [{ id: '1', name: 'Test Artist', external_urls: { spotify: '' } }],
        album: { id: '1', name: 'Test Album', images: [] },
        uri: '',
        external_urls: { spotify: '' },
        duration_ms: 180000,
        popularity: 75,
      };

      expect(formatTrackDisplay(track)).toBe('Test Song by Test Artist');
    });

    it('should format track with multiple artists', () => {
      const track: Track = {
        id: '1',
        name: 'Test Song',
        artists: [
          { id: '1', name: 'Artist 1', external_urls: { spotify: '' } },
          { id: '2', name: 'Artist 2', external_urls: { spotify: '' } },
        ],
        album: { id: '1', name: 'Test Album', images: [] },
        uri: '',
        external_urls: { spotify: '' },
        duration_ms: 180000,
        popularity: 75,
      };

      expect(formatTrackDisplay(track)).toBe('Test Song by Artist 1, Artist 2');
    });
  });

  describe('calculateProgress', () => {
    it('should calculate progress percentage correctly', () => {
      const currentlyPlaying: CurrentlyPlayingResponse = {
        item: {
          id: '1',
          name: 'Test Song',
          artists: [],
          album: { id: '1', name: 'Test Album', images: [] },
          uri: '',
          external_urls: { spotify: '' },
          duration_ms: 200000,
          popularity: 75,
        },
        is_playing: true,
        progress_ms: 100000,
        currently_playing_type: 'track',
        device: null,
      };

      expect(calculateProgress(currentlyPlaying)).toBe(50);
    });

    it('should return 0 when no progress', () => {
      const currentlyPlaying: CurrentlyPlayingResponse = {
        item: null,
        is_playing: false,
        progress_ms: null,
        currently_playing_type: 'track',
        device: null,
      };

      expect(calculateProgress(currentlyPlaying)).toBe(0);
    });
  });

  describe('formatPlaybackProgress', () => {
    it('should format playback progress correctly', () => {
      const currentlyPlaying: CurrentlyPlayingResponse = {
        item: {
          id: '1',
          name: 'Test Song',
          artists: [],
          album: { id: '1', name: 'Test Album', images: [] },
          uri: '',
          external_urls: { spotify: '' },
          duration_ms: 200000,
          popularity: 75,
        },
        is_playing: true,
        progress_ms: 100000,
        currently_playing_type: 'track',
        device: null,
      };

      expect(formatPlaybackProgress(currentlyPlaying)).toBe('1:40 / 3:20');
    });
  });

  describe('getTopGenres', () => {
    it('should return top genres by frequency', () => {
      const artists: Artist[] = [
        {
          id: '1',
          name: 'Artist 1',
          followers: { total: 1000 },
          genres: ['rock', 'alternative'],
          images: [],
          external_urls: { spotify: '' },
          popularity: 75,
        },
        {
          id: '2',
          name: 'Artist 2',
          followers: { total: 2000 },
          genres: ['rock', 'indie'],
          images: [],
          external_urls: { spotify: '' },
          popularity: 80,
        },
      ];

      const topGenres = getTopGenres(artists, 3);
      expect(topGenres).toEqual(['rock', 'alternative', 'indie']);
    });
  });

  describe('formatFollowerCount', () => {
    it('should format large numbers correctly', () => {
      expect(formatFollowerCount(1500000)).toBe('1.5M');
      expect(formatFollowerCount(50000)).toBe('50.0K');
      expect(formatFollowerCount(500)).toBe('500');
    });
  });

  describe('isTrackPlaying', () => {
    it('should return true when track is playing', () => {
      const currentlyPlaying: CurrentlyPlayingResponse = {
        item: {
          id: '1',
          name: 'Test Song',
          artists: [],
          album: { id: '1', name: 'Test Album', images: [] },
          uri: '',
          external_urls: { spotify: '' },
          duration_ms: 200000,
          popularity: 75,
        },
        is_playing: true,
        progress_ms: 100000,
        currently_playing_type: 'track',
        device: null,
      };

      expect(isTrackPlaying(currentlyPlaying)).toBe(true);
    });

    it('should return false when nothing is playing', () => {
      expect(isTrackPlaying(null)).toBe(false);
    });
  });

  describe('getDeviceIcon', () => {
    it('should return correct icons for device types', () => {
      expect(getDeviceIcon('Computer')).toBe('💻');
      expect(getDeviceIcon('Smartphone')).toBe('📱');
      expect(getDeviceIcon('Speaker')).toBe('🔊');
      expect(getDeviceIcon('Unknown')).toBe('🎵');
    });
  });

  describe('sanitizeTrackData', () => {
    it('should sanitize track data correctly', () => {
      const track: Track = {
        id: '1',
        name: 'Test Song',
        artists: [{ id: '1', name: 'Test Artist', external_urls: { spotify: 'https://spotify.com' } }],
        album: { id: '1', name: 'Test Album', images: [] },
        uri: 'spotify:track:1',
        external_urls: { spotify: 'https://spotify.com' },
        duration_ms: 180000,
        popularity: 75,
      };

      const sanitized = sanitizeTrackData(track);
      expect(sanitized).toEqual(track);
    });
  });

  describe('createMusicTasteSummary', () => {
    it('should create music taste summary correctly', () => {
      const tracks: Track[] = [
        {
          id: '1',
          name: 'Song 1',
          artists: [{ id: '1', name: 'Artist 1', external_urls: { spotify: '' } }],
          album: { id: '1', name: 'Album 1', images: [] },
          uri: '',
          external_urls: { spotify: '' },
          duration_ms: 180000,
          popularity: 80,
        },
        {
          id: '2',
          name: 'Song 2',
          artists: [{ id: '2', name: 'Artist 2', external_urls: { spotify: '' } }],
          album: { id: '2', name: 'Album 2', images: [] },
          uri: '',
          external_urls: { spotify: '' },
          duration_ms: 200000,
          popularity: 70,
        },
      ];

      const artists: Artist[] = [
        {
          id: '1',
          name: 'Artist 1',
          followers: { total: 1000000 },
          genres: ['rock', 'alternative'],
          images: [],
          external_urls: { spotify: '' },
          popularity: 85,
        },
        {
          id: '2',
          name: 'Artist 2',
          followers: { total: 500000 },
          genres: ['indie', 'alternative'],
          images: [],
          external_urls: { spotify: '' },
          popularity: 75,
        },
      ];

      const summary = createMusicTasteSummary(tracks, artists);
      
      expect(summary.averagePopularity).toBe(75);
      expect(summary.totalFollowers).toBe(1500000);
      expect(summary.uniqueArtists).toBe(2);
      expect(summary.topGenres).toEqual(['alternative', 'rock', 'indie']);
    });
  });
});
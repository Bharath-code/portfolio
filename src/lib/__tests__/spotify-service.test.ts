import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SpotifyService } from '../spotify-service.js';

// Mock the environment configuration
vi.mock('../env.js', () => ({
  spotifyConfig: {
    clientId: 'test_client_id',
    clientSecret: 'test_client_secret',
    redirectUri: 'http://localhost:3000/callback',
    accessToken: 'test_access_token',
    refreshToken: 'test_refresh_token',
  },
  validateSpotifyConfig: vi.fn(),
}));

// Mock the Spotify Web API SDK
const mockApi = {
  currentUser: {
    topItems: vi.fn(),
    followedArtists: vi.fn(),
  },
  player: {
    getCurrentlyPlayingTrack: vi.fn(),
    pausePlayback: vi.fn(),
    startResumePlayback: vi.fn(),
  },
};

vi.mock('@spotify/web-api-ts-sdk', () => ({
  SpotifyApi: {
    withAccessToken: vi.fn(() => mockApi),
  },
}));

// Mock fetch for token refresh
global.fetch = vi.fn();

describe('SpotifyService', () => {
  let service: SpotifyService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new SpotifyService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getTopTracks', () => {
    it('should fetch and transform top tracks successfully', async () => {
      const mockTracks = {
        items: [
          {
            id: 'track1',
            name: 'Test Track 1',
            artists: [{ id: 'artist1', name: 'Test Artist', external_urls: { spotify: 'https://spotify.com/artist1' } }],
            album: { id: 'album1', name: 'Test Album', images: [{ url: 'image.jpg', height: 300, width: 300 }] },
            uri: 'spotify:track:track1',
            external_urls: { spotify: 'https://spotify.com/track1' },
            duration_ms: 180000,
            popularity: 75,
          },
        ],
      };

      mockApi.currentUser.topItems.mockResolvedValue(mockTracks);

      const result = await service.getTopTracks();

      expect(mockApi.currentUser.topItems).toHaveBeenCalledWith('tracks', 'medium_term', 10);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 'track1',
        name: 'Test Track 1',
        artists: [{ id: 'artist1', name: 'Test Artist', external_urls: { spotify: 'https://spotify.com/artist1' } }],
        album: { id: 'album1', name: 'Test Album', images: [{ url: 'image.jpg', height: 300, width: 300 }] },
        uri: 'spotify:track:track1',
        external_urls: { spotify: 'https://spotify.com/track1' },
        duration_ms: 180000,
        popularity: 75,
      });
    });

    it('should handle different time ranges', async () => {
      mockApi.currentUser.topItems.mockResolvedValue({ items: [] });

      await service.getTopTracks('short_term');
      expect(mockApi.currentUser.topItems).toHaveBeenCalledWith('tracks', 'short_term', 10);

      await service.getTopTracks('long_term');
      expect(mockApi.currentUser.topItems).toHaveBeenCalledWith('tracks', 'long_term', 10);
    });

    it('should throw error when API call fails', async () => {
      mockApi.currentUser.topItems.mockRejectedValue(new Error('API Error'));

      await expect(service.getTopTracks()).rejects.toThrow('Failed to fetch top tracks: API Error');
    });
  });

  describe('getCurrentlyPlaying', () => {
    it('should fetch currently playing track successfully', async () => {
      const mockCurrentlyPlaying = {
        item: {
          id: 'track1',
          name: 'Current Track',
          artists: [{ id: 'artist1', name: 'Current Artist', external_urls: { spotify: 'https://spotify.com/artist1' } }],
          album: { id: 'album1', name: 'Current Album', images: [] },
          uri: 'spotify:track:track1',
          external_urls: { spotify: 'https://spotify.com/track1' },
          duration_ms: 200000,
          popularity: 80,
        },
        is_playing: true,
        progress_ms: 60000,
        currently_playing_type: 'track',
        device: {
          id: 'device1',
          is_active: true,
          name: 'Test Device',
          type: 'Computer',
          volume_percent: 75,
        },
      };

      mockApi.player.getCurrentlyPlayingTrack.mockResolvedValue(mockCurrentlyPlaying);

      const result = await service.getCurrentlyPlaying();

      expect(result).toBeDefined();
      expect(result?.is_playing).toBe(true);
      expect(result?.item?.name).toBe('Current Track');
      expect(result?.device?.name).toBe('Test Device');
    });

    it('should return null when nothing is playing', async () => {
      mockApi.player.getCurrentlyPlayingTrack.mockResolvedValue(null);

      const result = await service.getCurrentlyPlaying();

      expect(result).toBeNull();
    });

    it('should handle device being null', async () => {
      const mockCurrentlyPlaying = {
        item: {
          id: 'track1',
          name: 'Current Track',
          artists: [{ id: 'artist1', name: 'Current Artist', external_urls: { spotify: 'https://spotify.com/artist1' } }],
          album: { id: 'album1', name: 'Current Album', images: [] },
          uri: 'spotify:track:track1',
          external_urls: { spotify: 'https://spotify.com/track1' },
          duration_ms: 200000,
          popularity: 80,
        },
        is_playing: false,
        progress_ms: 0,
        currently_playing_type: 'track',
        device: null,
      };

      mockApi.player.getCurrentlyPlayingTrack.mockResolvedValue(mockCurrentlyPlaying);

      const result = await service.getCurrentlyPlaying();

      expect(result?.device).toBeNull();
    });

    it('should throw error when API call fails', async () => {
      mockApi.player.getCurrentlyPlayingTrack.mockRejectedValue(new Error('API Error'));

      await expect(service.getCurrentlyPlaying()).rejects.toThrow('Failed to fetch currently playing track: API Error');
    });
  });

  describe('getFollowedArtists', () => {
    it('should fetch followed artists successfully', async () => {
      const mockArtists = {
        artists: {
          items: [
            {
              id: 'artist1',
              name: 'Test Artist',
              followers: { total: 1000000 },
              genres: ['rock', 'alternative'],
              images: [{ url: 'artist.jpg', height: 300, width: 300 }],
              external_urls: { spotify: 'https://spotify.com/artist1' },
              popularity: 85,
            },
          ],
        },
      };

      mockApi.currentUser.followedArtists.mockResolvedValue(mockArtists);

      const result = await service.getFollowedArtists();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 'artist1',
        name: 'Test Artist',
        followers: { total: 1000000 },
        genres: ['rock', 'alternative'],
        images: [{ url: 'artist.jpg', height: 300, width: 300 }],
        external_urls: { spotify: 'https://spotify.com/artist1' },
        popularity: 85,
      });
    });

    it('should throw error when API call fails', async () => {
      mockApi.currentUser.followedArtists.mockRejectedValue(new Error('API Error'));

      await expect(service.getFollowedArtists()).rejects.toThrow('Failed to fetch followed artists: API Error');
    });
  });

  describe('pausePlayback', () => {
    it('should pause playback successfully', async () => {
      mockApi.player.pausePlayback.mockResolvedValue(undefined);

      await expect(service.pausePlayback()).resolves.toBeUndefined();
      expect(mockApi.player.pausePlayback).toHaveBeenCalled();
    });

    it('should throw error when pause fails', async () => {
      mockApi.player.pausePlayback.mockRejectedValue(new Error('Pause failed'));

      await expect(service.pausePlayback()).rejects.toThrow('Failed to pause playback: Pause failed');
    });
  });

  describe('startPlayback', () => {
    it('should start playback with context URI', async () => {
      mockApi.player.startResumePlayback.mockResolvedValue(undefined);

      await service.startPlayback('spotify:album:123');

      expect(mockApi.player.startResumePlayback).toHaveBeenCalledWith('', {
        context_uri: 'spotify:album:123',
      });
    });

    it('should start playback with track URIs', async () => {
      mockApi.player.startResumePlayback.mockResolvedValue(undefined);

      await service.startPlayback(undefined, ['spotify:track:123', 'spotify:track:456']);

      expect(mockApi.player.startResumePlayback).toHaveBeenCalledWith('', {
        uris: ['spotify:track:123', 'spotify:track:456'],
      });
    });

    it('should start playback with device ID', async () => {
      mockApi.player.startResumePlayback.mockResolvedValue(undefined);

      await service.startPlayback(undefined, undefined, 'device123');

      expect(mockApi.player.startResumePlayback).toHaveBeenCalledWith('device123', {});
    });

    it('should throw error when playback start fails', async () => {
      mockApi.player.startResumePlayback.mockRejectedValue(new Error('Playback failed'));

      await expect(service.startPlayback()).rejects.toThrow('Failed to start playback: Playback failed');
    });
  });

  describe('refreshAccessToken', () => {
    it('should refresh access token successfully', async () => {
      const mockTokenResponse = {
        access_token: 'new_access_token',
        expires_in: 3600,
      };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTokenResponse),
      });

      const newToken = await service.refreshAccessToken();

      expect(newToken).toBe('new_access_token');
      expect(global.fetch).toHaveBeenCalledWith('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': expect.stringContaining('Basic '),
        },
        body: expect.any(URLSearchParams),
      });
    });

    it('should throw error when token refresh fails', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        statusText: 'Unauthorized',
      });

      await expect(service.refreshAccessToken()).rejects.toThrow('Failed to refresh access token: Token refresh failed: Unauthorized');
    });
  });

  describe('executeWithTokenRefresh', () => {
    it('should execute API call successfully without refresh', async () => {
      const mockApiCall = vi.fn().mockResolvedValue('success');

      const result = await service.executeWithTokenRefresh(mockApiCall);

      expect(result).toBe('success');
      expect(mockApiCall).toHaveBeenCalledTimes(1);
    });

    it('should refresh token and retry on 401 error', async () => {
      const mockApiCall = vi.fn()
        .mockRejectedValueOnce(new Error('401 Unauthorized'))
        .mockResolvedValueOnce('success after refresh');

      // Mock successful token refresh
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ access_token: 'new_token', expires_in: 3600 }),
      });

      const result = await service.executeWithTokenRefresh(mockApiCall);

      expect(result).toBe('success after refresh');
      expect(mockApiCall).toHaveBeenCalledTimes(2);
    });

    it('should throw non-auth errors without retry', async () => {
      const mockApiCall = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(service.executeWithTokenRefresh(mockApiCall)).rejects.toThrow('Network error');
      expect(mockApiCall).toHaveBeenCalledTimes(1);
    });
  });

  describe('createResponse', () => {
    it('should create successful response', () => {
      const data = { test: 'data' };
      const response = SpotifyService.createResponse(data);

      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.error).toBeUndefined();
      expect(response.timestamp).toBeDefined();
    });

    it('should create error response', () => {
      const error = 'Test error';
      const response = SpotifyService.createResponse(undefined, error);

      expect(response.success).toBe(false);
      expect(response.data).toBeUndefined();
      expect(response.error).toBe(error);
      expect(response.timestamp).toBeDefined();
    });
  });
});
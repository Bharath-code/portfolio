import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { APIContext } from 'astro';

// Mock the SpotifyService
const mockSpotifyService = {
  pausePlayback: vi.fn(),
  startPlayback: vi.fn(),
  executeWithTokenRefresh: vi.fn(),
};

const mockCreateResponse = vi.fn((data, error) => ({
  success: !error,
  data,
  error,
  timestamp: new Date().toISOString(),
}));

const MockSpotifyService = vi.fn(() => mockSpotifyService);
// Add createResponse as a static method
Object.defineProperty(MockSpotifyService, 'createResponse', {
  value: mockCreateResponse,
  writable: true,
});

vi.mock('../spotify-service.js', () => ({
  SpotifyService: MockSpotifyService,
}));

// Helper function to create mock request
const createMockRequest = (body?: any): Request => {
  return {
    json: vi.fn().mockResolvedValue(body || {}),
  } as any;
};

// Helper function to create mock Astro context
const createMockContext = (request: Request): APIContext => {
  return {
    request,
    site: new URL('http://localhost:3000'),
    generator: 'Astro v1.0.0',
    url: new URL('http://localhost:3000/api/spotify/test'),
    params: {},
    props: {},
    redirect: vi.fn(),
    cookies: {} as any,
    clientAddress: '127.0.0.1',
    locals: {},
    preferredLocale: undefined,
    preferredLocaleList: undefined,
    currentLocale: undefined,
  } as APIContext;
};

// Import the endpoints after mocking
const { POST: stopPost } = await import('../../pages/api/spotify/stop.js');
const { POST: playPost } = await import('../../pages/api/spotify/play.js');

describe('Spotify Playback Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default successful execution
    mockSpotifyService.executeWithTokenRefresh.mockImplementation(async (fn) => await fn());
    // Reset the createResponse mock
    mockCreateResponse.mockImplementation((data, error) => ({
      success: !error,
      data,
      error,
      timestamp: new Date().toISOString(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('POST /api/spotify/stop', () => {
    it('should pause playback successfully', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      const response = await stopPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.message).toBe('Playback paused successfully');
      expect(responseData.timestamp).toBeDefined();
      expect(mockSpotifyService.executeWithTokenRefresh).toHaveBeenCalled();
    });

    it('should pause playback with device ID', async () => {
      const deviceId = 'test-device-123';
      const request = createMockRequest({ deviceId });
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockImplementation(async (fn) => {
        await fn();
        expect(mockSpotifyService.pausePlayback).toHaveBeenCalledWith(deviceId);
      });

      const response = await stopPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
    });

    it('should handle invalid JSON in request body', async () => {
      const request = {
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      } as any;
      const context = createMockContext(request);

      const response = await stopPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(mockSpotifyService.executeWithTokenRefresh).toHaveBeenCalled();
    });

    it('should handle no active device error', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockRejectedValue(
        new Error('No active device found')
      );

      const response = await stopPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('No active device');
    });

    it('should handle unauthorized error', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockRejectedValue(
        new Error('Unauthorized access')
      );

      const response = await stopPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Unauthorized');
    });

    it('should handle forbidden error', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockRejectedValue(
        new Error('Forbidden operation')
      );

      const response = await stopPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Forbidden');
    });

    it('should handle general errors', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockRejectedValue(
        new Error('Network error')
      );

      const response = await stopPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Network error');
    });
  });

  describe('POST /api/spotify/play', () => {
    it('should start playback successfully without parameters', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.message).toBe('Playback started successfully');
      expect(responseData.timestamp).toBeDefined();
      expect(mockSpotifyService.executeWithTokenRefresh).toHaveBeenCalled();
    });

    it('should start playback with track ID', async () => {
      const trackId = 'test-track-123';
      const request = createMockRequest({ trackId });
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockImplementation(async (fn) => {
        await fn();
        expect(mockSpotifyService.startPlayback).toHaveBeenCalledWith(
          undefined,
          [`spotify:track:${trackId}`],
          undefined
        );
      });

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.trackId).toBe(trackId);
      expect(responseData.data.uris).toEqual([`spotify:track:${trackId}`]);
    });

    it('should start playback with context URI', async () => {
      const contextUri = 'spotify:album:test-album-123';
      const request = createMockRequest({ contextUri });
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockImplementation(async (fn) => {
        await fn();
        expect(mockSpotifyService.startPlayback).toHaveBeenCalledWith(
          contextUri,
          undefined,
          undefined
        );
      });

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.contextUri).toBe(contextUri);
    });

    it('should start playback with URIs array', async () => {
      const uris = ['spotify:track:123', 'spotify:track:456'];
      const request = createMockRequest({ uris });
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockImplementation(async (fn) => {
        await fn();
        expect(mockSpotifyService.startPlayback).toHaveBeenCalledWith(
          undefined,
          uris,
          undefined
        );
      });

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.uris).toEqual(uris);
    });

    it('should start playback with device ID', async () => {
      const deviceId = 'test-device-123';
      const request = createMockRequest({ deviceId });
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockImplementation(async (fn) => {
        await fn();
        expect(mockSpotifyService.startPlayback).toHaveBeenCalledWith(
          undefined,
          undefined,
          deviceId
        );
      });

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
    });

    it('should handle invalid JSON in request body', async () => {
      const request = {
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      } as any;
      const context = createMockContext(request);

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(mockSpotifyService.executeWithTokenRefresh).toHaveBeenCalled();
    });

    it('should handle no active device error', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockRejectedValue(
        new Error('No active device found')
      );

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('No active device');
    });

    it('should handle unauthorized error', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockRejectedValue(
        new Error('401 Unauthorized')
      );

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Unauthorized');
    });

    it('should handle forbidden error', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockRejectedValue(
        new Error('403 Forbidden')
      );

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Forbidden');
    });

    it('should handle invalid request error', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockRejectedValue(
        new Error('Invalid track ID provided')
      );

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Invalid');
    });

    it('should handle general errors', async () => {
      const request = createMockRequest();
      const context = createMockContext(request);

      mockSpotifyService.executeWithTokenRefresh.mockRejectedValue(
        new Error('Network error')
      );

      const response = await playPost(context);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.error).toContain('Network error');
    });
  });
});
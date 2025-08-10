import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { s as spotifyConfig, v as validateSpotifyConfig } from './env_C7bWCZfw.mjs';

class SpotifyErrorHandler {
  /**
   * Parse and categorize Spotify API errors
   */
  static parseSpotifyError(error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
      return {
        status: 401,
        message: "Spotify authentication failed. Please re-authenticate.",
        code: "SPOTIFY_AUTH_FAILED"
      };
    }
    if (errorMessage.includes("403") || errorMessage.includes("Forbidden")) {
      return {
        status: 403,
        message: "Insufficient permissions for this Spotify operation.",
        code: "SPOTIFY_PERMISSION_DENIED"
      };
    }
    if (errorMessage.includes("404") || errorMessage.includes("Not Found")) {
      return {
        status: 404,
        message: "Requested Spotify resource not found.",
        code: "SPOTIFY_RESOURCE_NOT_FOUND"
      };
    }
    if (errorMessage.includes("429") || errorMessage.includes("Rate limit")) {
      return {
        status: 429,
        message: "Spotify API rate limit exceeded. Please try again later.",
        code: "SPOTIFY_RATE_LIMITED"
      };
    }
    if (errorMessage.includes("400") || errorMessage.includes("Bad Request")) {
      return {
        status: 400,
        message: "Invalid request to Spotify API.",
        code: "SPOTIFY_BAD_REQUEST"
      };
    }
    if (errorMessage.includes("No active device") || errorMessage.includes("Device not found")) {
      return {
        status: 404,
        message: "No active Spotify device found. Please open Spotify on a device.",
        code: "SPOTIFY_NO_DEVICE"
      };
    }
    if (errorMessage.includes("Premium required") || errorMessage.includes("Restricted device")) {
      return {
        status: 403,
        message: "Spotify Premium subscription required for this operation.",
        code: "SPOTIFY_PREMIUM_REQUIRED"
      };
    }
    if (errorMessage.includes("ENOTFOUND") || errorMessage.includes("ECONNREFUSED") || errorMessage.includes("timeout") || errorMessage.includes("network")) {
      return {
        status: 503,
        message: "Unable to connect to Spotify API. Please try again later.",
        code: "SPOTIFY_NETWORK_ERROR"
      };
    }
    if (errorMessage.includes("refresh") && errorMessage.includes("token")) {
      return {
        status: 401,
        message: "Failed to refresh Spotify access token. Please re-authenticate.",
        code: "SPOTIFY_TOKEN_REFRESH_FAILED"
      };
    }
    return {
      status: 500,
      message: `Spotify API error: ${errorMessage}`,
      code: "SPOTIFY_API_ERROR"
    };
  }
  /**
   * Create standardized error response
   */
  static createErrorResponse(error) {
    const spotifyError = this.parseSpotifyError(error);
    const response = SpotifyService.createResponse(void 0, spotifyError.message);
    return new Response(JSON.stringify({
      ...response,
      code: spotifyError.code
    }, null, 2), {
      status: spotifyError.status,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  /**
   * Execute operation with comprehensive error handling
   */
  static async executeWithErrorHandling(operation, operationName) {
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
  static validateConfiguration() {
    console.warn("validateConfiguration should be called with config parameter");
  }
  /**
   * Validate environment configuration with provided config
   */
  static validateConfigurationWithConfig(config) {
    const requiredVars = [
      "clientId",
      "clientSecret",
      "redirectUri"
    ];
    const missing = requiredVars.filter((key) => !config[key]);
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
    const redirectUri = config.redirectUri;
    if (redirectUri && !redirectUri.startsWith("http")) {
      throw new Error("redirectUri must be a valid HTTP/HTTPS URL");
    }
  }
  /**
   * Log error for monitoring (in production, integrate with logging service)
   */
  static logError(error, context) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const errorInfo = this.parseSpotifyError(error);
    console.error(`[${timestamp}] Spotify API Error in ${context}:`, {
      code: errorInfo.code,
      status: errorInfo.status,
      message: errorInfo.message,
      originalError: error instanceof Error ? error.stack : error
    });
  }
}

class SpotifyService {
  api;
  accessToken;
  refreshToken;
  constructor() {
    try {
      SpotifyErrorHandler.validateConfigurationWithConfig(spotifyConfig);
      validateSpotifyConfig();
      this.accessToken = spotifyConfig.accessToken;
      this.refreshToken = spotifyConfig.refreshToken;
      if (!this.accessToken || !this.refreshToken) {
        throw new Error("Spotify access token and refresh token are required. Please authenticate first.");
      }
      this.api = SpotifyApi.withAccessToken(spotifyConfig.clientId, {
        access_token: this.accessToken,
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: this.refreshToken
      });
    } catch (error) {
      SpotifyErrorHandler.logError(error, "SpotifyService constructor");
      throw error;
    }
  }
  /**
   * Get user's top tracks
   */
  async getTopTracks(timeRange = "medium_term") {
    return SpotifyErrorHandler.executeWithErrorHandling(async () => {
      const response = await this.api.currentUser.topItems("tracks", timeRange, 10);
      return this.transformTracks(response.items);
    }, "getTopTracks");
  }
  /**
   * Get currently playing track
   */
  async getCurrentlyPlaying() {
    return SpotifyErrorHandler.executeWithErrorHandling(async () => {
      const response = await this.api.player.getCurrentlyPlayingTrack();
      if (!response || !response.item) {
        return null;
      }
      return {
        item: this.transformTrack(response.item),
        is_playing: response.is_playing,
        progress_ms: response.progress_ms,
        currently_playing_type: response.currently_playing_type,
        device: response.device ? {
          id: response.device.id || "",
          is_active: response.device.is_active,
          name: response.device.name,
          type: response.device.type,
          volume_percent: response.device.volume_percent || 0
        } : null
      };
    }, "getCurrentlyPlaying");
  }
  /**
   * Get followed artists
   */
  async getFollowedArtists() {
    return SpotifyErrorHandler.executeWithErrorHandling(async () => {
      const response = await this.api.currentUser.followedArtists();
      return this.transformArtists(response.artists.items);
    }, "getFollowedArtists");
  }
  /**
   * Pause current playback
   */
  async pausePlayback(deviceId) {
    return SpotifyErrorHandler.executeWithErrorHandling(async () => {
      await this.api.player.pausePlayback(deviceId || "");
    }, "pausePlayback");
  }
  /**
   * Start playback
   */
  async startPlayback(contextUri, uris, deviceId) {
    return SpotifyErrorHandler.executeWithErrorHandling(async () => {
      const playbackOptions = {};
      if (contextUri) {
        playbackOptions.context_uri = contextUri;
      }
      if (uris) {
        playbackOptions.uris = uris;
      }
      await this.api.player.startResumePlayback(deviceId || "", playbackOptions);
    }, "startPlayback");
  }
  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken() {
    return SpotifyErrorHandler.executeWithErrorHandling(async () => {
      if (!this.refreshToken) {
        throw new Error("No refresh token available. Please re-authenticate.");
      }
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${Buffer.from(`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`).toString("base64")}`
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: this.refreshToken
        })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Token refresh failed: ${errorData.error_description || response.statusText}`);
      }
      const data = await response.json();
      if (!data.access_token) {
        throw new Error("No access token received from refresh request");
      }
      this.accessToken = data.access_token;
      if (data.refresh_token) {
        this.refreshToken = data.refresh_token;
      }
      this.api = SpotifyApi.withAccessToken(spotifyConfig.clientId, {
        access_token: this.accessToken,
        token_type: "Bearer",
        expires_in: data.expires_in || 3600,
        refresh_token: this.refreshToken
      });
      SpotifyErrorHandler.logError(
        new Error("Token refreshed successfully"),
        "refreshAccessToken"
      );
      return this.accessToken;
    }, "refreshAccessToken");
  }
  /**
   * Execute API call with automatic token refresh on failure
   */
  async executeWithTokenRefresh(apiCall) {
    try {
      return await apiCall();
    } catch (error) {
      SpotifyErrorHandler.logError(error, "executeWithTokenRefresh - initial attempt");
      if (error instanceof Error && (error.message.includes("401") || error.message.includes("Unauthorized") || error.message.includes("The access token expired"))) {
        try {
          SpotifyErrorHandler.logError(
            new Error("Attempting token refresh due to auth error"),
            "executeWithTokenRefresh"
          );
          await this.refreshAccessToken();
          return await apiCall();
        } catch (refreshError) {
          SpotifyErrorHandler.logError(refreshError, "executeWithTokenRefresh - token refresh failed");
          throw new Error(`Authentication failed and token refresh unsuccessful: ${refreshError instanceof Error ? refreshError.message : "Unknown error"}`);
        }
      }
      throw error;
    }
  }
  // Data transformation utilities
  transformTrack(track) {
    return {
      id: track.id,
      name: track.name,
      artists: track.artists.map((artist) => ({
        id: artist.id,
        name: artist.name,
        external_urls: {
          spotify: artist.external_urls.spotify
        }
      })),
      album: {
        id: track.album.id,
        name: track.album.name,
        images: track.album.images
      },
      uri: track.uri,
      external_urls: {
        spotify: track.external_urls.spotify
      },
      duration_ms: track.duration_ms,
      popularity: track.popularity
    };
  }
  transformTracks(tracks) {
    return tracks.map((track) => this.transformTrack(track));
  }
  transformArtist(artist) {
    return {
      id: artist.id,
      name: artist.name,
      followers: {
        total: artist.followers.total
      },
      genres: artist.genres,
      images: artist.images,
      external_urls: {
        spotify: artist.external_urls.spotify
      },
      popularity: artist.popularity
    };
  }
  transformArtists(artists) {
    return artists.map((artist) => this.transformArtist(artist));
  }
  /**
   * Create standardized API response
   */
  static createResponse(data, error) {
    return {
      success: !error,
      data,
      error,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
}

export { SpotifyService as S, SpotifyErrorHandler as a };

import { SpotifyApi, type AccessToken } from '@spotify/web-api-ts-sdk';
import { spotifyConfig, validateSpotifyConfig } from './env.js';
import { SpotifyErrorHandler } from './spotify-error-handler.js';

// Types based on Spotify Web API responses
export interface Track {
    id: string;
    name: string;
    artists: Array<{
        id: string;
        name: string;
        external_urls: {
            spotify: string;
        };
    }>;
    album: {
        id: string;
        name: string;
        images: Array<{
            url: string;
            height: number;
            width: number;
        }>;
    };
    uri: string;
    external_urls: {
        spotify: string;
    };
    duration_ms: number;
    popularity: number;
}

export interface CurrentlyPlayingResponse {
    item: Track | null;
    is_playing: boolean;
    progress_ms: number | null;
    currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';
    device: {
        id: string;
        is_active: boolean;
        name: string;
        type: string;
        volume_percent: number;
    } | null;
}

export interface Artist {
    id: string;
    name: string;
    followers: {
        total: number;
    };
    genres: string[];
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    external_urls: {
        spotify: string;
    };
    popularity: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: string;
}

export class SpotifyService {
    private api: SpotifyApi;
    private accessToken: string;
    private refreshToken: string;

    constructor() {
        try {
            // Use our manually parsed config instead of process.env
            SpotifyErrorHandler.validateConfigurationWithConfig(spotifyConfig);
            validateSpotifyConfig();

            this.accessToken = spotifyConfig.accessToken;
            this.refreshToken = spotifyConfig.refreshToken;

            // Validate that we have tokens
            if (!this.accessToken || !this.refreshToken) {
                throw new Error('Spotify access token and refresh token are required. Please authenticate first.');
            }

            // Initialize Spotify API with access token
            this.api = SpotifyApi.withAccessToken(spotifyConfig.clientId, {
                access_token: this.accessToken,
                token_type: 'Bearer',
                expires_in: 3600,
                refresh_token: this.refreshToken,
            } as AccessToken);
        } catch (error) {
            SpotifyErrorHandler.logError(error, 'SpotifyService constructor');
            throw error;
        }
    }

    /**
     * Get user's top tracks
     */
    async getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'): Promise<Track[]> {
        return SpotifyErrorHandler.executeWithErrorHandling(async () => {
            const response = await this.api.currentUser.topItems('tracks', timeRange, 10);
            return this.transformTracks(response.items);
        }, 'getTopTracks');
    }

    /**
     * Get currently playing track
     */
    async getCurrentlyPlaying(): Promise<CurrentlyPlayingResponse | null> {
        return SpotifyErrorHandler.executeWithErrorHandling(async () => {
            const response = await this.api.player.getCurrentlyPlayingTrack();

            if (!response || !response.item) {
                return null;
            }

            return {
                item: this.transformTrack(response.item as any),
                is_playing: response.is_playing,
                progress_ms: response.progress_ms,
                currently_playing_type: response.currently_playing_type as any,
                device: response.device ? {
                    id: response.device.id || '',
                    is_active: response.device.is_active,
                    name: response.device.name,
                    type: response.device.type,
                    volume_percent: response.device.volume_percent || 0,
                } : null,
            };
        }, 'getCurrentlyPlaying');
    }

    /**
     * Get followed artists
     */
    async getFollowedArtists(): Promise<Artist[]> {
        return SpotifyErrorHandler.executeWithErrorHandling(async () => {
            const response = await this.api.currentUser.followedArtists();
            return this.transformArtists(response.artists.items);
        }, 'getFollowedArtists');
    }

    /**
     * Pause current playback
     */
    async pausePlayback(deviceId?: string): Promise<void> {
        return SpotifyErrorHandler.executeWithErrorHandling(async () => {
            await this.api.player.pausePlayback(deviceId || '');
        }, 'pausePlayback');
    }

    /**
     * Start playback
     */
    async startPlayback(contextUri?: string, uris?: string[], deviceId?: string): Promise<void> {
        return SpotifyErrorHandler.executeWithErrorHandling(async () => {
            const playbackOptions: any = {};

            if (contextUri) {
                playbackOptions.context_uri = contextUri;
            }

            if (uris) {
                playbackOptions.uris = uris;
            }

            await this.api.player.startResumePlayback(deviceId || '', playbackOptions);
        }, 'startPlayback');
    }

    /**
     * Refresh access token using refresh token
     */
    async refreshAccessToken(): Promise<string> {
        return SpotifyErrorHandler.executeWithErrorHandling(async () => {
            if (!this.refreshToken) {
                throw new Error('No refresh token available. Please re-authenticate.');
            }

            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`).toString('base64')}`,
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: this.refreshToken,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Token refresh failed: ${errorData.error_description || response.statusText}`);
            }

            const data = await response.json();

            if (!data.access_token) {
                throw new Error('No access token received from refresh request');
            }

            this.accessToken = data.access_token;

            // Update refresh token if provided (some implementations return new refresh tokens)
            if (data.refresh_token) {
                this.refreshToken = data.refresh_token;
            }

            // Update the API instance with new token
            this.api = SpotifyApi.withAccessToken(spotifyConfig.clientId, {
                access_token: this.accessToken,
                token_type: 'Bearer',
                expires_in: data.expires_in || 3600,
                refresh_token: this.refreshToken,
            } as AccessToken);

            SpotifyErrorHandler.logError(
                new Error('Token refreshed successfully'),
                'refreshAccessToken'
            );

            return this.accessToken;
        }, 'refreshAccessToken');
    }

    /**
     * Execute API call with automatic token refresh on failure
     */
    async executeWithTokenRefresh<T>(apiCall: () => Promise<T>): Promise<T> {
        try {
            return await apiCall();
        } catch (error) {
            SpotifyErrorHandler.logError(error, 'executeWithTokenRefresh - initial attempt');

            // If error is related to authentication, try refreshing token
            if (error instanceof Error && (
                error.message.includes('401') ||
                error.message.includes('Unauthorized') ||
                error.message.includes('The access token expired')
            )) {
                try {
                    SpotifyErrorHandler.logError(
                        new Error('Attempting token refresh due to auth error'),
                        'executeWithTokenRefresh'
                    );

                    await this.refreshAccessToken();
                    return await apiCall();
                } catch (refreshError) {
                    SpotifyErrorHandler.logError(refreshError, 'executeWithTokenRefresh - token refresh failed');
                    throw new Error(`Authentication failed and token refresh unsuccessful: ${refreshError instanceof Error ? refreshError.message : 'Unknown error'}`);
                }
            }
            throw error;
        }
    }

    // Data transformation utilities
    private transformTrack(track: any): Track {
        return {
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist: any) => ({
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

    private transformTracks(tracks: any[]): Track[] {
        return tracks.map(track => this.transformTrack(track));
    }

    private transformArtist(artist: any): Artist {
        return {
            id: artist.id,
            name: artist.name,
            followers: {
                total: artist.followers.total,
            },
            genres: artist.genres,
            images: artist.images,
            external_urls: {
                spotify: artist.external_urls.spotify,
            },
            popularity: artist.popularity,
        };
    }

    private transformArtists(artists: any[]): Artist[] {
        return artists.map(artist => this.transformArtist(artist));
    }

    /**
     * Create standardized API response
     */
    static createResponse<T>(data?: T, error?: string): ApiResponse<T> {
        return {
            success: !error,
            data,
            error,
            timestamp: new Date().toISOString(),
        };
    }
}
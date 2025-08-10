// Environment configuration for Spotify API
const envVars = process.env;

export const spotifyConfig = {
  clientId: envVars.SPOTIFY_CLIENT_ID || '',
  clientSecret: envVars.SPOTIFY_CLIENT_SECRET || '',
  redirectUri: envVars.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:4321/api/spotify/auth/callback',
  accessToken: envVars.SPOTIFY_ACCESS_TOKEN || '',
  refreshToken: envVars.SPOTIFY_REFRESH_TOKEN || '',
};

// Use the configured redirect URI from environment
export const getSpotifyRedirectUri = (host?: string): string => {
  return spotifyConfig.redirectUri;
};

// Validate that required environment variables are set
export function validateSpotifyConfig() {
  const required = ["clientId", "clientSecret", "redirectUri"]
  const missing = required.filter(
    (key) => !spotifyConfig[key as keyof typeof spotifyConfig]
  )

  if (missing.length > 0) {
    throw new Error(
      `Missing required Spotify environment variables: ${missing.join(", ")}`
    )
  }
}

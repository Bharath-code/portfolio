// Environment configuration for Spotify API
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Manually parse .env file since process.env is not loading
function parseEnvFile() {
  try {
    const envPath = resolve(process.cwd(), '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const envVars: Record<string, string> = {};
    
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const cleanKey = key.trim();
        if (cleanKey && valueParts.length > 0) {
          envVars[cleanKey] = valueParts.join('=').trim();
        }
      }
    });
    
    return envVars;
  } catch (error) {
    console.error('Error loading .env file:', error);
    return {};
  }
}

const envVars = parseEnvFile();

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

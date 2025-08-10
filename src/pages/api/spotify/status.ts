import type { APIRoute } from 'astro';
import { spotifyConfig } from '../../../lib/env.js';

export const GET: APIRoute = async () => {
  const configStatus = {
    clientId: !!spotifyConfig.clientId,
    clientSecret: !!spotifyConfig.clientSecret,
    redirectUri: spotifyConfig.redirectUri,
    accessToken: !!spotifyConfig.accessToken,
    refreshToken: !!spotifyConfig.refreshToken,
    timestamp: new Date().toISOString()
  };

  return new Response(
    JSON.stringify({
      success: true,
      message: "Spotify configuration loaded successfully",
      config: configStatus
    }, null, 2),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
import type { APIRoute } from 'astro';
import { spotifyConfig } from '../../../lib/env.js';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      spotifyConfig: {
        clientId: spotifyConfig.clientId ? 'SET' : 'MISSING',
        clientSecret: spotifyConfig.clientSecret ? 'SET' : 'MISSING',
        redirectUri: spotifyConfig.redirectUri,
        accessToken: spotifyConfig.accessToken ? 'SET' : 'MISSING',
        refreshToken: spotifyConfig.refreshToken ? 'SET' : 'MISSING',
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
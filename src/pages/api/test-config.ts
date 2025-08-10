import type { APIRoute } from 'astro';
import { spotifyConfig } from '../../../lib/env.js';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      spotifyConfig: {
        clientId: spotifyConfig.clientId,
        clientSecret: spotifyConfig.clientSecret,
        redirectUri: spotifyConfig.redirectUri,
        accessToken: spotifyConfig.accessToken,
        refreshToken: spotifyConfig.refreshToken,
        clientIdEmpty: !spotifyConfig.clientId,
        clientSecretEmpty: !spotifyConfig.clientSecret,
        redirectUriEmpty: !spotifyConfig.redirectUri,
      }
    }, null, 2),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
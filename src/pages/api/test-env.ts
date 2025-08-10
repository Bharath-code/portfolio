import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const envVars = {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET ? 'SET' : 'MISSING',
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    NODE_ENV: process.env.NODE_ENV,
  };

  return new Response(JSON.stringify({
    success: true,
    environmentVariables: envVars,
    timestamp: new Date().toISOString(),
  }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
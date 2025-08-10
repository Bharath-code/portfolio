import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export const GET: APIRoute = async () => {
  const envPath = resolve(process.cwd(), '.env');
  
  let envFileContent = '';
  try {
    envFileContent = readFileSync(envPath, 'utf-8');
  } catch (error) {
    envFileContent = `Error reading .env file: ${error}`;
  }

  const debugInfo = {
    cwd: process.cwd(),
    envPath,
    envFileExists: existsSync(envPath),
    processEnv: {
      SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
      SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
      NODE_ENV: process.env.NODE_ENV,
    },
    envFileContent: envFileContent.split('\n').filter(line => line.trim() && !line.startsWith('#')),
  };

  return new Response(JSON.stringify(debugInfo, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  const envPath = resolve(process.cwd(), ".env");
  let envFileContent = "";
  try {
    envFileContent = readFileSync(envPath, "utf-8");
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
      NODE_ENV: process.env.NODE_ENV
    },
    envFileContent: envFileContent.split("\n").filter((line) => line.trim() && !line.startsWith("#"))
  };
  return new Response(JSON.stringify(debugInfo, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

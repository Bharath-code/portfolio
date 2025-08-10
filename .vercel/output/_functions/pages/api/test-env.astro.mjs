export { renderers } from '../../renderers.mjs';

const GET = async () => {
  const envVars = {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET ? "SET" : "MISSING",
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    NODE_ENV: process.env.NODE_ENV
  };
  return new Response(JSON.stringify({
    success: true,
    environmentVariables: envVars,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  }, null, 2), {
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

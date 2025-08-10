import { s as spotifyConfig } from '../../../chunks/env_C7bWCZfw.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  const configStatus = {
    clientId: !!spotifyConfig.clientId,
    clientSecret: !!spotifyConfig.clientSecret,
    redirectUri: spotifyConfig.redirectUri,
    accessToken: !!spotifyConfig.accessToken,
    refreshToken: !!spotifyConfig.refreshToken,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
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
        "Content-Type": "application/json"
      }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

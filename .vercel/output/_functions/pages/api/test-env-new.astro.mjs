import { s as spotifyConfig } from '../../chunks/env_BKky4Z1F.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  return new Response(
    JSON.stringify({
      spotifyConfig: {
        clientId: spotifyConfig.clientId ? "SET" : "MISSING",
        clientSecret: spotifyConfig.clientSecret ? "SET" : "MISSING",
        redirectUri: spotifyConfig.redirectUri,
        accessToken: spotifyConfig.accessToken ? "SET" : "MISSING",
        refreshToken: spotifyConfig.refreshToken ? "SET" : "MISSING"
      }
    }),
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

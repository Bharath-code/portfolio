import { s as spotifyConfig } from '../../chunks/env_BKky4Z1F.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
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
        redirectUriEmpty: !spotifyConfig.redirectUri
      }
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

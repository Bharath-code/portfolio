import { g as getSpotifyRedirectUri, s as spotifyConfig } from '../../../../chunks/env_C7bWCZfw.mjs';
export { renderers } from '../../../../renderers.mjs';

const GET = async ({ url }) => {
  try {
    const scopes = [
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-top-read",
      "user-follow-read"
    ].join(" ");
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const requestUrl = new URL(url);
    const redirectUri = getSpotifyRedirectUri(requestUrl.host);
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("client_id", spotifyConfig.clientId);
    authUrl.searchParams.append("scope", scopes);
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("state", state);
    return new Response(null, {
      status: 302,
      headers: {
        "Location": authUrl.toString(),
        "Set-Cookie": `spotify_auth_state=${state}; HttpOnly; SameSite=Lax; Max-Age=600`
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({
        success: false,
        error: `Authentication initialization failed: ${errorMessage}`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

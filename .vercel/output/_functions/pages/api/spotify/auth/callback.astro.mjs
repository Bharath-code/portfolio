import { g as getSpotifyRedirectUri, s as spotifyConfig } from '../../../../chunks/env_BKky4Z1F.mjs';
export { renderers } from '../../../../renderers.mjs';

const GET = async ({ url, request }) => {
  try {
    const urlParams = new URL(url).searchParams;
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const error = urlParams.get("error");
    if (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Spotify authorization failed: ${error}`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    if (!code || !state) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required authorization parameters",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const cookies = request.headers.get("cookie");
    const storedState = cookies?.split(";").find((c) => c.trim().startsWith("spotify_auth_state="))?.split("=")[1];
    if (!storedState || storedState !== state) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid state parameter - possible CSRF attack",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const requestUrl = new URL(url);
    const redirectUri = getSpotifyRedirectUri(requestUrl.host);
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${Buffer.from(`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`).toString("base64")}`
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri
      })
    });
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json().catch(() => ({}));
      return new Response(
        JSON.stringify({
          success: false,
          error: `Token exchange failed: ${errorData.error_description || tokenResponse.statusText}`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }),
        {
          status: tokenResponse.status,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const tokenData = await tokenResponse.json();
    const htmlResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotify Authentication Success</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #1db954, #191414);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            max-width: 500px;
            margin: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .success-icon {
            width: 80px;
            height: 80px;
            background: #1db954;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 40px;
        }
        h1 {
            margin: 0 0 10px;
            font-size: 28px;
        }
        p {
            margin: 10px 0;
            opacity: 0.9;
            line-height: 1.6;
        }
        .token-info {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
            font-family: monospace;
            font-size: 12px;
            overflow-x: auto;
        }
        .action-buttons {
            margin-top: 30px;
        }
        .btn {
            background: #1db954;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            text-decoration: none;
            display: inline-block;
            margin: 5px;
            font-weight: bold;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #1ed760;
        }
        .instructions {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success-icon">✓</div>
        <h1>Spotify Authentication Successful!</h1>
        <p>Your Spotify account has been successfully connected to this application.</p>
        
        <div class="instructions">
            <strong>Next Steps:</strong>
            <ol style="text-align: left; margin: 10px 0; padding-left: 20px;">
                <li>Copy the tokens below to your .env file</li>
                <li>Update SPOTIFY_REDIRECT_URI in .env to match your domain (localhost or 127.0.0.1)</li>
                <li>Restart your development server</li>
                <li>Test the Spotify integration</li>
            </ol>
            <p style="margin-top: 15px; font-size: 14px;"><strong>Note:</strong> This app supports both <code>localhost:4321</code> and <code>127.0.0.1:4321</code> for development flexibility.</p>
        </div>

        <div class="token-info">
            <strong>Access Token:</strong><br>
            <code>${tokenData.access_token}</code><br><br>
            <strong>Refresh Token:</strong><br>
            <code>${tokenData.refresh_token}</code><br><br>
            <strong>Expires In:</strong> ${tokenData.expires_in} seconds<br>
            <strong>Scope:</strong> ${tokenData.scope}<br>
            <strong>Token Type:</strong> ${tokenData.token_type}
        </div>

        <div class="action-buttons">
            <a href="/" class="btn">Go to Homepage</a>
            <a href="/api/spotify/status" class="btn">Check Status</a>
        </div>
    </div>
</body>
</html>`;
    const response = new Response(htmlResponse, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        // Clear the state cookie
        "Set-Cookie": "spotify_auth_state=; HttpOnly; SameSite=None; Secure; Max-Age=0"
      }
    });
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({
        success: false,
        error: `Authentication callback failed: ${errorMessage}`,
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

import { S as SpotifyService, a as SpotifyErrorHandler } from '../../../chunks/spotify-service_rIm4BSNt.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const spotifyService = new SpotifyService();
    let contextUri;
    let uris;
    let deviceId;
    let trackId;
    try {
      const body = await request.json();
      contextUri = body?.contextUri;
      uris = body?.uris;
      deviceId = body?.deviceId;
      trackId = body?.trackId;
      if (trackId && !uris && !contextUri) {
        uris = [`spotify:track:${trackId}`];
      }
    } catch {
    }
    await spotifyService.executeWithTokenRefresh(async () => {
      await spotifyService.startPlayback(contextUri, uris, deviceId);
    });
    const responseData = { message: "Playback started successfully" };
    if (trackId) {
      responseData.trackId = trackId;
    }
    if (contextUri) {
      responseData.contextUri = contextUri;
    }
    if (uris) {
      responseData.uris = uris;
    }
    return new Response(
      JSON.stringify(
        SpotifyService.createResponse(responseData, void 0)
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    SpotifyErrorHandler.logError(error, "POST /api/spotify/play");
    return SpotifyErrorHandler.createErrorResponse(error);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

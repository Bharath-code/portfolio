import { S as SpotifyService, a as SpotifyErrorHandler } from '../../../chunks/spotify-service_Dd6WKZFH.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const spotifyService = new SpotifyService();
    let deviceId;
    try {
      const body = await request.json();
      deviceId = body?.deviceId;
    } catch {
    }
    await spotifyService.executeWithTokenRefresh(async () => {
      await spotifyService.pausePlayback(deviceId);
    });
    return new Response(
      JSON.stringify(
        SpotifyService.createResponse(
          { message: "Playback paused successfully" },
          void 0
        )
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    SpotifyErrorHandler.logError(error, "POST /api/spotify/stop");
    return SpotifyErrorHandler.createErrorResponse(error);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

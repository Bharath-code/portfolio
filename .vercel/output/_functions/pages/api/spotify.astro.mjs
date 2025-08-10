import { S as SpotifyService, a as SpotifyErrorHandler } from '../../chunks/spotify-service_Dd6WKZFH.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const spotifyService = new SpotifyService();
    const [topTracks, currentlyPlaying, followedArtists] = await Promise.allSettled([
      spotifyService.executeWithTokenRefresh(() => spotifyService.getTopTracks()),
      spotifyService.executeWithTokenRefresh(() => spotifyService.getCurrentlyPlaying()),
      spotifyService.executeWithTokenRefresh(() => spotifyService.getFollowedArtists())
    ]);
    const data = {
      topTracks: topTracks.status === "fulfilled" ? topTracks.value : [],
      currentlyPlaying: currentlyPlaying.status === "fulfilled" ? currentlyPlaying.value : null,
      followedArtists: followedArtists.status === "fulfilled" ? followedArtists.value : []
    };
    const errors = [];
    if (topTracks.status === "rejected") {
      errors.push(`Top tracks: ${topTracks.reason.message}`);
    }
    if (currentlyPlaying.status === "rejected") {
      errors.push(`Currently playing: ${currentlyPlaying.reason.message}`);
    }
    if (followedArtists.status === "rejected") {
      errors.push(`Followed artists: ${followedArtists.reason.message}`);
    }
    const response = SpotifyService.createResponse(data, errors.length > 0 ? errors.join("; ") : void 0);
    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    SpotifyErrorHandler.logError(error, "GET /api/spotify");
    return SpotifyErrorHandler.createErrorResponse(error);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

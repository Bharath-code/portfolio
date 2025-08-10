import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BD9YDb-G.mjs';
import { manifest } from './manifest_8tbpP89A.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/debug-env.astro.mjs');
const _page2 = () => import('./pages/api/debug-parsing.astro.mjs');
const _page3 = () => import('./pages/api/spotify/auth/callback.astro.mjs');
const _page4 = () => import('./pages/api/spotify/auth/login.astro.mjs');
const _page5 = () => import('./pages/api/spotify/play.astro.mjs');
const _page6 = () => import('./pages/api/spotify/status.astro.mjs');
const _page7 = () => import('./pages/api/spotify/stop.astro.mjs');
const _page8 = () => import('./pages/api/spotify.astro.mjs');
const _page9 = () => import('./pages/api/test-config.astro.mjs');
const _page10 = () => import('./pages/api/test-env.astro.mjs');
const _page11 = () => import('./pages/api/test-env-new.astro.mjs');
const _page12 = () => import('./pages/blogs.astro.mjs');
const _page13 = () => import('./pages/experiences.astro.mjs');
const _page14 = () => import('./pages/projects.astro.mjs');
const _page15 = () => import('./pages/story.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/debug-env.ts", _page1],
    ["src/pages/api/debug-parsing.ts", _page2],
    ["src/pages/api/spotify/auth/callback.ts", _page3],
    ["src/pages/api/spotify/auth/login.ts", _page4],
    ["src/pages/api/spotify/play.ts", _page5],
    ["src/pages/api/spotify/status.ts", _page6],
    ["src/pages/api/spotify/stop.ts", _page7],
    ["src/pages/api/spotify/index.ts", _page8],
    ["src/pages/api/test-config.ts", _page9],
    ["src/pages/api/test-env.ts", _page10],
    ["src/pages/api/test-env-new.ts", _page11],
    ["src/pages/blogs.astro", _page12],
    ["src/pages/experiences.astro", _page13],
    ["src/pages/projects.astro", _page14],
    ["src/pages/story.astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "88d00412-1038-4e2a-955e-c5f99db06dce",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };

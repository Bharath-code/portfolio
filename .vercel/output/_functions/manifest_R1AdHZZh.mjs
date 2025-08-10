import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_Cf9Qz-m3.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C72GRBHF.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/bharath/Desktop/backend_projects/portfolio/","cacheDir":"file:///Users/bharath/Desktop/backend_projects/portfolio/node_modules/.astro/","outDir":"file:///Users/bharath/Desktop/backend_projects/portfolio/dist/","srcDir":"file:///Users/bharath/Desktop/backend_projects/portfolio/src/","publicDir":"file:///Users/bharath/Desktop/backend_projects/portfolio/public/","buildClientDir":"file:///Users/bharath/Desktop/backend_projects/portfolio/dist/client/","buildServerDir":"file:///Users/bharath/Desktop/backend_projects/portfolio/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/debug-env","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/debug-env\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"debug-env","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/debug-env.ts","pathname":"/api/debug-env","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/debug-parsing","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/debug-parsing\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"debug-parsing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/debug-parsing.ts","pathname":"/api/debug-parsing","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/spotify/auth/callback","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/spotify\\/auth\\/callback\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"spotify","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/spotify/auth/callback.ts","pathname":"/api/spotify/auth/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/spotify/auth/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/spotify\\/auth\\/login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"spotify","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/spotify/auth/login.ts","pathname":"/api/spotify/auth/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/spotify/play","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/spotify\\/play\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"spotify","dynamic":false,"spread":false}],[{"content":"play","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/spotify/play.ts","pathname":"/api/spotify/play","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/spotify/status","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/spotify\\/status\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"spotify","dynamic":false,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/spotify/status.ts","pathname":"/api/spotify/status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/spotify/stop","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/spotify\\/stop\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"spotify","dynamic":false,"spread":false}],[{"content":"stop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/spotify/stop.ts","pathname":"/api/spotify/stop","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/spotify","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/spotify\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"spotify","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/spotify/index.ts","pathname":"/api/spotify","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/test-config","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/test-config\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"test-config","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/test-config.ts","pathname":"/api/test-config","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/test-env","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/test-env\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"test-env","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/test-env.ts","pathname":"/api/test-env","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/test-env-new","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/test-env-new\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"test-env-new","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/test-env-new.ts","pathname":"/api/test-env-new","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.kySYOKnK.css"},{"type":"external","src":"/_astro/blogs.DpokMrKH.css"}],"routeData":{"route":"/blogs","isIndex":false,"type":"page","pattern":"^\\/blogs\\/?$","segments":[[{"content":"blogs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blogs.astro","pathname":"/blogs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.kySYOKnK.css"},{"type":"external","src":"/_astro/experiences.DQnOm-zg.css"}],"routeData":{"route":"/experiences","isIndex":false,"type":"page","pattern":"^\\/experiences\\/?$","segments":[[{"content":"experiences","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/experiences.astro","pathname":"/experiences","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.kySYOKnK.css"},{"type":"external","src":"/_astro/projects.C-H5-ugI.css"}],"routeData":{"route":"/projects","isIndex":false,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects.astro","pathname":"/projects","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.kySYOKnK.css"},{"type":"external","src":"/_astro/story.CXqXyhRw.css"}],"routeData":{"route":"/story","isIndex":false,"type":"page","pattern":"^\\/story\\/?$","segments":[[{"content":"story","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/story.astro","pathname":"/story","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.kySYOKnK.css"},{"type":"external","src":"/_astro/index.B0c2j4C2.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://sidharthmohanty.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/bharath/Desktop/backend_projects/portfolio/src/pages/blogs.astro",{"propagation":"none","containsHead":true}],["/Users/bharath/Desktop/backend_projects/portfolio/src/pages/experiences.astro",{"propagation":"none","containsHead":true}],["/Users/bharath/Desktop/backend_projects/portfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/bharath/Desktop/backend_projects/portfolio/src/pages/projects.astro",{"propagation":"none","containsHead":true}],["/Users/bharath/Desktop/backend_projects/portfolio/src/pages/story.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/debug-env@_@ts":"pages/api/debug-env.astro.mjs","\u0000@astro-page:src/pages/api/debug-parsing@_@ts":"pages/api/debug-parsing.astro.mjs","\u0000@astro-page:src/pages/api/spotify/auth/callback@_@ts":"pages/api/spotify/auth/callback.astro.mjs","\u0000@astro-page:src/pages/api/spotify/auth/login@_@ts":"pages/api/spotify/auth/login.astro.mjs","\u0000@astro-page:src/pages/api/spotify/play@_@ts":"pages/api/spotify/play.astro.mjs","\u0000@astro-page:src/pages/api/spotify/status@_@ts":"pages/api/spotify/status.astro.mjs","\u0000@astro-page:src/pages/api/spotify/stop@_@ts":"pages/api/spotify/stop.astro.mjs","\u0000@astro-page:src/pages/api/spotify/index@_@ts":"pages/api/spotify.astro.mjs","\u0000@astro-page:src/pages/api/test-config@_@ts":"pages/api/test-config.astro.mjs","\u0000@astro-page:src/pages/api/test-env@_@ts":"pages/api/test-env.astro.mjs","\u0000@astro-page:src/pages/api/test-env-new@_@ts":"pages/api/test-env-new.astro.mjs","\u0000@astro-page:src/pages/blogs@_@astro":"pages/blogs.astro.mjs","\u0000@astro-page:src/pages/experiences@_@astro":"pages/experiences.astro.mjs","\u0000@astro-page:src/pages/projects@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/story@_@astro":"pages/story.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_R1AdHZZh.mjs","/Users/bharath/Desktop/backend_projects/portfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CdOO53xm.mjs","/Users/bharath/Desktop/backend_projects/portfolio/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.gOFTm4xs.js","/Users/bharath/Desktop/backend_projects/portfolio/src/pages/index.astro?astro&type=script&index=1&lang.ts":"_astro/index.astro_astro_type_script_index_1_lang.BZ79pwlf.js","/Users/bharath/Desktop/backend_projects/portfolio/src/components/Nav.astro?astro&type=script&index=0&lang.ts":"_astro/Nav.astro_astro_type_script_index_0_lang.R6MUWIgv.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/bharath/Desktop/backend_projects/portfolio/src/pages/index.astro?astro&type=script&index=0&lang.ts","const c=document.getElementById(\"contact-form\"),e=document.getElementById(\"contactFormBtn\"),o=/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/g;c?.addEventListener(\"submit\",function(t){if(t.preventDefault(),this.from_name.value.length<3||this.message.value.length<10||!o.test(this.reply_to.value)){alert(\"Please fill the form correctly\");return}e?.setAttribute(\"disabled\",\"disabled\"),e?.classList.add(\"opacity-50\"),emailjs.sendForm(\"service_hf1jiuc\",\"template_pg4422m\",this,\"aJgInfpLC2IuFXA9X\").then(()=>{console.log(\"success\"),alert(\"Message sent successfully!\"),e?.removeAttribute(\"disabled\"),e?.classList.remove(\"opacity-50\")}).catch(s=>{console.log(s),e?.removeAttribute(\"disabled\"),e?.classList.remove(\"opacity-50\")})});"],["/Users/bharath/Desktop/backend_projects/portfolio/src/components/Nav.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\"#mobileNav\"),n=document.querySelector(\"#navigationBtn\"),i=document.querySelector(\"#closeNavBtn\"),c=window.location.pathname,o=document.querySelectorAll(\".nav-link, .mobile-nav-link\");o.forEach(t=>{const a=t.getAttribute(\"href\");(a===c||`${a}/`===c)&&t.classList.add(\"active\")});document.addEventListener(\"click\",t=>{t.target!==e&&t.target!==n&&!e?.contains(t.target)&&!n?.contains(t.target)&&e?.classList.add(\"hidden\")});i?.addEventListener(\"click\",()=>{e?.classList.add(\"hidden\")});n?.addEventListener(\"click\",()=>{e?.classList.remove(\"hidden\")});"]],"assets":["/_astro/blogs.kySYOKnK.css","/_astro/blogs.DpokMrKH.css","/_astro/experiences.DQnOm-zg.css","/_astro/index.B0c2j4C2.css","/_astro/projects.C-H5-ugI.css","/_astro/story.CXqXyhRw.css","/CNAME","/favicon.ico","/favicon.svg","/_astro/index.astro_astro_type_script_index_1_lang.BZ79pwlf.js","/assets/convo.png","/assets/forum.png","/assets/good-f-issues.png","/assets/jsnotion.png","/assets/maxgainz.jpeg","/assets/mingo.png","/assets/next-ecom.png","/assets/poemgenerator.jpeg","/assets/rc1.png","/assets/sidharth-mohanty.jpeg","/assets/thread-it.png","/assets/tictactoe.png","/assets/yt-playlist-downloader.png","/assets/imgs/cactus.png","/assets/imgs/dino-lose.png","/assets/imgs/dino-run-0.png","/assets/imgs/dino-run-1.png","/assets/imgs/dino-stationary.png","/assets/imgs/ground.png"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"PUNs1Ntc5Y5CNwgkHBkKbY2eH8BEi7mv2JgAl5znsJY="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };

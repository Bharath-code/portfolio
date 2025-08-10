/* empty css                                 */
import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_Cf9Qz-m3.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                    */
import { $ as $$Layout } from '../chunks/Layout_BoYHI8Vx.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://sidharthmohanty.com");
const $$MobileProject = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MobileProject;
  const { project, index = 0 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="mobile-project-card" data-astro-cid-3no3qa3f> <div class="card-header" data-astro-cid-3no3qa3f> <div class="project-number" data-astro-cid-3no3qa3f>${String(index + 1).padStart(2, "0")}</div> <div class="project-meta" data-astro-cid-3no3qa3f> ${project.category && renderTemplate`<span class="project-category" data-astro-cid-3no3qa3f>${project.category}</span>`} ${project.year && renderTemplate`<span class="project-year" data-astro-cid-3no3qa3f>${project.year}</span>`} </div> </div> <div class="mobile-frame" data-astro-cid-3no3qa3f> <div class="frame-header" data-astro-cid-3no3qa3f> <div class="frame-notch" data-astro-cid-3no3qa3f></div> </div> <div class="screen-container" data-astro-cid-3no3qa3f> <img${addAttribute(project.imgUrl, "src")}${addAttribute(project.name, "alt")} class="app-screenshot" loading="lazy" data-astro-cid-3no3qa3f> <div class="screen-overlay" data-astro-cid-3no3qa3f> <div class="overlay-content" data-astro-cid-3no3qa3f> <h3 class="overlay-title" data-astro-cid-3no3qa3f>${project.name}</h3> <p class="overlay-description" data-astro-cid-3no3qa3f>${project.description}</p> <div class="overlay-actions" data-astro-cid-3no3qa3f> ${project.github_link && renderTemplate`<a${addAttribute(project.github_link, "href")} target="_blank" rel="noopener noreferrer" class="action-button" aria-label="View GitHub repository" data-astro-cid-3no3qa3f> <svg viewBox="0 0 24 24" fill="currentColor" data-astro-cid-3no3qa3f> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" data-astro-cid-3no3qa3f></path> </svg> <span data-astro-cid-3no3qa3f>Code</span> </a>`} ${project.live_link && renderTemplate`<a${addAttribute(project.live_link, "href")} target="_blank" rel="noopener noreferrer" class="action-button" aria-label="Download app" data-astro-cid-3no3qa3f> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-3no3qa3f> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-astro-cid-3no3qa3f></path> <polyline points="7,10 12,15 17,10" data-astro-cid-3no3qa3f></polyline> <line x1="12" y1="15" x2="12" y2="3" data-astro-cid-3no3qa3f></line> </svg> <span data-astro-cid-3no3qa3f>Download</span> </a>`} </div> </div> </div> </div> </div> <div class="card-content" data-astro-cid-3no3qa3f> <h3 class="project-title" data-astro-cid-3no3qa3f>${project.name}</h3> <p class="project-description" data-astro-cid-3no3qa3f>${project.description}</p> <div class="project-links" data-astro-cid-3no3qa3f> ${project.github_link && renderTemplate`<a${addAttribute(project.github_link, "href")} target="_blank" rel="noopener noreferrer" class="project-link" data-astro-cid-3no3qa3f> <span data-astro-cid-3no3qa3f>View Code</span> <svg viewBox="0 0 24 24" fill="currentColor" data-astro-cid-3no3qa3f> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" data-astro-cid-3no3qa3f></path> </svg> </a>`} ${project.live_link && renderTemplate`<a${addAttribute(project.live_link, "href")} target="_blank" rel="noopener noreferrer" class="project-link download-link" data-astro-cid-3no3qa3f> <span data-astro-cid-3no3qa3f>Download</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-3no3qa3f> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-astro-cid-3no3qa3f></path> <polyline points="7,10 12,15 17,10" data-astro-cid-3no3qa3f></polyline> <line x1="12" y1="15" x2="12" y2="3" data-astro-cid-3no3qa3f></line> </svg> </a>`} </div> </div> </article> `;
}, "/Users/bharath/Desktop/backend_projects/portfolio/src/components/MobileProject.astro", void 0);

const $$Astro = createAstro("https://sidharthmohanty.com");
const $$Project = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Project;
  const { project, index = 0 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="project-card" data-astro-cid-tkm2rszc> <div class="card-header" data-astro-cid-tkm2rszc> <div class="project-number" data-astro-cid-tkm2rszc>${String(index + 1).padStart(2, "0")}</div> <div class="project-meta" data-astro-cid-tkm2rszc> ${project.category && renderTemplate`<span class="project-category" data-astro-cid-tkm2rszc>${project.category}</span>`} ${project.year && renderTemplate`<span class="project-year" data-astro-cid-tkm2rszc>${project.year}</span>`} </div> </div> <div class="project-image-container" data-astro-cid-tkm2rszc> <img${addAttribute(project.imgUrl, "src")}${addAttribute(project.name, "alt")} class="project-image" loading="lazy" data-astro-cid-tkm2rszc> <div class="image-overlay" data-astro-cid-tkm2rszc> <div class="overlay-content" data-astro-cid-tkm2rszc> <h3 class="overlay-title" data-astro-cid-tkm2rszc>${project.name}</h3> <p class="overlay-description" data-astro-cid-tkm2rszc>${project.description}</p> <div class="overlay-actions" data-astro-cid-tkm2rszc> <a${addAttribute(project.github_link, "href")} target="_blank" rel="noopener noreferrer" class="action-button" aria-label="View GitHub repository" data-astro-cid-tkm2rszc> <svg viewBox="0 0 24 24" fill="currentColor" data-astro-cid-tkm2rszc> <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" data-astro-cid-tkm2rszc></path> </svg> <span data-astro-cid-tkm2rszc>Code</span> </a> ${project.live_link && renderTemplate`<a${addAttribute(project.live_link, "href")} target="_blank" rel="noopener noreferrer" class="action-button" aria-label="View live demo" data-astro-cid-tkm2rszc> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-tkm2rszc> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" data-astro-cid-tkm2rszc></path> <polyline points="15,3 21,3 21,9" data-astro-cid-tkm2rszc></polyline> <line x1="10" y1="14" x2="21" y2="3" data-astro-cid-tkm2rszc></line> </svg> <span data-astro-cid-tkm2rszc>Live</span> </a>`} </div> </div> </div> </div> <div class="card-content" data-astro-cid-tkm2rszc> <h3 class="project-title" data-astro-cid-tkm2rszc>${project.name}</h3> <p class="project-description" data-astro-cid-tkm2rszc>${project.description}</p> <div class="project-links" data-astro-cid-tkm2rszc> <a${addAttribute(project.github_link, "href")} target="_blank" rel="noopener noreferrer" class="project-link" data-astro-cid-tkm2rszc> <span data-astro-cid-tkm2rszc>View Code</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-tkm2rszc> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" data-astro-cid-tkm2rszc></path> <polyline points="15,3 21,3 21,9" data-astro-cid-tkm2rszc></polyline> <line x1="10" y1="14" x2="21" y2="3" data-astro-cid-tkm2rszc></line> </svg> </a> ${project.live_link && renderTemplate`<a${addAttribute(project.live_link, "href")} target="_blank" rel="noopener noreferrer" class="project-link live-link" data-astro-cid-tkm2rszc> <span data-astro-cid-tkm2rszc>Live Demo</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-tkm2rszc> <circle cx="12" cy="12" r="10" data-astro-cid-tkm2rszc></circle> <path d="M12 6v6l4 2" data-astro-cid-tkm2rszc></path> </svg> </a>`} </div> </div> </article> `;
}, "/Users/bharath/Desktop/backend_projects/portfolio/src/components/Project.astro", void 0);

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  const projects = [
    {
      id: 1,
      name: "jsnotion",
      description: "A code documentation tool that can 10x your productivity while learning how to code.",
      imgUrl: "/assets/jsnotion.png",
      github_link: "https://github.com/sidmohanty11/jsnotion",
      live_link: "https://www.npmjs.com/package/jsnotion",
      category: "CLI Tool",
      year: "2023"
    },
    {
      id: 2,
      name: "forum",
      description: "A college hangout hub where you can discuss, ask questions and write blogs.",
      imgUrl: "/assets/forum.png",
      github_link: "https://github.com/sidmohanty11/forum",
      live_link: "https://outr-forums.netlify.app/",
      category: "Web App",
      year: "2022"
    },
    {
      id: 3,
      name: "next-ecom",
      description: "A Next.js based e-commerce application with Shopify integration inspired by their Ecom Site.",
      imgUrl: "/assets/next-ecom.png",
      github_link: "https://github.com/sidmohanty11/next-ecom",
      live_link: "https://next-ecom-one.vercel.app/",
      category: "E-commerce",
      year: "2023"
    },
    {
      id: 4,
      name: "ytdr",
      description: "Download YT playlists with one command - using concurrency.",
      imgUrl: "/assets/yt-playlist-downloader.png",
      github_link: "https://github.com/sidmohanty11/yt-playlist-downloader",
      category: "CLI Tool",
      year: "2022"
    },
    {
      id: 5,
      name: "mingo",
      description: "A minimal yet powerful HTTP client implemented in go (inspired by axios).",
      imgUrl: "/assets/mingo.png",
      github_link: "https://github.com/sidmohanty11/mingo",
      category: "Library",
      year: "2023"
    },
    {
      id: 6,
      name: "thread-it",
      description: "A Reddit Clone using Next.js 13, MySQL, Prisma and Redis.",
      imgUrl: "/assets/thread-it.png",
      github_link: "https://github.com/sidmohanty11/thread-it",
      live_link: "https://thread-it-pi.vercel.app/",
      category: "Web App",
      year: "2023"
    },
    {
      id: 7,
      name: "good-f-issues",
      description: "Find good first issues org wide (Built using Qwik.js).",
      imgUrl: "/assets/good-f-issues.png",
      github_link: "https://github.com/sidmohanty11/good-f-issues",
      live_link: "https://good-f-issues.vercel.app/",
      category: "Web App",
      year: "2023"
    },
    {
      id: 8,
      name: "convo",
      description: "A chatting application that has whatsapp-like architecture, made by using Vue, Go, MongoDB and Pusher.",
      imgUrl: "/assets/convo.png",
      github_link: "https://github.com/sidmohanty11/good-f-issues",
      category: "Web App",
      year: "2022"
    }
  ];
  const mobile_projects = [
    {
      id: 1,
      name: "MaxGainz",
      live_link: "https://play.google.com/store/apps/details?id=com.sidmohanty11.maxgainz",
      github_link: "",
      imgUrl: "/assets/maxgainz.jpeg",
      description: "Next Generation Workout Tracker App for those who want to progressively overload and achieve maximum gains.",
      category: "Fitness",
      year: "2023"
    },
    {
      id: 2,
      name: "Poem Generator",
      live_link: "https://play.google.com/store/apps/details?id=com.poemgenerator",
      github_link: "https://github.com/sidmohanty11/poem-generator",
      imgUrl: "/assets/poemgenerator.jpeg",
      description: "An OpenAI GPT-3 API integration to use davinci model to generate cool poems on behalf of anyone to anyone. (DISCONTINUED)",
      category: "AI/ML",
      year: "2022"
    },
    {
      id: 3,
      name: "Multiplayer Tic Tac Toe",
      live_link: "https://drive.google.com/file/d/1obksEXNLTNnfbzD3nUhPs-4tRy-a5KCE/view?usp=drive_link",
      github_link: "",
      imgUrl: "/assets/tictactoe.png",
      description: "A multiplayer tic tac toe game made using React Native and AWS Amplify.",
      category: "Game",
      year: "2022"
    }
  ];
  projects.filter((p) => p.category === "Web App").length;
  [...projects, ...mobile_projects].filter(
    (p) => p.github_link
  ).length;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects | Sidharth Mohanty", "description": "Welcome to my page - Sid : )", "data-astro-cid-aid3sr62": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="projects-hero" data-astro-cid-aid3sr62> <div class="hero-content" data-astro-cid-aid3sr62> <h1 class="hero-title" data-astro-cid-aid3sr62>Digital Creations</h1> <div class="hero-subtitle-container" data-astro-cid-aid3sr62> <div class="subtitle-line" data-astro-cid-aid3sr62></div> <p class="hero-subtitle" data-astro-cid-aid3sr62>Always Exploring & Building</p> <div class="subtitle-line" data-astro-cid-aid3sr62></div> </div> <p class="hero-description" data-astro-cid-aid3sr62>
Over the years I have worked on many things, but here are the ones that
        I am most proud of. I am a firm believer in open source, so please feel
        free to explore, contribute, and learn from these projects.
</p> </div> </section> <section class="mobile-projects-section" data-astro-cid-aid3sr62> <div class="section-header" data-astro-cid-aid3sr62> <h2 class="section-title" data-astro-cid-aid3sr62>Mobile Applications</h2> <div class="section-line" data-astro-cid-aid3sr62></div> </div> <div class="section-subtitle" data-astro-cid-aid3sr62> <p data-astro-cid-aid3sr62>
Native mobile experiences built with React Native and published to app
        stores
</p> </div> <div class="mobile-projects-grid" data-astro-cid-aid3sr62> ${mobile_projects.map((project, index) => renderTemplate`${renderComponent($$result2, "MobileProject", $$MobileProject, { "project": project, "index": index, "data-astro-cid-aid3sr62": true })}`)} </div> </section> <section class="web-projects-section" data-astro-cid-aid3sr62> <div class="section-header" data-astro-cid-aid3sr62> <h2 class="section-title" data-astro-cid-aid3sr62>Web Apps, CLIs & Libraries</h2> <div class="section-line" data-astro-cid-aid3sr62></div> </div> <div class="section-subtitle" data-astro-cid-aid3sr62> <p data-astro-cid-aid3sr62>Full-stack applications, command-line tools, and reusable libraries</p> </div> <div class="web-projects-grid" data-astro-cid-aid3sr62> ${projects.map((project, index) => renderTemplate`${renderComponent($$result2, "Project", $$Project, { "project": project, "index": index, "data-astro-cid-aid3sr62": true })}`)} </div> </section> <section class="projects-footer" data-astro-cid-aid3sr62> <div class="footer-content" data-astro-cid-aid3sr62> <h3 class="footer-title" data-astro-cid-aid3sr62>Interested in Collaboration?</h3> <p class="footer-description" data-astro-cid-aid3sr62>
I'm always open to discussing new projects, creative ideas, or
        opportunities to build something amazing together.
</p> <div class="footer-actions" data-astro-cid-aid3sr62> <a href="/experiences" class="footer-link" data-astro-cid-aid3sr62> <span data-astro-cid-aid3sr62>View My Experience</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-aid3sr62> <path d="m9 18 6-6-6-6" data-astro-cid-aid3sr62></path> </svg> </a> <a href="https://github.com/sidmohanty11" target="_blank" rel="noopener noreferrer" class="footer-link" data-astro-cid-aid3sr62> <span data-astro-cid-aid3sr62>GitHub Profile</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-aid3sr62> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" data-astro-cid-aid3sr62></path> <polyline points="15,3 21,3 21,9" data-astro-cid-aid3sr62></polyline> <line x1="10" y1="14" x2="21" y2="3" data-astro-cid-aid3sr62></line> </svg> </a> </div> </div> </section> ` })} `;
}, "/Users/bharath/Desktop/backend_projects/portfolio/src/pages/projects.astro", void 0);

const $$file = "/Users/bharath/Desktop/backend_projects/portfolio/src/pages/projects.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

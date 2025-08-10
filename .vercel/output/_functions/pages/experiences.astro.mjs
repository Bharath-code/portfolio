/* empty css                                 */
import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, u as unescapeHTML, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_Cf9Qz-m3.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                       */
import { $ as $$Layout } from '../chunks/Layout_BoYHI8Vx.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://sidharthmohanty.com");
const $$Experience = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Experience;
  const { experience, index = 0 } = Astro2.props;
  const isEven = index % 2 === 0;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`experience-item ${isEven ? "experience-left" : "experience-right"}`, "class")} data-astro-cid-xpq65ryk> <div class="experience-marker" data-astro-cid-xpq65ryk> <div class="marker-outer" data-astro-cid-xpq65ryk> <div class="marker-inner" data-astro-cid-xpq65ryk></div> </div> <div class="marker-number" data-astro-cid-xpq65ryk>${String(index + 1).padStart(2, "0")}</div> </div> <div class="experience-card" data-astro-cid-xpq65ryk> <div class="card-header" data-astro-cid-xpq65ryk> <div class="company-info" data-astro-cid-xpq65ryk> <h3 class="company-name" data-astro-cid-xpq65ryk>${unescapeHTML(experience.company)}</h3> <h4 class="position-title" data-astro-cid-xpq65ryk>${experience.title}</h4> </div> <div class="time-period" data-astro-cid-xpq65ryk> <time class="period-text" data-astro-cid-xpq65ryk>${experience.span}</time> </div> </div> <div class="card-content" data-astro-cid-xpq65ryk> <p class="experience-description" data-astro-cid-xpq65ryk>${unescapeHTML(experience.description)}</p> </div> ${experience.skills && experience.skills.length > 0 && renderTemplate`<div class="skills-section" data-astro-cid-xpq65ryk> <h5 class="skills-title" data-astro-cid-xpq65ryk>Technologies & Skills</h5> <div class="skills-grid" data-astro-cid-xpq65ryk> ${experience.skills.map((skill) => renderTemplate`<span class="skill-tag" data-astro-cid-xpq65ryk>${skill}</span>`)} </div> </div>`} </div> </article> `;
}, "/Users/bharath/Desktop/backend_projects/portfolio/src/components/Experience.astro", void 0);

const $$Experiences = createComponent(($$result, $$props, $$slots) => {
  let exp = [
    {
      id: 1,
      title: "Open Source Contributor",
      company: '<a href="https://rocket.chat" target="_blank">Rocket.Chat</a>',
      description: "An active contributor to RocketChat organization. Top contributor in GSoC leaderboard 2022 - Rank #1. I was selected as the Community Member of the Month (June 2022) and the interaction was posted in RC's YouTube Channel. Worked on different projects under Rocket.Chat organisation, specifically contributed to Rocket.Chat, RC4Community, fuselage and RocketChat.js.SDK.",
      span: "Nov 2021 - Sept 2022",
      skills: [
        "JavaScript",
        "TypeScript",
        "Next.js",
        "Meteor.js",
        "React.js",
        "Node.js",
        "Strapi"
      ]
    },
    {
      id: 2,
      title: "Product Engineer Intern",
      company: '<a href="https://getpropel.app/" target="_blank">Propel</a>',
      description: 'Worked on building a chrome extension and a microservice for scraping LinkedIn connections for <a class="experience-link" href="https://getpropel.app/" target="_blank">getpropel.app</a>. Created the backend and managed the deployment.',
      span: "July 2022 - Sept 2022",
      skills: [
        "Microservices",
        "AWS Lambda & EC2",
        "Chrome Extension",
        "MongoDB",
        "JavaScript",
        "TypeScript",
        "Next.js",
        "React.js"
      ]
    },
    {
      id: 3,
      title: "Google Summer of Code",
      company: '<a href="https://rocket.chat" target="_blank">Rocket.Chat</a>',
      description: 'Shipped a React.js chat component (npm package) which is an easy-to-embed mini-version of Rocket.Chat - <a class="experience-link" href="https://github.com/RocketChat/EmbeddedChat" target="_blank">EmbeddedChat</a> which has reached 50+ stars, 87+ forks and 18+ contributors on GitHub.',
      span: "May 2022 - Sept 2022",
      skills: [
        "JavaScript",
        "TypeScript",
        "React.js",
        "NPM",
        "Rollup",
        "RC API & Fuselage"
      ]
    },
    {
      id: 4,
      title: "React.js SME",
      company: '<a href="https://relevel.com/" target="_blank">Relevel (by Unacademy)</a>',
      description: "React.js Subject Matter Expert - Created questions on React.js and web development for the Relevel platform.",
      span: "Sept 2022 - Nov 2022",
      skills: ["React.js", "HTML"]
    },
    {
      id: 5,
      title: "Software Engineer Intern",
      company: '<a href="https://dragonfruit.ai" target="_blank">Dragonfruit AI</a>',
      description: "At Dragonfruit, I built a folder-like structure to the current 'Views' structure extending its functionality to manage views nicely. I worked on region graphics using pixi.js and added interpoints and drag functionality to map regions as well as spatial filter regions. I wrote cleanup scripts, fixed 20+ tests and made e2e tests 36.06% faster. I changed Insight settings page interface to a modal for consistency and added a search filter dependency model where it checks if the search filter is referenced somewhere and alerts the user for the same if the user wants to delete it. <br/>Apart from my technical meetings, I also attended the product all-hands meetings to better understand the product. Additionally, I had the opportunity for regular meetings with one of the co-founders, where I learned a lot about how startups truly function and make decisions, among other things.",
      span: "Sept 2022 - Dec 2022",
      skills: [
        "React.js",
        "TypeScript",
        "Pixi.js",
        "Cypress",
        "Python",
        "SQLAlchemy",
        "Ant Design",
        "Redux"
      ]
    },
    {
      id: 6,
      title: "Software Engineer Intern",
      company: '<a href="https://memorang.com/" target="_blank">Memorang</a>',
      description: 'I developed an Airtable extension called EdWrite, an internal tool at Memorang, leveraging GPT-3.5/4. It provided study materials to revolutionize education and generated high ARR to the company. I also led frontend refactoring, transitioning to TypeScript and React Native components within Next.js for improved code reusability. I also created <a href="https://studysage.ai" class="experience-link">StudySage.AI</a>, a React Native app with routing, real-time chatting, and file/audio uploads. I implemented audio-to-text transcription from various sources using LangChain and Node.js, generating summaries, key points, flashcards, etc.<br/>I attended daily meetings to discuss progress and plan the next steps. I worked closely with senior engineers to ensure the delivery of a high-quality product. Additionally, I documented all new developments in Confluence and utilized Jira for project management.',
      span: "Jan 2023 - April 2023",
      skills: [
        "Next.js",
        "React Native",
        "React Native Paper",
        "React.js",
        "TypeScript",
        "Node.js",
        "Tiptap.js",
        "Liquid.js",
        "LangChain",
        "GPT-3.5/4",
        "AWS Amplify",
        "fly.io",
        "MUI",
        "Turbo repo",
        "Storybook",
        "GraphQL",
        "Airtable"
      ]
    },
    {
      id: 7,
      title: "Google Summer of Code Mentor",
      company: '<a href="https://rocket.chat" target="_blank">Rocket.Chat</a>',
      description: "I mentored over 30 contributors to help them get started with OSS (open-source software) contributions within Rocket.Chat's ecosystem. This involved organizing regular meetings, assisting with their pull requests (PRs), reviewing their code, and guiding them throughout the process. Currently, I am mentoring a project called EmbeddedChat 2023 for the 2023 GSoC season.",
      span: "Mar 2023 - Present",
      skills: ["Mentorship", "JavaScript", "TypeScript", "React.js"]
    },
    {
      id: 8,
      title: "Founding Software Engineer Intern",
      company: '<a href="https://jugyah.com" target="_blank">Jugyah</a>',
      description: 'At Jugyah, I played a pivotal role in developing <a class="experience-link" href="https://jugyah.com" target="_blank">jugyah.com</a> using React.js and MUI. I created complex React.js components, improved page responsiveness, and designed the Payments architecture using Cashfree Payments. I also developed an internal tool for efficient cluster and property management in Mumbai. Additionally, I implemented powerful map features in the main app, including address auto-fill on marker drag and drop, and retrieval of nearby amenities using the Places API and Distance Matrix API.',
      span: "Mar 2023 - May 2023",
      skills: [
        "React.js",
        "Firebase",
        "MUI",
        "Cashfree Payments",
        "Google Maps API"
      ]
    },
    {
      id: 9,
      title: "LFX mentee at The Open Mainframe Project",
      company: '<a href="https://openmainframeproject.org/">The Open Mainframe Project</a>',
      description: 'Worked on an App Store app for <a href="https://zowe.org" class="experience-link" target="_blank">Zowe&apos;s</a> Virtual Desktop (similar to App Store in Mac or Linux) where users can directly download and install apps from the App Store. To know more about this project, check out <a href="https://dev.to/sidmohanty11/my-lfx-journey-the-zowe-app-store-ui-project-1iao" class="experience-link" target="_blank">this blog post</a>.',
      span: "Jun 2023 - Sept 2023",
      skills: ["React.js", "Angular", "TypeScript", "Node.js", "C"]
    },
    {
      id: 10,
      title: "Open source contributor",
      company: '<a href="https://embedchain.ai" target="_blank">Embedchain</a>',
      description: "At Embedchain, I worked with the core team in improving developer experience as well as customer experience. I added several data loaders like Image, Directory, Discord, Substack etc. that expanded our package to be consumed for a lot of unstructured content. Built the entire deployment pipeline (ec commands) allowing RAG apps to get deployed at scale using any platform (modal.com, render.com, streamlit, gradio etc). I also drove the embedchain integrations with chainlit and streamlit. I also added function calling support for OpenAI LLM and YAML schema validation. I built and published their official docker images which has got over 100+ pulls. Apart from these, I added support for some LLMs and improved their tests from 48% coverage to 77%.",
      span: "Oct 2023 - Dec 2023",
      skills: ["Python", "LLMs", "Docker", "CI/CD", "RAG"]
    },
    {
      id: 11,
      title: "Software Engineer Intern",
      company: '<a href="https://builder.io/" target="_blank">Builder.io</a>',
      description: "Contributed to key Builder.io projects including Builder SDKs (6K+ stars), Qwik.js (20K+ stars), and Mitosis (10K+ stars). Migrated the docs site from Next.js to Qwik.js achieving perfect lighthouse scores. Built accelerate.builder.io launch site with 30K+ impressions and 2500+ registers. Implemented critical Builder blocks in gen2 SDKs using Mitosis, increasing partner adoption by 20%.",
      span: "Nov 2023 - March 2024",
      skills: [
        "React.js",
        "Qwik",
        "TypeScript",
        "Node.js",
        "Mitosis",
        "Builder SDK",
        "Next.js"
      ]
    },
    {
      id: 12,
      title: "Software Engineer",
      company: '<a href="https://builder.io/" target="_blank">Builder.io</a>',
      description: "Working on some world class level software.",
      span: "Apr 2024 - present",
      skills: [
        "React.js",
        "Qwik",
        "TypeScript",
        "Node.js",
        "Mitosis",
        "Builder SDK"
      ]
    }
  ].reverse();
  (/* @__PURE__ */ new Date()).getFullYear();
  new Set(
    exp.map((e) => e.company.replace(/<[^>]*>/g, ""))
  ).size;
  const allSkills = exp.flatMap((e) => e.skills || []);
  new Set(allSkills).size;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Experiences | Sidharth Mohanty", "description": "Welcome to my page - Sid : )", "data-astro-cid-y44ujqi6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="experiences-hero" data-astro-cid-y44ujqi6> <div class="hero-content" data-astro-cid-y44ujqi6> <h1 class="hero-title" data-astro-cid-y44ujqi6>Professional Journey</h1> <div class="hero-subtitle-container" data-astro-cid-y44ujqi6> <div class="subtitle-line" data-astro-cid-y44ujqi6></div> <p class="hero-subtitle" data-astro-cid-y44ujqi6>Stay Hungry, Stay Curious</p> <div class="subtitle-line" data-astro-cid-y44ujqi6></div> </div> <p class="hero-description" data-astro-cid-y44ujqi6>
In my years in college, I've had the privilege of working with some
        amazing people and organizations, both startups and open source. These
        experiences have given me valuable insights into the software industry
        and shaped my perspective on building impactful solutions.
</p> <div class="experience-badge" data-astro-cid-y44ujqi6> <span class="badge-text" data-astro-cid-y44ujqi6>3+ Years of Professional Experience</span> </div> </div> </section> <section class="experiences-timeline" data-astro-cid-y44ujqi6> <div class="timeline-header" data-astro-cid-y44ujqi6> <h2 class="timeline-title" data-astro-cid-y44ujqi6>Career Timeline</h2> <div class="timeline-line" data-astro-cid-y44ujqi6></div> </div> <div class="timeline-container" data-astro-cid-y44ujqi6> <div class="timeline-spine" data-astro-cid-y44ujqi6></div> ${exp.map((experience, index) => renderTemplate`${renderComponent($$result2, "Experience", $$Experience, { "experience": experience, "index": index, "data-astro-cid-y44ujqi6": true })}`)} </div> <div class="timeline-footer" data-astro-cid-y44ujqi6> <div class="footer-content" data-astro-cid-y44ujqi6> <p class="footer-text" data-astro-cid-y44ujqi6>
This journey continues as I explore new technologies, tackle
          challenging problems, and contribute to meaningful projects that make
          a difference.
</p> <div class="footer-cta" data-astro-cid-y44ujqi6> <a href="/story" class="cta-link" data-astro-cid-y44ujqi6> <span data-astro-cid-y44ujqi6>Read My Story</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-y44ujqi6> <path d="m9 18 6-6-6-6" data-astro-cid-y44ujqi6></path> </svg> </a> </div> </div> </div> </section> ` })} `;
}, "/Users/bharath/Desktop/backend_projects/portfolio/src/pages/experiences.astro", void 0);

const $$file = "/Users/bharath/Desktop/backend_projects/portfolio/src/pages/experiences.astro";
const $$url = "/experiences";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Experiences,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

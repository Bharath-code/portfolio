/* empty css                                 */
import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_Cf9Qz-m3.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BoYHI8Vx.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://sidharthmohanty.com");
const $$Blog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const { blog, index = 0 } = Astro2.props;
  const publishedDate = new Date(blog.published_at || Date.now());
  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${maybeRenderHead()}<article class="blog-card"${addAttribute(index, "data-index")} data-astro-cid-b4mpjmb3> <div class="card-header" data-astro-cid-b4mpjmb3> <div class="card-number" data-astro-cid-b4mpjmb3>${String(index + 1).padStart(2, "0")}</div> <div class="card-date" data-astro-cid-b4mpjmb3>${formattedDate}</div> </div> <div class="card-content" data-astro-cid-b4mpjmb3> <a${addAttribute(blog.canonical_url, "href")} target="_blank" rel="noopener noreferrer" class="card-link" data-astro-cid-b4mpjmb3> <h3 class="card-title" data-astro-cid-b4mpjmb3>${blog.title}</h3> <p class="card-description" data-astro-cid-b4mpjmb3>${blog.description}</p> </a> ${blog.tag_list && blog.tag_list.length > 0 && renderTemplate`<div class="card-tags" data-astro-cid-b4mpjmb3> ${blog.tag_list.slice(0, 3).map((tag) => renderTemplate`<span class="tag" data-astro-cid-b4mpjmb3>${tag}</span>`)} </div>`} </div> <div class="card-footer" data-astro-cid-b4mpjmb3> <div class="card-stats" data-astro-cid-b4mpjmb3> <div class="stat-item" data-astro-cid-b4mpjmb3> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="stat-icon" data-astro-cid-b4mpjmb3> <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" data-astro-cid-b4mpjmb3></path> </svg> <span class="stat-value" data-astro-cid-b4mpjmb3>${blog.public_reactions_count}</span> </div> <div class="stat-divider" data-astro-cid-b4mpjmb3></div> <div class="stat-item" data-astro-cid-b4mpjmb3> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="stat-icon" data-astro-cid-b4mpjmb3> <circle cx="12" cy="12" r="10" data-astro-cid-b4mpjmb3></circle> <polyline points="12,6 12,12 16,14" data-astro-cid-b4mpjmb3></polyline> </svg> <span class="stat-value" data-astro-cid-b4mpjmb3>${blog.reading_time_minutes} min</span> </div> </div> <a${addAttribute(blog.canonical_url, "href")} target="_blank" rel="noopener noreferrer" class="read-more" aria-label="Read full article" data-astro-cid-b4mpjmb3> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-b4mpjmb3> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" data-astro-cid-b4mpjmb3></path> <polyline points="15,3 21,3 21,9" data-astro-cid-b4mpjmb3></polyline> <line x1="10" y1="14" x2="21" y2="3" data-astro-cid-b4mpjmb3></line> </svg> </a> </div> </article> `;
}, "/Users/bharath/Desktop/backend_projects/portfolio/src/components/Blog.astro", void 0);

const $$Blogs = createComponent(async ($$result, $$props, $$slots) => {
  const blogs = await fetch(
    "https://dev.to/api/articles?username=sidmohanty11"
  ).then((res) => res.json());
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blogs | Sidharth Mohanty", "description": "Welcome to my page - Sid : )", "data-astro-cid-zb2vaeus": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="blogs-hero" data-astro-cid-zb2vaeus> <div class="hero-content" data-astro-cid-zb2vaeus> <h1 class="hero-title" data-astro-cid-zb2vaeus>Writing & Insights</h1> <div class="hero-subtitle-container" data-astro-cid-zb2vaeus> <div class="subtitle-line" data-astro-cid-zb2vaeus></div> <p class="hero-subtitle" data-astro-cid-zb2vaeus>
Thoughts on Technology, Development & Innovation
</p> <div class="subtitle-line" data-astro-cid-zb2vaeus></div> </div> <p class="hero-description" data-astro-cid-zb2vaeus>
I believe writing is a great way to share knowledge, dive deeper into
        specific topics and gain insights. Here you'll find articles about the
        technologies I work with, the problems I solve, and the lessons I learn
        along my journey as a software engineer.
</p> <div class="blog-stats" data-astro-cid-zb2vaeus> <div class="stat-item" data-astro-cid-zb2vaeus> <span class="stat-number" data-astro-cid-zb2vaeus>${blogs.length}</span> <span class="stat-label" data-astro-cid-zb2vaeus>Published Articles</span> </div> <div class="stat-divider" data-astro-cid-zb2vaeus></div> <div class="stat-item" data-astro-cid-zb2vaeus> <span class="stat-number" data-astro-cid-zb2vaeus>${blogs.reduce((acc, blog) => acc + blog.public_reactions_count, 0)}</span> <span class="stat-label" data-astro-cid-zb2vaeus>Total Reactions</span> </div> <div class="stat-divider" data-astro-cid-zb2vaeus></div> <div class="stat-item" data-astro-cid-zb2vaeus> <span class="stat-number" data-astro-cid-zb2vaeus>${blogs.reduce((acc, blog) => acc + blog.reading_time_minutes, 0)}</span> <span class="stat-label" data-astro-cid-zb2vaeus>Minutes of Content</span> </div> </div> </div> </section> <section class="blogs-grid" data-astro-cid-zb2vaeus> <div class="grid-header" data-astro-cid-zb2vaeus> <h2 class="grid-title" data-astro-cid-zb2vaeus>Latest Articles</h2> <div class="grid-line" data-astro-cid-zb2vaeus></div> </div> <div class="articles-container" data-astro-cid-zb2vaeus> ${blogs.map((blog, index) => renderTemplate`${renderComponent($$result2, "Blog", $$Blog, { "blog": blog, "index": index, "data-astro-cid-zb2vaeus": true })}`)} </div> <div class="external-link-container" data-astro-cid-zb2vaeus> <a href="https://dev.to/sidmohanty11" target="_blank" rel="noopener noreferrer" class="external-link" data-astro-cid-zb2vaeus> <span data-astro-cid-zb2vaeus>View All Articles on Dev.to</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" data-astro-cid-zb2vaeus> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" data-astro-cid-zb2vaeus></path> <polyline points="15,3 21,3 21,9" data-astro-cid-zb2vaeus></polyline> <line x1="10" y1="14" x2="21" y2="3" data-astro-cid-zb2vaeus></line> </svg> </a> </div> </section> ` })} `;
}, "/Users/bharath/Desktop/backend_projects/portfolio/src/pages/blogs.astro", void 0);

const $$file = "/Users/bharath/Desktop/backend_projects/portfolio/src/pages/blogs.astro";
const $$url = "/blogs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blogs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

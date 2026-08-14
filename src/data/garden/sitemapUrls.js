/**
 * Build absolute sitemap URL list from known static pages + content markdown.
 * Used by scripts/generate-sitemap.mjs at build time → public/sitemap.xml.
 */
import fs from "fs";
import path from "path";
import { SITE_ORIGIN } from "@/utils/seo";

const STATIC_PATHS = [
  "/",
  "/digital-garden",
  "/digital-garden/notes",
  "/blog",
  "/digital-garden/books",
  "/digital-garden/stories",
  "/digital-garden/poems",
  "/digital-garden/films",
  "/digital-garden/experience",
  "/digital-garden/daily-updates",
  "/digital-garden/testimonials",
  "/tech",
  "/travel",
];

/** Content folders → public URL prefix */
const CONTENT_ROUTE_MAP = [
  { dir: "src/content/blog", prefix: "/blog" },
  { dir: "src/content/stories", prefix: "/blog" },
  { dir: "src/content/experience", prefix: "/blog" },
  { dir: "src/content/js-snippets", prefix: "/blog" },
  { dir: "src/content/node-js-procodrr", prefix: "/blog" },
  { dir: "src/content/front-end-design-system", prefix: "/blog" },
  { dir: "src/content/notes-namaste-node-js", prefix: "/blog" },
  {
    dir: "src/content/notes-namaste-node-js",
    prefix: "/digital-garden/notes/namaste-node-js",
  },
  {
    dir: "src/content/front-end-design-system",
    prefix: "/digital-garden/notes/front-end-design-system",
  },
  {
    dir: "src/content/js-snippets",
    prefix: "/digital-garden/notes/javascript-snippets",
  },
  {
    dir: "src/content/node-js-procodrr",
    prefix: "/digital-garden/notes/backend-with-nodejs-by-procoderr-notes",
  },
  {
    dir: "src/content/ydkjs",
    prefix: "/digital-garden/notes/ydkjs",
  },
  { dir: "src/content/books", prefix: "/digital-garden/books" },
  { dir: "src/content/stories", prefix: "/digital-garden/stories" },
  { dir: "src/content/poems", prefix: "/digital-garden/poems" },
  { dir: "src/content/films", prefix: "/digital-garden/films" },
  { dir: "src/content/experience", prefix: "/digital-garden/experience" },
  { dir: "src/content/daily-updates", prefix: "/digital-garden/daily-updates" },
  { dir: "src/content/testimonials", prefix: "/digital-garden/testimonials" },
];

function listMarkdownSlugs(relDir, cwd) {
  const dir = path.join(cwd, relDir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function collectSitemapUrls(cwd = process.cwd()) {
  const urls = new Set();

  for (const p of STATIC_PATHS) {
    urls.add(`${SITE_ORIGIN}${p === "/" ? "" : p}` || SITE_ORIGIN);
  }
  // Ensure homepage exact
  urls.add(SITE_ORIGIN);
  urls.add(`${SITE_ORIGIN}/`);

  for (const { dir, prefix } of CONTENT_ROUTE_MAP) {
    for (const slug of listMarkdownSlugs(dir, cwd)) {
      urls.add(`${SITE_ORIGIN}${prefix}/${slug}`);
    }
  }

  // Normalize trailing slash duplicates → prefer no trailing slash except origin
  const normalized = [...urls].map((u) => {
    if (u === `${SITE_ORIGIN}/`) return SITE_ORIGIN;
    return u.replace(/\/$/, "");
  });

  return [...new Set(normalized)].sort();
}

export function buildSitemapXml(urls = []) {
  const today = new Date().toISOString().slice(0, 10);
  const body = urls
    .map(
      (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${loc === SITE_ORIGIN || loc.endsWith("/digital-garden") ? "1.0" : "0.7"}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

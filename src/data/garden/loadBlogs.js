/**
 * Load markdown posts for Digital Garden “Fresh From The Garden”.
 * Same content pool as /blog so the section draws from all blogs.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { firstMarkdownImage, gardenDateValue } from "./utils";

/** Mirrors contentFolders in src/pages/blog/index.jsx */
const BLOG_CONTENT_FOLDERS = {
  blog: "src/content/blog",
  experience: "src/content/experience",
  jsSnippets: "src/content/js-snippets",
  nodejsProcodrr: "src/content/node-js-procodrr",
  fsd: "src/content/front-end-design-system",
  nodejsS1AkshaySaini: "src/content/notes-namaste-node-js",
  namasteAiNotes: "src/content/namaste-ai-notes",
  ydkjs: "src/content/ydkjs",
  stories: "src/content/stories",
};

const FOLDER_FALLBACK_THUMB = {
  namasteAiNotes: "https://i.ibb.co/tPxsbB30/namaste-ai-43-abnner.png",
  nodejsS1AkshaySaini: "https://i.ibb.co/Vcd6T4LL/node-js-4-3.png",
  fsd: "https://i.ibb.co/k2sYDMkq/fsd-4-4-banner.png",
  ydkjs: "https://i.ibb.co/8gktfjjD/ydkjs-4-3.png",
  nodejsProcodrr: "https://i.ibb.co/21hbR3Xp/procdrr-4-3.jpg",
};

function resolveThumb(frontMatter, content, folder) {
  const fromMeta = String(frontMatter?.thumbnail || "").trim();
  if (fromMeta) return fromMeta.replace("/public", "");
  const fromBody = firstMarkdownImage(content);
  if (fromBody) return fromBody;
  return FOLDER_FALLBACK_THUMB[folder] || "";
}

/**
 * Read all blog markdown files from the /blog content pool.
 * Sorted newest-first by publishedOn / date.
 */
export function loadAllGardenBlogs(cwd = process.cwd()) {
  const blogs = [];

  for (const [folder, rel] of Object.entries(BLOG_CONTENT_FOLDERS)) {
    const dir = path.join(cwd, rel);
    if (!fs.existsSync(dir)) continue;
    fs.readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .forEach((filename) => {
        const fileContent = fs.readFileSync(path.join(dir, filename), "utf-8");
        const { data: frontMatter, content } = matter(fileContent);
        blogs.push({
          frontMatter: {
            ...frontMatter,
            thumbnail: resolveThumb(frontMatter, content, folder),
          },
          slug: filename.replace(".md", ""),
          folder,
          source: rel,
        });
      });
  }

  return blogs.sort((a, b) => {
    const da = gardenDateValue(
      a.frontMatter?.publishedOn || a.frontMatter?.date
    );
    const db = gardenDateValue(
      b.frontMatter?.publishedOn || b.frontMatter?.date
    );
    return db - da;
  });
}

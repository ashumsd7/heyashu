import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** Front matter + slug only — for notes sidebars (avoids shipping full markdown in page props). */
export function loadNotesMetaFromDir(directory) {
  const filenames = fs.readdirSync(directory).filter((f) => f.endsWith(".md"));
  return filenames.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(directory, filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(fileContent);
    return { frontMatter, slug: filename.replace(".md", "") };
  });
}

export function loadNotesStaticPaths(contentSubdir) {
  const directory = path.join(process.cwd(), "src/content", contentSubdir);
  const filenames = fs.readdirSync(directory).filter((f) => f.endsWith(".md"));
  return {
    paths: filenames.map((filename) => ({
      params: { slug: filename.replace(/\.md$/, "") },
    })),
    fallback: false,
  };
}

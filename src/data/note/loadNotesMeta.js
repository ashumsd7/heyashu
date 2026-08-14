import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** Front matter + slug only — for notes sidebars (avoids shipping full markdown in page props). */
export function loadNotesMetaFromDir(directory) {
  const filenames = fs.readdirSync(directory);
  return filenames.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join(directory, filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(fileContent);
    return { frontMatter, slug: filename.replace(".md", "") };
  });
}

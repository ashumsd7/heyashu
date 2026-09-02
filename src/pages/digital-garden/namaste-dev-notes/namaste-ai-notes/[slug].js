import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import NamasteDevNoteReader from "@/components/garden/NamasteDevNoteReader";
import {
  loadNotesMetaFromDir,
  loadNotesStaticPaths,
} from "@/data/note/loadNotesMeta";
import { resolveLocalImageSrc } from "@/utils/publicImage";

const CONTENT_DIR = "namaste-ai-notes";

export default function NamasteAiDevNotesPage(props) {
  return <NamasteDevNoteReader {...props} />;
}

export async function getStaticPaths() {
  return loadNotesStaticPaths(CONTENT_DIR);
}

export async function getStaticProps({ params }) {
  const directory = path.join(process.cwd(), "src/content", CONTENT_DIR);
  const filePath = path.join(directory, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);

  if (data.thumbnail) {
    data.thumbnail = resolveLocalImageSrc(data.thumbnail, {
      collection: CONTENT_DIR,
    });
  }

  const mdxSource = await serialize(content, {
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });

  const notes = loadNotesMetaFromDir(directory);

  return {
    props: {
      notes,
      currentPageFrontMatter: data,
      currentPageMDX: mdxSource,
      currentSlug: params.slug,
    },
  };
}

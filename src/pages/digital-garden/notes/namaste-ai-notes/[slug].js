import React, { useMemo } from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import { metaTagsForNamasteAI } from "@/data/note/namaste-ai-notes/meta-tags";
import rehypeHighlight from "rehype-highlight";
import {
  CONTENT_LIST_TITLE,
  PAGE_TITLE,
  STORAGE_KEY,
} from "@/data/note/namaste-ai-notes/constant";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import AIQuestionWrapper from "@/components/garden/AIQuestionWrapper";
import { buildNotesSidebarList } from "@/data/note/sidebarList";
import {
  loadNotesMetaFromDir,
  loadNotesStaticPaths,
} from "@/data/note/loadNotesMeta";

const NotesDetailPage = ({ notes, currentPageMDX, currentPageFrontMatter }) => {
  const contentList = useMemo(() => buildNotesSidebarList(notes), [notes]);

  return (
    <>
      <NotesMainPage
        shareImageEmbed="https://i.ibb.co/tPxsbB30/namaste-ai-43-abnner.png"
        metaInfo={metaTagsForNamasteAI}
        pageTitle={PAGE_TITLE}
        contentList={contentList}
        contentListLength={notes?.length}
        contentListTitle={CONTENT_LIST_TITLE}
        storageKey={STORAGE_KEY}
        msxSource={currentPageMDX}
        subDomain="namaste-ai-notes"
        eachCardPrefix="Episode-"
        currentPageFrontMatter={currentPageFrontMatter}
      />
      <AIQuestionWrapper />
    </>
  );
};

export default NotesDetailPage;

export async function getStaticPaths() {
  return loadNotesStaticPaths("namaste-ai-notes");
}

export async function getStaticProps({ params }) {
  const directory = path.join(process.cwd(), "src/content/namaste-ai-notes");
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "namaste-ai-notes",
    `${params.slug}.md`
  );
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content, {
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });
  const notes = loadNotesMetaFromDir(directory);

  return {
    props: {
      notes,
      currentPageFrontMatter: data,
      currentPageMDX: mdxSource,
    },
  };
}

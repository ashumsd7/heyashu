import React, { useMemo } from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import { metaTagsForJsSnippets } from "@/data/note/js-snippets/meta-tags";
import {
  CONTENT_LIST_TITLE,
  PAGE_TITLE,
  STORAGE_KEY,
} from "@/data/note/js-snippets/constant";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import AIQuestionWrapper from "@/components/garden/AIQuestionWrapper";
import { buildNotesSidebarList } from "@/data/note/sidebarList";
import { loadNotesMetaFromDir } from "@/data/note/loadNotesMeta";

const NotesDetailPageForSnippets = ({
  notes,
  currentPageMDX,
  currentPageFrontMatter,
}) => {
  const contentList = useMemo(() => buildNotesSidebarList(notes), [notes]);

  return (
    <>

    <NotesMainPage
      metaInfo={metaTagsForJsSnippets}
      shareImageEmbed={"https://i.ibb.co/CQx2hh5/JS-SNIPPETS-thumbnails.jpg"}
      pageTitle={PAGE_TITLE}
      contentList={contentList}
      contentListLength={notes?.length}
      contentListTitle={CONTENT_LIST_TITLE}
      storageKey={STORAGE_KEY}
      msxSource={currentPageMDX}
      subDomain="javascript-snippets"
      currentPageFrontMatter={currentPageFrontMatter}
    />
    <AIQuestionWrapper/>
    </>
  );
};
export default NotesDetailPageForSnippets;

export async function getServerSideProps({ params }) {
  const directory = path.join(process.cwd(), "src/content/js-snippets");
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "js-snippets",
    `${params.slug}.md`
  );
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);
  const notes = loadNotesMetaFromDir(directory);

  return {
    props: {
      notes,
      currentPageFrontMatter: data,
      currentPageMDX: mdxSource,
    },
  };
}

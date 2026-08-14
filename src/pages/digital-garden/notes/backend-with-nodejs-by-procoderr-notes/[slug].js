import React, { useMemo } from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import {
  CONTENT_LIST_TITLE,
  PAGE_TITLE,
  STORAGE_KEY,
} from "@/data/note/procderr-nodejs/constant";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { metaTagsForProcoderrNodejs } from "@/data/note/procderr-nodejs/meta-tags";
import AIQuestionWrapper from "@/components/garden/AIQuestionWrapper";
import { buildNotesSidebarList } from "@/data/note/sidebarList";
import { loadNotesMetaFromDir } from "@/data/note/loadNotesMeta";

const NotesDetailPage = ({ notes, currentPageMDX, currentPageFrontMatter }) => {
  const contentList = useMemo(() => buildNotesSidebarList(notes), [notes]);

  return (
    <>
      <NotesMainPage
        metaInfo={metaTagsForProcoderrNodejs}
        shareImageEmbed={"https://i.ibb.co/YfXTkhk/procoderr-thumbnails.jpg"}
        pageTitle={PAGE_TITLE}
        contentList={contentList}
        contentListLength={notes?.length}
        contentListTitle={CONTENT_LIST_TITLE}
        storageKey={STORAGE_KEY}
        msxSource={currentPageMDX}
        eachCardPrefix={"Episode-"}
        subDomain="backend-with-nodejs-by-procoderr-notes"
        currentPageFrontMatter={currentPageFrontMatter}
      />
      <AIQuestionWrapper />
    </>
  );
};
export default NotesDetailPage;

export async function getServerSideProps({ params }) {
  const directory = path.join(process.cwd(), "src/content/node-js-procodrr");

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "node-js-procodrr",
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


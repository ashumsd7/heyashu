import React, { useMemo } from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import { metaTagsForDesignSystemNotes  } from "@/data/note/front-end-design-system/meta-tags";
import {
  CONTENT_LIST_TITLE,
  PAGE_TITLE,
  STORAGE_KEY,
} from "@/data/note/front-end-design-system/constant";
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
      metaInfo={metaTagsForDesignSystemNotes}
      shareImageEmbed={"https://i.ibb.co/T29pVbs/fds-thumbnail.jpg"}
      pageTitle={PAGE_TITLE}
      contentList={contentList}
      contentListLength={notes?.length}
      contentListTitle={CONTENT_LIST_TITLE}
      storageKey={STORAGE_KEY}
      msxSource={currentPageMDX}
      eachCardPrefix={"Episode-"}
      subDomain="front-end-design-system"
      currentPageFrontMatter={currentPageFrontMatter}
    />
      <AIQuestionWrapper/>
    </>
  );
};
export default NotesDetailPageForSnippets;

// generating static props
export async function getStaticProps({ params }) {
  const directory = path.join(process.cwd(), "src/content/front-end-design-system");
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "front-end-design-system",
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
// generating static paths
export async function getStaticPaths() {
  const files = fs.readdirSync(
    path.join(process.cwd(), "src", "content", "front-end-design-system")
  );

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

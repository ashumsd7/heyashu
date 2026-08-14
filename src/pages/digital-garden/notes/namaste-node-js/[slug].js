import React, { useMemo } from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import { metaTagsForNamasteNodeJsS1 } from "@/data/note/namaste-node-js-s1/meta-tags";
import rehypeHighlight from "rehype-highlight";
import {
  CONTENT_LIST_TITLE,
  PAGE_TITLE,
  STORAGE_KEY,
} from "@/data/note/namaste-node-js-s1/constant";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import AIQuestionWrapper from "@/components/garden/AIQuestionWrapper";
import { buildNotesSidebarList } from "@/data/note/sidebarList";
import { loadNotesMetaFromDir } from "@/data/note/loadNotesMeta";

const NotesDetailPage = ({ notes, currentPageMDX, currentPageFrontMatter }) => {
  const contentList = useMemo(
    () =>
      buildNotesSidebarList(
        notes.filter((item) => item?.frontMatter?.seasonNumber != 2)
      ),
    [notes]
  );
  const season2contentList = useMemo(
    () =>
      buildNotesSidebarList(
        notes.filter((item) => item?.frontMatter?.seasonNumber == 2)
      ),
    [notes]
  );

  return (
    <>
      <NotesMainPage
        shareImageEmbed={"https://i.ibb.co/qkt9djj/Namste-node-js-thumbnails.jpg"}
        metaInfo={metaTagsForNamasteNodeJsS1}
        pageTitle={PAGE_TITLE}
        contentList={contentList}
        season2Data={season2contentList}
        contentListLength={notes?.length}
        contentListTitle={CONTENT_LIST_TITLE}
        storageKey={STORAGE_KEY}
        msxSource={currentPageMDX}
        eachCardPrefix={"Episode-"}
        currentPageFrontMatter={currentPageFrontMatter}
        show2ndSection={true}
        isAnalysisPageOn={"/digital-garden/notes/namaste-node-js/analysis"}
      />
      <AIQuestionWrapper/>
    </>
  );
};
export default NotesDetailPage;

export async function getServerSideProps({ params }) {
  // Define the directory containing your markdown files
  const directory = path.join(
    process.cwd(),
    "src/content/notes-namaste-node-js"
  );

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "notes-namaste-node-js",
    `${params.slug}.md`
  );
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  // const mdxSource = await serialize(content);
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

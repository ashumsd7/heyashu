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
import { buildNotesSidebarList } from "@/data/note/sidebarList";
import { loadNotesMetaFromDir } from "@/data/note/loadNotesMeta";

const NotesDetailPage = ({ notes, currentPageMDX, currentPageFrontMatter }) => {
  const contentList = useMemo(() => buildNotesSidebarList(notes), [notes]);

  return (
    <>

      <NotesMainPage
        metaInfo={metaTagsForNamasteNodeJsS1}
        pageTitle={PAGE_TITLE}
        contentList={contentList}
        contentListLength={notes?.length}
        contentListTitle={CONTENT_LIST_TITLE}
        storageKey={STORAGE_KEY}
        msxSource={currentPageMDX}
        eachCardPrefix={"Episode-"}
        currentPageFrontMatter={currentPageFrontMatter}
      />
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

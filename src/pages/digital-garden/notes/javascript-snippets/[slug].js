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

// generating static props
export async function getStaticProps({ params }) {
  const directory = path.join(process.cwd(), "src/content/js-snippets");
  const filenames = fs.readdirSync(directory);
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
  const notes = filenames.map((filename) => {
    // Read markdown file as string
    const fileContent = fs.readFileSync(
      path.join(directory, filename),
      "utf-8"
    );

    const { data: frontMatter, content } = matter(fileContent);

    return {
      frontMatter,
      content,
      slug: filename.replace(".md", ""),
    };
  });

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
    path.join(process.cwd(), "src", "content", "js-snippets")
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

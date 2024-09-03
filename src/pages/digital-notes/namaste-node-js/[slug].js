import React from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import { matchingMDXForNamasteNodeJsS1 } from "@/data/note/namaste-node-js-s1/markdown-config";
import { contentListForNamasteNodeJsS1 } from "@/data/note/namaste-node-js-s1/content-list";
import { metaTagsForNamasteNodeJsS1 } from "@/data/note/namaste-node-js-s1/meta-tags";
import { CONTENT_LIST_TITLE, PAGE_TITLE, STORAGE_KEY } from "@/data/note/namaste-node-js-s1/constant";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

const NotesDetailPage = ({notes}) => {

  console.log("notes",notes);

  return (
    <NotesMainPage
      matchingMDXConfig={matchingMDXForNamasteNodeJsS1}
      metaInfo={metaTagsForNamasteNodeJsS1}
      pageTitle={PAGE_TITLE}
      contentList={contentListForNamasteNodeJsS1}
      contentListTitle={CONTENT_LIST_TITLE}
      storageKey={STORAGE_KEY}
      eachCardPrefix={'Episode-'}
    />
  );

};
export default NotesDetailPage;


export async function getStaticProps() {
  // Define the directory containing your markdown files
  const directory = path.join(process.cwd(), "src/content/blog");

  // Get file names from the directory
  const filenames = fs.readdirSync(directory);

  // Loop through each file and read its content and metadata
  const notes = filenames.map((filename) => {
    // Read markdown file as string
    const fileContent = fs.readFileSync(
      path.join(directory, filename),
      "utf-8"
    );

    // Parse the markdown content and extract front matter
    const { data: frontMatter, content } = matter(fileContent);


    return {
      frontMatter,
      content,
      slug: filename.replace(".md", ""),
    };
  });

  // Return the posts as props
  return {
    props: {
      notes,
    },
  };
}


export async function getStaticPaths() {
  const files = fs.readdirSync(
    path.join(process.cwd(), "src", "content", "blog")
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
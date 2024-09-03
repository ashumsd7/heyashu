import React from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import { matchingMDXForNamasteNodeJsS1 } from "@/data/note/namaste-node-js-s1/markdown-config";
// import { contentListForNamasteNodeJsS1 } from "@/data/note/namaste-node-js-s1/content-list";
import { metaTagsForNamasteNodeJsS1 } from "@/data/note/namaste-node-js-s1/meta-tags";
import {
  CONTENT_LIST_TITLE,
  PAGE_TITLE,
  STORAGE_KEY,
} from "@/data/note/namaste-node-js-s1/constant";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { useState } from "react";
import { useEffect } from "react";
import { serialize } from "next-mdx-remote/serialize";

const NotesDetailPage = ({ notes, currentPageFrontMatter, currentPageMDX }) => {
  const [contentList, setContentList] = useState([]);

  console.log("notes", notes);
  console.log("currentPageFrontMatter", currentPageFrontMatter);
  console.log("currentPageMDX", currentPageMDX);

  function generateContentListFromData() {
    const list = notes.map((item, index) => ({
      id: item.frontMatter.episode || index, // Use episode number or fallback to index
      episode: item.frontMatter.episode,
      title: item.frontMatter.title || item.frontMatter.name, // Use title if available, otherwise use name
      profilePic: item.frontMatter.profilePic,
      followLink: item.frontMatter.followLink,
      author: item.frontMatter.author,
      tags: item.frontMatter.tags,
      name: item.frontMatter.name,
      updatedOn: item.frontMatter.updatedOn,
      thumbnail: item.frontMatter.thumbnail,
      publishedOn: item.frontMatter.publishedOn || "Coming Soon", // Default to 'Coming Soon' if not available
    }));
    console.log("arr", list);
    setContentList(list);
  }
  useEffect(() => {
    generateContentListFromData();
  }, []);

  return (
    <NotesMainPage
      matchingMDXConfig={matchingMDXForNamasteNodeJsS1}
      metaInfo={metaTagsForNamasteNodeJsS1}
      pageTitle={PAGE_TITLE}
      contentList={contentList}
      contentListTitle={CONTENT_LIST_TITLE}
      storageKey={STORAGE_KEY}
      msxSource={currentPageMDX}
      eachCardPrefix={"Episode-"}
    />
  );
};
export default NotesDetailPage;

export async function getStaticProps({ params }) {
  // Define the directory containing your markdown files
  // fetchign all files
  const directory = path.join(
    process.cwd(),
    "src/content/notes-namaste-node-js"
  );

  // Get file names from the directory
  const filenames = fs.readdirSync(directory);

  // for selected slug : specific page
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "notes-namaste-node-js",
    `${params.slug}.md`
  );
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

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
      currentPageFrontMatter: data,
      currentPageMDX: mdxSource,
    },
  };
}

// export async function getStaticProps({ params }) {
//   const filePath = path.join(
//     process.cwd(),
//     "src",
//     "content",
//     "blog",
//     `${params.slug}.md`
//   );
//   const fileContents = fs.readFileSync(filePath, "utf-8");

//   const { data, content } = matter(fileContents);
//   const mdxSource = await serialize(content);

//   return {
//     props: {
//       frontMatter: data,
//       mdxSource,
//     },
//   };
// }

export async function getStaticPaths() {
  const files = fs.readdirSync(
    path.join(process.cwd(), "src", "content", "notes-namaste-node-js")
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

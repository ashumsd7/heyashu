import React from "react";
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
import { useState } from "react";
import { useEffect } from "react";
import { serialize } from "next-mdx-remote/serialize";
import AIQuestionWrapper from "@/components/garden/AIQuestionWrapper";

const NotesDetailPageForSnippets = ({
  notes,
  currentPageMDX,
  currentPageFrontMatter,
}) => {
  const [contentList, setContentList] = useState([]);

  // for sorting content episode wise
  function sortByEpisode(array) {
    return array.sort((a, b) => a.episode - b.episode);
  }

  // generate sidebar and content of list
  function generateContentListFromData() {

    const s2List=[]
    const list = notes.map((item, index) => {

       
      return {
        id: item.frontMatter.episode || index, // Use episode number or fallback to index
        episode: item.frontMatter.episode,
        title: item.frontMatter.title || item.frontMatter.name, // Use title if available, otherwise use name
        profilePic: item.frontMatter?.profilePic,
        followLink: item.frontMatter.followLink,
        author: item.frontMatter.author,
        tags: item.frontMatter.tags,
        name: item.frontMatter.name,
        updatedOn: item.frontMatter.updatedOn,
        thumbnail: item.frontMatter.thumbnail,
        publishedOn: item.frontMatter.publishedOn || "Seeding Soon", // Default to 'Coming Soon' if not available
      }
    });

    const sortedList = sortByEpisode(list);
    setContentList(sortedList);
  }

  useEffect(() => {
    generateContentListFromData();
  }, []);

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
  const filenames = fs.readdirSync(directory);
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

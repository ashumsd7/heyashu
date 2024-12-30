import React from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import { metaTagsForYDKJS } from "@/data/note/ydkjs/meta-tags";
import rehypeHighlight from "rehype-highlight";
import {
  CONTENT_LIST_TITLE,
  PAGE_TITLE,
  STORAGE_KEY,
} from "@/data/note/ydkjs/constant";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { useState } from "react";
import { useEffect } from "react";
import { serialize } from "next-mdx-remote/serialize";

const NotesDetailPage = ({ notes, currentPageMDX, currentPageFrontMatter }) => {
  const [contentList, setContentList] = useState([]);
  const [season2contentList, setSeason2contentList] = useState([]);

  // for sorting content episode wise
  function sortByEpisode(array) {
    return array.sort((a, b) => a.episode - b.episode);
  }

  // generate sidebar and content of list
  function generateContentListFromData() {
    const s2List = [];
    const s1List = [];
    const list = notes.map((item, index) => {


      const resObj = {
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
      };
      if (item?.frontMatter?.seasonNumber == 2) {
        s2List.push(resObj);
      } else {
        s1List.push(resObj);
      }
      return resObj;
    });



    const sortedListS1 = sortByEpisode(s1List);
    const sortedListS2 = sortByEpisode(s2List);
    setContentList(sortedListS1);
    setSeason2contentList(sortedListS2);
  }

  useEffect(() => {
    generateContentListFromData();
  }, []);

  return (
    <>
      <NotesMainPage
        shareImageEmbed={"https://i.ibb.co/yqVnGxt/namaste-node-logo.jpg"}
        metaInfo={metaTagsForYDKJS}
        pageTitle={PAGE_TITLE}
        contentList={contentList}
        contentListLength={notes?.length}
        contentListTitle={CONTENT_LIST_TITLE}
        storageKey={STORAGE_KEY}
        msxSource={currentPageMDX}
        subDomain={"ydkjs"}
        eachCardPrefix={"Book-"}
        currentPageFrontMatter={currentPageFrontMatter}
      />
    </>
  );
};
export default NotesDetailPage;

// generating static props
export async function getStaticProps({ params }) {
  // Define the directory containing your markdown files
  const directory = path.join(
    process.cwd(),
    "src/content/ydkjs"
  );

  const filenames = fs.readdirSync(directory);

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "ydkjs",
    `${params.slug}.md`
  );
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  // const mdxSource = await serialize(content);
  const mdxSource = await serialize(content, {
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });

  // Loop through each file and read its content and metadata :
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
    path.join(process.cwd(), "src", "content", "ydkjs")
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

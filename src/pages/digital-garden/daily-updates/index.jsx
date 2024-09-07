import Button from "@/components/base/Button";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import DailyUpdateCard from "@/components/garden/DailyUpdateCard";
import { FaPlus } from "react-icons/fa";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";
export async function getStaticProps() {
  const directory = path.join(process.cwd(), "src/content/daily-updates");
  const filenames = fs.readdirSync(directory);
  const posts = filenames.map((filename) => {
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
      posts,
    },
  };
}

const HEADING = "☘️ Daily Updates";
const DESCRIPTION =
  "Consistency is key to success. Stay committed, update your progress, and make a meaningful impact. Together, we’ll achieve success!";

function BlogsPage({ posts }) {
  return (
    <>
      <CommonHeadTags />

      <ClassicPageLayout
        rightCTA={
          <Button
            onClick={() => {
              window.open(ADMIN_LINK, "_blank");
            }}
            className="mt-4 px-6 py-3 bg-transparent   text-gray-900  md:text-xl text-base border-black  font-medium rounded-md   transition duration-200"
          >
            <FaPlus />
            <span className="hidden md:flex"> new plant</span>
          </Button>
        }
        heading={HEADING}
        desc={DESCRIPTION}
      >
        {posts?.map((post) => {
          return <DailyUpdateCard data={post?.frontMatter} />;
        })}
      </ClassicPageLayout>
    </>
  );
}

export default BlogsPage;

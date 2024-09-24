import Button from "@/components/base/Button";
import BlogCard from "@/components/garden/BlogCard";
import React from "react";
import { FaPlus } from "react-icons/fa";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";
import { LiaBlogSolid } from "react-icons/lia";
import Breadcrumb from "@/components/ui/Breadcrumb";
export async function getStaticProps() {
  const directory = path.join(process.cwd(), "src/content/blog");
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

  // Return the posts as props
  return {
    props: {
      posts,
    },
  };
}

function BlogsPage({ posts }) {
  return (
    <>
      <CommonHeadTags
        image="https://i.ibb.co/vP1f18c/boooks-logo.jpg"
        title="Read Latest Blogs on Digital Garden of Ashutosh Anand Tiwari : heyashu.in"
        url="https://www.heyashu.com/blog"
      />

      <ClassicPageLayout
        rightCTA={
          <Button
            onClick={() => {
              window.open(ADMIN_LINK, "_blank");
            }}
            className="mt-4 px-6 py-3 bg-transparent   text-gray-900 md:text-xl text-base border-black  font-medium rounded-md   transition duration-200"
          >
            <FaPlus />
            <span className="hidden md:flex">Write blog</span>
          </Button>
        }
        heading={
          <div className="flex gap-2 items-center ">
            <LiaBlogSolid className="text-green-800" /> Blogs
          </div>
        }
        desc="   Read blogs on various topics and feel free to add your blogs."
      >
        {posts?.map((post) => {
          return <BlogCard data={post?.frontMatter} />;
        })}
      </ClassicPageLayout>
    </>
  );
}

export default BlogsPage;

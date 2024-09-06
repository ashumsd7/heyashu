import Button from "@/components/base/Button";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ClassicPageLayout from "@/components/base/ClassicNotesLayout";
import { FaPlus } from "react-icons/fa";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";
import CommonGardenCard from "@/components/base/CommonGardenCard";
import { MdAutoStories } from "react-icons/md";
import PlantingSoon from "@/components/base/PlantingSoon";
export async function getStaticProps() {
  const directory = path.join(process.cwd(), "src/content/stories");
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
            <span className="hidden md:flex"> new story</span>
          </Button>
        }
        heading={
          <div className="flex gap-2 items-center ">
            <MdAutoStories  className="text-green-800" /> Stories
          </div>
        }
        desc=" Share captivating stories that inspire, entertain, or teach valuable lessons."
      >
       {posts.length > 0 ? (
          posts?.map((post) => {
            return <CommonGardenCard subRoute={'stories'} data={post?.frontMatter} />;
          })
        ) : (
          <PlantingSoon />
        )}
      </ClassicPageLayout>
    </>
  );
}

export default BlogsPage;

import Button from "@/components/base/Button";
import { useRouter } from "next/router";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import { FaPlus } from "react-icons/fa";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";
import CommonGardenCard from "@/components/garden/CommonGardenCard";
import PlantingSoon from "@/components/base/PlantingSoon";
export async function getStaticProps() {
  const directory = path.join(process.cwd(), "src/content/poems");
  const filenames = fs.readdirSync(directory);
  const posts = filenames.map((filename) => {
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

  // Return the posts as props
  return {
    props: {
      posts,
    },
  };
}

function BlogsPage({ posts }) {
  const router = useRouter();
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
            <span className="hidden md:flex"> new poem</span>
          </Button>
        }
        heading="♫ POEMS"
        desc="  Express your thoughts, feelings, and creativity through poetry in this collection."
      >
       {posts.length > 0 ? (
          posts?.map((post) => {
            return <CommonGardenCard subRoute={'poems'}  data={post?.frontMatter} />;
          })
        ) : (
          <PlantingSoon/>
        )}
      </ClassicPageLayout>
    </>
  );
}

export default BlogsPage;

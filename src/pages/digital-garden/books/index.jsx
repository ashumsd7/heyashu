import Button from "@/components/base/Button";
import { useRouter } from "next/router";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ClassicPageLayout from "@/components/base/ClassicNotesLayout";
import { FaPlus } from "react-icons/fa";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";
import CommonGardenCard from "@/components/base/CommonGardenCard";
import PlantingSoon from "@/components/base/PlantingSoon";
import { LiaBookSolid } from "react-icons/lia";
export async function getStaticProps() {
  // Define the directory containing your markdown files
  const directory = path.join(process.cwd(), "src/content/books");

  // Get file names from the directory
  const filenames = fs.readdirSync(directory);

  // Loop through each file and read its content and metadata
  const posts = filenames.map((filename) => {
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
            <span className="hidden md:flex"> recommend a book </span>
          </Button>
        }
        heading={
          <div className="flex gap-2 items-center ">
            <LiaBookSolid className="text-green-800" /> Books
          </div>
        }
        desc="Discuss and share insights on the books that have inspired or educated you."
      >
        {posts.length > 0 ? (
          posts?.map((post) => {
            return <CommonGardenCard subRoute={'books'}  data={post?.frontMatter} />;
          })
        ) : (
          <PlantingSoon />
        )}
      </ClassicPageLayout>
    </>
  );
}

export default BlogsPage;

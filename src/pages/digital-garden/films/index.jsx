import Button from "@/components/base/Button";
import { useRouter } from "next/router";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import { FaPlus } from "react-icons/fa";
import CommonGardenCard from "@/components/garden/CommonGardenCard";
import PlantingSoon from "@/components/base/PlantingSoon";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";
import { GiFilmProjector } from "react-icons/gi";
export async function getStaticProps() {
  // Define the directory containing your markdown files
  const directory = path.join(process.cwd(), "src/content/films");

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
            <span className="hidden md:flex"> seed now</span>
          </Button>
        }
        heading={
          <div className="flex gap-2 items-center ">
            <GiFilmProjector  className="text-green-800" />  Films <span className="font-light"> / </span>Series
          </div>
        }
        desc="  Discuss your favorite films, TV series, or web series, and share reviews that resonate with you."
      >
        {posts.length > 0 ? (
          posts?.map((post) => {
            return <CommonGardenCard subRoute={'films'}  data={post?.frontMatter} />;
          })
        ) : (
          <PlantingSoon />
        )}
      </ClassicPageLayout>
    </>
  );
}

export default BlogsPage;

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
import BlogCardv2 from "@/components/garden/BlogCardv2";

export async function getStaticProps() {
  // Define paths to all content folders
  const contentFolders = {
    blog: path.join(process.cwd(), "src/content/blog"),
    experience: path.join(process.cwd(), "src/content/experience"),
    jsSnippets: path.join(process.cwd(), "src/content/js-snippets"),
    nodejsProcodrr: path.join(process.cwd(), "src/content/node-js-procodrr"),
    nodejsS1AkshaySaini: path.join(
      process.cwd(),
      "src/content/notes-namaste-node-js"
    ),
    stories: path.join(process.cwd(), "src/content/stories"),
  };

  // Initialize an empty array to store the posts
  let posts = [];

  // Iterate through each content folder and fetch files
  for (const [folderKey, folderPath] of Object.entries(contentFolders)) {
    try {
      const folderFileNames = fs.readdirSync(folderPath);

      // Process each file in the folder
      folderFileNames.forEach((filename) => {
        const filePath = path.join(folderPath, filename);

        // Ensure it's a markdown file before processing
        if (filename.endsWith(".md")) {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const { data: frontMatter, content } = matter(fileContent);

          // Add the processed post to the posts array
          posts.push({
            frontMatter,
            content,
            slug: filename.replace(".md", ""),
            folder: folderKey, // Optional: Store folder info if needed later
          });
        }
      });
    } catch (error) {
      console.error(`Error reading files from ${folderPath}: `, error);
    }
  }

  // Return the posts as props
  return {
    props: {
      posts,
    },
  };
}

function BlogsPage({ posts }) {
  return (
    <div className="pb-10">
      <CommonHeadTags image="https://i.ibb.co/PN5TJFF/blogs-logo.jpg" title="Read Latest Blogs on Digital Garden of Ashutosh Anand Tiwari : heyashu.in"   url = "https://www.heyashu.com/blog" />
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
            <LiaBlogSolid className="text-green-800" /> Blogs{" "}
            <span className="font-light text-2xl">{posts?.length}</span>
          </div>
        }
        desc="   Read blogs on various topics and feel free to add your blogs."
      >
        {posts?.map((post) => {
          return <BlogCardv2 subPath="/blog/" data={post?.frontMatter} />;
        })}
      </ClassicPageLayout>
    </div>
  );
}

export default BlogsPage;

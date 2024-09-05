import Button from "@/components/base/Button";
import BlogCard from "@/components/blog/BlogCard";
import BlogsFilter from "@/components/blog/BlogsFilter";
import { BLOG_FILTERS } from "@/data/blog";
import { ALL_BLOGS_DATA } from "@/data/blog/allBlogs";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ClassicPageLayout from "@/components/base/ClassicNotesLayout";

export async function getStaticProps() {
  // Define the directory containing your markdown files
  const directory = path.join(process.cwd(), "src/content/blog");

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
      <Head>
        <title>🌱 Blogs by heyashu.in : A Digital Garden by Ashutosh Anand Tiwari</title>
        <link rel="icon" href="/digigarden.ico" />
        <meta
          name="description"
          content="Explore the latest blog posts by Ashutosh Anand Tiwari, covering topics like JavaScript, web development, and more."
        />
        <meta
          name="keywords"
          content="Blogs, JavaScript, Web Development, Ashutosh Anand Tiwari, Programming, Writing"
        />
        <meta
          property="og:title"
          content="Your Blogs Feed by Ashutosh Anand Tiwari"
        />
        <meta
          property="og:description"
          content="Stay updated with the latest articles and blogs by Ashutosh Anand Tiwari on topics ranging from JavaScript to web development."
        />
        <meta
          property="og:image"
          content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
        />
        <meta property="og:url" content="https://www.heyashu.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Your Blogs Feed by Ashutosh Anand Tiwari"
        />
        <meta
          name="twitter:description"
          content="Discover engaging blog posts by Ashutosh Anand Tiwari on various tech topics."
        />
        <meta
          name="twitter:image"
          content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
        />
      </Head>


      <ClassicPageLayout
        heading="🌱Blogs"
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

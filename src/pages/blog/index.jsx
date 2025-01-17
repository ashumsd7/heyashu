import React, { useState, useMemo } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { PiPlantFill, PiBookOpenTextLight } from "react-icons/pi";
import { IoFilterSharp } from "react-icons/io5";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Button from "@/components/base/Button";
import BlogCardv3 from "@/components/garden/BlogCardv3";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";

// ... keep getStaticProps as is ...

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
   
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(
      posts?.flatMap((post) => 
        post.frontMatter.tags?.split(',').map(tag => tag.trim()) || []
      ) || []
    );
    return ["all", ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts?.filter((post) => {
      const matchesSearch =
        post.frontMatter.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        post.frontMatter.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        post.frontMatter?.tags?.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white mx-auto">
      <CommonHeadTags
        image="https://i.ibb.co/PN5TJFF/blogs-logo.jpg"
        title="Digital Garden - Blogs | Ashutosh Anand Tiwari"
        url="https://www.heyashu.com/blog"
      />
      {/* Hero Section */}{" "}
      <div className="container mx-auto md:px-10  w-full pb-12 pt-6 ">
        <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex md:flex-row flex-col items-center gap-3">
                <PiPlantFill className="text-5xl text-green-600" />
                <h1 className="md:text-5xl text-3xl md:text-left text-center font-bold tracking-tight text-gray-900">
                  Tech   Blogs Musings and More...
                </h1>
              </div>
              <p className="text-gray-600 text-xl leading-relaxed text-center">
                Explore a collection of technical articles on web development,
                system architecture, and programming techniques.
              </p>
            </div>
          </div>

          <div className="relative min-w-[320px] max-w-2xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 text-lg" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-12 pr-6 py-4 text-lg bg-white border-2 border-green-200 rounded-xl shadow-sm 
              placeholder:text-gray-400 placeholder:font-light
              focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:outline-none
              transition-all duration-300 ease-in-out
              hover:border-green-300 hover:shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      
      <div className="container mx-auto md:px-10  w-full py-8 flex flex-col md:flex-row gap-8">
        {/* Filters Section */}
        <div className="md:w-1/4 w-full  md:sticky top-20  ">
          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-4 mb-8">
            {/* Search Input */}

            {/* Filter Button - Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center w-full   py-3 bg-green-50 text-green-800 rounded-lg mb-4"
            >
              <IoFilterSharp className="mr-2" />
              Filters
            </button>

            {/* Category Filters */}
            <div className={`mt-2 ${showFilters ? "block" : "hidden md:block"}  max-h-[400px] md:max-h-[500px] overflow-y-auto`}>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-left py-2  font-medium transition-all w-full
                      ${
                        selectedCategory === category
                          ? "text-green-700 border-b-2 border-green-700"
                          : "text-gray-700 hover:text-green-500 border-b border-gray-200 hover:border-green-300"
                      }`}
                  >
                    {category?.charAt(0).toUpperCase() + category?.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="md:w-3/4 w-full">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              All Posts{" "}
              <span className="text-gray-500">({filteredPosts?.length})</span>
            </h2>
              <Button
                onClick={() => window.open(ADMIN_LINK, "_blank")}
                className="hidden md:flex items-center   py-2 bg-green-600 text-white hover:bg-green-700 md:text-md font-medium rounded-md transition duration-200"
              >
                <FaPlus className="mr-2" />
                New Article
              </Button>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts?.map((post, index) => (
              <BlogCardv3
                key={index}
                subPath="/blog/"
                data={post?.frontMatter}
                className=" rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              />
            ))}
          </div>

          {/* No Results Message */}
          {filteredPosts?.length === 0 && (
            <div className="text-center py-16">
              <PiBookOpenTextLight className="mx-auto text-5xl text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg font-medium">
                No pants found please plant one
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;

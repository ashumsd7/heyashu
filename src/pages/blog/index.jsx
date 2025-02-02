import React, { useState, useMemo } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { PiPlantFill, PiBookOpenTextLight } from "react-icons/pi";
import { IoFilterSharp } from "react-icons/io5";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { formateDate, generateSlug } from "@/utils/functions";

import Button from "@/components/base/Button";
import BlogCardv3 from "@/components/garden/BlogCardv3";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";

export async function getStaticProps() {
  const contentFolders = {
    blog: path.join(process.cwd(), "src/content/blog"),
    experience: path.join(process.cwd(), "src/content/experience"),
    jsSnippets: path.join(process.cwd(), "src/content/js-snippets"),
    nodejsProcodrr: path.join(process.cwd(), "src/content/node-js-procodrr"),
    fsd: path.join(process.cwd(), "src/content/front-end-design-system"),
    nodejsS1AkshaySaini: path.join(
      process.cwd(),
      "src/content/notes-namaste-node-js"
    ),
    stories: path.join(process.cwd(), "src/content/stories"),
  };

  let posts = [];

  for (const [folderKey, folderPath] of Object.entries(contentFolders)) {
    try {
      const folderFileNames = fs.readdirSync(folderPath);

      folderFileNames.forEach((filename) => {
        const filePath = path.join(folderPath, filename);

        if (filename.endsWith(".md")) {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const { data: frontMatter, content } = matter(fileContent);

          posts.push({
            frontMatter,
            content,
            slug: filename.replace(".md", ""),
            folder: folderKey,
          });
        }
      });
    } catch (error) {
      console.error(`Error reading files from ${folderPath}: `, error);
    }
  }

  return {
    props: {
      posts,
    },
  };
}

function BlogsPage({ posts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "javascript", "nodejs", "frontend", "interview"];

  const filteredPosts = useMemo(() => {
    const filtered = posts?.filter((post) => {
      const matchesSearch =
        post.frontMatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.frontMatter.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        post.frontMatter?.tags?.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });

    // Shuffle the filtered posts using Fisher-Yates algorithm
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    return filtered;
  }, [posts, searchTerm, selectedCategory]);

  const recentPosts = useMemo(() => {
    return [...(posts || [])]
      .filter(post => post.frontMatter.publishedOn)
      .sort((a, b) => {
        const dateA = a.frontMatter.publishedOn.split('-').map(Number);
        const dateB = b.frontMatter.publishedOn.split('-').map(Number);
        
        if (dateA[2] !== dateB[2]) return dateB[2] - dateA[2];
        if (dateA[0] !== dateB[0]) return dateB[0] - dateA[0];
        return dateB[1] - dateA[1];
      })
      .slice(0, 3);
  }, [posts]);

  const changeFilePath = (filePath) => filePath?.replace("/public", "");

  return (
    <div className="min-h-screen">
      <CommonHeadTags
        image="https://i.ibb.co/Cm127c4/blogs-thumb.jpg"
        title="Digital Garden - Blogs | Ashutosh Anand Tiwari"
        url="https://www.heyashu.com/blog"
      />

  
      
      {/* Hero Section */}
      <div className="relative h-[30vh] md:h-[40vh]">
        <div className="absolute inset-0">
          <div className="h-full flex flex-col justify-center items-center px-2">
            <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-center text-gray-900 dark:text-white">Blogs, Musings & More...</h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 md:mb-6 max-w-2xl text-center">
              A cozy corner where I share my thoughts, discoveries, and adventures in the world of technology and beyond
            </p>
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <section className="py-4  ">
        <div className="container mx-auto px-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">Recent Articles</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {recentPosts.map((post, index) => (
              <article 
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer h-[380px] md:min-h-[410px]"
                style={{ boxShadow: '0 2px 18px rgba(0,0,0,.06)' }}
                onClick={() => window.open(`/blog/${generateSlug(post.frontMatter.title)}`, '_blank')}
              >
                <div className="relative h-[200px] md:h-[220px] overflow-hidden">
                  <img 
                    src={post?.frontMatter?.thumbnail ? changeFilePath(post?.frontMatter?.thumbnail) : ""}
                    alt={post.frontMatter.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex gap-2 mb-3 md:mb-4">
                    {post.frontMatter.tags?.split(',').slice(0, 2).map((tag, i) => (
                      <span key={i} className="px-2 md:px-3 py-1 text-black dark:text-gray-900 text-xs font-medium rounded-full" style={{ backgroundColor: '#d9fec1' }}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg md:text-[22px] font-[700] leading-[1.4] mb-2 md:mb-3 text-gray-900 dark:text-white line-clamp-2">
                    {post.frontMatter.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                    {post.frontMatter.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    {(() => {
                        const [month, day, year] = post.frontMatter.publishedOn ? post.frontMatter.publishedOn.split('-') :post.frontMatter.date.split('-')
                        const date = new Date(year, month - 1, day);
                        return date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric', 
                          year: 'numeric'
                        });
                      })()}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {post.frontMatter.author || 'Anonymous'}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white dark:bg-gray-800 py-4 md:py-6 shadow-lg mb-4 md:mb-6 rounded-xl">
            <div className="container mx-auto px-2">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between">
                <div className="relative flex-1 w-full max-w-2xl">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-12 md:pl-14 pr-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-base md:text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 md:gap-3 flex-wrap justify-center w-full md:w-auto">
                  {categories.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedCategory(tag)}
                      className={`px-2 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all ${
                        selectedCategory === tag
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left text-gray-900 dark:text-white">
              All Articles <span className="text-gray-500 dark:text-gray-400">({filteredPosts?.length})</span>
            </h2>
            <Button
              onClick={() => window.open(ADMIN_LINK, "_blank")}
              className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-lg"
            >
              <FaPlus className="mr-2" />
              New Article
            </Button>
          </div>

          {filteredPosts?.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredPosts.map((post, index) => (
                <article 
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer h-[380px] md:min-h-[410px]"
                  style={{ boxShadow: '0 2px 18px rgba(0,0,0,.06)' }}
                  onClick={() => window.open(`/blog/${generateSlug(post.frontMatter.title)}`, '_blank')}
                >
                  <div className="relative h-[200px] md:h-[220px] overflow-hidden">
                    <img 
                      src={post?.frontMatter?.thumbnail ? changeFilePath(post?.frontMatter?.thumbnail) : ""}
                      alt={post.frontMatter.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex gap-2 mb-3 md:mb-4">
                      {post.frontMatter.tags?.split(',').slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 md:px-3 py-1 text-black dark:text-gray-900 text-xs font-medium rounded-full" style={{ backgroundColor: '#d9fec1' }}>
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg md:text-[22px] font-[700] leading-[1.4] mb-2 md:mb-3 text-gray-900 dark:text-white line-clamp-2">
                      {post.frontMatter.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                      {post.frontMatter.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {(() => {
                        const [month, day, year] = post.frontMatter.publishedOn ? post.frontMatter.publishedOn.split('-') :post.frontMatter.date.split('-')
                        const date = new Date(year, month - 1, day);
                        return date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric', 
                          year: 'numeric'
                        });
                      })()}
                      </span>
                      <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        {post.frontMatter.author || 'Anonymous'}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-10">
              <PiBookOpenTextLight className="mx-auto text-4xl md:text-5xl text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">No articles found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogsPage;
import React, { useState, useMemo } from "react";
import { FaCalendar, FaPlus, FaSearch } from "react-icons/fa";
import { PiPlantFill, PiBookOpenTextLight } from "react-icons/pi";
import { IoFilterSharp } from "react-icons/io5";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { formateDate, generateSlug } from "@/utils/functions";

 
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
      .slice(0, 4);
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
      <div className="relative h-[30vh] md:h-[40vh] py-8 md:py-0 mt-8 md:mt-0">
        <div className="absolute inset-0">
          <div className="h-full flex flex-col justify-center items-center px-4 md:px-2 space-y-4 md:space-y-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-center text-gray-900 dark:text-white">Blogs, Musings & More...</h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 md:mb-6 max-w-2xl text-center">
              A cozy corner where I share my thoughts, discoveries, and adventures in the world of technology and beyond
            </p>
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <section className="py-4">
        <div className="container mx-auto px-2">
          {/* Latest Posts Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Latest Blogs</h2>
            <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700 my-4"></div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {recentPosts.map((post, index) => (
                <article 
                  key={index}
                  className="group rounded-lg p-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-700"
                  onClick={() => window.open(`/blog/${generateSlug(post.frontMatter.title)}`, '_blank')}
                >
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                    {post.frontMatter.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <FaCalendar className="text-gray-400"/>
                    <span>
                      {(() => {
                        const [month, day, year] = post.frontMatter.publishedOn ? post.frontMatter.publishedOn.split('-') : post.frontMatter.date.split('-')
                        const date = new Date(year, month - 1, day);
                        return date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        });
                      })()}
                    </span>
                    {/* <span>•</span> */}
                    {/* <span>{post.frontMatter.readingTime || '5 min read'}</span> */}
                  </div>

                  <div className="flex gap-2">
                    {post.frontMatter.tags?.split(',').slice(0, 2).map((tag, i) => (
                      <span key={i} className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 group-hover:bg-white dark:group-hover:bg-gray-500">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* All Blogs Section */}
          <div>
            <div className="flex items-center gap-4 mt-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">All Blogs</h2>
              <div className="h-0.5 flex-1 bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Search and Filter - Now sticky */}
            <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6 mt-4 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedCategory(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === tag
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Posts Grid */}
              <div className="w-full lg:w-3/4">
                {filteredPosts?.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredPosts.map((post, index) => (
                      <article 
                        key={index}
                        className="group rounded-lg p-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                        onClick={() => window.open(`/blog/${generateSlug(post.frontMatter.title)}`, '_blank')}
                      >
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                          {post.frontMatter.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <FaCalendar className="text-gray-400"/>
                          <span>
                            {(() => {
                              const [month, day, year] = post.frontMatter.publishedOn ? post.frontMatter.publishedOn.split('-') : post.frontMatter.date.split('-')
                              const date = new Date(year, month - 1, day);
                              return date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              });
                            })()}
                          </span>
                          {/* <span>•</span> */}
                          {/* <span>{post.frontMatter.readingTime || '5 min read'}</span> */}
                        </div>

                        <div className="flex gap-2">
                          {post.frontMatter.tags?.split(',').slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 group-hover:bg-white dark:group-hover:bg-gray-500">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <PiBookOpenTextLight className="mx-auto text-4xl text-gray-400 mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">No articles found</p>
                  </div>
                )}
              </div>

              {/* Right Side Cards */}
              <div className="w-full lg:w-1/4 space-y-4">
                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Node.js Notes from NamasteJS</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Curated notes from Akshay Saini's course</p>
                  <button onClick={() => window.open('https://heyashu.in/digital-garden', '_blank')} 
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Read Now
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Frontend System Design Notes</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">From NamasteDev with Chirag Goel</p>
                  <button onClick={() => window.open('https://heyashu.in/digital-garden', '_blank')}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Read Now
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Frontend Interview Help</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Let me help you in your journey with my experience at minimal price</p>
                  <button onClick={() => window.open('/tech/products', '_blank')}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Click to Know More
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Contribute to Open Source</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Be a superhero - write and contribute to this open source platform</p>
                  <button onClick={() => window.open('https://github.com/ashumsd7/heyashu/', '_blank')}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Contribute Now
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Support the Project</h3>
                  <button onClick={() => window.open('https://github.com/ashumsd7/heyashu/', '_blank')}
                    className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    Star & Share
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogsPage;
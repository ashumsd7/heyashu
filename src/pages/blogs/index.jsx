import Button from "@/components/base/Button";
import BlogCard from "@/components/blog/BlogCard";
import BlogsFilter from "@/components/blog/BlogsFilter";
import { ALL_BLOGS_DATA } from "@/data/blog/allBlogs";
import React from "react";

function BlogsPage() {
  return (
    <div className="  mt-0 flex flex-col gap-4 px-2">
      <h1 className="lg:text-5xl flex justify-between items-center text-2xl font-extrabold md:mb-6 mb-2 bg-gradient-to-r relative from-yellow-100 py-2 rounded-lg to-[#EFEFF1]  text-gray-800 md:text-left font-serif ">
        ✍️ Your Blogs Feed 
         
        
      </h1>
      <BlogsFilter />
      <div className="  h-screen flex flex-col gap-4">
        {ALL_BLOGS_DATA?.map((item) => {
          return <BlogCard data={item} />;
        })}
      </div>
    </div>
  );
}

export default BlogsPage;

import BlogCard from "@/components/blog/BlogCard";
import BlogsFilter from "@/components/blog/BlogsFilter";
import React from "react";

function BlogsPage() {
  return (
    <div className=" lg:-mt-14 mt-0 flex flex-col gap-4">
      <h1 className="lg:text-5xl text-3xl font-extrabold  text-gray-800 md:text-left font-serif ">
        ✍️ Your Blogs Feed
      </h1>
      <BlogsFilter />
      <div className="border  h-screen">
        <BlogCard />
      </div>
    </div>
  );
}

export default BlogsPage;

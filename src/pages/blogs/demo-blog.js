import Markdown from "@/components/base/Markdown";
import BlogMetaInfo from "@/components/tech/notes-layout/BlogMetaInfo";
import Image from "next/image";
import React from "react";
// PASTE YOUR MARKDOWN HERE BELOW UNDER BACK TICKS
const markdown = `

## You blog content starts from here



`;

// change your name
const blogInfo = {
  name: "Ashutosh Anand Tiwari",
  timeRead: "0",
  lastUpdated: "-",
  publishedOn: "-",
  title: "My Blog Title?",
  followLink: "https://github.com/ashumsd7/",
  heroImage: "",
  profilePic: "https://avatars.githubusercontent.com/u/40313523?v=4", // copy this from github or your favrt photo
};

function DemoBlog() {
  return (
    <div className="flex flex-col gap-5">
      {/* Blog Title */}
      {blogInfo?.title && (
        <h2 className="text-black text-6xl font-bold  mb-6   mr-14">
          {blogInfo?.title}
        </h2>
      )}
      {/* Blog Hero Image */}
      {blogInfo?.heroImage && (
        <Image alt={blogInfo?.title} src={blogInfo?.heroImage} fill />
      )}
      {/* Blog Meta Info */}
      <BlogMetaInfo data={blogInfo} />
      {/* Main Blog Content */}
      <Markdown content={markdown} />
    </div>
  );
}

export default DemoBlog;

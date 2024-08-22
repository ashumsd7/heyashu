import BlogsMainPage from "@/components/base/BlogsMainPage";
import { estimateReadingTime } from "@/utils/functions";
import React from "react";
// PASTE YOUR MARKDOWN HERE BELOW UNDER BACK TICKS
const MARKDOWN = `
# What is Lorem Ipsum?

### What is Lorem Ipsum?

Lorem Ipsum is simply dummy text of the
 printing and typesetting industry. Lorem Ipsum 
 has been the industry's standard dummy text ever since
the 1500s.


`;

// change your name
const BLOG_INFO = {
  name: "Ashutosh Anand Tiwari",
  timeRead: estimateReadingTime(MARKDOWN),
  lastUpdated: "-",
  publishedOn: "22 Aug 2024",
  title: "Just a Demo",
  followLink: "https://github.com/ashumsd7/",
  markdown: MARKDOWN,
  metaInfo: [{ name: "meta title", content: "meta content" }],
  profilePic: "https://avatars.githubusercontent.com/u/40313523?v=4", // copy this from github or your favrt photo
};

function DemoBlog() {
  return <BlogsMainPage blogInfo={BLOG_INFO} />;
}

export default DemoBlog;

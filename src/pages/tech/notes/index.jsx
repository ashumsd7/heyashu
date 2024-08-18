import React, { useState } from "react";

import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";
import BlogCard from "@/components/tech/BlogCard";
function AllNotesPage() {
  const [markdownContent, setMarkdownContent] = useState(`
 # E0 :    Welcome to Namaste Node JS

# About Creator

Akshay Started building webite in 8th Grade only

He has worked in Paytm Uber and multiple startups

# Request From Creator Before Starting the course

1. Keep taking notes Digital/ Notebook notes along the video
2. Practice the things along the video
3. You can write notes ( Notion , Evernote , your perosnol website ) - this is by me not creator
4. Focus During video. Silent your phones
5. Plan your couse and follow that
    `);
  return (
    <>
      <BlogCard />
      {/* <ReactMarkdown className="prose">{markdownContent}</ReactMarkdown> */}
    </>
  );
}

export default AllNotesPage;

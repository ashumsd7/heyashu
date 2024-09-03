import Markdown from "@/components/base/Markdown";
import MDXRenderer from "@/components/base/MDXRenderer";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
function NotesContent({ markdownContent, large  }) {
  function changeFilePath(filePath) {
    const newFilePath = filePath.replace("/public", "");
    return newFilePath;
  }


  return (
    <>
      <div
        className={`prose container mx-auto p-0  mb-28 ${
          large ? "max-w-screen-lg" : "max-w-screen-md"
        }`}
      >
        <MDXRenderer markdownContent={markdownContent} />
      </div>
    </>
  );
}

export default NotesContent;

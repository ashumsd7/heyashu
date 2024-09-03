import Markdown from "@/components/base/Markdown";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
function NotesContent({ markdownContent, large }) {

  function changeFilePath(filePath) {
    const newFilePath = filePath.replace("/public", "");
    return newFilePath;
  }
  function getImagePath(path) {
    // Remove the 'public' part from the path
    return path.replace(/^\/?public/, "");
  }

  const components = {
    img: ({ src, alt, ...rest }) => {
      // Adjust the path using the utility function
      const adjustedSrc = getImagePath(src);
      return <img src={adjustedSrc} alt={alt} layout="responsive" {...rest} />;
    },
  };


  return (
    <>
      {/* <div className="px-1 md:px-10 py-4 pb-20">
        <Markdown content={markdownContent} large={large} />
      </div> */}

      <div
        className={`prose container mx-auto p-0  mb-28 ${
          large ? "max-w-screen-lg" : "max-w-screen-md"
        }`}
      >
        <MDXRemote {...markdownContent} components={components} />
      </div>
    </>
  );
}

export default NotesContent;

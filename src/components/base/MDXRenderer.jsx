import { removePublicFromPath } from "@/utils/functions";
import { MDXRemote } from "next-mdx-remote";
import React from "react";

function MDXRenderer({ markdownContent }) {
  if (!markdownContent) return;

  const components = {
    img: ({ src, alt, ...rest }) => {
      // Adjust the path using the utility function
      const adjustedSrc = removePublicFromPath(src);
      return (
        <img
          className="rounded-md w-full h-full my-8" // Added vertical margin
          src={adjustedSrc}
          alt={alt}
          layout="responsive"
          {...rest}
        />
      );
    },
    h1: (props) => (
      <h1 className="text-3xl text-[#08142cd9] dark:text-gray-100 font-bold mt-12 mb-6" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-2xl font-bold mt-10 mb-5 text-[#08142cd9] dark:text-gray-100" {...props} />
    ),
    h3: (props) => (
      <h3
        className="text-xl font-bold mt-8 mb-4 text-[#08142cd9] dark:text-gray-100 font-sans"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="markdown-pre text-base leading-relaxed my-6 text-[#2a354b] dark:text-gray-300"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="mb-6 text-lg leading-relaxed text-[#28354bd9] dark:text-gray-300"
        {...props}
      />
    ),
    strong: (props) => (
      <strong
        className="font-bold px-1 py-0.5 text-lg text-[#2a354b] dark:text-gray-100"
        {...props}
      />
    ),
    li: (props) => (
      <li
        className="text-lg leading-relaxed mb-2 text-[#2a354b] dark:text-gray-300 text-justify"
        {...props}
      />
    ),
    a: (props) => (
      <a
        target="_blank"
        className="hover:opacity-50 mdx-a no-underline   px-1.5 py-0.5 rounded-md text-lg text-[#4d7f35] dark:text-green-400 transition-opacity"
        {...props}
      />
    ),
  };

  return (
    <>
      <MDXRemote {...markdownContent} components={components} />
    </>
  );
}

export default MDXRenderer;

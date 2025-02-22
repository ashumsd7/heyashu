import { removePublicFromPath } from "@/utils/functions";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/cjs/styles/prism";

function MDXRenderer({ markdownContent }) {
  if (!markdownContent) return null;

  const components = {
    img: ({ src, alt, ...rest }) => {
      const adjustedSrc = removePublicFromPath(src);
      return (
        <img
          className="rounded-md w-full h-auto my-4 sm:my-6 md:my-8 font-sans"
          src={adjustedSrc}
          alt={alt}
          {...rest}
        />
      );
    },
    h1: (props) => (
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#08142cd9] dark:text-gray-100 font-bold mt-8 mb-4 sm:mt-10 sm:mb-5 md:mt-12 md:mb-6 font-sans" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 mb-3 sm:mt-8 sm:mb-4 md:mt-10 md:mb-5 text-[#08142cd9] dark:text-gray-100 font-sans" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-4 mb-2 sm:mt-6 sm:mb-3 md:mt-8 md:mb-4 text-[#08142cd9] dark:text-gray-100 font-sans" {...props} />
    ),
    pre: (props) => (
      <pre
        className="markdown-pre text-sm leading-relaxed my-6 text-[#2a354b] dark:text-gray-300"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg md:text-xl leading-relaxed text-[#28354bd9] dark:text-gray-300 font-sans" {...props} />
    ),
    strong: (props) => (
      <strong className="font-bold px-1 py-0.5 text-base sm:text-lg md:text-xl text-[#2a354b] dark:text-gray-100 font-sans" {...props} />
    ),
    li: (props) => (
      <li className="text-base sm:text-lg md:text-xl leading-relaxed mb-2 text-[#2a354b] dark:text-gray-300 text-justify font-sans" {...props} />
    ),
    a: (props) => (
      <a target="_blank" className="hover:opacity-70 mdx-a no-underline px-1.5 py-0.5 rounded-md text-base sm:text-lg md:text-xl text-[#4d7f35] dark:text-green-400 transition-opacity font-sans" {...props} />
    ),
  };

  return (
    <div className=" ">
      <MDXRemote {...markdownContent} components={components} />
    </div>
  );
}

export default MDXRenderer;

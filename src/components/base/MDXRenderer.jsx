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
          className="rounded-md w-full h-full"
          src={adjustedSrc}
          alt={alt}
          layout="responsive"
          {...rest}
        />
      );
    },
    h1: (props) => <h1 className="text-2xl font-bold mb-4" {...props} />,
    h2: (props) => (
      <h2 className="text-2xl font-bold mb-4 text-gray-900" {...props} />
    ),
    h3: (props) => (
      <h2
        className="text-3xl font-bold mb-6 text-gray-900 font-sans"
        {...props}
      />
    ),
    pre: (props) => <pre className="markdown-pre text-black" {...props} />,
    p: (props) => (
      <p
        className="mb-4  text-[22px] leading-[40px]   "
        {...props}
      />
    ),
    strong: (props) => (
      <strong
        className="mb-4 text-[#242424] font-semibold italic leading-[32px] "
        {...props}
      />
    ),
    li: (props) => (
      <li
        className="text-[20px] leading-[30px] text-justify "
        {...props}
      />
    ),
    a: (props) => (
      <a
        target="_blank"
        className="underline  text-[#c06636]  "
        {...props}
      />
    ),
  };

  return <MDXRemote {...markdownContent} components={components} />;
}

export default MDXRenderer;

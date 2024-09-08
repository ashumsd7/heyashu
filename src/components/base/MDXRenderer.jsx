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
    h1: (props) => <h1 className="text-[28px] font-bold mb-4" {...props} />,
    h2: (props) => (
      <h2 className="text-[28px] font-bold mb-4 text-gray-900" {...props} />
    ),
    h3: (props) => (
      <h3
        className="text-[28px] font-bold mb-6 text-gray-900 font-sans"
        {...props}
      />
    ),
    pre: (props) => <pre className="markdown-pre text-[20px] leading-[32px] m-0 text-[#2a354b]" {...props} />,
    p: (props) => (
      <p
        className="mb-2  text-[20px] leading-[32px] text-[#2a354b]   "
        {...props}
      />
    ),
    strong: (props) => (
      <strong
        className="mb-4  font-semibold italic text-[20px] leading-[32px] text-[#2a354b] "
        {...props}
      />
    ),
    li: (props) => (
      <li
        className="text-[20px] leading-[32px] text-[#2a354b] text-justify "
        {...props}
      />
    ),
    a: (props) => (
      <a
        target="_blank"
        className="underline  text-[#000000]  "
        {...props}
      />
    ),
  };

  return <MDXRemote {...markdownContent} components={components} />;
}

export default MDXRenderer;

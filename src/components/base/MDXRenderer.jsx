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
    h1: (props) => (
      <h1 className="text-[28px] text-[#08142cd9] font-bold mb-4" {...props} />
    ),
    h2: (props) => (
      <h2 className="text-[28px] font-bold mb-4 text-[#08142cd9]" {...props} />
    ),
    h3: (props) => (
      <h3
        className="text-[20px] font-bold mb-3 mt-7 text-[#08142cd9] font-sans"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="markdown-pre text-[17px] leading-[22px]  text-[#2a354b]"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="mb-2  text-[18px] leading-[25px] text-[#28354bd9]   "
        {...props}
      />
    ),
    strong: (props) => (
      <strong
        className="mb-4 font-medium bg-[#8f9fa926] px-1 py-[2px] rounded-md   text-[18px] leading-[25px] text-[#2a354b] "
        {...props}
      />
    ),
    li: (props) => (
      <li
        className="text-[18px] leading-[25px] text-[#2a354b] text-justify "
        {...props}
      />
    ),
    a: (props) => (
      <a
        target="_blank"
        className=" hover:opacity-50 mdx-a no-underline border-b  px-1 py-[2px] rounded-md   text-[18px] leading-[25px] text-[#4d7f35]  "
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

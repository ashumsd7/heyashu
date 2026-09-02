import { removePublicFromPath } from "@/utils/functions";
import { MDXRemote } from "next-mdx-remote";
import React from "react";

function MDXRenderer({ markdownContent, variant = "default" }) {
  if (!markdownContent) return null;

  const isGardenReader = variant === "garden-reader";
  const isGarden = variant === "garden" || isGardenReader;

  const gardenReaderComponents = {
    img: ({ src, alt, ...rest }) => {
      const adjustedSrc = removePublicFromPath(src);
      return (
        <img
          className="my-5 h-auto w-full rounded-none border border-[var(--nr-border)]"
          src={adjustedSrc}
          alt={alt}
          {...rest}
        />
      );
    },
    h1: (props) => (
      <h1
        className="mb-3 mt-7 font-fraunces text-[1.35em] font-semibold leading-snug text-[var(--nr-heading)]"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mb-2.5 mt-6 font-fraunces text-[1.2em] font-semibold leading-snug text-[var(--nr-heading)]"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mb-2 mt-5 font-fraunces text-[1.08em] font-semibold leading-snug text-[var(--nr-heading)]"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="markdown-pre my-4 rounded-none text-[0.85em] leading-relaxed text-[var(--nr-body)]"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="mb-3.5 font-ibm-sans text-[1em] leading-[1.7] text-[var(--nr-body)]"
        {...props}
      />
    ),
    strong: (props) => (
      <strong className="font-semibold text-[var(--nr-heading)]" {...props} />
    ),
    li: (props) => (
      <li
        className="mb-1.5 font-ibm-sans text-[1em] leading-[1.65] text-[var(--nr-body)]"
        {...props}
      />
    ),
    a: (props) => (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--nr-accent)] underline decoration-[var(--nr-border)] underline-offset-2 transition hover:opacity-70"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="my-5 border-l-2 border-[var(--nr-border)] pl-3 font-fraunces text-[1.05em] italic text-[var(--nr-muted)]"
        {...props}
      />
    ),
  };

  const components = isGardenReader
    ? gardenReaderComponents
    : isGarden
    ? {
        img: ({ src, alt, ...rest }) => {
          const adjustedSrc = removePublicFromPath(src);
          return (
            <img
              className="my-5 h-auto w-full rounded-none border border-[#e6e0d6] dark:border-[#1e3328]"
              src={adjustedSrc}
              alt={alt}
              {...rest}
            />
          );
        },
        h1: (props) => (
          <h1
            className="mb-3 mt-7 font-fraunces text-[1.35em] font-semibold leading-snug text-[#171717] dark:text-[#f0f4ef]"
            {...props}
          />
        ),
        h2: (props) => (
          <h2
            className="mb-2.5 mt-6 font-fraunces text-[1.2em] font-semibold leading-snug text-[#171717] dark:text-[#f0f4ef]"
            {...props}
          />
        ),
        h3: (props) => (
          <h3
            className="mb-2 mt-5 font-fraunces text-[1.08em] font-semibold leading-snug text-[#171717] dark:text-[#f0f4ef]"
            {...props}
          />
        ),
        pre: (props) => (
          <pre
            className="markdown-pre my-4 rounded-none text-[0.85em] leading-relaxed text-[#2a354b] dark:text-gray-300"
            {...props}
          />
        ),
        p: (props) => (
          <p
            className="mb-3.5 font-ibm-sans text-[1em] leading-[1.7] text-[#3f3a34] dark:text-[#d5ddd7]"
            {...props}
          />
        ),
        strong: (props) => (
          <strong
            className="font-semibold text-[#1c1c1c] dark:text-[#f0f4ef]"
            {...props}
          />
        ),
        li: (props) => (
          <li
            className="mb-1.5 font-ibm-sans text-[1em] leading-[1.65] text-[#3f3a34] dark:text-[#d5ddd7]"
            {...props}
          />
        ),
        a: (props) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#143825] underline decoration-[#cfc6b8] underline-offset-2 transition hover:opacity-70 dark:text-[#22c55e]"
            {...props}
          />
        ),
        blockquote: (props) => (
          <blockquote
            className="my-5 border-l-2 border-[#cfc6b8] pl-3 font-fraunces text-[1.05em] italic text-[#4a453d] dark:text-[#c5d0c8]"
            {...props}
          />
        ),
      }
    : {
        img: ({ src, alt, ...rest }) => {
          const adjustedSrc = removePublicFromPath(src);
          return (
            <img
              className="my-4 h-auto w-full rounded-md font-sans sm:my-6 md:my-8"
              src={adjustedSrc}
              alt={alt}
              {...rest}
            />
          );
        },
        h1: (props) => (
          <h1
            className="mb-4 mt-8 font-sans text-3xl font-bold text-[#08142cd9] dark:text-gray-100 sm:mb-5 sm:mt-10 sm:text-4xl md:mb-6 md:mt-12 md:text-5xl"
            {...props}
          />
        ),
        h2: (props) => (
          <h2
            className="mb-3 mt-6 font-sans text-2xl font-bold text-[#08142cd9] dark:text-gray-100 sm:mb-4 sm:mt-8 sm:text-3xl md:mb-5 md:mt-10 md:text-4xl"
            {...props}
          />
        ),
        h3: (props) => (
          <h3
            className="mb-2 mt-4 font-sans text-lg font-bold text-[#08142cd9] dark:text-gray-100 sm:mb-3 sm:mt-6 sm:text-2xl md:mb-4 md:mt-8 md:text-3xl"
            {...props}
          />
        ),
        pre: (props) => (
          <pre
            className="markdown-pre my-6 text-sm leading-relaxed text-[#2a354b] dark:text-gray-300"
            {...props}
          />
        ),
        p: (props) => (
          <p
            className="mb-4 font-sans text-base leading-relaxed text-[#28354bd9] dark:text-gray-300 sm:mb-5 sm:text-lg md:mb-6 md:text-xl"
            {...props}
          />
        ),
        strong: (props) => (
          <strong
            className="px-1 py-0.5 font-sans text-base font-bold text-[#2a354b] dark:text-gray-100 sm:text-lg md:text-xl"
            {...props}
          />
        ),
        li: (props) => (
          <li
            className="mb-2 text-justify font-sans text-base leading-relaxed text-[#2a354b] dark:text-gray-300 sm:text-lg md:text-xl"
            {...props}
          />
        ),
        a: (props) => (
          <a
            target="_blank"
            className="mdx-a rounded-md px-1.5 py-0.5 font-sans text-base text-[#4d7f35] no-underline transition-opacity hover:opacity-70 dark:text-green-400 sm:text-lg md:text-xl"
            {...props}
          />
        ),
      };

  return (
    <div>
      <MDXRemote {...markdownContent} components={components} />
    </div>
  );
}

export default MDXRenderer;

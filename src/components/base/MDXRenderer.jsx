import { removePublicFromPath } from "@/utils/functions";
import { MDXRemote } from "next-mdx-remote";
import React from "react";

const H1 =
  "mb-4 mt-10 text-[1.85em] font-semibold leading-[1.25] tracking-[-0.02em]";
const H2 =
  "mb-3 mt-9 text-[1.5em] font-semibold leading-[1.28] tracking-[-0.015em]";
const H3 =
  "mb-2.5 mt-8 text-[1.32em] font-semibold leading-[1.35] tracking-[-0.01em]";
const H4 =
  "mb-2 mt-6 text-[1.15em] font-semibold leading-snug tracking-[-0.005em]";
const P = "mb-4 text-[1em] leading-[1.75]";
const LI = "my-1.5 text-[1em] leading-[1.7]";
const UL = "my-4 list-disc pl-[1.55em]";
const OL = "my-4 list-decimal pl-[1.55em]";
const STRONG = "text-[1em] font-semibold leading-[inherit]";

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
      <h1 className={`${H1} font-source-serif text-[var(--nr-heading)]`} {...props} />
    ),
    h2: (props) => (
      <h2 className={`${H2} font-source-serif text-[var(--nr-heading)]`} {...props} />
    ),
    h3: (props) => (
      <h3 className={`${H3} font-source-serif text-[var(--nr-heading)]`} {...props} />
    ),
    h4: (props) => (
      <h4 className={`${H4} font-source-serif text-[var(--nr-heading)]`} {...props} />
    ),
    pre: (props) => (
      <pre
        className="markdown-pre my-4 rounded-none text-[0.85em] leading-relaxed text-[var(--nr-body)]"
        {...props}
      />
    ),
    p: (props) => (
      <p className={`${P} font-source-serif text-[var(--nr-body)]`} {...props} />
    ),
    strong: (props) => (
      <strong className={`${STRONG} text-[var(--nr-text)]`} {...props} />
    ),
    ul: (props) => <ul className={UL} {...props} />,
    ol: (props) => <ol className={OL} {...props} />,
    li: (props) => (
      <li className={`${LI} font-source-serif text-[var(--nr-body)]`} {...props} />
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
        className="my-5 border-l-2 border-[var(--nr-border)] pl-4 font-source-serif text-[1.02em] italic text-[var(--nr-muted)]"
        {...props}
      />
    ),
    hr: (props) => (
      <hr className="my-8 border-[var(--nr-border)]" {...props} />
    ),
    code: (props) => (
      <code
        className="rounded border border-[var(--nr-border)] bg-[var(--nr-hover)] px-1.5 py-0.5 font-ibm-mono text-[0.88em] font-medium text-[var(--nr-heading)]"
        {...props}
      />
    ),
  };

  const gardenComponents = {
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
        className={`${H1} font-fraunces text-[#171717] dark:text-[#f0f4ef]`}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className={`${H2} font-fraunces text-[#171717] dark:text-[#f0f4ef]`}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className={`${H3} font-fraunces text-[#171717] dark:text-[#f0f4ef]`}
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        className={`${H4} font-fraunces text-[#171717] dark:text-[#f0f4ef]`}
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
        className={`${P} font-ibm-sans text-[#3f3a34] dark:text-[#d5ddd7]`}
        {...props}
      />
    ),
    strong: (props) => (
      <strong
        className={`${STRONG} text-[#1c1c1c] dark:text-[#f0f4ef]`}
        {...props}
      />
    ),
    ul: (props) => <ul className={UL} {...props} />,
    ol: (props) => <ol className={OL} {...props} />,
    li: (props) => (
      <li
        className={`${LI} font-ibm-sans text-[#3f3a34] dark:text-[#d5ddd7]`}
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
        className="my-5 border-l-2 border-[#cfc6b8] pl-4 font-fraunces text-[1.02em] italic text-[#4a453d] dark:text-[#c5d0c8]"
        {...props}
      />
    ),
    hr: (props) => (
      <hr className="my-8 border-[#e6e0d6] dark:border-[#1e3328]" {...props} />
    ),
  };

  const defaultComponents = {
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
        className="mb-3 mt-8 font-sans text-2xl font-bold text-[#08142cd9] dark:text-gray-100 sm:mb-4 sm:mt-10 sm:text-3xl md:mb-5 md:text-4xl"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mb-3 mt-7 font-sans text-xl font-bold text-[#08142cd9] dark:text-gray-100 sm:mb-4 sm:mt-8 sm:text-2xl md:text-[1.65rem]"
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        className="mb-2 mt-6 font-sans text-lg font-semibold text-[#08142cd9] dark:text-gray-100"
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
        className="font-sans text-[1em] font-semibold text-[#2a354b] dark:text-gray-100"
        {...props}
      />
    ),
    ul: (props) => <ul className="my-4 list-disc pl-6" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal pl-6" {...props} />,
    li: (props) => (
      <li
        className="my-1.5 text-justify font-sans text-base leading-relaxed text-[#2a354b] dark:text-gray-300 sm:text-lg md:text-xl"
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

  const components = isGardenReader
    ? gardenReaderComponents
    : isGarden
      ? gardenComponents
      : defaultComponents;

  return (
    <div>
      <MDXRemote {...markdownContent} components={components} />
    </div>
  );
}

export default MDXRenderer;

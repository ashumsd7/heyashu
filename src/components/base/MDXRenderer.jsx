import { removePublicFromPath } from "@/utils/functions";
import { MDXRemote } from "next-mdx-remote";
import React from "react";

const H1 =
  "mb-3 mt-8 text-[1.5em] font-semibold leading-[1.25] tracking-[-0.02em]";
const H2 =
  "mb-2.5 mt-7 text-[1.28em] font-semibold leading-[1.3] tracking-[-0.015em]";
const H3 =
  "mb-3 mt-8 text-[1.5em] font-semibold leading-[1.25] tracking-[-0.02em]";
const H4 =
  "mb-2 mt-5 text-[1.05em] font-semibold leading-snug";
const P = "mb-4 text-[1em] font-normal leading-[1.7]";
const LI = "my-1 text-[1em] font-normal leading-[1.7]";
const UL = "my-3 list-disc pl-[1.4em] text-[1em] font-normal";
const OL = "my-3 list-decimal pl-[1.4em] text-[1em] font-normal";
const STRONG = "text-[1em] font-semibold leading-[inherit]";
const QUOTE =
  "my-5 border-l-[3px] pl-4 text-[1em] font-normal italic leading-[1.7]";

function MdxCode({ className, children, ...props }) {
  const fenced =
    typeof className === "string" && /\blanguage-/.test(className);
  if (fenced) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
  return (
    <code className={`md-inline-code ${className || ""}`.trim()} {...props}>
      {children}
    </code>
  );
}

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
        className="markdown-pre my-4 rounded-none text-[0.88em] font-normal leading-relaxed text-[var(--nr-body)]"
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
        className={`${QUOTE} border-[var(--nr-border)] text-[var(--nr-muted)]`}
        {...props}
      />
    ),
    hr: (props) => (
      <hr className="my-8 border-[var(--nr-border)]" {...props} />
    ),
    code: MdxCode,
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
        className="markdown-pre my-4 rounded-none text-[0.88em] font-normal leading-relaxed text-[#2a354b] dark:text-gray-300"
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
        className={`${QUOTE} border-[#cfc6b8] text-[#5f584e] dark:text-[#92a59a]`}
        {...props}
      />
    ),
    hr: (props) => (
      <hr className="my-8 border-[#e6e0d6] dark:border-[#1e3328]" {...props} />
    ),
    code: MdxCode,
  };

  const defaultComponents = {
    img: ({ src, alt, ...rest }) => {
      const adjustedSrc = removePublicFromPath(src);
      return (
        <img
          className="my-4 h-auto w-full rounded-md font-sans sm:my-6"
          src={adjustedSrc}
          alt={alt}
          {...rest}
        />
      );
    },
    h1: (props) => (
      <h1
        className="mb-3 mt-8 font-sans text-[1.5em] font-semibold leading-[1.25] text-[#08142cd9] dark:text-gray-100"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mb-2.5 mt-7 font-sans text-[1.28em] font-semibold leading-[1.3] text-[#08142cd9] dark:text-gray-100"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mb-3 mt-8 font-sans text-[1.5em] font-semibold leading-[1.25] text-[#08142cd9] dark:text-gray-100"
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        className="mb-2 mt-5 font-sans text-[1.05em] font-semibold text-[#08142cd9] dark:text-gray-100"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="markdown-pre my-5 text-[0.88em] font-normal leading-relaxed text-[#2a354b] dark:text-gray-300"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="mb-4 font-sans text-[1em] font-normal leading-[1.7] text-[#28354bd9] dark:text-gray-300"
        {...props}
      />
    ),
    strong: (props) => (
      <strong
        className="font-sans text-[1em] font-semibold leading-[inherit] text-[#2a354b] dark:text-gray-100"
        {...props}
      />
    ),
    ul: (props) => <ul className="my-3 list-disc pl-6 text-[1em] font-normal" {...props} />,
    ol: (props) => <ol className="my-3 list-decimal pl-6 text-[1em] font-normal" {...props} />,
    li: (props) => (
      <li
        className="my-1 font-sans text-[1em] font-normal leading-[1.7] text-[#2a354b] dark:text-gray-300"
        {...props}
      />
    ),
    a: (props) => (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="mdx-a rounded-md px-0.5 font-sans text-[1em] text-[#4d7f35] underline decoration-[#cfc6b8] underline-offset-2 transition-opacity hover:opacity-70 dark:text-green-400"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="my-5 border-l-[3px] border-[#cfc6b8] pl-4 font-sans text-[1em] font-normal italic leading-[1.7] text-[#5f584e] dark:text-gray-400"
        {...props}
      />
    ),
    code: MdxCode,
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

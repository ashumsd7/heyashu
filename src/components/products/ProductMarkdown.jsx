import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PROSE =
  "product-md prose max-w-none text-left dark:prose-invert " +
  "prose-headings:font-fraunces prose-headings:font-semibold prose-headings:tracking-[-0.01em] " +
  "prose-headings:text-[#171717] dark:prose-headings:text-[#f0f4ef] " +
  "prose-h2:!text-[1.15em] prose-h3:!text-[1.05em] " +
  "prose-p:!text-[0.95rem] prose-p:!leading-[1.7] prose-p:!my-2.5 " +
  "prose-p:!text-[#3f3a34] dark:prose-p:!text-[#d5ddd7] " +
  "prose-li:!text-[0.95rem] prose-li:!leading-[1.65] prose-li:!my-1 " +
  "prose-a:!text-[#143825] prose-a:underline prose-a:decoration-[#cfc6b8] prose-a:underline-offset-2 " +
  "dark:prose-a:!text-[#22c55e] " +
  "prose-strong:!text-[#1c1c1c] dark:prose-strong:!text-[#f0f4ef] " +
  "prose-code:!text-[0.85em] prose-code:bg-[#f3eee5] dark:prose-code:bg-[#172a20] " +
  "prose-ul:my-2 prose-ol:my-2";

export default function ProductMarkdown({ content }) {
  if (!content || !String(content).trim()) return null;

  return (
    <div className={PROSE}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import './markdown.css'
const styles = {
  backgroundColor: "red",
};
function Markdown({ content, large }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ children, ...props }) => (
          <a
            className="text-[#1a0dab ] hover:[#0645ad] font-bolder underline markdown-a"
            {...props}
          >
            {children}
          </a>
        ),
        strong: ({ children, ...props }) => (
          <strong
            className="text-orange-600   text-base "
            {...props}
          >
            {children}
          </strong>
        ),
        h3: ({ children, ...props }) => (
          <h3 className=" mt-16 markdown-h3" {...props}>
            {children}
          </h3>
        ),
        code: ({ children, ...props }) => (
          <code
            className=" bg-black rounded px-2 py-1 text-white markdown-code"
            {...props}
          >
            {children}
          </code>
        ),

        pre: ({ children, ...props }) => (
          <pre className="markdown-pre" {...props}>
            {children}
          </pre>
        ),
        p: ({ children, ...props }) => (
          <p className="markdown-p" {...props}>
            {children}
          </p>
        ),
      }}
      remarkPlugins={[remarkGfm]}
      style={styles}
      className={`prose container mx-auto p-0  ${
        large ? "max-w-screen-lg" : "max-w-screen-md"
      }`}
    >
      {content}
    </ReactMarkdown>
  );
}

export default Markdown;

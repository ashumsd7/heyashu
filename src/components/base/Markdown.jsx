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
            className="text-blue-600 hover:text-blue-800 underline markdown-a"
            {...props}
          >
            {children}
          </a>
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

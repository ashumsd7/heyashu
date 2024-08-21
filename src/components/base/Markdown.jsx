import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import './markdown.css'
const styles = {
  backgroundColor: "red",
};
function Markdown({ content }) {
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
            className="bg-gray-200 rounded px-2 py-1 text-red-600 markdown-code"
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
      }}
      remarkPlugins={[remarkGfm]}
      style={styles}
      className="prose container mx-auto p-0 max-w-screen-lg "
    >
      {content}
    </ReactMarkdown>
  );
}

export default Markdown;

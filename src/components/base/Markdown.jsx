import React from "react";
import ReactMarkdown from "react-markdown";
function Markdown({ content }) {
  return (
    <ReactMarkdown
    
      components={{
        h1: ({ children, ...props }) => (
          <h1 className=" markdown-h1" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 className="  markdown-h2" {...props}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className="" {...props}>
            {children}
          </h3>
        ),
        h4: ({ children, ...props }) => (
          <h4 className="" {...props}>
            {children}
          </h4>
        ),
        h5: ({ children, ...props }) => (
          <h5 className="" {...props}>
            {children}
          </h5>
        ),
        p: ({ children, ...props }) => (
          <p  className=" markdown-p" {...props}>
            {children}
          </p>
        ),
        small: ({ children, ...props }) => (
          <small className="markdown-small" {...props}>
            {children}
          </small>
        ),
        a: ({ children, ...props }) => (
          <a className="text-blue-600 hover:text-blue-800 underline markdown-a" {...props}>
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
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4 markdown-bq"
            {...props}
          >
            {children}
          </blockquote>
        ),
        ul: ({ children, ...props }) => (
          <ul className=" markdown-ul" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className=" markdown-ol" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className=" markdown-li" {...props}>
            {children}
          </li>
        ),
        pre: ({ children, ...props }) => (
          <pre
            className="markdown-pre"
            {...props}
          >
            {children}
          </pre>
        ),
        img: ({ alt, src, ...props }) => (
          <img
            className="markdown-img"
            alt={alt}
            src={src}
            {...props}
          />
        ),
        hr: (props) => <hr className="markdown-hr" {...props} />,
      }}
      className="prose xl:prose-xl lg:prose-lg md:prose-md sm:prose-sm"
    >
      {content}
    </ReactMarkdown>
  );
}

export default Markdown;

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
          <h3 className="text-2xl font-semibold text-gray-600 my-4" {...props}>
            {children}
          </h3>
        ),
        h4: ({ children, ...props }) => (
          <h4 className="text-xl font-semibold text-gray-600 my-3" {...props}>
            {children}
          </h4>
        ),
        h5: ({ children, ...props }) => (
          <h5 className="text-lg font-semibold text-gray-500 my-2" {...props}>
            {children}
          </h5>
        ),
        p: ({ children, ...props }) => (
          <p className="text-base text-gray-700 my-4" {...props}>
            {children}
          </p>
        ),
        small: ({ children, ...props }) => (
          <small className="text-sm text-gray-500" {...props}>
            {children}
          </small>
        ),
        a: ({ children, ...props }) => (
          <a className="text-blue-600 hover:text-blue-800 underline" {...props}>
            {children}
          </a>
        ),
        code: ({ children, ...props }) => (
          <code
            className="bg-gray-200 rounded px-2 py-1 text-red-600"
            {...props}
          >
            {children}
          </code>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
            {...props}
          >
            {children}
          </blockquote>
        ),
        ul: ({ children, ...props }) => (
          <ul className="list-disc pl-5 my-4" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="list-decimal pl-5 my-4" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="mb-2 text-gray-700" {...props}>
            {children}
          </li>
        ),
        pre: ({ children, ...props }) => (
          <pre
            className="bg-gray-900 text-white p-4 rounded my-4 overflow-x-auto"
            {...props}
          >
            {children}
          </pre>
        ),
        img: ({ alt, src, ...props }) => (
          <img
            className="max-w-full h-auto my-4"
            alt={alt}
            src={src}
            {...props}
          />
        ),
        hr: (props) => <hr className="border-gray-300 my-6" {...props} />,
      }}
      className="prose xl:prose-xl lg:prose-lg md:prose-md sm:prose-sm"
    >
      {content}
    </ReactMarkdown>
  );
}

export default Markdown;

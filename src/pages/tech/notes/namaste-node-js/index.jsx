import React, { useState } from "react";
// import ReactMarkdown from 'react-markdown';

const mockMarkdownContent = `
# Welcome to Season 1
Here is some introductory content for Season 1.

## Section 1
Details about Section 1...

## Section 2
Details about Section 2...
`;

const Sidebar = ({ onSectionClick }) => {
  return (
    <div className="w-1/4 bg-gray-200 h-full p-4 overflow-y-auto">
      <h2 className="text-orange-600 text-xl font-bold mb-4">Season 1</h2>
      <div className="space-y-4">
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 00")}
        >
          <h3 className="font-semibold">Episode-00</h3>
          <p className="text-sm truncate">Welcome to NamasteNodeJS</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 01")}
        >
          <h3 className="font-semibold">Episode-01</h3>
          <p className="text-sm truncate">Introduction to NodeJS</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 02")}
        >
          <h3 className="font-semibold">Episode-02</h3>
          <p className="text-sm truncate">JS on Server</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 03")}
        >
          <h3 className="font-semibold">Episode-03</h3>
          <p className="text-sm truncate">Let's write code</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 04")}
        >
          <h3 className="font-semibold">Episode-04</h3>
          <p className="text-sm truncate">module.export & require</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 05")}
        >
          <h3 className="font-semibold">Episode-05</h3>
          <p className="text-sm truncate">Diving into the NodeJS github repo</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 06")}
        >
          <h3 className="font-semibold">Episode-06</h3>
          <p className="text-sm truncate">libuv & async IO</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 07")}
        >
          <h3 className="font-semibold">Episode-07</h3>
          <p className="text-sm truncate">sync, async, setTimeoutZero - code</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded "
          onClick={() => onSectionClick("Episode 08")}
        >
          <h3 className="font-semibold">Episode-08</h3>
          <p className="text-sm truncate">Deep dive into v8 JS Engine</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 09")}
        >
          <h3 className="font-semibold">Episode-09</h3>
          <p className="text-sm truncate">libuv & Event Loop</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 10")}
        >
          <h3 className="font-semibold">Episode-10</h3>
          <p className="text-sm truncate">Thread pool in libuv</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 11")}
        >
          <h3 className="font-semibold">Episode-11</h3>
          <p className="text-sm truncate">Creating a Server</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 12")}
        >
          <h3 className="font-semibold">Episode-12</h3>
          <p className="text-sm truncate">Databases - SQL & NoSQL</p>
        </div>
        <div
          className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => onSectionClick("Episode 13")}
        >
          <h3 className="font-semibold">Episode-13</h3>
          <p className="text-sm truncate">Creating a database & mongodb</p>
        </div>
      </div>
    </div>
  );
};

const NamasteNodeJS = () => {
  const [selectedSection, setSelectedSection] = useState("Season 1");
  const [markdownContent, setMarkdownContent] = useState(mockMarkdownContent);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    // Replace with actual content based on section
    setMarkdownContent(mockMarkdownContent);
  };

  // document.body.style.overflow = 'hidden';
  {
    /* <ReactMarkdown>{content}</ReactMarkdown>
      Notes */
  }

  return (
    <div className="flex border border-red-500 h-[93vh]">
      <Sidebar onSectionClick={handleSectionClick} />
      <div className="w-3/4 bg-white h-screen p-6 overflow-y-auto">
        <h1 className="text-2xl text-orange-500 text-center font-">
          Writing Soon
        </h1>
      </div>
    </div>
  );
};
export default NamasteNodeJS;

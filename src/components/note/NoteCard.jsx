import { Router, useRouter } from "next/router";
import React from "react";

const NoteCard = ({ data }) => {
  const router = useRouter();
  const {
    title = "Default Title",
    sourceLink = "#",
    sourceName = "Source Name",
    by = "Author Name",
    lastUpdated = "Last updated: Aug 20, 2024",
    publishedOn = "Published on: Aug 18, 2024",
    thumbnailUrl = "https://via.placeholder.com/150",
    hashTags = ["tag1", "tag2", "tag3"],
    githubLink = "",
    isComingSoon,
    inProgress,
    route,
  } = data;
  return (
    <div
      onClick={() => {
        router.push(route);
      }}
      className={`border rounded-lg p-4 shadow-md cursor-pointer relative  bg-white flex flex-col md:flex-row items-start ${
        inProgress
          ? "border   border-t-4 border-orange-500"
          : isComingSoon
          ? "border  border-t-4 border-yellow-500"
          : "border   border-t-4 border-green-500"
      }`}
    >
      <div className="flex-1 w-full md:w-auto">
        <h2 className="font-bold text-xl text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">By:</span> {by}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-semibold">Source:</span>
          <a
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            {sourceName}
          </a>
        </p>
        <p className="text-gray-500 text-sm">{lastUpdated}</p>
        <p className="text-gray-500 text-sm mb-4">{publishedOn}</p>
        <div className="flex flex-wrap gap-2">
          {hashTags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:ml-4">
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="lg:w-32 h-32 w-full object-cover rounded-lg"
        />
      </div>
       {/* <span className="absolute top-0 left-0 text-xs bg-orange-600 rounded-lg text-white font-serif p-1 rounded-l-0 opacity-25">{inProgress ? 'In progress': isComingSoon ? 'Coming soon': 'Ready to read'}</span> */}
    </div>
  );
};

export default NoteCard;

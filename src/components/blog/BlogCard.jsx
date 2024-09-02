import {
  DEFAULT_AVATAR,
  DEFAULT_FOLLOW_LINK,
  DEFAULT_THUMBNAIL,
} from "@/utils/constant";
import { ensureHttps } from "@/utils/functions";
import { useRouter } from "next/router";
import React from "react";

const BlogCard = ({ data }) => {
  const router = useRouter();
  const {
    author: name = "Anonyms User",
    date: writtenOn = "Today",
    title = "Blog Title",
    minRead = "",
    tags = [],
    profilePic = DEFAULT_AVATAR,
    thumbnail = DEFAULT_THUMBNAIL, // Default thumbnail image
    followLink = DEFAULT_FOLLOW_LINK,
  } = data;

  function changeFilePath(filePath) {
    const newFilePath = filePath.replace("/public", "");
    return newFilePath;
  }
  function generateSlug(str) {
    return str
      .toLowerCase() // Convert the string to lowercase
      .trim() // Remove whitespace from both ends
      .replace(/[^a-z0-9\s-]/g, "") // Remove all non-word characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
  }

  return (
    <div
      onClick={() => {
        router.push("/blog/" + generateSlug(title));
      }}
      className=" rounded-lg p-4 shadow-md w-full border    hover:shadow-xl relative cursor-pointer bg-white flex flex-col md:flex-row max-w-6xl items-center"
    >
      <div className="flex-1 w-full md:w-auto">
        <div className="flex items-center mb-4">
          <img
            src={changeFilePath(profilePic)}
            alt={`${name}'s profile`}
            className="w-10 h-10 rounded-full"
          />

          <div className="ml-3">
            <div className="font-semibold text-gray-900">
              {name}{" "}
              <button
                onClick={(e)=>{
                  e.stopPropagation()
                  window.open(ensureHttps(followLink), "_blank");
                }}
                target="_blank"
                className="text-green-600 ml-2 font-semibold cursor-pointer"
              >
                Follow
              </button>
            </div>
            <div className="text-gray-500 text-xs">{writtenOn}</div>
          </div>
        </div>
        <h2 className="font-bold text-lg md:text-xl lg:text-3xl text-gray-900 mb-4 truncate">
          {title}
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-3">
            {/* <span role="img" aria-label="reactions">
              ❤️ 2 Reactions
            </span>
            <span>
              💬 1 Comment
            </span> */}
            {minRead && <span>⏲️ {minRead} min read</span>}
          </div>
        </div>
      </div>
      {thumbnail && (
        <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
          <img
            src={changeFilePath(thumbnail)}
            alt="thumbnail"
            className="w-full md:w-24 h-24 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default BlogCard;

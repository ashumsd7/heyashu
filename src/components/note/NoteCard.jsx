import { Router, useRouter } from "next/router";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const colorStyles = [
  { textColor: "text-[#026AA2]", bgColor: "bg-[#F0F9FF]" },
  { textColor: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
  { textColor: "text-[#C4320A]", bgColor: "bg-[#FFF6ED]" },
  { textColor: "text-[#363F72]", bgColor: "bg-[#DDE5FF]" },
];

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
        if (isComingSoon) return;
        router.push(route);
      }}
      className={`  cursor-pointer relative mb-10  bg-white flex flex-col md:flex-row items-start ${
        inProgress ? "   " : isComingSoon ? "  opacity-55" : ""
      }`}
    >
      <div className="flex-1 w-full md:w-auto">
        <div className="">
          <img
            src={thumbnailUrl}
            alt="thumbnail"
            className=" h-[240px] w-full object-cover "
          />
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <div className="flex gap-2 items-center">
            {/* <p className="text-gray-500 text-sm">{lastUpdated}</p> */}
            <p className="text-[#6941C6] text-sm font-semibold">{by}</p> ●
            <p className="text-[#6941C6] text-sm font-semibold ">
              {publishedOn || "Coming Soon"}
            </p>
          </div>
          <div className="flex justify-between">
            <h2 className="font-bold text-2xl text-gray-900 truncate ">
              {title}
            </h2>
            <MdArrowOutward className="text-2xl cursor-pointer " />
          </div>
          <p className="text-[#667085] flex gap-2 text-base leading-6">
            Get the best-explained notes for each chapter of the Namaste Node.js
            course by Akshay Saini. These notes are written by Ashutosh and can
            be edited on GitHub.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {hashTags.map((tag, index) => {
            const { textColor, bgColor } =
              colorStyles[index % colorStyles.length]; // Rotate colors if hashtags exceed color options
            return (
              <span
                key={index}
                className={`${bgColor} ${textColor}  px-2 font-semibold text-base py-1 rounded`}
              >
                #{tag}
              </span>
            );
          })}
        </div>
      </div>

      {/* <span className="absolute top-0 left-0 text-xs bg-orange-600 rounded-lg text-white font-serif p-1 rounded-l-0 opacity-25">{inProgress ? 'In progress': isComingSoon ? 'Coming soon': 'Ready to read'}</span> */}
    </div>
  );
};

export default NoteCard;

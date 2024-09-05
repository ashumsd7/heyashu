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

const NoteCard = ({ data, v2 }) => {
  const router = useRouter();

  const {
    title = "Default Title",
    sourceLink = "#",
    sourceName = "Source Name",
    by = "Author Name",
    lastUpdated = "Last updated: Aug 20, 2024",
    publishedOn = "Published on: Aug 18, 2024",
    thumbnailUrl = "https://via.placeholder.com/150",
    tags = ["tag1", "tag2", "tag3"],
    githubLink = "",
    isComingSoon,
    inProgress,
    route,
    shortDesc,
  } = data;
  return (
    <div
      onClick={() => {
        if (isComingSoon) return;
        router.push(route);
      }}
      className={`  cursor-pointer border rounded-lg relative mb-2  hover:bg-[#e5f6e5]   flex flex-col md:flex-row items-start  p-4  transform transition-all duration-200 ease-in hover:scale-105 hover-bg-white hover:shadow-xl  ${
        inProgress
          ? "   "
          : isComingSoon
          ? "  opacity-30 hover:scale-100 hover:shadow-none"
          : ""
      }`}
    >
      <div className="flex-1 w-full md:w-auto">
        <div className="">
          {/* <img
            src={thumbnailUrl}
            alt="thumbnail"
            className=" h-[100px] rounded-full w-[100px] object-cover "
          /> */}
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center ">
              <img
                src={thumbnailUrl}
                alt="thumbnail"
                className=" h-[50px] rounded-full w-[50px] object-cover border-2 border-gray-700 "
              />
              <div className="flex  flex-col">
                <h2 className=" font-light text-[32px] max-w-80 truncate ">
                  {title.toUpperCase()}
                </h2>
                <div className="flex gap-2 -mt-1 items-center">
                  {/* <p className="text-gray-500 text-sm">{lastUpdated}</p> */}
                  <p className=" text-sm font-light">{by}</p> ●
                  <p className=" text-sm font-light ">
                    {publishedOn || "Coming Soon"}
                  </p>
                </div>
              </div>
            </div>

            {!inProgress && !isComingSoon && (
              <MdArrowOutward className="text-2xl cursor-pointer " />
            )}
          </div>

          <p className="flex gap-2 text-base font-light leading-6 ">
            {shortDesc}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, index) => {
            const { textColor, bgColor } =
              colorStyles[index % colorStyles.length]; // Rotate colors if hashtags exceed color options
            return (
              <span
                key={index}
                className={`${bgColor} ${textColor}  px-2 font-light text-sm py-1 rounded`}
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
// text-[#6941C6]

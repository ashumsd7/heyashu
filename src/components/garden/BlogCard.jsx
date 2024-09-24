import {
  DEFAULT_AVATAR,
  DEFAULT_FOLLOW_LINK,
  DEFAULT_THUMBNAIL,
} from "@/utils/constant";
import { ensureHttps, formateDate, generateSlug } from "@/utils/functions";
import dayjs from "dayjs";
import { MdSunnySnowing } from "react-icons/md";
import { useRouter } from "next/router";
import React from "react";
import { LiaSeedlingSolid } from "react-icons/lia";
const BlogCard = ({ data, subPath = "/digital-garden/blog/" }) => {
  const router = useRouter();
  const {
    author: author = "Anonyms User",
    date: writtenOn = "Today",
    name,
    title = "Dummy Plant",
    minRead = "",
    tags = [],
    profilePic = DEFAULT_AVATAR,
    thumbnail = "",
    followLink = DEFAULT_FOLLOW_LINK,
  } = data;

  function changeFilePath(filePath) {
    const newFilePath = filePath.replace("/public", "");
    return newFilePath;
  }
  const formattedDate = formateDate(writtenOn);
  return (
    <div
      onClick={() => {
        router.push(subPath + generateSlug(title));
      }}
      className=" rounded-lg px-4 py-2   lg:border-none hover:bg-[#f6f2e5]   transform transition-all cursor-pointer duration-200 ease-in hover:scale-[101%] hover:shadow-md "
    >
      <div className="flex-1 w-full md:w-auto">
        <div className="flex items-center mb-1">
          {/* <img
            src={changeFilePath(profilePic)}
            alt={`${name}'s profile`}
            className="w-8 h-8 rounded-full object-cover"
          /> */}

          {/* <div className="ml-3">
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open(ensureHttps(followLink), "_blank");
              }}
              className=" text-wrap text-gray-800 text-xs   cursor-pointer"
            >
              {name}{" "}
            </div>
          </div> */}
        </div>
        <h2 className="font-normal text-[18px]  text-gray-900  ">{name || title}</h2>
        {/* {tags.length &&  <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className=" text-gray-700 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>} */}
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
      <div className="flex flex-col gap-2  mt-1  ">
        <div className="text-gray-500 text-xs flex items-center gap-2 font-light">
          {" "}
          <LiaSeedlingSolid
            title="Seeded on"
            className="text-lg text-gray-500  "
          />
          {/* {formattedDate} */}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            window.open(ensureHttps(followLink), "_blank");
          }}
          className=" text-wrap text-gray-800 text-xs font-light  flex items-center gap-2   cursor-pointer"
        >
          <MdSunnySnowing /> {author}{" "}
        </div>
      </div>

      {/* {thumbnail && (
        <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
          <img
            src={changeFilePath(thumbnail)}
            alt="thumbnail"
            className="w-full md:w-24 h-24 object-cover rounded-lg"
          />
        </div>
      )} */}
    </div>
  );
};

export default BlogCard;

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
import { PiFlowerTulipThin } from "react-icons/pi";
import { GiFlowerPot } from "react-icons/gi";
import { LiaSeedlingSolid } from "react-icons/lia";
const BlogCardv2 = ({ data, subPath = "/digital-garden/blog/" }) => {
  const router = useRouter();
  const {
    author: author = "Anonyms User",
    date: writtenOn = "Today",
    name,
    title = "Dummy Plant",
    minRead = "",
    tags = "",
    profilePic = DEFAULT_AVATAR,
    thumbnail = "",
    followLink = DEFAULT_FOLLOW_LINK,
  } = data;


  function changeFilePath(filePath) {
    const newFilePath = filePath.replace("/public", "");
    return newFilePath;
  }
  const formattedDate = formateDate(writtenOn);
  const firstTag = tags ? tags?.split(",")[0].trim() : "";

  return (
    <div
      onClick={() => {
        router.push(subPath + generateSlug(title));
      }}
      className="flex lg:gap-4 gap-1 items-center  hover:bg-[#faf9f7] p-2  transform transition-all cursor-pointer duration-200 ease-in hover:scale-[101%] hover:shadow-sm hover:rounded-md  "
    >
      <div className="">
        <GiFlowerPot className="text-green-700 font-semibold lg:text-4xl text-3xl" />
      </div>
      <div className="max-w-sm rounded overflow-hidden   h-full border-l-2  pl-4 ">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          #{firstTag}
        </span>

        <h2 className="lg:text-xl text-lg font-bold mt-1 flex-1 text-gray-700 ">
          {name || title}
        </h2>

        <hr className="my-2 border-gray-300" />

        <p className="text-gray-500 font-base text-sm">By {author}</p>
      </div>
    </div>
  );
};

export default BlogCardv2;

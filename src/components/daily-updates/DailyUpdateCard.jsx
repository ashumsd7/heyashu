import {
  DEFAULT_AVATAR,
  DEFAULT_FOLLOW_LINK,
  DEFAULT_THUMBNAIL,
} from "@/utils/constant";
import { ensureHttps, formateDate, generateSlug } from "@/utils/functions";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { RiPlantFill } from "react-icons/ri";
import { PiPottedPlantBold  } from "react-icons/pi";
import { GiPlantWatering } from "react-icons/gi";
const DailyUpdateCard = ({ data }) => {
  const router = useRouter();
  const {
    author: name = "Anonyms User",
    updateDate: updatedOn = "Today",
    date: publishDate = "Today",
    title = "Blog Title",
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
  const formattedDate = formateDate(updatedOn);
  console.log("tags", tags);
  return (
    <div
      onClick={() => {
        router.push(
          "/digital-garden/daily-updates/" + generateSlug(title)
        );
      }}
      className=" rounded-lg p-4 flex gap-2  lg:border-none hover:bg-[#f6f2e5]   transform transition-all cursor-pointer duration-200 ease-in hover:scale-105 hover:shadow-xl "
    >
      <h2 className="font-light text-2xl md:text-xl lg:text-3xl text-green-700 ">
        {" "}
        <PiPottedPlantBold className="text-green-700"  />
      </h2>
      <div className="flex flex-col gap-2 ">
        <div className=" w-full md:w-auto">
          <h2 className="font-light text-2xl md:text-xl lg:text-3xl text-gray-900  ">
            {title}
          </h2>
        </div>
        <div className="text-gray-500 text-xs  text-left flex items-center gap-2 ">
          <GiPlantWatering className="text-xl text-green-500 " /> Watered last on:{" "}
          {formattedDate}
        </div>
      </div>
    </div>
  );
};

export default DailyUpdateCard;

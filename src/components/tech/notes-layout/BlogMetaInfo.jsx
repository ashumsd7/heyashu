import React, { useEffect, useState } from "react";
import { FaGithub, FaRegHeart } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoMdDownload } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
// import { FcLike, FcLikePlaceholder } from "react-icons/fc";

// import Share from "@/components/ui/Share";
import dynamic from "next/dynamic";
import Switch from "@/components/base/Switch";
import { GITHUB_REPO_LINK } from "@/utils/constant";
import { ensureHttps } from "@/utils/functions";
// import axios from "axios";
const Share = dynamic(() => import("@/components/ui/Share"), { ssr: false });
const BlogMetaInfo = ({ data }) => {
  const {
    name = "Ashutosh Anand Tiwari",
    timeRead = "0",
    lastUpdated = "-",
    publishedOn = "-",
    followLink = "https://github.com/ashumsd7/",
    showControls = true,
    isQuicReadSettingOn = false,
    profilePic = "https://avatars.githubusercontent.com/u/40313523?v=4",
    title = "",
    githubLink = GITHUB_REPO_LINK,
    isQuickReadModeOn,
    setIsQuickReadModeOn
  } = data;

  // const [isLiked, setIsLiked] = useState(false);
  // const [likeCount, setLikeCount] = useState(0);

  // function onHitLike() {
  //   setIsLiked(true);
  //   setLikeCount(likeCount + 1);

  //   axios
  //     .post(
  //       "https://aat-portfolio-website-default-rtdb.asia-southeast1.firebasedatabase.app/ded.json", {"name": "test"}
  //     )
  //     .then((res) => {
  //       console.log("res", res);
  //     });
  // }

  // useEffect(() => {
  //   if (window.location.hash) {
  //     const hash = decodeURIComponent(window.location.hash);
  //    let  dbName= hash.split("#")[1]
  //   }
  // }, []);

  return (
    <>
      <div className="flex items-center justify-between    py-4 my-4  ">
        <div className="flex items-center">
          {!profilePic ? (
            <div className="w-10 h-10 bg-purple-600  text-white flex items-center justify-center rounded-full">
              {name.charAt(0)}
            </div>
          ) : (
            <img
              alt="blogger-profile-picture"
              src={profilePic}
              className="w-12 h-12 border-4 border-gray-200  flex items-center justify-center rounded-full"
            />
          )}
          <div className="ml-3 flex flex-col gap-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900">{name}</span>
              <a
                href={ensureHttps(followLink)}
                target="_blank"
                s
                className="text-green-600 font-semibold cursor-pointer"
              >
                Follow
              </a>
            </div>
            {(timeRead || lastUpdated) && (
              <div className="text-gray-500 text-sm flex items-center gap-2">
                <FaBookOpen
                  title={`It will take ${timeRead} min to read this article.`}
                />{" "}
                {timeRead} min read ∘ <FaCalendar title="Published on" />{" "}
                {publishedOn}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end h-[44px] px-4 border-b border-t p-6">
        {showControls && (
          <div className="flex items-center space-x-6">
            {/* Heart Icon */}
            {/* <div className="flex items-center text-gray-600">
              <FaRegHeart />
            </div> */}
            <div className="flex items-center text-gray-600 cursor-pointer">
              <FaGithub
                onClick={() => {
                  window.open(githubLink, "_blank");
                }}
                className=" "
                title="Contribute to the repo"
              />
            </div>
            {/* Clap Icon */}
            {/* <div className="flex items-center text-gray-600">
              <FaHandsClapping />
            </div> */}
            {/* Share Icon */}
            {/* <div className="flex items-center text-gray-600">
              <HiOutlineSpeakerWave />
            </div> */}
            {/* Three Dots Icon */}
            {/* <div className="flex items-center text-gray-600">
              <IoMdDownload />
            </div> */}
            {isQuicReadSettingOn && <div className="flex items-center text-gray-600">
              <Switch
                isOn={isQuickReadModeOn}
                handleToggle={() => {
                  setIsQuickReadModeOn(!isQuickReadModeOn);
                }}
              />
            </div>}
            {/* <div className="flex items-center text-gray-600">
              <BsThreeDotsVertical />
            </div> */}
            <Share title={title} />
          </div>
        )}
      </div>
    </>
  );
};

export default BlogMetaInfo;

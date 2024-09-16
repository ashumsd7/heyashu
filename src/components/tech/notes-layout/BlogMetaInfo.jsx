import React from "react";
import { FaGithub, FaRegHeart } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import dynamic from "next/dynamic";
import Switch from "@/components/base/Switch";
import { ADMIN_LINK, DEFAULT_FOLLOW_LINK, GITHUB_REPO_LINK } from "@/utils/constant";
import { ensureHttps, removePublicFromPath } from "@/utils/functions";
import { MdEdit } from "react-icons/md";
import { LiaSeedlingSolid } from "react-icons/lia";
// import axios from "axios";
const Share = dynamic(() => import("@/components/ui/Share"), { ssr: false });
const BlogMetaInfo = ({ data }) => {
  const {
    name = "Anonymous Gardener",
    timeRead = "0",
    lastUpdated = "-",
    publishedOn = "-",
    followLink = DEFAULT_FOLLOW_LINK,
    showControls = true,
    isQuicReadSettingOn = false,
    profilePic = "https://avatars.githubusercontent.com/u/40313523?v=4",
    title = "",
    githubLink = GITHUB_REPO_LINK,
    isQuickReadModeOn,
    setIsQuickReadModeOn,
  } = data;

  

  return (
    <>
      <div className="flex items-center justify-between    py-4   ">
        <div className="flex items-center gap-1 flex-wrap">
          {!profilePic ? (
            <div className="w-10 h-10 bg-purple-600  text-white flex items-center justify-center rounded-full">
              {name.charAt(0)}
            </div>
          ) : (
            <img
              alt="blogger-profile-picture"
              src={removePublicFromPath(profilePic)}
              className="w-12 h-12 border-4 border-gray-300  object-cover flex items-center justify-center rounded-full"
            />
          )}
          <div className="ml-3 flex flex-col gap-1 ">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="font-semibold text-sm mr-2">{name}</span>
              <a
                href={ensureHttps(followLink)}
                target="_blank"
                className="text-green-600 font-semibold cursor-pointer"
              >
                Follow
              </a>
            </div>
            {(timeRead || lastUpdated) && (
              <div className="text-gray-500 text-sm flex items-center gap-2 flex-wrap">
                <FaBookOpen
                  title={`It will take ${timeRead} min to read this article.`}
                />{" "}
                {timeRead} min read {" "}
                <LiaSeedlingSolid title="Seeded on"/>  {publishedOn}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end h-[40px]  border-b border-t px-6">
        {showControls && (
          <div className="flex items-center space-x-6 flex-wrap">
            {/* Heart Icon */}
            {/* <div className="flex items-center text-gray-600">
              <FaRegHeart />
            </div> */}
            <div
              onClick={() => {
                window.open(ADMIN_LINK, "_blank");
              }}
              className="flex items-center justify-center text-gray-600 cursor-pointer gap-[2px] "
            >
              <MdEdit className="text-xl " title="Edit this page" />
              {/* <span className=" cursor-pointer">Edit this page</span> */}
            </div>
            <div className="flex items-center flex-wrap text-gray-600 cursor-pointer gap-[2px] flex-col">
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
            {isQuicReadSettingOn && (
              <div className="flex items-center text-gray-600">
                <Switch
                  isOn={isQuickReadModeOn}
                  handleToggle={() => {
                    setIsQuickReadModeOn(!isQuickReadModeOn);
                  }}
                />
              </div>
            )}
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

import React from "react";
import { FaGithub, FaRegHeart } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import dynamic from "next/dynamic";
import Switch from "@/components/base/Switch";
import {
  ADMIN_LINK,
  DEFAULT_FOLLOW_LINK,
  GITHUB_REPO_LINK,
} from "@/utils/constant";
import { ensureHttps, removePublicFromPath } from "@/utils/functions";
import { MdEdit } from "react-icons/md";
import { LiaSeedlingSolid } from "react-icons/lia";
import { FaCircleInfo, FaHandsClapping } from "react-icons/fa6";
import Button from "@/components/base/Button";
import { BsInfoLg } from "react-icons/bs";
import { useRouter } from "next/router";
// import axios from "axios";
const Share = dynamic(() => import("@/components/ui/Share"), { ssr: false });
const BlogMetaInfo = ({ data }) => {
  const router= useRouter()
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
    isAnalysisPageOn,
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
                {timeRead} min read <LiaSeedlingSolid title="Seeded on" />{" "}
                {publishedOn}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex  h-[40px]  border-b border-t px-2">
        {showControls && (
          <div className="flex items-center space-x-2 flex-wrap justify-between w-full">
            {isAnalysisPageOn && (
              <div
                onClick={() => {
                  router.push(isAnalysisPageOn?.isAnalysisPageOn);
                }}
                className="flex items-center justify-center  cursor-pointer gap-[3px] px-2 rounded-md "
              >
                <FaCircleInfo className="text-xs mt-1 " title="see analysis" /> <span className="text-xs">see analysis</span>
              </div>
            )}
            <div className="flex gap-1">
              {/* Heart Icon */}
              {/* <div className="flex items-center text-gray-600">
              <FaRegHeart />
            </div> */}

              <div
                onClick={() => {
                  window.open(ADMIN_LINK, "_blank");
                }}
                className="flex items-center justify-center  cursor-pointer gap-[1px]  text-black px-2 rounded-md "
              >
                <MdEdit className="text-xs " title="Edit this page" />
                <span className=" cursor-pointer text-sm">Edit this page</span>
              </div>

              <div className="flex items-center  justify-center   cursor-pointer gap-[2px] flex-col text-green-600  px-2 rounded-md ">
                <FaRegHeart
                  onClick={() => {
                    window.open(githubLink, "_blank");
                  }}
                  className=" "
                  title="⭐Star the repo"
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
          </div>
        )}
      </div>
    </>
  );
};

export default BlogMetaInfo;

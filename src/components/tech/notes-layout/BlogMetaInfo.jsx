import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoMdDownload } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

const BlogMetaInfo = ({
  name = "Ashutosh Anand Tiwari",
  timeRead = "0 min read",
  lastUpdated = "-",
  followLink = "https://aat.netlify.app",
  showControls = false,
  profilePic = "https://avatars.githubusercontent.com/u/40313523?v=4",
}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-4">
      <div className="flex items-center">
        {!profilePic ? (
          <div className="w-10 h-10 bg-purple-600  text-white flex items-center justify-center rounded-full">
            {name.charAt(0)}
          </div>
        ) : (
          <img
            src={profilePic}
            className="w-12 h-12 border-4 border-gray-200  flex items-center justify-center rounded-full"
          />
        )}
        <div className="ml-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">{name}</span>
            <a
              href={followLink}
              className="text-green-600 font-semibold cursor-pointer"
            >
              Follow
            </a>
          </div>
          {(timeRead || lastUpdated) && (
            <div className="text-gray-500 text-sm">
             ⌚ {timeRead} min read  {lastUpdated}
            </div>
          )}
        </div>
      </div>
      {showControls && (
        <div className="flex items-center space-x-6">
          {/* Heart Icon */}
          <div className="flex items-center text-gray-600">
            <FaRegHeart />
          </div>
          {/* Clap Icon */}
          <div className="flex items-center text-gray-600">
            <FaHandsClapping />
          </div>
          {/* Share Icon */}
          <div className="flex items-center text-gray-600">
            <HiOutlineSpeakerWave />
          </div>
          {/* Three Dots Icon */}
          <div className="flex items-center text-gray-600">
            <IoMdDownload />
          </div>
          <div className="flex items-center text-gray-600">
            <BsThreeDotsVertical />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogMetaInfo;

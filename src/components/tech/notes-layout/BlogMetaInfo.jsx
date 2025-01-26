import React from "react";
import { FaGithub, FaChevronDown } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  ADMIN_LINK,
  DEFAULT_FOLLOW_LINK,
  GITHUB_REPO_LINK,
} from "@/utils/constant";
import dynamic from "next/dynamic";
import { ensureHttps, removePublicFromPath } from "@/utils/functions";
import { MdEdit } from "react-icons/md";
import { LiaSeedlingSolid } from "react-icons/lia";
import { FaCircleInfo, FaHandsClapping } from "react-icons/fa6";
8
import { useRouter } from "next/router";
import { IoIosCheckmarkCircle } from "react-icons/io";
const Share = dynamic(() => import("@/components/ui/Share"), { ssr: false });
const BlogMetaInfo = ({ data }) => {
  const router = useRouter();
  const {
    name = "Anonymous Gardener",
    timeRead = "0",
    lastUpdated = "-",
    publishedOn = "-",
    followLink = DEFAULT_FOLLOW_LINK,
    showControls = true,
    title = "",
    profilePic = "https://avatars.githubusercontent.com/u/40313523?v=4",
    githubLink = GITHUB_REPO_LINK,
    isAnalysisPageOn,
  } = data;

  return (
    <div className="bg-transparent rounded-lg shadow-sm">
    {/* Author Info Section */}
    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 flex-wrap">
      <div className="flex items-center gap-3 sm:gap-4 w-full">
        {!profilePic ? (
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-purple-700 text-white flex items-center justify-center rounded-full text-lg font-medium shadow-sm flex-shrink-0">
            {name.charAt(0)}
          </div>
        ) : (
          <img
            alt={`${name}'s profile picture`}
            src={removePublicFromPath(profilePic)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-gray-100 shadow-sm flex-shrink-0"
          />
        )}
        
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-semibold text-gray-800 text-sm sm:text-base">{name}</span>
            <a
              href={ensureHttps(followLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 rounded-full transition-colors duration-200"
            >
              <FaHandsClapping className="text-xs" />
              Follow
            </a>
          </div>
          
          {(timeRead || lastUpdated) && (
            <div className="text-gray-500 text-xs sm:text-sm flex items-center gap-2 sm:gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <FaBookOpen className="text-gray-400" />
                {timeRead} min read
              </span>
              <span className="flex items-center gap-1.5">
                <LiaSeedlingSolid className="text-gray-400" />
                Published: {publishedOn}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Controls Section */}
    {showControls && (
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[50%] sm:w-auto">
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 bg-gray-900/95 border border-gray-700 p-1.5 rounded-lg shadow-lg backdrop-blur w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(ADMIN_LINK, "_blank")}
            className="flex items-center gap-1 text-xs sm:text-sm text-gray-200 hover:text-white px-2 sm:px-2.5 py-1 rounded-md hover:bg-gray-800/80 transition-colors flex-1 sm:flex-initial justify-center"
          >
            <MdEdit className="text-sm" />
            <span>Edit</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(githubLink, "_blank")}
            className="flex items-center gap-1 text-xs sm:text-sm text-gray-200 hover:text-white px-2 sm:px-2.5 py-1 rounded-md hover:bg-gray-800/80 transition-colors flex-1 sm:flex-initial justify-center"
          >
            <FaGithub className="text-sm" />
            <span>Star</span>
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-md hover:bg-gray-800/80 flex-1 sm:flex-initial"
          >
            <Share title={title} />
          </motion.div>
        </div>
      </div>
    )}
  </div>
  );
};

const SectionHeader = ({ isSec1Visible, setIsSec1Visible, contentListTitle }) => (
  <motion.div
    whileTap={{ scale: 0.99 }}
    className="flex justify-between items-center p-3 cursor-pointer border-b border-gray-100"
    onClick={() => setIsSec1Visible(!isSec1Visible)}
  >
    <h2 className="text-lg font-bold text-gray-700 truncate">
      {contentListTitle}
    </h2>
    <motion.div
      animate={{ rotate: isSec1Visible ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <FaChevronDown className="text-gray-500 text-sm" />
    </motion.div>
  </motion.div>
);

const ListContent = ({
  item,
  storedValues,
  onSectionClick,
  selectedSection,
  eachCardPrefix,
}) => (
  <motion.div
    whileHover={{ x: 2 }}
    whileTap={{ scale: 0.99 }}
    className={`
      relative cursor-pointer p-2.5 rounded-md text-sm
      transition-all duration-150 ease-in-out
      ${
        storedValues && storedValues[item?.name]
          ? " border-l-2 border-blue-400"
          : "hover:bg-white border-l-2 border-transparent"
      }
      ${
        selectedSection?.title === item?.title &&
        "  border-l-2 border-blue-500 font-medium"
      }
      ${!item?.publishedOn && "opacity-40 cursor-not-allowed"}
    `}
    onClick={() => item?.publishedOn && onSectionClick(item)}
  >
    <div className="flex items-center gap-2">
      {item.episode === -1 ? (
        <span className="font-medium">Prerequisite</span>
      ) : (
        <div className="flex items-center gap-2">
          {eachCardPrefix && (
            <span className="text-xs font-medium text-gray-600">
              {eachCardPrefix}
              {item.episode}
            </span>
          )}
          <span className="truncate font-medium text-gray-700">
            {!eachCardPrefix && item?.name}
          </span>
        </div>
      )}
    </div>
    
    {eachCardPrefix && (
      <p className="pl-3 truncate text-xs mt-1 text-gray-600">{item?.name}</p>
    )}

    {storedValues && storedValues[item?.name] && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-2 right-2"
      >
        <IoIosCheckmarkCircle className="text-blue-400 text-lg" />
      </motion.div>
    )}
  </motion.div>
);

export default BlogMetaInfo;
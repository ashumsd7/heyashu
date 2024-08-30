import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoMdDownload } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
// import { FcLike, FcLikePlaceholder } from "react-icons/fc";

// import Share from "@/components/ui/Share";
import dynamic from "next/dynamic";
// import axios from "axios";
const Share = dynamic(() => import("@/components/ui/Share"), { ssr: false });
const BlogMetaInfo = ({ data }) => {
  const {
    name = "Ashutosh Anand Tiwari",
    timeRead = "0",
    lastUpdated = "-",
    publishedOn = "-",
    followLink = "https://github.com/ashumsd7/",
    showControls = false,
    profilePic = "https://avatars.githubusercontent.com/u/40313523?v=4",
    title = "",
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
    <div className="flex items-center justify-between   border-b border-gray-300 py-4 my-4 ">
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
        <div className="ml-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">{name}</span>
            <a
              href={followLink}
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

      <div className="pr-2 flex gap-6 items-center">
        {/* <div className="flex gap-1 items-center">
          {isLiked ? (
            <FcLike onClick={onHitLike} className="text-2xl cursor-pointer" />
          ) : (
            <FcLikePlaceholder
              onClick={onHitLike}
              className="text-2xl cursor-pointer"
            />
          )}
          <span className="text-base font-mono">{likeCount}</span>
        </div> */}
        <Share title={title} />
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

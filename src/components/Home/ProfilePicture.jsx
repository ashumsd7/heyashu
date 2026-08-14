import Image from "next/image";
import React, { useState } from "react";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { FaQuora, FaInstagramSquare } from "react-icons/fa";
import { SiWakatime } from "react-icons/si";
import { HOME_SOCIAL_ITEMS, getSocialHref } from "@/data/social";

const PROFILE_ICON_BY_KEY = {
  github: AiFillGithub,
  twitter: AiOutlineTwitter,
  quora: FaQuora,
  linkedin: AiFillLinkedin,
  instagram: FaInstagramSquare,
  wakatime: SiWakatime,
};

function ProfilePicture() {
  const imgPath1 = "/images/profile1.jpg";
  const imgPath2 = "/images/profile.jpg";

  const [currPath, setCurrPath] = useState(imgPath1);

  function onEnter() {
    setCurrPath((prev) => {
      if (prev == imgPath1) return imgPath2;
      return imgPath1;
    });
  }

  function onLeave() {
    setCurrPath(imgPath1);
  }

  return (
    <div className="relative">
      <Image
        src={currPath}
        onClick={onEnter}
        className="hover:shadow-lg rounded-lg mx-auto ease-in-out duration-100 cursor-pointer"
        width={"400"}
        height="400"
        alt="profile-image"
        priority={true}
        loading="eager"
      />

      <div id='social-links' className="text-white flex gap-4 bg-[#16a34a] md:px-2 px-1 py-2 absolute rounded-md bottom-[-15px] left-1/2 transform -translate-x-1/2 z-40">
        {HOME_SOCIAL_ITEMS.map(({ key }) => {
          const Icon = PROFILE_ICON_BY_KEY[key];
          if (!Icon) return null;
          return (
            <Icon
              key={key}
              className="text-xl cursor-pointer"
              onClick={() => window.open(getSocialHref(key), "_blank")}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProfilePicture;

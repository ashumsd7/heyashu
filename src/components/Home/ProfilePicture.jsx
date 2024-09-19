import Image from "next/image";
import React, { useState } from "react";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { FaQuora, FaInstagramSquare } from "react-icons/fa";
import { SiWakatime } from "react-icons/si";
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
        className="hover:shadow-lg   rounded-lg ml-auto ease-in-out duration-100  cursor-pointer"
        width={"400"}
        height="400"
        alt="profile-image"
      />

      <div id='social-links' className="  text-white flex  gap-4  bg-orange-600 md:px-2 px-1 py-2 absolute rounded-md bottom-[-15px] right-[0px] z-40">
        <AiFillGithub
          className="text-xl cursor-pointer"
          onClick={() => {
            window.open("https://github.com/ashumsd7", "_blank");
          }}
        />
        <AiOutlineTwitter
          onClick={() => {
            window.open("https://twitter.com/YourVueJS", "_blank");
          }}
          className="text-xl cursor-pointer"
        />
        <FaQuora
          onClick={() => {
            window.open(
              "https://www.quora.com/profile/%E0%A4%86%E0%A4%B6%E0%A5%81%E0%A4%A4%E0%A5%8B%E0%A4%B7-%E0%A4%86%E0%A4%A8%E0%A4%A8%E0%A5%8D%E0%A4%A6-%E0%A4%A4%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%B0%E0%A5%80-Ashutosh-Anand-Tiwari",
              "_blank"
            );
          }}
          className="text-xl cursor-pointer"
        />
        <AiFillLinkedin
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/ashutoshanandtiwari",
              "_blank"
            );
          }}
          className="text-xl cursor-pointer"
        />
        <FaInstagramSquare
          onClick={() => {
            window.open("https://instagram.com/ashumsd7", "_blank");
          }}
          className="text-xl cursor-pointer"
        />
        <SiWakatime
          onClick={() => {
            window.open("https://wakatime.com/@aat", "_blank");
          }}
          className="text-xl cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ProfilePicture;
// border-4 border-gray-600

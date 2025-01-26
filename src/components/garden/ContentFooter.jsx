import { DEFAULT_AVATAR, DEFAULT_FOLLOW_LINK_INSTA } from "@/utils/constant";
import Image from "next/image";
import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaEarthAsia, FaXTwitter } from "react-icons/fa6";
import { MdPermPhoneMsg } from "react-icons/md";
import { SiPeerlist, SiWakatime } from "react-icons/si";

const ContentFooter = ({
  photoSrc = "https://i.ibb.co/PNKDZ5Q/mountian.png", // Default photo
  name = "Ashutosh Anand Tiwari",
  link = DEFAULT_FOLLOW_LINK_INSTA,
  description = "A front-end engineer with a passion for  learning and exploring the world.",
  // Example: [{ href: '#', icon: 'FacebookIcon' }, { href: '#', icon: 'TwitterIcon' }]
}) => {
  return (
    <footer className="bg-[#f1fdf5] relative   max-w-[1000px] mx-auto p-2 ">
      <div className="flex gap-6 flex-wrap md:flex-nowrap  py-6  rounded-lg w-full  justify-center md:justify-start border-2 shadow-sm border-gray-200">
        <Image
          src={photoSrc}
          alt="Profile"
          width={100}
          height={100}
          className="w-full rounded-full mb-2  object-fill max-w-[100px] max-h-[100px] "
        />
        <div className="flex flex-col gap-2  text-center md:text-left">
          <div className="flex gap-2 items-center flex-wrap">
            <h2 className="text-[#08142c] text-lg font-semibold m">{name}</h2>
            <a
              href={link}
              target="_blank"
              className="text-green-600 font-semibold cursor-pointer animate-pulse animate-bounce"
            >
              Follow
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex  space-x-4 justify-center md:justify-start ">
              <a
                href="https://twitter.com/JavaScripterrr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.instagram.com/javascripterrr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700"
              >
                <FaInstagram />
              </a>
              <a
                href="https://heyashu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600"
              >
                <FaEarthAsia />
              </a>
              <a
                href="https://github.com/ashumsd7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600"
              >
                <FaGithub />
              </a>
              <a
                href="https://wakatime.com/@aat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600"
              >
                <SiWakatime />
              </a>
              <a
                href="https://peerlist.io/ashumsd7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600"
              >
                <SiPeerlist />
              </a>
              <a
                href={"https://topmate.io/aat/1148709/pay"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600"
              >
                <MdPermPhoneMsg />
              </a>
            </div>
          </div>
          <p className="text-[#08142c] font-light  mb-2">{description}</p>
        </div>
        <img
          onClick={() => {
            window.open(githubLink, "_blank");
          }}
          src="https://i.ibb.co/6N8C9vv/github-form.png"
          alt="fork-banner"
          className="absolute w-[100px] h-[100px]  bottom-[90px] right-4 rotate-[45deg] cursor-pointer"
        />
      </div>

      <div>
        <p className="italic font-light absolute -top-8 left-0">
          🌱 Planted and watering by :
        </p>
      </div>
      <div className="flex  justify-center items-center h-10 mt-16 pb-20 flex-col">
        <h2 className="text-xl font-light">🙏 धन्यवाद ! 🙏</h2>
        ---------
      </div>
      <Image
        className=" absolute top-2 right-2"
        width="30"
        height="20"
        alt="tiranga"
        src="https://cdn.pixabay.com/animation/2022/08/21/20/03/20-03-41-348_512.gif"
      />
    </footer>
  );
};

export default ContentFooter;

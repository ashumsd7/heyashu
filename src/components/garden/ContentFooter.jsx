import {
  CONTENT_FOOTER_SOCIAL_KEYS,
  DEFAULT_FOLLOW_LINK_INSTA,
  getSocialHref,
} from "@/data/social";
import Image from "next/image";
import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaEarthAsia, FaXTwitter } from "react-icons/fa6";
import { MdPermPhoneMsg } from "react-icons/md";
import { SiPeerlist, SiWakatime } from "react-icons/si";

const CONTENT_ICON_BY_KEY = {
  twitter: FaXTwitter,
  instagram: FaInstagram,
  website: FaEarthAsia,
  github: FaGithub,
  wakatime: SiWakatime,
  peerlist: SiPeerlist,
  topmate: MdPermPhoneMsg,
};

const CONTENT_ICON_CLASS_BY_KEY = {
  twitter: "text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
  instagram: "text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300",
  website: "text-gray-800 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
  github: "text-gray-800 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
  wakatime: "text-gray-800 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
  peerlist: "text-gray-800 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
  topmate: "text-gray-800 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
};

const ContentFooter = ({
  photoSrc = "https://i.ibb.co/PNKDZ5Q/mountian.png",
  name = "Ashutosh Anand Tiwari",
  link = DEFAULT_FOLLOW_LINK_INSTA,
  description = "A front-end engineer with a passion for learning and exploring the world.",
}) => {
  return (
    <footer className="relative  ">
      <div className="flex gap-6 p-10 flex-wrap md:flex-nowrap py-8 rounded-lg w-full justify-center md:justify-start border-2 shadow-sm border-gray-200 dark:border-gray-700">
        <Image
          src={photoSrc}
          alt="Profile"
          width={100}
          height={100}
          className="w-full rounded-full mb-2 object-fill max-w-[100px] max-h-[100px]"
        />
        <div className="flex flex-col gap-3 text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <h2 className="text-[#08142c] dark:text-gray-100 text-lg font-semibold">{name}</h2>
            <a
              href={link}
              target="_blank"
              className="text-green-600 dark:text-green-400 font-semibold cursor-pointer hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              Follow
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex space-x-5 justify-center md:justify-start">
              {CONTENT_FOOTER_SOCIAL_KEYS.map((key) => {
                const Icon = CONTENT_ICON_BY_KEY[key];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={getSocialHref(key)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-colors ${CONTENT_ICON_CLASS_BY_KEY[key] || ""}`}
                  >
                    <Icon className="text-xl" />
                  </a>
                );
              })}
            </div>
          </div>
          <p className="text-[#08142c] dark:text-gray-300 font-light mb-2">{description}</p>
        </div>
      </div>

      <div>
        <p className="italic font-light absolute -top-8 left-0 text-gray-700 dark:text-gray-300">
          🌱 Planted and watering by :
        </p>
      </div>
      <div className="flex justify-center items-center mt-16 mb-20 flex-col">
        <h2 className="text-xl font-light text-gray-800 dark:text-gray-200">🙏 धन्यवाद ! 🙏</h2>
        <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-700 mt-4"></div>
      </div>
      <Image
        className="absolute top-2 right-2"
        width="30"
        height="20"
        alt="tiranga"
        src="https://cdn.pixabay.com/animation/2022/08/21/20/03/20-03-41-348_512.gif"
      />
    </footer>
  );
};

export default ContentFooter;

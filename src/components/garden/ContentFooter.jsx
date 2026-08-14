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
  twitter:
    "text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
  instagram:
    "text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300",
  website:
    "text-gray-800 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
  github:
    "text-gray-800 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
  wakatime:
    "text-gray-800 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
  peerlist:
    "text-gray-800 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
  topmate:
    "text-gray-800 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
};

const ContentFooter = ({
  photoSrc = "https://i.ibb.co/PNKDZ5Q/mountian.png",
  name = "Ashutosh Anand Tiwari",
  link = DEFAULT_FOLLOW_LINK_INSTA,
  description = "A front-end engineer with a passion for learning and exploring the world.",
}) => {
  return (
    <footer className="relative">
      <div className="flex w-full flex-wrap justify-center gap-4 rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 md:flex-nowrap md:justify-start md:gap-6 md:p-8 md:py-8">
        <Image
          src={photoSrc}
          alt="Profile"
          width={100}
          height={100}
          className="mb-1 max-h-[72px] max-w-[72px] rounded-full object-cover md:mb-2 md:max-h-[100px] md:max-w-[100px]"
        />
        <div className="flex flex-col gap-2 text-center md:gap-3 md:text-left">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
            <h2 className="text-base font-semibold text-[#08142c] dark:text-gray-100 md:text-lg">
              {name}
            </h2>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer font-semibold text-green-600 transition-colors hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              Follow
            </a>
          </div>

          <div className="flex justify-center space-x-4 md:justify-start md:space-x-5">
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
                  <Icon className="text-lg md:text-xl" />
                </a>
              );
            })}
          </div>
          <p className="mb-0 text-sm font-light text-[#08142c] dark:text-gray-300 md:text-base">
            {description}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContentFooter;

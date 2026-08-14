import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaInstagram,
  FaSeedling,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";
import { FaEarthAsia, FaXTwitter } from "react-icons/fa6";
import { SiPeerlist, SiWakatime } from "react-icons/si";
import { MdPermPhoneMsg } from "react-icons/md";
import {
  GARDEN_FOOTER_SOCIAL_ITEMS,
  GITHUB_REPO_LINK,
  SOCIAL_LINKS,
  getSocialHref,
} from "@/data/social";

const FOOTER_ICON_BY_KEY = {
  twitter: FaXTwitter,
  instagram: FaInstagram,
  website: FaEarthAsia,
  github: FaGithub,
  wakatime: SiWakatime,
  peerlist: SiPeerlist,
  youtube: FaYoutube,
  topmate: MdPermPhoneMsg,
};

const FOOTER_HOVER_BY_KEY = {
  twitter: "hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30",
  instagram: "hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/30",
  website: "hover:text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/30",
  github: "hover:text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/30",
  wakatime: "hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30",
  peerlist: "hover:text-green-400 hover:bg-green-500/10 hover:border-green-500/30",
  youtube: "hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30",
  topmate: "hover:text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/30",
};

const DigiGardenFooter = ({ compact = false }) => {
  if (compact) {
    return (
      <footer className="border-t border-gray-200/80 bg-white/70 px-3 py-3 text-center backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/70">
        <p className="flex flex-wrap items-center justify-center gap-1 text-[11px] font-medium text-gray-500 dark:text-gray-400">
          Made with <FaHeart className="inline text-[10px] text-red-500" /> by
          Ashutosh · Digital Garden © {new Date().getFullYear()}
        </p>
      </footer>
    );
  }

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-gray-200/80 bg-white/60 px-3 pb-8 pt-10 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/60 sm:mt-20 sm:px-4 sm:pb-10 sm:pt-14">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/5" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 border-b border-gray-200/70 pb-8 dark:border-gray-800/70 sm:gap-10 sm:pb-12 md:grid-cols-12">
          <div className="space-y-3 sm:space-y-4 md:col-span-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              <FaSeedling className="animate-pulse text-base" />
              <span className="text-[11px] font-bold uppercase tracking-wider sm:text-xs">
                Digital Garden
              </span>
            </div>

            <h3 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl md:text-3xl">
              Curated by Ashutosh Anand Tiwari
            </h3>

            <p className="max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Planting free, open-source tech notes and engineering guides so
              developers worldwide can learn, revise, and excel without paywalls.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 sm:gap-3 sm:pt-2">
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href={SOCIAL_LINKS.instagramDev}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:from-emerald-500 hover:to-teal-500 sm:px-5"
              >
                Follow on Instagram
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href={GITHUB_REPO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-xs font-bold text-gray-800 shadow-sm transition-all hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:px-5"
              >
                Star on GitHub ★
              </motion.a>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 md:col-span-6 lg:col-span-5">
            <div>
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 sm:text-xs">
                Quick Navigation
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm font-medium">
                <a
                  href="/digital-garden/notes"
                  className="text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                >
                  Course Notes
                </a>
                <a
                  href="/blog"
                  className="text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                >
                  Tech Blogs
                </a>
                <a
                  href="/digital-garden#support"
                  className="text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                >
                  Support Garden
                </a>
                <a
                  href={SOCIAL_LINKS.whatsappCommunity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                >
                  WhatsApp Group
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 sm:text-xs">
                Connect &amp; Socials
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {GARDEN_FOOTER_SOCIAL_ITEMS.map(({ key, label }) => {
                  const Icon = FOOTER_ICON_BY_KEY[key];
                  const color = FOOTER_HOVER_BY_KEY[key] || "";
                  return (
                    <motion.a
                      key={key}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={getSocialHref(key)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className={`rounded-xl border border-gray-200/60 bg-gray-100/80 p-2.5 text-gray-600 shadow-sm transition-all dark:border-gray-700/60 dark:bg-gray-800/80 dark:text-gray-300 ${color}`}
                    >
                      <Icon className="text-base" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center text-[11px] font-medium text-gray-500 dark:text-gray-400 sm:flex-row sm:gap-4 sm:pt-8 sm:text-left sm:text-xs">
          <p className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
            Made with{" "}
            <FaHeart className="inline animate-pulse text-xs text-red-500" /> by
            Ashutosh Anand Tiwari · Digital Garden © {new Date().getFullYear()}
          </p>
          <a
            href={SOCIAL_LINKS.whatsappCommunity}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-700 transition-all hover:bg-emerald-500/20 dark:text-emerald-400"
          >
            Join JavaScripterr Community
          </a>
        </div>
      </div>
    </footer>
  );
};

export default DigiGardenFooter;

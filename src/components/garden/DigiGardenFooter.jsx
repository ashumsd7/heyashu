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
import { DEFAULT_FOLLOW_LINK_INSTA, GITHUB_REPO_LINK } from "@/utils/constant";

const SOCIALS = [
  {
    href: "https://twitter.com/JavaScripterrr",
    label: "X / Twitter",
    icon: FaXTwitter,
    color: "hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30",
  },
  {
    href: "https://www.instagram.com/javascripterrr",
    label: "Instagram",
    icon: FaInstagram,
    color: "hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/30",
  },
  {
    href: "https://heyashu.in/",
    label: "Website",
    icon: FaEarthAsia,
    color: "hover:text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/30",
  },
  {
    href: "https://github.com/ashumsd7",
    label: "GitHub",
    icon: FaGithub,
    color: "hover:text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/30",
  },
  {
    href: "https://wakatime.com/@aat",
    label: "WakaTime",
    icon: SiWakatime,
    color: "hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30",
  },
  {
    href: "https://peerlist.io/ashumsd7",
    label: "Peerlist",
    icon: SiPeerlist,
    color: "hover:text-green-400 hover:bg-green-500/10 hover:border-green-500/30",
  },
  {
    href: "https://www.youtube.com/@ashutoshanandtiwari6606",
    label: "YouTube",
    icon: FaYoutube,
    color: "hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30",
  },
  {
    href: "https://topmate.io/aat/1148709/pay",
    label: "Book a call",
    icon: MdPermPhoneMsg,
    color: "hover:text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/30",
  },
];

const DigiGardenFooter = () => {
  return (
    <footer className="relative mt-20 border-t border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl pt-14 pb-10 px-4 overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500" />

      {/* Decorative Glow Effects */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-200/70 dark:border-gray-800/70">
          {/* Main Brand & Mission Info */}
          <div className="md:col-span-6 lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <FaSeedling className="text-base animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Digital Garden 🌱
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Curated by Ashutosh Anand Tiwari
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              Planting free, open-source tech notes and engineering guides so developers worldwide can learn, revise, and excel without paywalls.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href={DEFAULT_FOLLOW_LINK_INSTA}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
              >
                Follow on Instagram
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href={GITHUB_REPO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold transition-all border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                Star on GitHub ★
              </motion.a>
            </div>
          </div>

          {/* Quick Navigation Links & Social Media */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                Quick Navigation
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm font-medium">
                <a href="#collections" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  📚 Course Notes
                </a>
                <a href="#blogs" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  ✍️ Tech Blogs
                </a>
                <a href="#support" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  💚 Support Garden
                </a>
                <a href="https://chat.whatsapp.com/L0YFv4DQRCpJAcmRFPWT6r" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  🚀 WhatsApp Group
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                Connect &amp; Socials
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {SOCIALS.map(({ href, label, icon: Icon, color }) => (
                  <motion.a
                    key={label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60 transition-all shadow-sm ${color}`}
                  >
                    <Icon className="text-base" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400 font-medium">
          <p className="flex items-center gap-1.5">
            Made with <FaHeart className="text-red-500 text-xs inline animate-pulse" /> by Ashutosh Anand Tiwari · Digital Garden © {new Date().getFullYear()}
          </p>
          <a
            href="https://chat.whatsapp.com/L0YFv4DQRCpJAcmRFPWT6r"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all font-semibold flex items-center gap-1.5"
          >
            Join JavaScripterr Community 🚀
          </a>
        </div>
      </div>
    </footer>
  );
};

export default DigiGardenFooter;

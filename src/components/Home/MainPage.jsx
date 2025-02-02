import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaLaptop,
  FaUmbrellaBeach,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaQuora,
} from "react-icons/fa";
import { SiQuora, SiWakatime } from "react-icons/si";
import { BsPencilSquare, BsBook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { PHONE_CALL_THIRTY_MIN } from "@/utils/constant";
import ThemeToggle from "../base/ToogleDarkModeButton";

const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
  scaleOnHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
};

function MainPage() {
  const socialLinks = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      href: "https://github.com/ashumsd7",
      label: "GitHub",
    },
    {
      icon: <AiOutlineTwitter className="w-6 h-6" />,
      href: "https://twitter.com/JavaScripterrr",
      label: "Twitter",
    },
    {
      icon: <FaQuora className="w-6 h-6" />,
      href: "https://www.quora.com/profile/%E0%A4%86%E0%A4%B6%E0%A5%81%E0%A4%A4%E0%A5%8B%E0%A4%B7-%E0%A4%86%E0%A4%A8%E0%A4%A8%E0%A5%8D%E0%A4%A6-%E0%A4%A4%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%B0%E0%A5%80-Ashutosh-Anand-Tiwari",
      label: "Quora",
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/ashutoshanandtiwari",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      href: "https://instagram.com/ashumsd7",
      label: "Instagram",
    },
    {
      icon: <SiWakatime className="w-6 h-6" />,
      href: "https://wakatime.com/@aat",
      label: "WakaTime",
    },
  ];

  const sections = [
    {
      icon: <FaLaptop className="w-8 h-8" />,
      title: "Tech Journey",
      description: "Exploring software development and tech insights",
      href: "/tech",
    },
    {
      icon: <BsPencilSquare className="w-8 h-8" />,
      title: "Digital Garden",
      description:
        "My personal knowledge base and blog posts on various topics",
      href: "/digital-garden",
    },
    {
      icon: <FaUmbrellaBeach className="w-8 h-8" />,
      title: "Travel Stories",
      description: "Adventures, experiences and travel photography",
      href: "/travel",
    },
    {
      icon: <BsBook className="w-8 h-8" />,
      title: "Blog",
      description: "Articles on technology, life experiences and learnings",
      href: "/blog",
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen dark:from-slate-900 dark:to-slate-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          variants={animations.staggerContainer}
          className="flex flex-col lg:flex-row items-center gap-12 mb-24"
        >
          {/* Profile Image */}
          <motion.div variants={animations.fadeInUp} className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative w-64 h-64 sm:w-full sm:h-auto sm:aspect-square max-w-md mx-auto">
              <Image
                src="/images/profile1.jpg"
                alt="Ashutosh Anand Tiwari"
                fill
                className="rounded-2xl object-cover shadow-xl"
                priority
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={animations.fadeInUp}
            className="lg:w-1/2 space-y-8 order-2 lg:order-1 text-center lg:text-left"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
                Hi, I'm{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                  Ashutosh
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Software Developer | Technical Writer | Explorer
              </p>
            </div>

            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Welcome to my digital space where I share my journey through code,
              creativity, and exploration. Here you'll find my thoughts on
              technology, travel experiences, and various other interests
              cultivated through my digital garden.
            </p>

            {/* Social Links */}
            <div className="flex gap-6 justify-center lg:justify-start">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...animations.scaleOnHover}
                  className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
              <motion.button
                {...animations.scaleOnHover}
                onClick={() => window.open(PHONE_CALL_THIRTY_MIN, "_blank")}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 
                  dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors"
              >
                Get in Touch
              </motion.button>

              <Link href="/misc" className="w-full sm:w-auto">
                <motion.button
                  {...animations.scaleOnHover}
                  className="w-full px-8 py-3 border-2 border-emerald-600 dark:border-emerald-400 
                    text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-50 
                    dark:hover:bg-emerald-900/30 transition-colors"
                >
                  More About Me
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Sections Grid */}
        <motion.div variants={animations.fadeInUp} className="space-y-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white">
            Explore My{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Digital World
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sections.map((section) => (
              <Link key={section.href} href={section.href}>
                <motion.div
                  {...animations.scaleOnHover}
                  className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl 
                    transition-all duration-300 border border-slate-100 dark:border-slate-700 
                    hover:border-emerald-100 dark:hover:border-emerald-900"
                >
                  <div className="text-emerald-600 dark:text-emerald-400 mb-4">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {section.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MainPage;

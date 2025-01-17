import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaLaptop, FaUmbrellaBeach, FaHome, FaLeaf } from "react-icons/fa";
import { TbCurlyLoop } from "react-icons/tb";
import ProfilePicture from "./ProfilePicture";
import { PHONE_CALL_THIRTY_MIN } from "@/utils/constant";

const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  },
  scaleOnHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  }
};

function MainPage() {
  const categories = [
    { 
      href: "/tech", 
      icon: <FaLaptop />, 
      text: "Tech Journey",
      description: "My professional path"
    },
    { 
      href: "/travel", 
      icon: <FaUmbrellaBeach />, 
      text: "Adventures",
      description: "Exploring the world"
    },
    { 
      href: "/town", 
      icon: <FaHome />, 
      text: "Local Life",
      description: "Community & culture"
    },
    { 
      href: "/misc", 
      icon: <FaLeaf />, 
      text: "More",
      description: "Other interests"
    }
  ];

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-green-50 to-white"
    >
      <div className="container mx-auto   pb-12 pt-6 max-w-6xl">
        {/* Hero Section */}
        <motion.div 
          variants={animations.staggerContainer}
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div variants={animations.fadeInUp} className="space-y-8">
            <div className="space-y-3">
              <motion.p 
                variants={animations.fadeInUp}
                className="text-lg text-green-700 font-medium text-center md:text-left"
              >
                Welcome! I'm
              </motion.p>
              <motion.h1 
                variants={animations.fadeInUp}
                className="text-5xl md:text-6xl   font-bold text-green-800 text-center md:text-left"
              >
                Ashutosh Anand Tiwari
              </motion.h1>
              <motion.p 
                variants={animations.fadeInUp}
                className="text-green-600 italic text-xl text-center md:text-left"
              >
                aka Ashu
              </motion.p>
            </div>

            {/* Profile Picture for Mobile */}
            <motion.div 
              variants={animations.fadeInUp}
              className="md:hidden relative"
            >
              <ProfilePicture />
            </motion.div>

            <motion.p 
              variants={animations.fadeInUp}
              className="text-xl text-gray-800 leading-relaxed text-center md:text-left 
                  rounded-lg bg-gradient-to-br from-green-50/80 to-white/60 backdrop-blur-sm
                  transition-all duration-300"
            >
              I'm a simple person who earns his living through coding and development. Guided by
              <span className="text-green-600">"Zindagi Na Milegi Dobara,"</span> I try to make each day count with a smile.
              Through daily yoga, mindful travels, and helping others, I find joy in life's little moments while growing along the way.
              <span className="text-xl">🙌</span> Jai Shree Ram
            </motion.p>

            <motion.div 
              variants={animations.fadeInUp}
              className="flex gap-4 flex-wrap w-full"
            >
              
                <motion.button 
                  {...animations.scaleOnHover}
                  onClick={()=> window.open(PHONE_CALL_THIRTY_MIN, "_blank")}
                  className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                    transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Get in Touch
                </motion.button>
              
              <Link href="/misc" className="w-full md:w-auto">
                <motion.button 
                  {...animations.scaleOnHover}
                  className="w-full px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg 
                    hover:bg-green-50 transition-colors duration-300"
                >
                  Know more
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Profile Picture for Desktop */}
          <motion.div 
            variants={animations.fadeInUp}
            className="relative hidden md:block"
          >
            <ProfilePicture />
          </motion.div>
        </motion.div>

        {/* Versions Section */}
        <motion.div 
          variants={animations.fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl   font-bold mb-12">
            Explore Different <span className="text-green-600">Facets</span> of My Journey
          </h2>

          <motion.div 
            variants={animations.staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {categories.map((category) => (
              <Link href={category.href} key={category.href}>
                <motion.div
                  variants={animations.fadeInUp}
                  {...animations.scaleOnHover}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all 
                    duration-300 hover:bg-green-50 border border-green-100"
                >
                  <div className="text-3xl text-green-600 mb-4 mx-auto flex justify-center">{category.icon}</div>
                  <h3 className="font-medium text-green-800 text-lg mb-2">{category.text}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MainPage;
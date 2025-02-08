import React from 'react';
import { FaSeedling, FaUsers } from 'react-icons/fa';
import { motion } from "framer-motion";
const DigiGardenFooter = () => {
  return  <footer className="py-6 md:py-12">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 mb-4 md:mb-0"
      >
        <FaSeedling className="text-xl md:text-2xl text-yellow-500 dark:text-yellow-400" />
        <span className="text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100">
          Digital Garden
        </span>
      </motion.div>
      <div className="flex gap-6 md:gap-8 text-sm md:text-base">
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 mt-4 md:mt-0"
      >
        <FaUsers className="text-yellow-500 dark:text-yellow-400" />
        <span 
          onClick={() => window.open('https://chat.whatsapp.com/L0YFv4DQRCpJAcmRFPWT6r', '_blank')}
          className="text-sm md:text-base text-gray-600 dark:text-gray-300 cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
        >
          Be JavaScripterr  🚀
        </span>
      </motion.div>
    </div>
    <div className="text-center mt-6 md:mt-8 text-xs md:text-sm text-gray-500 dark:text-gray-400">
      © {new Date().getFullYear()} Digital Garden. All rights reserved.
    </div>
  </div>
</footer>;
};

export default DigiGardenFooter;

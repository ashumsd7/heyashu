import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaOm, FaPrayingHands } from "react-icons/fa";

const LiveEventBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-700 dark:to-orange-800 
        rounded-xl shadow-lg overflow-hidden mb-8 border-2 border-yellow-400 dark:border-yellow-600"
    >
      <div className="relative">
        {/* Animated lotus effect in the background */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-32 h-32 rounded-full bg-yellow-200 dark:bg-yellow-400 opacity-20 animate-ping"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-4 md:p-6">
          <div className="flex items-center mb-4 md:mb-0">
            <FaOm className="w-9 h-9 text-yellow-200 animate-pulse mr-4" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                श्री भागवत कथा आयोजन
              </h3>
              <h4 className="text-lg font-medium text-yellow-100 mb-1">
                Shrimad Bhagvat Katha - Live Now
              </h4>
              <p className="text-yellow-100 text-sm md:text-base">
                आप सभी सादर आमंत्रित हैं
              </p>
            </div>
          </div>
          
          <Link href="/live">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-yellow-50 text-orange-700 dark:bg-yellow-100 dark:text-orange-800 
                rounded-lg font-medium shadow-md flex items-center"
            >
              <FaPrayingHands className="mr-2" /> 
              <span>लाइव देखें | Watch Live</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveEventBanner; 
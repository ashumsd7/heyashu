import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdEdit } from "react-icons/md";
import { FaGithub, FaHeart, FaBookmark } from "react-icons/fa";
import Share from "@/components/ui/Share";
import { ADMIN_LINK } from "@/utils/constant";

const QuickNotesButtons = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="fixed lg:left-[calc(50%+400px)] lg:top-[55%] lg:-translate-y-1/2 lg:bottom-auto bottom-0 left-0 lg:w-auto w-full z-50">
      {/* Desktop vertical buttons */}
      <div className="hidden lg:flex flex-col gap-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open(ADMIN_LINK, "_blank")}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          title="Edit this article"
        >
          <MdEdit className="text-3xl" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open(githubLink, "_blank")}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          title="View on GitHub"
        >
          <FaGithub className="text-3xl" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLiked(!isLiked)}
          className={isLiked ? "text-red-500" : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"}
          title="Like this article"
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <FaHeart className="text-3xl" />
          </motion.div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          title="Save for later"
        >
          <FaBookmark className="text-3xl" />
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Share this article"
        >
          <Share title={"Share"} />
        </motion.div>
      </div>

      {/* Mobile bottom navbar */}
      <div className="lg:hidden flex items-center justify-around bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-[6px] shadow-lg h-12">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center"
          title="Edit this article"
        >
          <MdEdit className="text-2xl mb-0.5" />
          <span className="text-[10px]">Edit</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center"
          title="View on GitHub"
        >
          <FaGithub className="text-2xl mb-0.5" />
          <span className="text-[10px]">Star</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLiked(!isLiked)}
          className={`flex flex-col items-center ${isLiked ? "text-red-500" : ""}`}
          title="Like this article"
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <FaHeart className="text-2xl mb-0.5" />
          </motion.div>
          <span className="text-[10px]">Like</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center"
          title="Save for later"
        >
          <FaBookmark className="text-2xl mb-0.5" />
          <span className="text-[10px]">Save</span>
        </motion.button>

        <motion.div
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center"
          title="Share this article"
        >
          <Share title={"Share"} />
          <span className="text-[10px]">Share</span>
        </motion.div>
      </div>
    </div>
  );
};

export default QuickNotesButtons;

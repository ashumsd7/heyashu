"use client";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import AIQuestionDrawer from "./AIQuestionDrawer";
import { useTheme } from "next-themes";

const AIQuestionWrapper = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg
          text-gray-800 dark:text-white
          bg-white dark:bg-gray-900
          hover:bg-gray-100 dark:hover:bg-gray-800
          shadow-sm dark:shadow-gray-800
          transition-colors z-50
        `}
      >
        <FaQuestionCircle className="text-xl" />
        <span className="hidden md:inline font-medium">AI Quiz</span>
      </button>

      {isOpen && <AIQuestionDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default AIQuestionWrapper;

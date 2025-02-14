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
          flex items-center gap-2 px-4 py-2
          ${theme === 'dark' 
            ? 'bg-yellow-400 text-gray-800' 
            : 'bg-black text-white'
          }
          rounded-md
          transition-colors z-50
          hover:opacity-90
        `}
      >
        <FaQuestionCircle className="text-xl" />
        <span className="hidden md:inline font-medium">Quiz AI</span>
        <span className="md:hidden text-xs font-medium">AI Quiz</span>
      </button>

      {isOpen && <AIQuestionDrawer isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default AIQuestionWrapper;

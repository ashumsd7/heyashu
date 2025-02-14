import React, { useState } from "react";
import { FaBook, FaBolt, FaQuestionCircle } from "react-icons/fa";
import { BsChatSquareQuote } from "react-icons/bs";
import AIQuestionWrapper from "./AIQuestionWrapper";

const ReadingOptions = ({ onModeChange }) => {
  const [selectedMode, setSelectedMode] = useState("reading"); // Default mode

  const modes = [
    {
      id: "reading",
      label: "Reading Mode",
      icon: <FaBook className="text-lg" />
    },
    {
      id: "quick", 
      label: "Quick Read",
      icon: <FaBolt className="text-lg" />
    },
    // {
    //   id: "quiz",
    //   label: "AI Quiz",
    //   icon: <FaQuestionCircle className="text-lg" />
    // },
    {
      id: "qna",
      label: "QnA Mode",
      icon: <BsChatSquareQuote className="text-lg" />
    }
  ];

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    onModeChange?.(mode);
  };

  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700 mt-3">
      <div className="grid grid-cols-4 w-full">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode.id)}
            className={`flex items-center justify-center gap-2 py-3 px-4 transition-colors duration-200
              ${selectedMode === mode.id 
                ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-500 dark:border-blue-400" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
          >
            <div>
              {mode.icon}
            </div>
            <span className="text-sm">
              {mode.label}
            </span>
          </button>
        ))}
        <AIQuestionWrapper/>
      </div>
    </div>
  );
};

export default ReadingOptions;

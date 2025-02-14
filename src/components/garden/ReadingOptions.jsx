import React, { useState } from "react";
import { FaBook, FaBolt, FaQuestionCircle } from "react-icons/fa";
import { BsChatSquareQuote } from "react-icons/bs";
import AIQuestionWrapper from "./AIQuestionWrapper";
import QuickReaderDrawer from "./AI/QuickReaderDrawer";
import QuestionsListDrawer from "./AI/QuestionsListDrawer";
const ReadingOptions = ({ onModeChange }) => {
  const [selectedMode, setSelectedMode] = useState("reading");
  const [isQuickReaderOpen, setIsQuickReaderOpen] = useState(false);
  const [isQnaOpen, setIsQnaOpen] = useState(false);
  const modes = [
    {
      id: "reading",
      label: "Reading Mode",
      icon: <FaBook className="text-xl" />,
    },
    {
      id: "quick",
      label: "Quick Read",
      icon: <FaBolt className="text-xl" />,
      onClick: () => setIsQuickReaderOpen(true),
    },
    {
      id: "qna",
      label: "QnA Mode",
      icon: <BsChatSquareQuote className="text-xl" />,
      onClick: () => setIsQnaOpen(true),
    },
  ];
  const handleModeChange = (mode) => {
    const selectedModeObj = modes.find((m) => m.id === mode);
    if (selectedModeObj?.onClick) {
      selectedModeObj.onClick();
    }
  };
  return (
    <div className="w-full border-b border-gray-200 dark:border-gray-700 mt-3">
      <div className="grid grid-cols-4 md:grid-cols-4 w-full">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode.id)}
            className={`flex items-center justify-center gap-2 py-2 md:py-3 px-2 md:px-4 transition-colors duration-200 ${
              selectedMode === mode.id
                ? "text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-500 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            {mode.icon}
            <span className="hidden md:inline text-sm">{mode.label}</span>
          </button>
        ))}
         
          <AIQuestionWrapper />
        
      </div>
      <QuickReaderDrawer
        isOpen={isQuickReaderOpen}
        setIsOpen={setIsQuickReaderOpen}
      />
      <QuestionsListDrawer isOpen={isQnaOpen} setIsOpen={setIsQnaOpen} />
    </div>
  );
};
export default ReadingOptions;

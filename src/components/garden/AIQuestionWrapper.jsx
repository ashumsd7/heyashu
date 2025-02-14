"use client";
import { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import AIQuestionDrawer from "./AIQuestionDrawer";

const AIQuestionWrapper = ( ) => {
 
  const [isOpen, setIsOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  function copyFullPageText() {
    const text = document.body.innerText; // Get all text from the webpage
    console.log("text is:", text);
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("All text copied to clipboard!", text);
        setCopiedText(text);
      })
      .catch(err => console.error("Error copying text: ", err));
  }

  useEffect(() => {
    // copyFullPageText();
    return () => {
      
    };
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="  flex items-center gap-2 px-4 py-3   text-white rounded-lg shadow-lg transition-all hover:scale-105 z-50"
      >
        <FaRobot className="text-xl" />
        <span className="font-medium">AI Quiz</span>
      </button>

      {isOpen && <AIQuestionDrawer isOpen={isOpen} setIsOpen={setIsOpen}   />}
    </>
  );
};

export default AIQuestionWrapper;

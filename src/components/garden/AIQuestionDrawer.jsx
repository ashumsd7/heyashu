'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaLightbulb, FaShare, FaCheck, FaTimes } from 'react-icons/fa';
import {
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon, 
  WhatsappIcon
} from 'react-share';
const API_KEY = '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'
const SITE_URL = "https://heyashu.in"; // 🌐 Optional: Your website URL for OpenRouter ranking
const SITE_NAME = "Ashutosh Anand's Digital Garden"; // 📌 Optional: Your site name for ranking

function extractJSON(text) {
  const match = text.match(/```json\n([\s\S]*?)\n```/); // Extract JSON inside ```json ```
  if (match && match[1]) {
      try {
          const jsonData = JSON.parse(match[1]); // Parse JSON
          console.log("Extracted JSON:", jsonData);
          return jsonData;
      } catch (error) {
          console.error("Invalid JSON format:", error);
          return null;
      }
  } else {
      console.error("No valid JSON found!");
      return null;
  }
}

// Example usage
const text = `Your provided text here...`; // Replace with your full input text
const extractedJSON = extractJSON(text);

console.log(extractedJSON); // Output the extracted JSON



async function generateQuestions(providedText) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": SITE_URL, // Optional
        "X-Title": SITE_NAME, // Optional
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-distill-llama-70b:free",
        "messages": [
          {
            "role": "system",
            "content": `You are an AI that generates **interview-style multiple-choice questions (MCQs)** for web development.
                        - The user will provide a programming-related text.
                        - Your task is to generate **at least 1 and at most 10** questions.
                        - **Questions should match the most commonly asked interview questions in India**.
                        - Each question should have:
                          1️⃣ **A clear and concise question**
                          2️⃣ **3 options** (ensure one is correct)
                          3️⃣ **Correct answer as an index (0-based)**
                          4️⃣ **A simple explanation of the correct answer**
                        - The response must be in **strict JSON format**, with no extra text. Example:
                          {
                            "topic": "Topic Name",
                            "description": "Brief description",
                            "questions": [
                              {
                                "id": 1,
                                "question": "What is the Virtual DOM in React and why is it important?",
                                "options": [
                                  "A visual representation of the DOM",
                                  "An in-memory representation that improves performance",
                                  "A DOM specifically for virtual reality apps"
                                ],
                                "correctAnswer": 1,
                                "explanation": "Virtual DOM is an in-memory copy of the real DOM that React uses to optimize rendering performance by minimizing direct DOM manipulation."
                              }
                            ]
                          }
                        - Do **not** include any additional text. Only return valid JSON.`
          },
          {
            "role": "user",
            "content": providedText
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("data is", data);
    if(data.choices[0].message.content){
      const extractedJSON = extractJSON(data.choices[0].message.content);
      console.log("extractedJSON is", extractedJSON);
    }

    return extractedJSON;
  } catch (error) {
    console.error("❌ Error generating questions:", error);
  }
}



const AIQuestionDrawer = ({ isOpen, setIsOpen, questions: initialQuestions, text }) => {
  console.log("text is", text);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [allAttempted, setAllAttempted] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      
      const text = document.body.innerText;
      console.log("text is:", text);
      generateQuestions(text)
        .then(generatedQuestions => {
          console.log("Generated questions:", generatedQuestions);
          setQuestions(generatedQuestions);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error generating questions:", err);
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const attempted = questions?.questions?.every(q => currentAnswers[q.id] !== undefined);
    setAllAttempted(attempted);
  }, [currentAnswers, questions]);

  const handleOptionSelect = (questionId, optionIndex) => {
    if (currentAnswers[questionId] !== undefined) return;

    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));

    if (optionIndex === questions.questions[questionId - 1].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const shareText = `I just completed the ${questions?.topic} quiz and scored ${score}/${questions?.questions?.length}! Try it yourself at heyashu.in`;
  const shareUrl = "https://heyashu.in";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 z-[9999]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-[80px] right-0 h-[calc(100vh-80px)] bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto z-[10000] w-[100%] md:w-[40%]"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-50">
              <div className="flex justify-between items-center p-2 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-yellow-400">
                  AI Interviewer
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <IoClose size={24} />
                </button>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700 w-full"></div>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">AI is analyzing content and generating relevant questions...</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{questions?.topic}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{questions?.description}</p>
                  </div>

                  <div className="space-y-8">
                    {questions.questions.map((q, idx) => (
                      <div key={q.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="font-medium mb-4 text-gray-800 dark:text-gray-200">{`${idx + 1}. ${q.question}`}</p>
                        <div className="space-y-3">
                          {q.options.map((option, optionIdx) => (
                            <motion.button
                              key={optionIdx}
                              onClick={() => handleOptionSelect(q.id, optionIdx)}
                              disabled={currentAnswers[q.id] !== undefined}
                              animate={
                                currentAnswers[q.id] === optionIdx && optionIdx !== q.correctAnswer
                                  ? { x: [-10, 10, -10, 10, 0] }
                                  : {}
                              }
                              transition={{ duration: 0.5 }}
                              className={`w-full text-left p-3 rounded-lg transition-all flex justify-between items-center ${
                                currentAnswers[q.id] !== undefined
                                  ? optionIdx === q.correctAnswer
                                    ? 'bg-green-50 dark:bg-green-800/50 border-green-500'
                                    : currentAnswers[q.id] === optionIdx
                                    ? 'bg-red-50 dark:bg-red-800/50 border-red-500'
                                    : 'bg-gray-100 dark:bg-gray-700'
                                  : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                              } border ${currentAnswers[q.id] !== undefined ? 'cursor-not-allowed' : ''}`}
                            >
                              <span>{option}</span>
                              {currentAnswers[q.id] !== undefined && (
                                optionIdx === q.correctAnswer ? (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", duration: 0.5 }}
                                  >
                                    <FaCheck className="text-green-500" />
                                  </motion.div>
                                ) : currentAnswers[q.id] === optionIdx ? (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", duration: 0.5 }}
                                  >
                                    <FaTimes className="text-red-500" />
                                  </motion.div>
                                ) : null
                              )}
                            </motion.button>
                          ))}
                        </div>
                        {currentAnswers[q.id] !== undefined && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-yellow-100 dark:bg-blue-900/50 rounded-lg border-l-4 border-yellow-500"
                          >
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                }}
                              >
                                <FaLightbulb className="text-yellow-500 text-xl" />
                              </motion.div>
                              <p className="text-sm text-blue-800 dark:text-blue-200">{q.explanation}</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t dark:border-gray-700 mt-6">
                    {!showShareOptions ? (
                      <button
                        onClick={() => allAttempted && setShowShareOptions(true)}
                        disabled={!allAttempted}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                          allAttempted 
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                        }`}
                      >
                        <FaShare />
                        {allAttempted ? 'Share Your Results' : 'Complete All Questions'}
                      </button>
                    ) : (
                      <div className="flex justify-center gap-4">
                        <TwitterShareButton url={shareUrl} title={shareText}>
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        
                        <WhatsappShareButton url={shareUrl} title={shareText}>
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIQuestionDrawer;

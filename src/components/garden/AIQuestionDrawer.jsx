'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaLightbulb, FaShare, FaCheck, FaTimes, FaRedo, FaTrophy } from 'react-icons/fa';
import {
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon, 
  WhatsappIcon
} from 'react-share';
import {  OPENROUTER_API_URL, OPENROUTER_MODEL, OPENROUTER_SITE_NAME, OPENROUTER_SITE_URL } from '@/utils/constant';

const loadingMessages = [
  "Analyzing the content...",
  "Crafting thoughtful questions...", 
  "Adding interesting options...",
  "Polishing the final touches...",
  "Almost ready..."
];

const getScoreMessage = (percentage) => {
  if (percentage >= 90) return "Excellent! You're a master of this topic! 🏆";
  if (percentage >= 70) return "Great job! You have a solid understanding! 👏";
  if (percentage >= 50) return "Good effort! Keep learning to improve! 📚";
  return "Keep practicing! You'll get better with time! 💪";
};

function parseResponse(response) {
  try {
    // First try direct JSON parse
    return JSON.parse(response);
  } catch (e) {
    // If direct parse fails, try extracting JSON from markdown
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (err) {
        console.error("Failed to parse extracted JSON:", err);
        return null;
      }
    }
    
    // Try finding JSON without markdown tags
    const jsonRegex = /\{[\s\S]*\}/;
    const possibleJson = response.match(jsonRegex);
    if (possibleJson) {
      try {
        return JSON.parse(possibleJson[0]);
      } catch (err) {
        console.error("Failed to parse possible JSON:", err);
        return null;
      }
    }
    
    console.error("No valid JSON found in response");
    return null;
  }
}

async function generateQuestions(providedText) {
  try {
 
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        "HTTP-Referer": OPENROUTER_SITE_URL,
        "X-Title": OPENROUTER_SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": OPENROUTER_MODEL,
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
                          Keep explanation in a descriptive manner with 3 to 4 lines.
                          keep option also some one liner some with multi words 1 to 2 lines 
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
    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid API response format");
    }

    const parsedQuestions = parseResponse(data.choices[0].message.content);
    if (!parsedQuestions) {
      throw new Error("Failed to parse questions from response");
    }

    return parsedQuestions;
  } catch (error) {
    console.error("❌ Error generating questions:", error);
    throw error;
  }
}

const AIQuestionDrawer = ({ isOpen, setIsOpen, questions: initialQuestions, text }) => {
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [allAttempted, setAllAttempted] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setLoadingProgress(0);
      setLoadingMessageIndex(0);

      // Start progress animation
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 100);

      // Change loading message every few seconds
      const messageInterval = setInterval(() => {
        setLoadingMessageIndex(prev => 
          prev < loadingMessages.length - 1 ? prev + 1 : prev
        );
      }, 2000);

      const text = document.body.innerText;
      const generatedQuestions = await generateQuestions(text);
      setQuestions(generatedQuestions);

      clearInterval(progressInterval);
      clearInterval(messageInterval);
    } catch (err) {
      setError(err.message || "Failed to generate questions");
    } finally {
      setIsLoading(false);
      setLoadingProgress(100);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
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
    
    // If all questions are attempted, scroll to score section
    if (attempted) {
      const scoreSection = document.getElementById('score-section');
      if (scoreSection) {
        setTimeout(() => {
          scoreSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 500);
      }
    }
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

    // Check if this was the last question
    const isLastQuestion = Object.keys(currentAnswers).length === questions.questions.length - 1;
    if (isLastQuestion) {
      setTimeout(() => {
        const scoreSection = document.getElementById('score-section');
        if (scoreSection) {
          scoreSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 500);
    }
  };

  const handleRetry = () => {
    setCurrentAnswers({});
    setScore(0);
    setAllAttempted(false);
    fetchQuestions();
  };

  const scorePercentage = Math.round((score/questions?.questions?.length) * 100);
  const shareText = `🎓 I just completed AI Assessment on ${questions?.topic || 'Web Development'} and scored ${scorePercentage}%! 🎯\n\n📚 🌟 Attempt Quiz: ${window.location.href}  Read & Explore 100+ topics and visit Open sourced Digital Garden \n\n `;
  const shareUrl = 'https://heyashu.in/digital-garden';

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
            className="fixed top-[65px] right-0 h-[calc(100vh-80px)] bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto z-[10000] w-[100%] md:w-[40%]"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-50">
              <div className="flex justify-between items-center p-2 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-yellow-400">
                AI Assessment
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
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
                  <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-500 transition-all duration-300"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {loadingMessages[loadingMessageIndex]}
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                  >
                    <FaRedo />
                    Try Again
                  </button>
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

                  {allAttempted && (
                    <motion.div 
                      id="score-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="mb-4"
                      >
                        <FaTrophy className="text-6xl text-yellow-500 mx-auto" />
                      </motion.div>
                      <h3 className="text-6xl font-bold text-yellow-500 mb-4">
                        {scorePercentage}%
                      </h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        {getScoreMessage(scorePercentage)}
                      </p>
                      
                      <div className="mt-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Share your achievement</p>
                        <div className="flex justify-center gap-4">
                          <TwitterShareButton url={shareUrl} title={shareText}>
                            <TwitterIcon size={40} round />
                          </TwitterShareButton>
                          
                          <WhatsappShareButton url={shareUrl} title={shareText}>
                            <WhatsappIcon size={40} round />
                          </WhatsappShareButton>
                        </div>
                      </div>
                    </motion.div>
                  )}
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

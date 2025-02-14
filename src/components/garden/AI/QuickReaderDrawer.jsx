'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaBookReader } from 'react-icons/fa';
import { OPENROUTER_API_URL, OPENROUTER_MODEL, OPENROUTER_SITE_NAME, OPENROUTER_SITE_URL } from '@/utils/constant';

const loadingMessages = [
  "Scraping content...",
  "Going deep into analysis...",
  "Generating point-wise summary...", 
  "Almost there...",
  "Finalizing the content..."
];

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

async function generateSummary(providedText) {
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
            "content": `You are an AI that generates concise, easy-to-read summaries of technical content. 
                       Generate a summary with sections in strict JSON format.
                       The response must be in this exact format:
                       {
                         "sections": [
                           {
                             "heading": "Section Title",
                             "definition": "Clear, concise definition",
                             "points": ["Key point 1", "Key point 2", "Key point 3"]
                           }
                         ]
                       }
                       Guidelines:
                       1. Clear headings
                       2. Concise definitions
                       3. Key bullet points
                       4. Simple language
                       5. Technical accuracy
                       Return ONLY valid JSON, no additional text or markdown.`
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
 
    const content = data.choices[0].message.content;
 
    return parseResponse(content);

  } catch (error) {
    console.error("❌ Error generating summary:", error);
    throw error;
  }
}

const QuickReaderDrawer = ({ isOpen, setIsOpen }) => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const fetchSummary = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setLoadingProgress(0);
      setLoadingMessageIndex(0);

      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 100);

      const messageInterval = setInterval(() => {
        setLoadingMessageIndex(prev => 
          prev < loadingMessages.length - 1 ? prev + 1 : prev
        );
      }, 2000);

      const text = document.body.innerText;
      const generatedSummary = await generateSummary(text);
      setSummary(generatedSummary);

      clearInterval(progressInterval);
      clearInterval(messageInterval);
    } catch (err) {
      setError(err.message || "Failed to generate summary");
    } finally {
      setIsLoading(false);
      setLoadingProgress(100);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSummary();
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      }
    }
  }, [isOpen]);

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
                <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
                  <FaBookReader />
                  Quick Read
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <IoClose size={24} className="text-gray-800 dark:text-gray-200" />
                </button>
              </div>
              <div className="h-px bg-gray-300 dark:bg-gray-700 w-full"></div>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <div className="relative w-full max-w-md">
                    {/* Loading message */}
                    <motion.div 
                      className="h-16 flex items-center justify-center"
                      key={loadingMessageIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-gray-600 dark:text-gray-400 text-center">
                        {loadingMessages[loadingMessageIndex]}
                      </p>
                    </motion.div>
                    
                    {/* Skeleton loader */}
                    <div className="mt-20 space-y-4">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                      <div className="space-y-2 mt-6">
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-11/12"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={fetchSummary}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {summary?.sections.map((section, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        {section.heading}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {section.definition}
                      </p>
                      {section.points && section.points.length > 0 && (
                        <ul className="list-disc pl-5 space-y-2">
                          {section.points.map((point, i) => (
                            <li key={i} className="text-gray-700 dark:text-gray-300">
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickReaderDrawer;

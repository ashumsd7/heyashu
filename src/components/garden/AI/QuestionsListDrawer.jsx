'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaBookReader, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { OPENROUTER_API_URL, OPENROUTER_MODEL, OPENROUTER_SITE_NAME, OPENROUTER_SITE_URL } from '@/utils/constant';

const loadingMessages = [
  "Analyzing content...",
  "Preparing interview questions...",
  "Crafting detailed answers...",
  "Almost ready...",
  "Finalizing the list..."
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

async function generateQuestionsList(providedText) {
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
            "content": `You are an experienced technical interviewer creating a list of frontend developer interview questions.
                       Generate questions and detailed answers based on the provided text.
                       The response must be in this exact format:
                       {
                         "topic": "Topic Name",
                         "questions": [
                           {
                             "id": 1,
                             "question": "Interview question here?",
                             "answer": "Detailed answer here"
                           }
                         ]
                       }
                       Guidelines:
                       1. Generate between 5-20 questions depending on content length
                       2. Questions should be what a real interviewer would ask
                       3. Provide detailed, multi-paragraph answers when needed
                       4. Focus on practical implementation and best practices
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

    return parseResponse(data.choices[0].message.content);

  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}

const QuestionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <h3 className="text-left font-medium text-gray-800 dark:text-gray-200">
          {question}
        </h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QuestionsListDrawer = ({ isOpen, setIsOpen }) => {
  const [questions, setQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const fetchQuestions = async () => {
        try {
          setIsLoading(true);
          setError(null);
          
          const messageInterval = setInterval(() => {
            setLoadingMessageIndex(prev => 
              prev < loadingMessages.length - 1 ? prev + 1 : prev
            );
          }, 2000);

          const text = document.body.innerText;
          const generatedQuestions = await generateQuestionsList(text);
          setQuestions(generatedQuestions);

          clearInterval(messageInterval);
        } catch (err) {
          setError(err.message || "Failed to generate questions");
        } finally {
          setIsLoading(false);
        }
      };

      fetchQuestions();
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
            className="fixed top-[65px] right-0 h-[calc(100vh-80px)] bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto z-[10000] w-full md:w-[40%]"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-50">
              <div className="flex justify-between items-center p-4">
                <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
                  <FaBookReader />
                 AI Q&A List
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <IoClose size={24} className="text-gray-800 dark:text-gray-200" />
                </button>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700 w-full" />
            </div>

            <div className="p-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <motion.p
                    key={loadingMessageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-gray-600 dark:text-gray-400 text-center mb-8"
                  >
                    {loadingMessages[loadingMessageIndex]}
                  </motion.p>
                  
                  <div className="w-full space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                        <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    {questions?.topic}
                  </h3>
                  <div className="space-y-2">
                    {questions?.questions.map((item) => (
                      <QuestionItem
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuestionsListDrawer;

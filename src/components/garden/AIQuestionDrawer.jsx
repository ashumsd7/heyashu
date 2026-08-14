"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import {
  FaCheck,
  FaTimes,
  FaRedo,
  FaTrophy,
  FaLightbulb,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import {
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  callOpenRouter,
  getAiMarkdownContent,
  parseAiJsonResponse,
} from "@/utils/aiOpenRouter";

const loadingMessages = [
  "Reading the article…",
  "Building quiz questions…",
  "Preparing options…",
  "Almost ready…",
];

const getScoreMessage = (percentage) => {
  if (percentage >= 90) return "Excellent — you know this topic well.";
  if (percentage >= 70) return "Solid understanding. A bit more revision helps.";
  if (percentage >= 50) return "Decent start. Re-read the weak spots.";
  return "Keep practicing — open the article and try again.";
};

async function generateQuestions(providedText) {
  const content = await callOpenRouter([
    {
      role: "system",
      content: `You create interview-style multiple-choice questions from the given article only.
Return ONLY valid JSON:
{
  "topic": "Topic Name",
  "description": "One short line",
  "questions": [
    {
      "id": 1,
      "question": "…?",
      "options": ["A", "B", "C"],
      "correctAnswer": 1,
      "explanation": "2–4 line explanation"
    }
  ]
}
Rules:
- Question count must follow content depth. Do not force a fixed number.
- Exactly 3 options; correctAnswer is 0-based index.
- Questions should feel like a real interviewer asking about THIS text.
- No markdown fences, no extra text.`,
    },
    { role: "user", content: providedText },
  ]);

  const parsed = parseAiJsonResponse(content);
  if (!parsed?.questions?.length) {
    throw new Error("Could not parse quiz from the model response");
  }
  return parsed;
}

const AIQuestionDrawer = ({ isOpen, setIsOpen }) => {
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [allAttempted, setAllAttempted] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [msgIdx, setMsgIdx] = useState(0);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMsgIdx(0);
      setQuestions(null);
      setCurrentAnswers({});
      setScore(0);
      setAllAttempted(false);

      const tick = setInterval(() => {
        setMsgIdx((i) => Math.min(i + 1, loadingMessages.length - 1));
      }, 1800);

      const text = getAiMarkdownContent();
      const generated = await generateQuestions(text);
      setQuestions(generated);
      clearInterval(tick);
    } catch (err) {
      setError(err.message || "Failed to generate questions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    fetchQuestions();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const list = questions?.questions;
    if (!list?.length) return;
    const attempted = list.every((q) => currentAnswers[q.id] !== undefined);
    setAllAttempted(attempted);
    if (attempted) {
      setTimeout(() => {
        document
          .getElementById("score-section")
          ?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 400);
    }
  }, [currentAnswers, questions]);

  const handleOptionSelect = (questionId, optionIndex) => {
    if (currentAnswers[questionId] !== undefined) return;
    const q = questions.questions.find((item) => item.id === questionId);
    setCurrentAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (q && optionIndex === q.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleRetry = () => {
    setCurrentAnswers({});
    setScore(0);
    setAllAttempted(false);
    fetchQuestions();
  };

  const total = questions?.questions?.length || 0;
  const scorePercentage = total ? Math.round((score / total) * 100) : 0;
  const shareText = `I scored ${scorePercentage}% on an AI quiz about ${
    questions?.topic || "this topic"
  } on heyashu.in Digital Garden.`;
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "https://heyashu.in";

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close overlay"
            className="fixed inset-0 z-[9999] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className="fixed inset-y-0 right-0 z-[10000] flex h-full w-full flex-col border-l border-[#e8e2d7] bg-[#faf7f2] dark:border-[#1e3328] dark:bg-[#0b120e] md:w-[min(100%,420px)]"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-[#e8e2d7] px-4 py-3 dark:border-[#1e3328]">
              <div className="flex items-center gap-2">
                <HiSparkles className="h-4 w-4 text-sky-500" />
                <div>
                  <h2 className="font-fraunces text-[15px] font-semibold text-[#171717] dark:text-[#f0f4ef]">
                    Attempt Quiz
                  </h2>
                  <p className="text-[11px] text-[#6b6458] dark:text-[#92a59a]">
                    MCQs from this article
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 place-items-center border border-[#e8e2d7] text-[#585858] transition hover:bg-black/[0.04] dark:border-[#1e3328] dark:text-[#92a59a] dark:hover:bg-white/[0.04]"
                aria-label="Close"
              >
                <IoClose size={18} />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
              {isLoading ? (
                <div className="space-y-4 pt-6">
                  <p className="text-center text-[13px] text-[#6b6458] dark:text-[#92a59a]">
                    {loadingMessages[msgIdx]}
                  </p>
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="space-y-2 border border-[#e8e2d7] p-3 dark:border-[#1e3328]"
                      >
                        <div className="h-3 w-3/4 animate-pulse bg-[#e8e2d7] dark:bg-[#1e3328]" />
                        {[1, 2, 3].map((j) => (
                          <div
                            key={j}
                            className="h-9 animate-pulse bg-[#e8e2d7]/70 dark:bg-[#1e3328]/70"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center gap-3 pt-16 text-center">
                  <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 border border-[#143825] bg-[#143825] px-4 py-2 text-[12px] font-semibold text-white dark:border-[#22c55e] dark:bg-[#22c55e] dark:text-[#0b120e]"
                  >
                    <FaRedo className="h-3 w-3" />
                    Try again
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5 border border-[#e8e2d7] bg-white p-3 dark:border-[#1e3328] dark:bg-[#121e17]">
                    <h3 className="font-fraunces text-[14px] font-semibold text-[#171717] dark:text-[#f0f4ef]">
                      {questions?.topic}
                    </h3>
                    {questions?.description ? (
                      <p className="mt-1 text-[12px] text-[#6b6458] dark:text-[#92a59a]">
                        {questions.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-4">
                    {questions?.questions?.map((q, idx) => (
                      <div
                        key={q.id}
                        className="border border-[#e8e2d7] bg-white p-3.5 dark:border-[#1e3328] dark:bg-[#121e17]"
                      >
                        <p className="mb-3 text-[13px] font-medium leading-snug text-[#171717] dark:text-[#f0f4ef]">
                          <span className="mr-1 text-[#8a8276] dark:text-[#92a59a]">
                            {idx + 1}.
                          </span>
                          {q.question}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((option, optionIdx) => {
                            const answered = currentAnswers[q.id] !== undefined;
                            const isCorrect = optionIdx === q.correctAnswer;
                            const isChosen = currentAnswers[q.id] === optionIdx;
                            let cls =
                              "w-full border border-[#e8e2d7] bg-[#faf7f2] px-3 py-2.5 text-left text-[12.5px] text-[#171717] transition dark:border-[#1e3328] dark:bg-[#0f1813] dark:text-[#f0f4ef]";
                            if (answered) {
                              if (isCorrect) {
                                cls =
                                  "w-full border border-emerald-600/40 bg-emerald-500/10 px-3 py-2.5 text-left text-[12.5px] text-[#171717] dark:text-[#f0f4ef]";
                              } else if (isChosen) {
                                cls =
                                  "w-full border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-left text-[12.5px] text-[#171717] dark:text-[#f0f4ef]";
                              } else {
                                cls += " opacity-55";
                              }
                            } else {
                              cls +=
                                " hover:border-[#143825] dark:hover:border-[#22c55e]";
                            }
                            return (
                              <button
                                key={optionIdx}
                                type="button"
                                disabled={answered}
                                onClick={() => handleOptionSelect(q.id, optionIdx)}
                                className={`${cls} flex items-center justify-between gap-2`}
                              >
                                <span>{option}</span>
                                {answered && isCorrect ? (
                                  <FaCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                                ) : null}
                                {answered && isChosen && !isCorrect ? (
                                  <FaTimes className="h-3.5 w-3.5 shrink-0 text-red-500" />
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                        {currentAnswers[q.id] !== undefined && q.explanation ? (
                          <div className="mt-3 flex gap-2 border border-[#e8e2d7] bg-[#faf7f2] p-3 dark:border-[#1e3328] dark:bg-[#0f1813]">
                            <FaLightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                            <p className="text-[12px] leading-relaxed text-[#3f3a34] dark:text-[#d5ddd7]">
                              {q.explanation}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  {allAttempted ? (
                    <div
                      id="score-section"
                      className="mt-6 border border-[#e8e2d7] bg-white p-5 text-center dark:border-[#1e3328] dark:bg-[#121e17]"
                    >
                      <FaTrophy className="mx-auto mb-3 h-8 w-8 text-amber-500" />
                      <p className="font-fraunces text-4xl font-semibold text-[#171717] dark:text-[#f0f4ef]">
                        {scorePercentage}%
                      </p>
                      <p className="mt-2 text-[13px] text-[#6b6458] dark:text-[#92a59a]">
                        {getScoreMessage(scorePercentage)}
                      </p>
                      <p className="mt-1 text-[11px] text-[#8a8276]">
                        {score} / {total} correct
                      </p>
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="mt-4 inline-flex items-center gap-2 border border-[#143825] px-3 py-2 text-[12px] font-semibold text-[#143825] dark:border-[#22c55e] dark:text-[#22c55e]"
                      >
                        <FaRedo className="h-3 w-3" />
                        New quiz
                      </button>
                      <div className="mt-5 border-t border-[#e8e2d7] pt-4 dark:border-[#1e3328]">
                        <p className="mb-2 text-[11px] text-[#8a8276]">Share</p>
                        <div className="flex justify-center gap-3">
                          <TwitterShareButton url={shareUrl} title={shareText}>
                            <TwitterIcon size={32} />
                          </TwitterShareButton>
                          <WhatsappShareButton url={shareUrl} title={shareText}>
                            <WhatsappIcon size={32} />
                          </WhatsappShareButton>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default AIQuestionDrawer;

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { HiChatBubbleLeftRight, HiChevronDown } from "react-icons/hi2";
import {
  callOpenRouter,
  getAiMarkdownContent,
  parseAiJsonResponse,
} from "@/utils/aiOpenRouter";

const loadingMessages = [
  "Reading the article…",
  "Drafting interview questions…",
  "Writing clear answers…",
  "Almost ready…",
];

async function generateQuestionsList(providedText) {
  const content = await callOpenRouter([
    {
      role: "system",
      content: `You are a technical interviewer creating Q&A from the given article only.
Return ONLY valid JSON:
{
  "topic": "Topic Name",
  "questions": [
    { "id": 1, "question": "…?", "answer": "…" }
  ]
}
Rules:
- Question count must match content depth (short article → fewer; long → more). Do not force a fixed count.
- Ask what a real interviewer would ask about THIS text.
- Answers should be clear and practical.
- No markdown fences, no extra text.`,
    },
    { role: "user", content: providedText },
  ]);
  const parsed = parseAiJsonResponse(content);
  if (!parsed?.questions?.length) {
    throw new Error("Could not parse Q&A from the model response");
  }
  return parsed;
}

const QuestionItem = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#e8e2d7] bg-white dark:border-[#1e3328] dark:bg-[#121e17]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 px-3.5 py-3.5 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
      >
        <span className="text-[13px] font-medium leading-snug text-[#171717] dark:text-[#f0f4ef]">
          <span className="mr-1.5 text-[#8a8276] dark:text-[#92a59a]">
            Q{index + 1}.
          </span>
          {question}
        </span>
        <HiChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 text-[#8a8276] transition dark:text-[#92a59a] ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#e8e2d7] bg-[#faf7f2] px-3.5 py-3 dark:border-[#1e3328] dark:bg-[#0f1813]">
              <p className="text-[12.5px] leading-relaxed text-[#3f3a34] whitespace-pre-line dark:text-[#d5ddd7]">
                {answer}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const QuestionsListDrawer = ({ isOpen, setIsOpen }) => {
  const [questions, setQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msgIdx, setMsgIdx] = useState(0);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMsgIdx(0);
      setQuestions(null);

      const tick = setInterval(() => {
        setMsgIdx((i) => Math.min(i + 1, loadingMessages.length - 1));
      }, 1800);

      const text = getAiMarkdownContent();
      const generated = await generateQuestionsList(text);
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
                <HiChatBubbleLeftRight className="h-4 w-4 text-violet-500" />
                <div>
                  <h2 className="font-fraunces text-[15px] font-semibold text-[#171717] dark:text-[#f0f4ef]">
                    Q&amp;A
                  </h2>
                  <p className="text-[11px] text-[#6b6458] dark:text-[#92a59a]">
                    Interview questions from this article
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
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-12 animate-pulse border border-[#e8e2d7] bg-white dark:border-[#1e3328] dark:bg-[#121e17]"
                      />
                    ))}
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center gap-3 pt-16 text-center">
                  <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p>
                  <button
                    type="button"
                    onClick={fetchQuestions}
                    className="border border-[#143825] bg-[#143825] px-4 py-2 text-[12px] font-semibold text-white dark:border-[#22c55e] dark:bg-[#22c55e] dark:text-[#0b120e]"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {questions?.topic ? (
                    <p className="mb-1 font-fraunces text-[14px] font-semibold text-[#171717] dark:text-[#f0f4ef]">
                      {questions.topic}
                    </p>
                  ) : null}
                  {questions?.questions?.map((item, idx) => (
                    <QuestionItem
                      key={item.id ?? idx}
                      index={idx}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default QuestionsListDrawer;

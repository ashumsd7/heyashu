"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { HiBolt } from "react-icons/hi2";
import {
  callOpenRouter,
  getAiMarkdownContent,
  parseAiJsonResponse,
} from "@/utils/aiOpenRouter";

const loadingMessages = [
  "Reading the article…",
  "Finding key ideas…",
  "Building a clean summary…",
  "Almost ready…",
];

async function generateSummary(providedText) {
  const content = await callOpenRouter([
    {
      role: "system",
      content: `You summarize technical article content for quick revision.
Return ONLY valid JSON in this shape:
{
  "sections": [
    {
      "heading": "Section Title",
      "definition": "One short paragraph",
      "points": ["Key point", "Key point"]
    }
  ]
}
Rules:
- Derive section count from the content itself (short notes → fewer sections, long notes → more).
- Do not invent topics not present in the text.
- Clear headings, concise definitions, practical bullet points.
- No markdown fences, no extra commentary.`,
    },
    { role: "user", content: providedText },
  ]);
  const parsed = parseAiJsonResponse(content);
  if (!parsed?.sections?.length) {
    throw new Error("Could not parse summary from the model response");
  }
  return parsed;
}

const QuickReaderDrawer = ({ isOpen, setIsOpen }) => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msgIdx, setMsgIdx] = useState(0);

  const fetchSummary = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMsgIdx(0);
      setSummary(null);

      const tick = setInterval(() => {
        setMsgIdx((i) => Math.min(i + 1, loadingMessages.length - 1));
      }, 1800);

      const text = getAiMarkdownContent();
      const generated = await generateSummary(text);
      setSummary(generated);
      clearInterval(tick);
    } catch (err) {
      setError(err.message || "Failed to generate summary");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    fetchSummary();
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
                <HiBolt className="h-4 w-4 text-violet-500" />
                <div>
                  <h2 className="font-fraunces text-[15px] font-semibold text-[#171717] dark:text-[#f0f4ef]">
                    Quick Read
                  </h2>
                  <p className="text-[11px] text-[#6b6458] dark:text-[#92a59a]">
                    Summary of this article
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
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border border-[#e8e2d7] p-3 dark:border-[#1e3328]">
                        <div className="mb-2 h-3 w-1/3 animate-pulse bg-[#e8e2d7] dark:bg-[#1e3328]" />
                        <div className="mb-1 h-2.5 w-full animate-pulse bg-[#e8e2d7]/70 dark:bg-[#1e3328]/70" />
                        <div className="h-2.5 w-4/5 animate-pulse bg-[#e8e2d7]/70 dark:bg-[#1e3328]/70" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center gap-3 pt-16 text-center">
                  <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p>
                  <button
                    type="button"
                    onClick={fetchSummary}
                    className="border border-[#143825] bg-[#143825] px-4 py-2 text-[12px] font-semibold text-white dark:border-[#22c55e] dark:bg-[#22c55e] dark:text-[#0b120e]"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {summary?.sections?.map((section, index) => (
                    <section
                      key={`${section.heading}-${index}`}
                      className="border border-[#e8e2d7] bg-white p-4 dark:border-[#1e3328] dark:bg-[#121e17]"
                    >
                      <h3 className="mb-2 font-fraunces text-[15px] font-semibold text-[#171717] dark:text-[#f0f4ef]">
                        {section.heading}
                      </h3>
                      {section.definition ? (
                        <p className="mb-3 text-[13px] leading-relaxed text-[#3f3a34] dark:text-[#d5ddd7]">
                          {section.definition}
                        </p>
                      ) : null}
                      {section.points?.length ? (
                        <ul className="space-y-1.5 border-t border-[#e8e2d7] pt-3 dark:border-[#1e3328]">
                          {section.points.map((point, i) => (
                            <li
                              key={i}
                              className="flex gap-2 text-[12.5px] leading-relaxed text-[#4a453d] dark:text-[#c5d0c8]"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 bg-violet-500" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
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

export default QuickReaderDrawer;

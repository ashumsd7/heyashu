"use client";
import { useState, useEffect } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import {
  callOpenRouter,
  getAiMarkdownContent,
  parseAiJsonResponse,
} from "@/utils/aiOpenRouter";
import { getNamasteAiCache } from "@/data/note/ai-cache";
import AiErrorMarquee from "@/components/garden/AI/AiErrorMarquee";
import AiReaderDrawerLayout from "@/components/garden/AI/AiReaderDrawerLayout";
import AiAccordionItem from "@/components/garden/AI/AiAccordionItem";
import { NR, btnPrimary, skeleton } from "@/components/garden/AI/aiPanelTokens";

const loadingMessages = [
  "Reading your notes…",
  "Drafting interview-style questions…",
  "Writing clear answers…",
  "Almost ready…",
];

async function generateQuestionsList(providedText) {
  const content = await callOpenRouter([
    {
      role: "system",
      content: `Create Q&A JSON from the article.`,
    },
    { role: "user", content: providedText },
  ]);
  const parsed = parseAiJsonResponse(content);
  if (!parsed?.questions?.length) {
    throw new Error("Could not parse Q&A from the model response");
  }
  return parsed;
}

const QuestionsListDrawer = ({ isOpen, setIsOpen, cacheSlug }) => {
  const [questions, setQuestions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msgIdx, setMsgIdx] = useState(0);
  const [openIdx, setOpenIdx] = useState(-1);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMsgIdx(0);
      setQuestions(null);
      setOpenIdx(-1);

      const tick = setInterval(() => {
        setMsgIdx((i) => Math.min(i + 1, loadingMessages.length - 1));
      }, 1600);

      if (cacheSlug) {
        const cached = getNamasteAiCache("qna", cacheSlug);
        if (cached?.questions?.length) {
          setQuestions(cached);
          clearInterval(tick);
          return;
        }
      }

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
  }, [isOpen, cacheSlug]);

  return (
    <AiReaderDrawerLayout
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      icon={HiChatBubbleLeftRight}
      title="Q&A"
      subtitle="Interview-style questions — tap one to reveal the answer."
      headerExtra={
        questions?.questions?.length ? (
          <p className={`text-[11px] ${NR.muted}`}>
            {questions.questions.length} questions · one open at a time
          </p>
        ) : null
      }
    >
      {error ? <AiErrorMarquee /> : null}

      {isLoading ? (
        <div className="space-y-4 pt-2">
          <p className={`text-center text-[13px] ${NR.muted}`}>
            {loadingMessages[msgIdx]}
          </p>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-14 rounded-xl border ${NR.border} ${skeleton}`}
              />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 pt-12 text-center">
          <p className="text-[13px] text-red-600">{error}</p>
          <button type="button" onClick={fetchQuestions} className={btnPrimary}>
            Try again
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
            {questions?.questions?.map((item, idx) => (
              <AiAccordionItem
                key={item.id ?? idx}
                badge={idx + 1}
                title={item.question}
                isOpen={openIdx === idx}
                onToggle={() => setOpenIdx((v) => (v === idx ? -1 : idx))}
              >
                <p className={`mb-1 text-[10px] font-bold uppercase tracking-wide ${NR.accent}`}>
                  Answer
                </p>
                <p className={`text-[13px] leading-relaxed whitespace-pre-line ${NR.body}`}>
                  {item.answer}
                </p>
              </AiAccordionItem>
            ))}
        </div>
      )}
    </AiReaderDrawerLayout>
  );
};

export default QuestionsListDrawer;

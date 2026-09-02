"use client";
import { useState, useEffect } from "react";
import { HiBolt } from "react-icons/hi2";
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
  "Picking the big ideas…",
  "Writing a student-friendly recap…",
  "Almost ready…",
];

async function generateSummary(providedText) {
  const content = await callOpenRouter([
    {
      role: "system",
      content: `Summarize for students as JSON with intro and sections.`,
    },
    { role: "user", content: providedText },
  ]);
  const parsed = parseAiJsonResponse(content);
  if (!parsed?.sections?.length) {
    throw new Error("Could not parse summary from the model response");
  }
  return parsed;
}

const QuickReaderDrawer = ({ isOpen, setIsOpen, cacheSlug }) => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msgIdx, setMsgIdx] = useState(0);
  const [openIdx, setOpenIdx] = useState(-1);

  const fetchSummary = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMsgIdx(0);
      setSummary(null);
      setOpenIdx(-1);

      const tick = setInterval(() => {
        setMsgIdx((i) => Math.min(i + 1, loadingMessages.length - 1));
      }, 1600);

      if (cacheSlug) {
        const cached = getNamasteAiCache("summary", cacheSlug);
        if (cached?.sections?.length) {
          setSummary(cached);
          clearInterval(tick);
          return;
        }
      }

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
  }, [isOpen, cacheSlug]);

  return (
    <AiReaderDrawerLayout
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      icon={HiBolt}
      title="Quick Read"
      subtitle="Tap a section to expand — one at a time for easy revision."
      headerExtra={
        summary?.sections?.length ? (
          <p className={`text-[11px] ${NR.muted}`}>
            {summary.sections.length} sections · tap to expand
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
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 ${NR.border} ${NR.bg}`}
              >
                <div className={`mb-3 h-3 w-1/3 ${skeleton}`} />
                <div className={`mb-2 h-2.5 w-full ${skeleton}`} />
                <div className={`h-2.5 w-4/5 ${skeleton}`} />
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 pt-12 text-center">
          <p className="text-[13px] text-red-600">{error}</p>
          <button type="button" onClick={fetchSummary} className={btnPrimary}>
            Try again
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
            {summary?.sections?.map((section, index) => (
              <AiAccordionItem
                key={`${section.heading}-${index}`}
                badge={index + 1}
                title={section.heading}
                isOpen={openIdx === index}
                onToggle={() =>
                  setOpenIdx((v) => (v === index ? -1 : index))
                }
              >
                {section.definition ? (
                  <p className={`mb-3 text-[13px] leading-relaxed ${NR.body}`}>
                    {section.definition}
                  </p>
                ) : null}
                {section.points?.length ? (
                  <ul className="space-y-2">
                    {section.points.map((point, i) => (
                      <li
                        key={i}
                        className={`flex gap-2.5 text-[12.5px] leading-relaxed ${NR.muted}`}
                      >
                        <span
                          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${NR.accentBg}`}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </AiAccordionItem>
            ))}
        </div>
      )}
    </AiReaderDrawerLayout>
  );
};

export default QuickReaderDrawer;

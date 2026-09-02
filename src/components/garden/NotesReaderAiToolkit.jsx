import React, { useState } from "react";
import {
  HiBolt,
  HiSparkles,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import QuickReaderDrawer from "@/components/garden/AI/QuickReaderDrawer";
import QuestionsListDrawer from "@/components/garden/AI/QuestionsListDrawer";
import AIQuestionDrawer from "@/components/garden/AIQuestionDrawer";

export function useNotesReaderAi() {
  const [quickOpen, setQuickOpen] = useState(false);
  const [qnaOpen, setQnaOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  return {
    quickOpen,
    setQuickOpen,
    qnaOpen,
    setQnaOpen,
    quizOpen,
    setQuizOpen,
  };
}

const BUTTON_STYLES = {
  default:
    "inline-flex items-center gap-1.5 rounded-full border border-[var(--nr-border)] bg-transparent px-3 py-1.5 text-[11px] font-medium text-[var(--nr-text)] transition hover:bg-[var(--nr-hover)]",
  compact:
    "inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-[var(--nr-border)] bg-transparent px-2 py-2 text-[10px] font-medium text-[var(--nr-text)]",
  header:
    "inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2 py-1 text-[10px] font-medium text-white transition hover:bg-white/20 sm:gap-1.5 sm:px-2.5 sm:py-1.5 sm:text-[11px]",
};

export function NotesReaderAiButtons({
  onQuickOpen,
  onQuizOpen,
  onQnaOpen,
  variant = "default",
  className = "",
  showLabels = true,
}) {
  const btn = BUTTON_STYLES[variant] || BUTTON_STYLES.default;

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      <button type="button" onClick={onQuickOpen} className={btn}>
        <HiBolt className="h-3.5 w-3.5 shrink-0 text-violet-500" />
        {showLabels ? (
          <span className={variant === "header" ? "hidden sm:inline" : ""}>
            {variant === "compact" ? "Quick Read" : "Quick AI Read"}
          </span>
        ) : null}
      </button>
      <button type="button" onClick={onQuizOpen} className={btn}>
        <HiSparkles className="h-3.5 w-3.5 shrink-0 text-sky-500" />
        {showLabels ? (
          <span className={variant === "header" ? "hidden sm:inline" : ""}>Quiz</span>
        ) : null}
      </button>
      <button type="button" onClick={onQnaOpen} className={btn}>
        <HiChatBubbleLeftRight className="h-3.5 w-3.5 shrink-0 text-violet-500" />
        {showLabels ? (
          <span className={variant === "header" ? "hidden sm:inline" : ""}>
            Q&amp;A
          </span>
        ) : null}
      </button>
    </div>
  );
}

export function NotesReaderAiDrawers({
  quickOpen,
  setQuickOpen,
  qnaOpen,
  setQnaOpen,
  quizOpen,
  setQuizOpen,
}) {
  return (
    <>
      <QuickReaderDrawer isOpen={quickOpen} setIsOpen={setQuickOpen} />
      <QuestionsListDrawer isOpen={qnaOpen} setIsOpen={setQnaOpen} />
      {quizOpen ? (
        <AIQuestionDrawer isOpen={quizOpen} setIsOpen={setQuizOpen} />
      ) : null}
    </>
  );
}

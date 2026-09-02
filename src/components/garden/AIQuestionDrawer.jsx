"use client";
import { useState, useEffect, useMemo } from "react";
import {
  FaCheck,
  FaTimes,
  FaRedo,
  FaTrophy,
  FaLightbulb,
} from "react-icons/fa";
import { HiSparkles, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
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
import { getNamasteAiCache } from "@/data/note/ai-cache";
import AiErrorMarquee from "@/components/garden/AI/AiErrorMarquee";
import AiReaderDrawerLayout from "@/components/garden/AI/AiReaderDrawerLayout";
import {
  NR,
  btnPrimary,
  btnGhost,
  skeleton,
} from "@/components/garden/AI/aiPanelTokens";

const loadingMessages = [
  "Reading your notes…",
  "Building quiz questions…",
  "Shuffling options…",
  "Almost ready…",
];

const getScoreMessage = (percentage) => {
  if (percentage >= 90) return "Crushed it — you really understood this episode.";
  if (percentage >= 70) return "Solid work. Skim the notes once more on weak spots.";
  if (percentage >= 50) return "Good start. Re-read and try again.";
  return "No worries — open the notes, learn, and come back stronger.";
};

async function generateQuestions(providedText) {
  const content = await callOpenRouter([
    {
      role: "system",
      content: `Create MCQ quiz JSON from the article.`,
    },
    { role: "user", content: providedText },
  ]);
  const parsed = parseAiJsonResponse(content);
  if (!parsed?.questions?.length) {
    throw new Error("Could not parse quiz from the model response");
  }
  return parsed;
}

const AIQuestionDrawer = ({ isOpen, setIsOpen, cacheSlug }) => {
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [msgIdx, setMsgIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const list = questions?.questions || [];
  const total = list.length;
  const q = list[step];
  const answered = q ? currentAnswers[q.id] !== undefined : false;
  const scorePercentage = total ? Math.round((score / total) * 100) : 0;
  const progressPct = total ? Math.round(((step + (answered ? 1 : 0)) / total) * 100) : 0;

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMsgIdx(0);
      setQuestions(null);
      setCurrentAnswers({});
      setScore(0);
      setStep(0);
      setShowResults(false);

      const tick = setInterval(() => {
        setMsgIdx((i) => Math.min(i + 1, loadingMessages.length - 1));
      }, 1600);

      if (cacheSlug) {
        const cached = getNamasteAiCache("quiz", cacheSlug);
        if (cached?.questions?.length) {
          setQuestions(cached);
          clearInterval(tick);
          return;
        }
      }

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

  const resetQuiz = () => {
    setCurrentAnswers({});
    setScore(0);
    setStep(0);
    setShowResults(false);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    loadQuestions();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, cacheSlug]);

  const handleOptionSelect = (questionId, optionIndex) => {
    if (currentAnswers[questionId] !== undefined) return;
    const item = list.find((x) => x.id === questionId);
    setCurrentAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (item && optionIndex === item.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const goNext = () => {
    if (!answered) return;
    if (step < total - 1) setStep((s) => s + 1);
    else setShowResults(true);
  };

  const goBack = () => {
    if (showResults) {
      setShowResults(false);
      setStep(total - 1);
    } else if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const shareText = useMemo(
    () =>
      `I scored ${scorePercentage}% on a Namaste AI quiz about ${
        questions?.topic || "this topic"
      } on heyashu.in`,
    [scorePercentage, questions?.topic]
  );
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "https://heyashu.in";

  const footer =
    !isLoading && !error && total > 0 && !showResults && q ? (
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className={`inline-flex items-center gap-1 ${btnGhost} disabled:opacity-40`}
        >
          <HiChevronLeft className="h-4 w-4" />
          Back
        </button>
        <span className={`text-[11px] font-medium ${NR.muted}`}>
          {step + 1} / {total}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={!answered}
          className={`inline-flex items-center gap-1 ${btnPrimary} disabled:opacity-40`}
        >
          {step === total - 1 ? "See results" : "Next"}
          <HiChevronRight className="h-4 w-4" />
        </button>
      </div>
    ) : null;

  return (
    <AiReaderDrawerLayout
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      icon={HiSparkles}
      title="Quiz"
      subtitle="One question at a time — pick an answer, then hit Next."
      footer={footer}
      headerExtra={
        total > 0 && !isLoading && !showResults ? (
          <div>
            <div className={`mb-1 flex justify-between text-[10px] ${NR.muted}`}>
              <span>
                Question {step + 1} of {total}
              </span>
              <span>{progressPct}%</span>
            </div>
            <div
              className={`h-1.5 overflow-hidden rounded-full border ${NR.border} ${NR.bg}`}
            >
              <div
                className={`h-full rounded-full ${NR.accentBg} transition-all duration-300`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        ) : null
      }
    >
      {error ? <AiErrorMarquee /> : null}

      {isLoading ? (
        <div className="space-y-4 pt-2">
          <p className={`text-center text-[13px] ${NR.muted}`}>
            {loadingMessages[msgIdx]}
          </p>
          <div className={`rounded-xl border p-4 ${NR.border}`}>
            <div className={`mb-3 h-3 w-3/4 ${skeleton}`} />
            {[1, 2, 3].map((j) => (
              <div key={j} className={`mb-2 h-10 rounded-lg ${skeleton}`} />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 pt-12 text-center">
          <p className="text-[13px] text-red-600">{error}</p>
          <button type="button" onClick={loadQuestions} className={btnPrimary}>
            <FaRedo className="mr-2 inline h-3 w-3" />
            Try again
          </button>
        </div>
      ) : showResults ? (
        <div
          id="score-section"
          className={`rounded-xl border p-6 text-center ${NR.border} ${NR.bg}`}
        >
          <FaTrophy className="mx-auto mb-3 h-9 w-9 text-amber-500" />
          <p className={`font-fraunces text-4xl font-semibold ${NR.heading}`}>
            {scorePercentage}%
          </p>
          <p className={`mt-2 text-[13px] ${NR.muted}`}>
            {getScoreMessage(scorePercentage)}
          </p>
          <p className={`mt-1 text-[11px] ${NR.muted}`}>
            {score} / {total} correct
          </p>
          <button
            type="button"
            onClick={resetQuiz}
            className={`mt-4 inline-flex items-center gap-2 ${btnGhost}`}
          >
            <FaRedo className="h-3 w-3" />
            Retry quiz
          </button>
          <div className={`mt-5 border-t pt-4 ${NR.border}`}>
            <p className={`mb-2 text-[11px] font-medium ${NR.muted}`}>
              Share your score
            </p>
            <div className="flex justify-center gap-3">
              <TwitterShareButton url={shareUrl} title={shareText}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={shareText}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      ) : (
        <>
          {q ? (
            <div className={`overflow-hidden rounded-xl border ${NR.border} ${NR.bg}`}>
              <div className={`border-b px-4 py-3 ${NR.border} ${NR.nav}`}>
                <p className={`text-[14px] font-medium leading-snug ${NR.heading}`}>
                  {q.question}
                </p>
              </div>
              <div className="space-y-2 p-3">
                {q.options.map((option, optionIdx) => {
                  const done = currentAnswers[q.id] !== undefined;
                  const isCorrect = optionIdx === q.correctAnswer;
                  const isChosen = currentAnswers[q.id] === optionIdx;
                  let cls = `w-full rounded-lg border px-3.5 py-3 text-left text-[13px] transition ${NR.border} ${NR.bg} ${NR.text}`;
                  if (done) {
                    if (isCorrect) {
                      cls =
                        "w-full rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3.5 py-3 text-left text-[13px]";
                    } else if (isChosen) {
                      cls =
                        "w-full rounded-lg border border-red-500/50 bg-red-500/10 px-3.5 py-3 text-left text-[13px]";
                    } else {
                      cls += " opacity-45";
                    }
                  } else {
                    cls += ` ${NR.hover}`;
                  }
                  return (
                    <button
                      key={optionIdx}
                      type="button"
                      disabled={done}
                      onClick={() => handleOptionSelect(q.id, optionIdx)}
                      className={`${cls} flex items-center justify-between gap-2`}
                    >
                      <span>{option}</span>
                      {done && isCorrect ? (
                        <FaCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      ) : null}
                      {done && isChosen && !isCorrect ? (
                        <FaTimes className="h-3.5 w-3.5 shrink-0 text-red-500" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
              {answered && q.explanation ? (
                <div
                  className={`mx-3 mb-3 flex gap-2.5 rounded-lg border p-3 ${NR.border} ${NR.active}`}
                >
                  <FaLightbulb className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${NR.accent}`} />
                  <p className={`text-[12px] leading-relaxed ${NR.body}`}>
                    {q.explanation}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </AiReaderDrawerLayout>
  );
};

export default AIQuestionDrawer;

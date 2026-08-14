import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiBolt,
  HiSparkles,
  HiChatBubbleLeftRight,
  HiOutlineShare,
  HiOutlineArrowDownTray,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlinePencilSquare,
  HiOutlineStar,
  HiOutlineCodeBracket,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { MdOutlineVisibility } from "react-icons/md";
import { GITHUB_REPO_LINK } from "@/utils/constant";

export const READER_ROOM_INTRO_KEY = "notes-reader-room-intro-skip";

const THEME_PREVIEWS = [
  {
    id: "light",
    label: "Light",
    icon: HiOutlineSun,
    bg: "#fafbfc",
    fg: "#111827",
    border: "#c5ced6",
  },
  {
    id: "dark",
    label: "Dark",
    icon: HiOutlineMoon,
    bg: "#0a0a0a",
    fg: "#f5f5f5",
    border: "#2a3530",
  },
  {
    id: "cool",
    label: "Cool",
    icon: MdOutlineVisibility,
    bg: "#f3ead8",
    fg: "#3d3429",
    border: "#d4c4a4",
  },
];

function StepShell({ eyebrow, title, children, hint }) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center px-6 text-center">
      {eyebrow ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 w-full text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a6b58]"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, type: "spring", stiffness: 280, damping: 26 }}
        className="w-full text-center font-fraunces text-[clamp(1.55rem,4.5vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#2f281f]"
      >
        {title}
      </motion.h2>
      {hint ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-3 w-full max-w-[34ch] text-center text-[14px] leading-relaxed text-[#6b5d4a]"
        >
          {hint}
        </motion.p>
      ) : null}
      {children ? (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.12, type: "spring", stiffness: 300, damping: 24 }}
          className="mt-8 flex w-full flex-col items-center justify-center"
        >
          {children}
        </motion.div>
      ) : null}
    </div>
  );
}

function ThemeControlsDemo({ activeId }) {
  return (
    <div className="mx-auto flex w-fit items-center gap-1 rounded-xl border border-[#d4c4a4] bg-[#f7efdf]/80 p-1.5 shadow-[0_12px_40px_-24px_rgba(47,40,31,0.45)]">
      {THEME_PREVIEWS.map((t) => {
        const Icon = t.icon;
        const active = activeId === t.id;
        return (
          <div
            key={t.id}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium transition ${
              active ? "bg-white text-[#2f281f] shadow-sm" : "text-[#7a6b58]"
            }`}
            style={
              active
                ? { background: t.bg, color: t.fg, border: `1px solid ${t.border}` }
                : undefined
            }
          >
            <Icon className="h-3.5 w-3.5" />
            {t.label}
          </div>
        );
      })}
    </div>
  );
}

function FontControlsDemo({ highlight }) {
  return (
    <div className="mx-auto flex w-fit items-center gap-1 rounded-xl border border-[#d4c4a4] bg-white/90 px-1 py-1 shadow-[0_12px_40px_-24px_rgba(47,40,31,0.45)]">
      {["+A", "−A"].map((label) => (
        <div
          key={label}
          className={`grid h-11 w-14 place-items-center rounded-lg font-fraunces text-[13px] font-semibold transition ${
            highlight === label
              ? "bg-[#e8dcc6] text-[#2f281f]"
              : "text-[#7a6b58]"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function ToolChip({ icon: Icon, label, accent }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#d4c4a4] bg-white/90 px-4 py-2.5 text-[13px] font-medium text-[#2f281f] shadow-[0_10px_30px_-20px_rgba(47,40,31,0.5)]">
      <Icon className={`h-4 w-4 ${accent || "text-[#5c4a32]"}`} />
      {label}
    </div>
  );
}

function AiPillRow({ active }) {
  const pills = [
    { id: "summary", label: "Quick Read", icon: HiBolt, color: "text-violet-500" },
    { id: "quiz", label: "Quiz", icon: HiSparkles, color: "text-sky-500" },
    { id: "qna", label: "Q&A", icon: HiChatBubbleLeftRight, color: "text-violet-500" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {pills.map((p) => {
        const Icon = p.icon;
        const on = active === p.id || active === "all";
        return (
          <div
            key={p.id}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11px] font-medium transition ${
              on
                ? "border-[#2f281f] bg-white text-[#2f281f] shadow-sm"
                : "border-[#d4c4a4]/70 bg-transparent text-[#9a8b76] opacity-55"
            }`}
          >
            <Icon className={`h-3.5 w-3.5 ${on ? p.color : ""}`} />
            {p.label}
          </div>
        );
      })}
    </div>
  );
}

const STEPS = [
  {
    id: "welcome",
    render: () => (
      <StepShell
        eyebrow="Digital Garden"
        title="You are about to enter your Reader Room"
        hint="A calm space made for deep reading — settle in."
      >
        <div className="relative mx-auto h-24 w-24">
          <motion.div
            className="absolute inset-0 rounded-full border border-[#c9b896]/80"
            animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.15, 0.55] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-3 rounded-full bg-[#e8dcc6]"
            animate={{ rotate: [0, 6, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 grid place-items-center font-fraunces text-2xl font-semibold text-[#5c4a32]">
            R
          </div>
        </div>
      </StepShell>
    ),
  },
  {
    id: "themes",
    render: ({ tick }) => {
      const cycle = THEME_PREVIEWS[tick % THEME_PREVIEWS.length];
      return (
        <StepShell
          eyebrow="For your eyes"
          title="Light, Dark & Cool mode"
          hint="Switch the room’s light to match your mood and reduce eye strain."
        >
          <ThemeControlsDemo activeId={cycle.id} />
          <p className="mt-4 text-center text-[12px] text-[#8a7a64]">
            Same controls you’ll find in the reader toolbar
          </p>
        </StepShell>
      );
    },
  },
  {
    id: "font",
    render: ({ tick }) => (
      <StepShell
        eyebrow="Typography"
        title="Text size, your way"
        hint="Grow or shrink the page with +A and −A until it feels right."
      >
        <FontControlsDemo highlight={tick % 2 === 0 ? "+A" : "−A"} />
        <motion.p
          key={tick % 2}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 text-center font-fraunces text-[#2f281f]"
          style={{ fontSize: tick % 2 === 0 ? 22 : 15 }}
        >
          Reading should feel effortless.
        </motion.p>
      </StepShell>
    ),
  },
  {
    id: "download",
    render: () => (
      <StepShell
        eyebrow="Keep a copy"
        title="Download your notes"
        hint="Print or save a chapter whenever you want it offline."
      >
        <div className="flex justify-center">
          <ToolChip icon={HiOutlineArrowDownTray} label="Download" />
        </div>
      </StepShell>
    ),
  },
  {
    id: "ai-summary",
    render: () => (
      <StepShell
        eyebrow="AI enabled notes"
        title="Summarize in one click"
        hint="Quick Read turns a long chapter into a clear, bite-sized briefing."
      >
        <AiPillRow active="summary" />
      </StepShell>
    ),
  },
  {
    id: "ai-quiz",
    render: () => (
      <StepShell
        eyebrow="AI enabled notes"
        title="Quiz every chapter"
        hint="Test yourself after each lesson — learn by checking, not guessing."
      >
        <AiPillRow active="quiz" />
      </StepShell>
    ),
  },
  {
    id: "ai-qna",
    render: () => (
      <StepShell
        eyebrow="AI enabled notes"
        title="AI Q&A for better revision"
        hint="Use Q&A to revise faster — clear doubts and lock in what you learned."
      >
        <AiPillRow active="qna" />
      </StepShell>
    ),
  },
  {
    id: "share",
    render: () => (
      <StepShell
        eyebrow="Pass it on"
        title="Download & share with friends"
        hint="Send a chapter link — learning sticks better when it’s shared."
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          <ToolChip icon={HiOutlineArrowDownTray} label="Download" />
          <ToolChip icon={HiOutlineShare} label="Share" accent="text-emerald-700" />
        </div>
      </StepShell>
    ),
  },
  {
    id: "opensource",
    render: () => (
      <StepShell
        eyebrow="Open source"
        title="See something wrong?"
        hint="Edit in admin, raise a pull request, and don’t forget to star the repo."
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          <ToolChip icon={HiOutlinePencilSquare} label="Edit" />
          <ToolChip icon={HiOutlineCodeBracket} label="Pull request" />
          <a
            href={GITHUB_REPO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
            onClick={(e) => e.stopPropagation()}
          >
            <ToolChip icon={HiOutlineStar} label="Star repo" accent="text-amber-600" />
          </a>
        </div>
      </StepShell>
    ),
  },
  {
    id: "enter",
    render: () => (
      <StepShell
        eyebrow="Ready"
        title="Enter your Reader Room"
        hint="You’re all set — open the notes and start reading."
      >
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-[#c9b896] bg-white/70 font-fraunces text-2xl font-semibold text-[#2f281f] shadow-[0_16px_48px_-28px_rgba(47,40,31,0.55)]">
          →
        </div>
      </StepShell>
    ),
  },
];

/**
 * Full-screen introducer before notes reading.
 * Manual Next/Prev; Skip + Don’t show again. Persists via localStorage.
 */
export default function ReaderRoomIntroducer({ onComplete }) {
  const [visible, setVisible] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    try {
      const skipped = localStorage.getItem(READER_ROOM_INTRO_KEY) === "1";
      setVisible(!skipped);
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible !== true) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  const step = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  // Demo pulse only (themes / font) — does not auto-advance
  useEffect(() => {
    if (visible !== true || !step) return undefined;
    if (step.id !== "themes" && step.id !== "font") return undefined;
    setTick(0);
    const tickTimer = setInterval(() => setTick((t) => t + 1), 700);
    return () => clearInterval(tickTimer);
  }, [visible, stepIndex, step?.id]);

  const finish = (persist) => {
    if (persist) {
      try {
        localStorage.setItem(READER_ROOM_INTRO_KEY, "1");
      } catch {
        /* ignore */
      }
    }
    setVisible(false);
    onComplete?.();
  };

  const goNext = () => {
    if (isLast) {
      finish(false);
      return;
    }
    setStepIndex((i) => i + 1);
    setTick(0);
  };

  const goPrev = () => {
    if (isFirst) return;
    setStepIndex((i) => i - 1);
    setTick(0);
  };

  const progress = useMemo(
    () => ((stepIndex + 1) / STEPS.length) * 100,
    [stepIndex]
  );

  if (visible === null) {
    return (
      <div
        className="fixed inset-0 z-[100]"
        style={{ background: "#e8dcc6" }}
        aria-hidden
      />
    );
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="reader-room-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, #f6ecd8 0%, #e8dcc6 42%, #dccdb0 100%)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Reader Room introduction"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#c9b896]/35 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 18, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-16 bottom-24 h-72 w-72 rounded-full bg-[#f7efdf]/50 blur-3xl"
            animate={{ x: [0, -24, 0], y: [0, -14, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-[#c9b896]/40">
            <motion.div
              className="h-full bg-[#5c4a32]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>

          {/* Skip + don’t show again — desktop top-right */}
          <div className="absolute right-5 top-5 z-20 hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => finish(true)}
              className="rounded-full border border-[#c9b896] bg-white/50 px-3.5 py-1.5 text-[11px] font-medium text-[#5c4a32] backdrop-blur-sm transition hover:bg-white/80"
            >
              Don&apos;t show again
            </button>
            <button
              type="button"
              onClick={() => finish(false)}
              className="rounded-full bg-[#2f281f] px-4 py-1.5 text-[11px] font-semibold text-[#f6ecd8] transition hover:bg-[#1f1a14]"
            >
              Skip
            </button>
          </div>

          {/* Main stage */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-4 pb-28 pt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex w-full max-w-md items-center justify-center"
              >
                {step.render({ tick })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next — bottom center */}
          <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-0 right-0 z-20 flex flex-col items-center gap-3 px-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={isFirst}
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-[#c9b896] bg-white/80 px-4 text-[13px] font-semibold text-[#5c4a32] transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                <HiChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-11 items-center gap-1.5 rounded-full bg-[#2f281f] px-5 text-[13px] font-semibold text-[#f6ecd8] transition hover:bg-[#1f1a14]"
              >
                {isLast ? "Enter" : "Next"}
                {!isLast ? <HiChevronRight className="h-4 w-4" /> : null}
              </button>
            </div>

            {/* Mobile skip row */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                type="button"
                onClick={() => finish(true)}
                className="rounded-full border border-[#c9b896] bg-white/70 px-3 py-1.5 text-[11px] font-medium text-[#5c4a32]"
              >
                Don&apos;t show again
              </button>
              <button
                type="button"
                onClick={() => finish(false)}
                className="rounded-full bg-[#2f281f] px-4 py-1.5 text-[11px] font-semibold text-[#f6ecd8]"
              >
                Skip
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import { NR } from "@/components/garden/AI/aiPanelTokens";

export default function AiAccordionItem({
  title,
  badge,
  isOpen,
  onToggle,
  children,
}) {
  return (
    <div className={`overflow-hidden rounded-xl border ${NR.border} ${NR.bg}`}>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left transition ${NR.hover}`}
      >
        <span className={`text-[13px] font-medium leading-snug ${NR.heading}`}>
          {badge ? (
            <span
              className={`mr-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-md border ${NR.border} ${NR.active} px-1.5 text-[10px] font-bold ${NR.accent}`}
            >
              {badge}
            </span>
          ) : null}
          {title}
        </span>
        <HiChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 ${NR.muted} transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className={`border-t ${NR.border} px-4 py-3.5`}>{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

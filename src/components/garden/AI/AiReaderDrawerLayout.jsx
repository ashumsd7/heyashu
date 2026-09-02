"use client";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import {
  AI_DRAWER_OVERLAY_Z,
  AI_DRAWER_PANEL_Z,
} from "@/components/garden/AI/aiDrawerStyles";
import { useIsMobilePanel } from "@/components/garden/AI/useIsMobilePanel";
import { NR } from "@/components/garden/AI/aiPanelTokens";

export default function AiReaderDrawerLayout({
  isOpen,
  onClose,
  icon: Icon,
  title,
  subtitle,
  headerExtra,
  children,
  footer,
}) {
  const isMobile = useIsMobilePanel();

  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close panel"
            className={`fixed inset-0 ${AI_DRAWER_OVERLAY_Z} bg-black/50 backdrop-blur-[3px]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={
              isMobile
                ? { x: "100%" }
                : { opacity: 0, scale: 0.94, x: "-50%", y: "calc(-50% + 16px)" }
            }
            animate={
              isMobile
                ? { x: 0 }
                : { opacity: 1, scale: 1, x: "-50%", y: "-50%" }
            }
            exit={
              isMobile
                ? { x: "100%" }
                : { opacity: 0, scale: 0.96, x: "-50%", y: "calc(-50% + 10px)" }
            }
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            style={isMobile ? undefined : { left: "50%", top: "50%" }}
            className={`fixed ${AI_DRAWER_PANEL_Z} flex flex-col overflow-hidden ${NR.bg} ${NR.text} shadow-2xl ${
              isMobile
                ? "inset-y-0 right-0 w-full max-w-[min(100%,420px)] border-l"
                : "max-h-[min(88vh,720px)] w-[min(92vw,640px)] rounded-2xl border"
            } ${NR.border}`}
          >
            <header
              className={`shrink-0 border-b ${NR.border} ${NR.nav} px-5 py-4`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  {Icon ? (
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${NR.border} ${NR.active}`}
                    >
                      <Icon className={`h-5 w-5 ${NR.accent}`} />
                    </span>
                  ) : null}
                  <div className="min-w-0">
                    <h2
                      className={`font-fraunces text-[17px] font-semibold leading-tight ${NR.heading}`}
                    >
                      {title}
                    </h2>
                    {subtitle ? (
                      <p className={`mt-1 text-[12px] leading-relaxed ${NR.muted}`}>
                        {subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${NR.border} ${NR.bg} ${NR.muted} transition ${NR.hover}`}
                  aria-label="Close"
                >
                  <IoClose size={20} />
                </button>
              </div>
              {headerExtra ? <div className="mt-3">{headerExtra}</div> : null}
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              {children}
            </div>

            {footer ? (
              <div
                className={`shrink-0 border-t ${NR.border} ${NR.nav} px-5 py-3`}
              >
                {footer}
              </div>
            ) : null}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

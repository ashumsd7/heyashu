import React from "react";
import { motion } from "framer-motion";
import { HiChatBubbleLeftRight, HiPencilSquare, HiSparkles } from "react-icons/hi2";

const TOPMATE_COLLAB_URL = "https://topmate.io/aat";

/**
 * Request a Topic / Collaborate CTA — shared by notes index, notes chapter, blog detail.
 */
export default function GardenCollabCard({ className = "" }) {
  return (
    <section className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-md border border-[#e6e0d6] bg-white dark:border-[#1e3328] dark:bg-[#121e17]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f7f4ee]/90 dark:to-[#0b120e]/85"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-8 top-0 opacity-40"
          aria-hidden="true"
        >
          <svg width="220" height="220" viewBox="0 0 200 200" fill="none">
            <path
              d="M100 10C120 40 180 60 190 100C200 140 150 180 100 190C50 180 0 140 10 100C20 60 80 40 100 10Z"
              fill="#143825"
              opacity="0.06"
            />
          </svg>
        </div>

        <div className="relative z-[1] grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-9">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ece7de] px-3 py-1 text-xs font-semibold text-[#5f584e] dark:bg-[#172a20] dark:text-[#92a59a]">
              <HiPencilSquare className="h-3.5 w-3.5" />
              Request a Topic
            </div>
            <h3 className="mb-2 font-fraunces text-2xl font-semibold text-[#171717] dark:text-[#f0f4ef]">
              Want me to write notes on a course?
            </h3>
            <p className="text-[0.95rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
              Tell me the course, book, or research topic you want covered. If it helps
              learners, I&apos;ll consider adding structured digital notes for it in the
              garden.
            </p>
          </div>

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ece7de] px-3 py-1 text-xs font-semibold text-[#5f584e] dark:bg-[#172a20] dark:text-[#92a59a]">
              <HiSparkles className="h-3.5 w-3.5" />
              Collaborate
            </div>
            <h3 className="mb-2 font-fraunces text-2xl font-semibold text-[#171717] dark:text-[#f0f4ef]">
              Have a notes collection to feature here?
            </h3>
            <p className="text-[0.95rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
              Do you have open notes you want featured in this digital garden? Let me know —
              we can collaborate and publish them for learners worldwide.
            </p>
          </div>
        </div>

        <div className="relative z-[1] flex flex-col items-start justify-between gap-4 border-t border-[#ece7de] px-6 py-5 dark:border-[#1e3328] md:flex-row md:items-center md:px-9">
          <p className="text-sm text-[#6b6458] dark:text-[#92a59a]">
            Reach out on Topmate:{" "}
            <a
              href={TOPMATE_COLLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#143825] underline decoration-[#cfc6b8] underline-offset-2 hover:text-[#9a4f2e] dark:text-[#22c55e]"
            >
              topmate.io/aat
            </a>
          </p>

          <motion.a
            href={TOPMATE_COLLAB_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-sm bg-[#1f2a22] px-5 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-[#143825] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
          >
            <HiChatBubbleLeftRight className="h-4 w-4" />
            Contact to Collaborate
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

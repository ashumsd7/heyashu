import React from "react";
import { HiOutlinePlayCircle, HiArrowUpRight } from "react-icons/hi2";
import { NAMASTE_DEV_LEARN_URL } from "@/data/note/namaste-ai-notes/dev-notes";

export default function NamasteDevLearnBanner() {
  return (
    <aside className="mt-14" aria-label="NamasteDev courses">
      <a
        href={NAMASTE_DEV_LEARN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-2xl border border-[var(--nr-border)] bg-[var(--nr-surface)] no-underline shadow-sm transition hover:border-violet-400/40 hover:shadow-md"
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(135deg, #7c3aed 0%, #ea580c 50%, #f59e0b 100%)",
          }}
        />
        <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-3 sm:items-center">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-orange-500 text-white shadow-sm">
              <HiOutlinePlayCircle className="h-6 w-6" />
            </span>
            <div className="min-w-0 text-left">
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700">
                Learn by video
              </p>
              <p className="font-fraunces text-[clamp(1.05rem,2.5vw,1.35rem)] font-semibold leading-snug text-[var(--nr-heading)]">
                Explore courses on NamasteDev.com
              </p>
              <p className="mt-1 text-[12px] text-[var(--nr-muted)]">
                Hands-on video lessons from Akshay Saini&apos;s ecosystem.
              </p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-gradient-to-r from-violet-700 to-orange-600 px-4 py-2.5 text-[12px] font-semibold text-white transition group-hover:opacity-95 sm:self-center">
            Start learning
            <HiArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>
    </aside>
  );
}

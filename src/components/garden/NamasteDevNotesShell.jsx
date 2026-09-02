import React from "react";
import Image from "next/image";
import { NAMASTE_DEV_LOGO_URL } from "@/data/note/namaste-ai-notes/dev-notes";

function NamasteDevWatermark() {
  const rows = 14;
  const cols = 6;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 flex h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] flex-col justify-center gap-14 opacity-[0.06]">
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="flex w-full items-center justify-around gap-10 whitespace-nowrap"
          >
            {Array.from({ length: cols }).map((_, col) => (
              <span
                key={col}
                className="font-fraunces text-[clamp(1.1rem,2.5vw,1.65rem)] font-semibold tracking-wide text-[var(--nr-text)]"
              >
                NamasteDev.com
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Compact top banner for Namaste Dev Notes reader (no garden navbar). */
export default function NamasteDevNotesShell({
  children,
  themeStyle,
  headerEnd,
}) {
  return (
    <div
      className="relative min-h-screen bg-[var(--nr-bg)] text-[var(--nr-text)] transition-colors duration-300"
      style={themeStyle}
    >
      <NamasteDevWatermark />

      <header className="sticky top-0 z-50 border-b border-[#1e293b]/20 bg-[#0b0f1a] shadow-sm">
        <div className="mx-auto max-w-[920px] px-4 py-3">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <a
              href="https://namastedev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center no-underline"
              aria-label="NamasteDev.com"
            >
              <Image
                src={NAMASTE_DEV_LOGO_URL}
                alt="NamasteDev.com"
                width={200}
                height={40}
                className="h-8 w-auto max-w-[min(100%,200px)] object-contain sm:h-9"
                priority
              />
            </a>
            {headerEnd ? (
              <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:justify-end">
                {headerEnd}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

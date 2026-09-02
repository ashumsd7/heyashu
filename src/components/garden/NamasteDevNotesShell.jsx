import React from "react";
import Image from "next/image";
import { NAMASTE_DEV_LOGO_URL } from "@/data/note/namaste-ai-notes/dev-notes";

/** Scrolls with page content — not fixed to viewport. */
function NamasteDevWatermark() {
  const rows = 18;
  const cols = 5;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="flex min-h-full w-full flex-col items-center justify-around gap-16 py-20 opacity-[0.055]">
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="flex w-[140%] -rotate-[18deg] items-center justify-around gap-12 whitespace-nowrap"
          >
            {Array.from({ length: cols }).map((_, col) => (
              <span
                key={col}
                className="font-fraunces text-[clamp(1.05rem,2.2vw,1.5rem)] font-semibold tracking-wide text-[var(--nr-text)]"
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

/** Logo only on blank background — no full-width dark navbar. */
export default function NamasteDevNotesShell({ children, themeStyle }) {
  return (
    <div
      className="relative min-h-screen bg-[var(--nr-bg)] text-[var(--nr-text)] transition-colors duration-300"
      style={themeStyle}
    >
      <NamasteDevWatermark />

      <div className="relative z-10 flex justify-center px-4 pt-5 pb-2">
        <a
          href="https://namastedev.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center no-underline"
          aria-label="NamasteDev.com"
        >
          <Image
            src={NAMASTE_DEV_LOGO_URL}
            alt="NamasteDev.com"
            width={200}
            height={40}
            className="h-9 w-auto max-w-[min(100%,200px)] object-contain sm:h-10"
            priority
          />
        </a>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

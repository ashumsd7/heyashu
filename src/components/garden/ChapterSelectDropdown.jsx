import React, { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

function chapterLabel(ch) {
  const name = ch.episodeTitle || ch.name || ch.title || ch.slug;
  return ch.episode != null ? `Episode ${ch.episode} — ${name}` : name;
}

export default function ChapterSelectDropdown({
  chapters = [],
  currentSlug,
  onSelect,
  className = "",
  tone = "default",
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const current = chapters.find((c) => c.slug === currentSlug);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const inverted = tone === "inverted";

  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center gap-2 rounded-full border py-2.5 pl-4 pr-10 text-left text-[13px] font-medium shadow-sm outline-none transition focus:ring-2 ${
          inverted
            ? "border-white/35 bg-white/95 text-violet-950 hover:border-white/50 focus:ring-white/40"
            : "border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-text)] hover:border-[var(--nr-accent)]/30 focus:ring-violet-400/40"
        }`}
      >
        <span className="min-w-0 flex-1 truncate text-left">
          {current ? chapterLabel(current) : "Select chapter"}
        </span>
        <HiChevronDown
          className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 transition ${
            inverted ? "text-violet-700/70" : "text-[var(--nr-muted)]"
          } ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Chapters"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-64 overflow-y-auto rounded-xl border border-[var(--nr-border)] bg-[var(--nr-surface)] py-1 shadow-lg"
        >
          {chapters.map((ch) => {
            const active = ch.slug === currentSlug;
            return (
              <li key={ch.slug} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(ch.slug);
                    setOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-[13px] transition ${
                    active
                      ? "bg-[var(--nr-hover)] font-semibold text-[var(--nr-heading)]"
                      : "font-medium text-[var(--nr-text)] hover:bg-[var(--nr-hover)]"
                  }`}
                >
                  {chapterLabel(ch)}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

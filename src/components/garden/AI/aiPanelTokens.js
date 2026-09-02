/** Shared class tokens — uses reader theme CSS variables from parent */

export const NR = {
  bg: "bg-[var(--nr-surface,#ffffff)]",
  page: "bg-[var(--nr-bg,#fafbfc)]",
  text: "text-[var(--nr-text,#111827)]",
  heading: "text-[var(--nr-heading,#0a0a0a)]",
  body: "text-[var(--nr-body,#1f2937)]",
  muted: "text-[var(--nr-muted,#4b5563)]",
  border: "border-[var(--nr-border,#c5ced6)]",
  hover: "hover:bg-[var(--nr-hover,#eef2f4)]",
  active: "bg-[var(--nr-active,#dcebe0)]",
  accent: "text-[var(--nr-accent,#0f2d1c)]",
  accentBg: "bg-[var(--nr-accent,#0f2d1c)]",
  nav: "bg-[var(--nr-nav,#e8eee9)]",
};

export const card =
  `overflow-hidden rounded-xl border ${NR.border} ${NR.bg} shadow-sm`;

export const cardHead =
  `border-b ${NR.border} ${NR.nav} px-4 py-2.5`;

export const btnPrimary =
  "rounded-lg bg-[var(--nr-accent,#0f2d1c)] px-4 py-2.5 text-[12px] font-semibold text-white transition hover:opacity-90";

export const btnGhost =
  `rounded-lg border ${NR.border} ${NR.bg} px-4 py-2.5 text-[12px] font-semibold ${NR.text} transition ${NR.hover}`;

export const skeleton = "animate-pulse rounded bg-[var(--nr-border,#c5ced6)]/40";

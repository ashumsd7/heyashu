import { HiOutlineBookOpen } from "react-icons/hi2";

export default function BookModeButton({ onClick, compact = false, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Book Mode"
      aria-label="Open Book Mode"
      className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] transition hover:border-amber-500/40 hover:text-[var(--nr-text)] ${
        compact ? "grid h-9 w-9 place-items-center" : "px-2.5 py-1.5"
      } ${className}`}
    >
      <span className="relative grid place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-amber-500/25" />
        <span className="absolute -inset-1 animate-pulse rounded-full bg-amber-400/15" />
        <HiOutlineBookOpen className="relative h-4 w-4 text-amber-600 dark:text-amber-400" />
      </span>
      {!compact ? (
        <span className="text-[11px] font-semibold text-[var(--nr-text)]">
          Book Mode
        </span>
      ) : null}
    </button>
  );
}

import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { getNamasteAiPdfUrl } from "@/data/note/ai-cache";

export function openNotePdfDownload(pdfUrl, filename) {
  if (typeof window === "undefined" || !pdfUrl) return;
  window.open(pdfUrl, "_blank", "noopener,noreferrer");
  const anchor = document.createElement("a");
  anchor.href = pdfUrl;
  anchor.download = filename || "note.pdf";
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export default function DownloadNotePdfButton({
  slug,
  compact = false,
  className = "",
}) {
  const pdfUrl = getNamasteAiPdfUrl(slug);
  if (!pdfUrl) return null;

  const handleClick = () => {
    openNotePdfDownload(pdfUrl, `${slug}.pdf`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Download PDF"
      aria-label="Download PDF"
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] transition hover:border-violet-500/40 hover:text-[var(--nr-text)] ${
        compact ? "grid h-9 w-9 place-items-center" : "px-2.5 py-1.5"
      } ${className}`}
    >
      <HiOutlineArrowDownTray className="h-4 w-4 text-violet-600 dark:text-violet-400" />
      {!compact ? (
        <span className="text-[11px] font-semibold text-[var(--nr-text)]">
          Download PDF
        </span>
      ) : null}
    </button>
  );
}

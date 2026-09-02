"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineBookOpen,
  HiOutlineArrowDownTray,
  HiChevronLeft,
  HiChevronRight,
  HiMinus,
  HiPlus,
} from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { AI_DRAWER_OVERLAY_Z } from "@/components/garden/AI/aiDrawerStyles";
import { useIsMobilePanel } from "@/components/garden/AI/useIsMobilePanel";
import { openNotePdfDownload } from "@/components/garden/DownloadNotePdfButton";
import {
  NAMASTE_AI_ALL_EPISODES_FILENAME,
  NAMASTE_AI_ALL_EPISODES_PDF,
  getBookModeStartPage,
} from "@/data/note/namaste-ai-notes/book-mode";

const PDF_JS_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDF_WORKER_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const ZOOM_MIN = 0.6;
const ZOOM_MAX = 2.4;
const ZOOM_STEP = 0.15;

let pdfJsLoader;

function loadPdfJs() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (!pdfJsLoader) {
    pdfJsLoader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = PDF_JS_CDN;
      script.async = true;
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_CDN;
        resolve(window.pdfjsLib);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return pdfJsLoader;
}

export default function BookModeModal({ isOpen, onClose, episodeSlug }) {
  const canvasRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const pdfDocRef = useRef(null);
  const renderTaskRef = useRef(null);
  const zoomRef = useRef(1);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobilePanel();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [zoom, setZoom] = useState(1);

  zoomRef.current = zoom;

  const renderPage = useCallback(async (pageNum) => {
    const doc = pdfDocRef.current;
    const canvas = canvasRef.current;
    if (!doc || !canvas) return;

    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel();
      } catch (_) {}
    }

    const pdfPage = await doc.getPage(pageNum);
    const base = pdfPage.getViewport({ scale: 1 });
    const wrap = canvasWrapRef.current;
    const maxW = wrap?.clientWidth || base.width;
    const fitScale = maxW / base.width;
    const scale = Math.max(fitScale * zoomRef.current, 0.4);
    const viewport = pdfPage.getViewport({ scale });

    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const task = pdfPage.render({ canvasContext: context, viewport });
    renderTaskRef.current = task;
    await task.promise;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    let cancelled = false;
    const startPage = getBookModeStartPage(episodeSlug);
    setPage(startPage);
    setZoom(1);
    setError("");
    setLoading(true);

    (async () => {
      try {
        const pdfjs = await loadPdfJs();
        if (!pdfjs || cancelled) return;

        const doc = await pdfjs.getDocument(NAMASTE_AI_ALL_EPISODES_PDF).promise;
        if (cancelled) return;

        pdfDocRef.current = doc;
        setTotalPages(doc.numPages);
        setLoading(false);
        await renderPage(startPage);
      } catch (_) {
        if (!cancelled) {
          setError("Could not load the book PDF. Please try again.");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      pdfDocRef.current = null;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch (_) {}
      }
    };
  }, [isOpen, episodeSlug, renderPage]);

  useEffect(() => {
    if (!isOpen || !pdfDocRef.current || loading) return undefined;
    let cancelled = false;

    (async () => {
      try {
        if (!cancelled) await renderPage(page);
      } catch (_) {}
    })();

    return () => {
      cancelled = true;
    };
  }, [page, zoom, isOpen, loading, renderPage]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && page > 1) setPage((p) => p - 1);
      if (e.key === "ArrowRight" && page < totalPages) setPage((p) => p + 1);
      if (e.key === "+" || e.key === "=") {
        setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)));
      }
      if (e.key === "-" || e.key === "_") {
        setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, page, totalPages]);

  const handleDownload = () => {
    openNotePdfDownload(
      NAMASTE_AI_ALL_EPISODES_PDF,
      NAMASTE_AI_ALL_EPISODES_FILENAME
    );
  };

  const bumpZoom = (dir) => {
    setZoom((z) => {
      const next = +(z + dir * ZOOM_STEP).toFixed(2);
      return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
    });
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="book-mode-root"
          className={`fixed inset-0 ${AI_DRAWER_OVERLAY_Z} flex items-center justify-center p-0`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close Book Mode"
            className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
            onClick={onClose}
          />

          <motion.div
            key="book-mode-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Book Mode"
            initial={
              isMobile
                ? { opacity: 0, y: 40 }
                : { opacity: 0, scale: 0.97, y: 10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              isMobile
                ? { opacity: 0, y: 24 }
                : { opacity: 0, scale: 0.98, y: 8 }
            }
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className={`relative z-10 flex flex-col overflow-hidden border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-text)] shadow-2xl ${
              isMobile ? "rounded-none" : "rounded-xl"
            }`}
            style={
              isMobile
                ? { width: "100%", height: "100dvh" }
                : {
                    width: "min(100vw, calc(100vh * 210 / 297))",
                    height: "100vh",
                  }
            }
            onClick={(e) => e.stopPropagation()}
          >
            <header className="shrink-0 border-b border-[var(--nr-border)] bg-[var(--nr-nav)] px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[var(--nr-border)] bg-[var(--nr-active)]">
                    <HiOutlineBookOpen className="h-3.5 w-3.5 text-amber-600" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-fraunces text-[13px] font-semibold leading-tight text-[var(--nr-heading)]">
                      Book Mode
                    </h2>
                    <p className="text-[10px] leading-tight text-[var(--nr-muted)]">
                      Namaste AI — all episodes
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <div
                    className="mr-1 flex items-center rounded-md border border-[var(--nr-border)] bg-[var(--nr-bg)] p-0.5"
                    role="group"
                    aria-label="Zoom"
                  >
                    <button
                      type="button"
                      title="Zoom out"
                      onClick={() => bumpZoom(-1)}
                      disabled={zoom <= ZOOM_MIN}
                      className="grid h-7 w-7 place-items-center rounded text-[var(--nr-muted)] transition hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)] disabled:opacity-35"
                    >
                      <HiMinus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[2.4rem] text-center text-[10px] font-semibold tabular-nums text-[var(--nr-muted)]">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      type="button"
                      title="Zoom in"
                      onClick={() => bumpZoom(1)}
                      disabled={zoom >= ZOOM_MAX}
                      className="grid h-7 w-7 place-items-center rounded text-[var(--nr-muted)] transition hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)] disabled:opacity-35"
                    >
                      <HiPlus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    title="Download PDF"
                    className="inline-flex items-center gap-1 rounded-md border border-[var(--nr-border)] bg-[var(--nr-bg)] px-2 py-1 text-[10px] font-semibold text-[var(--nr-text)] transition hover:border-violet-500/40"
                  >
                    <HiOutlineArrowDownTray className="h-3.5 w-3.5 text-violet-600" />
                    Download
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="grid h-7 w-7 place-items-center rounded-md text-[var(--nr-muted)] transition hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)]"
                  >
                    <IoClose className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mt-1.5 text-[10px] leading-snug text-[var(--nr-muted)]">
                This is clean Book mode — images not included. Best read on the
                website.
              </p>
            </header>

            <div
              ref={canvasWrapRef}
              className="min-h-0 flex-1 overflow-auto bg-[#e8e8e8] dark:bg-[#111]"
            >
              {loading ? (
                <div className="flex h-full min-h-[16rem] items-center justify-center text-[13px] text-[var(--nr-muted)]">
                  Loading book…
                </div>
              ) : error ? (
                <div className="flex h-full min-h-[16rem] items-center justify-center px-4 text-center text-[13px] text-red-600">
                  {error}
                </div>
              ) : (
                <div className="flex min-h-full justify-center">
                  <canvas
                    ref={canvasRef}
                    className="h-auto max-w-none bg-white shadow-md"
                  />
                </div>
              )}
            </div>

            <footer className="shrink-0 border-t border-[var(--nr-border)] bg-[var(--nr-nav)] px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={page <= 1 || loading}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1 rounded-md border border-[var(--nr-border)] bg-[var(--nr-surface)] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--nr-text)] transition enabled:hover:border-[var(--nr-accent)] disabled:opacity-40"
                >
                  <HiChevronLeft className="h-4 w-4" />
                  Prev
                </button>
                <span className="text-[11px] font-medium text-[var(--nr-muted)]">
                  Page {page}
                  {totalPages > 0 ? ` of ${totalPages}` : ""}
                </span>
                <button
                  type="button"
                  disabled={!totalPages || page >= totalPages || loading}
                  onClick={() =>
                    setPage((p) =>
                      totalPages ? Math.min(totalPages, p + 1) : p + 1
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-md border border-[var(--nr-border)] bg-[var(--nr-surface)] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--nr-text)] transition enabled:hover:border-[var(--nr-accent)] disabled:opacity-40"
                >
                  Next
                  <HiChevronRight className="h-4 w-4" />
                </button>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

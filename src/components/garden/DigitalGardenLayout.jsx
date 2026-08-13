import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi2";
import { GITHUB_REPO_LINK } from "@/utils/constant";

/**
 * Digital Garden shell — sticky navbar shared by /digital-garden/* and /blog/*
 * UI polish can come later; this is the layout foundation.
 */
export default function DigitalGardenLayout({ children }) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const isBlog = router.pathname.startsWith("/blog");
  const isNotes =
    router.pathname.startsWith("/digital-garden/notes") ||
    router.asPath.startsWith("/digital-garden/notes");

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] font-ibm-sans text-[#171717] transition-colors duration-200 dark:bg-[#0b120e] dark:text-[#f0f4ef]">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="sticky top-0 z-50 border-b border-[#e8e2d7] bg-[#faf7f2]/90 py-4 backdrop-blur-md dark:border-[#1e3328] dark:bg-[#0b120e]/90">
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-6">
          <Link
            href="/digital-garden"
            className="inline-flex items-baseline gap-1.5 no-underline"
          >
            <span className="font-fraunces text-[1.3rem] font-bold tracking-[-0.01em] text-[#171717] dark:text-[#f0f4ef]">
              Digital Garden
            </span>
            <span className="inline-flex items-baseline gap-1 font-ibm-mono text-[0.58rem] font-medium italic tracking-[0.03em]">
              <span className="text-[#585858]/75 dark:text-[#92a59a]/75">
                by
              </span>
              <span className="text-teal-600 dark:text-teal-400">
                heyashu.in
              </span>
            </span>
          </Link>

          <nav className="ml-auto mr-4 hidden items-center gap-[22px] sm:flex">
            <Link
              href="/blog"
              className={`text-[0.92rem] font-semibold no-underline transition ${
                isBlog
                  ? "text-[#143825] dark:text-[#22c55e]"
                  : "text-[#585858] hover:text-[#143825] dark:text-[#92a59a] dark:hover:text-[#22c55e]"
              }`}
            >
              Blogs
            </Link>
            <Link
              href="/digital-garden/notes"
              className={`text-[0.92rem] font-semibold no-underline transition ${
                isNotes
                  ? "text-[#143825] dark:text-[#22c55e]"
                  : "text-[#585858] hover:text-[#143825] dark:text-[#92a59a] dark:hover:text-[#22c55e]"
              }`}
            >
              Notes
            </Link>
            <a
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e8e2d7] bg-white px-4 py-1.5 text-[0.82rem] font-semibold text-[#171717] shadow-sm transition hover:border-amber-500 hover:text-amber-600 dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
              href={GITHUB_REPO_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Star on GitHub ★
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-[#e8e2d7] bg-white text-[#171717] transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef] dark:hover:border-[#22c55e]"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              type="button"
            >
              {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
            </button>
            <Link
              className="rounded-[10px] border border-[#e8e2d7] bg-white px-3 py-2 text-sm font-medium text-[#171717] no-underline transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
              href="/"
            >
              ← Ashu&apos;s Profile
            </Link>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}

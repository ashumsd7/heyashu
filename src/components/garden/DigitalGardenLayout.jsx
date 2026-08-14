import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { FaGithub } from "react-icons/fa";
import { HiSun, HiMoon, HiMagnifyingGlass, HiHeart } from "react-icons/hi2";
import { GITHUB_REPO_LINK } from "@/utils/constant";
import { GARDEN_HERO_STATS } from "@/data/garden/stats";

const INDEPENDENCE_MARQUEE = [
  "Celebrating 80th Independence Day of India",
  "Bharat Mata Ki Jai",
  "Long Live India",
  "Jai Hind",
];

/**
 * Digital Garden shell — sticky navbar for /digital-garden/* and /blog/*
 *
 * Order: Blogs → Notes → Star on GitHub → Support → Who built this → Theme
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

  const githubStars = GARDEN_HERO_STATS[2]?.value || "30+";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const scrollToSupport = (e) => {
    e.preventDefault();
    if (router.pathname !== "/digital-garden") {
      router.push("/digital-garden#support");
      return;
    }
    const el = document.getElementById("support");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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

      <header className="sticky top-0 z-50">
        {/* Independence marquee — above navbar, animated tricolor gradient */}
        <div className="independence-strip py-2" aria-label="Independence Day celebration">
          <div className="relative z-[1] flex w-max animate-khaki-marquee">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex items-center whitespace-nowrap"
                aria-hidden={copy === 1}
              >
                {INDEPENDENCE_MARQUEE.map((item, i) => (
                  <React.Fragment key={`${copy}-${item}-${i}`}>
                    <span className="independence-strip-text inline-flex items-center gap-2.5 px-8 font-fraunces text-[0.75rem] font-semibold tracking-[0.1em] text-white sm:text-[0.82rem]">
                      <span className="text-base not-italic" aria-hidden="true">
                        🇮🇳
                      </span>
                      <span className="italic">{item}</span>
                      <span className="font-ibm-mono text-[0.65rem] font-bold not-italic uppercase tracking-[0.18em] text-[#000080] drop-shadow-none">
                        • Jai Hind •
                      </span>
                    </span>
                    <span className="text-xs text-white/80" aria-hidden="true">
                      ✦
                    </span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-[#e8e2d7] bg-[#faf7f2]/90 py-4 backdrop-blur-md dark:border-[#1e3328] dark:bg-[#0b120e]/90">
          <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-3 px-6">
            <Link
              href="/digital-garden"
              className="inline-flex shrink-0 items-baseline gap-1.5 no-underline"
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

            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              <nav className="hidden items-center gap-4 sm:flex md:gap-5">
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
              </nav>

              <a
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e8e2d7] bg-white px-3 py-1.5 text-[0.82rem] font-semibold text-[#171717] shadow-sm transition hover:border-amber-500 hover:text-amber-700 dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
                href={GITHUB_REPO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                title="Star on GitHub"
              >
                <FaGithub className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Star</span>
                <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                  {githubStars}
                </span>
              </a>

              <a
                href="/digital-garden#support"
                onClick={scrollToSupport}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e8e2d7] bg-white px-3 py-1.5 text-[0.82rem] font-semibold text-[#171717] no-underline shadow-sm transition hover:border-[#c4552d] hover:text-[#c4552d] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
              >
                <HiHeart className="h-3.5 w-3.5 text-[#c4552d]" />
                <span className="hidden sm:inline">Support</span>
              </a>

              <a
                href="https://www.heyashu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#e8e2d7] bg-white px-3 py-2 text-sm font-medium text-[#171717] no-underline transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
                title="Who built this"
              >
                <HiMagnifyingGlass className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">Who built this</span>
              </a>

              <button
                className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-[#e8e2d7] bg-white text-[#171717] transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef] dark:hover:border-[#22c55e]"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                type="button"
              >
                {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import {
  HiSun,
  HiMoon,
  HiMagnifyingGlass,
  HiHeart,
  HiSparkles,
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";
import { GITHUB_REPO_LINK } from "@/utils/constant";
import { GARDEN_HERO_STATS } from "@/data/garden/stats";
import {
  getGardenNavItems,
  isGardenNavItemActive,
} from "@/data/garden/navbar";

/**
 * Digital Garden shell — sticky navbar for /digital-garden/*, /blog/*, /product/*
 *
 * Nav links: JSON-driven via @/data/garden/navbar
 * Fixed actions: GitHub · Support · Who built this · Theme
 */
export default function DigitalGardenLayout({ children }) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isDark = mounted && resolvedTheme === "dark";
  const navItems = getGardenNavItems();

  const githubStars = GARDEN_HERO_STATS[2]?.value || "30+";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const scrollToSupport = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (router.pathname !== "/digital-garden") {
      router.push("/digital-garden#support");
      return;
    }
    const el = document.getElementById("support");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinkClass = (active) =>
    `text-[0.92rem] font-semibold no-underline transition ${
      active
        ? "text-[#143825] dark:text-[#22c55e]"
        : "text-[#585858] hover:text-[#143825] dark:text-[#92a59a] dark:hover:text-[#22c55e]"
    }`;

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
        <div
          className="independence-strip h-1.5 sm:h-2"
          aria-label="Independence Day"
        />

        <div className="border-b border-[#e8e2d7] bg-[#faf7f2]/90 py-1.5 backdrop-blur-md dark:border-[#1e3328] dark:bg-[#0b120e]/90 sm:py-2">
          <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 shrink flex-col leading-tight">
              <span className="mb-px inline-flex items-center gap-1 font-ibm-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-[#8a8276] dark:text-[#6d7f74] sm:text-[9px]">
                <HiSparkles className="h-2.5 w-2.5 shrink-0 text-[#c4552d]" aria-hidden="true" />
                OPENSOURCED
                <HiSparkles className="h-2.5 w-2.5 shrink-0 text-[#c4552d]" aria-hidden="true" />
              </span>
              <div className="inline-flex min-w-0 items-baseline gap-1.5 whitespace-nowrap">
                <Link
                  href="/digital-garden"
                  className="font-fraunces text-[1rem] font-bold tracking-[-0.01em] text-[#171717] no-underline dark:text-[#f0f4ef] sm:text-[1.15rem]"
                >
                  Digital Garden
                </Link>
                <span className="inline-flex items-baseline gap-1 font-ibm-mono text-[0.52rem] font-medium italic tracking-[0.03em] sm:text-[0.58rem]">
                  <span className="text-[#585858]/75 dark:text-[#92a59a]/75">
                    by
                  </span>
                  <a
                    href="https://www.heyashu.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 no-underline hover:underline dark:text-teal-400"
                  >
                    heyashu.in
                  </a>
                </span>
              </div>
            </div>

            {/* Desktop actions */}
            <div className="hidden items-center justify-end gap-2 sm:flex md:gap-3">
              <nav className="flex items-center gap-4 md:gap-5">
                {navItems.map((item) => {
                  const active = isGardenNavItemActive(
                    item.href,
                    router.pathname,
                    router.asPath
                  );
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={navLinkClass(active)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <a
                className="inline-flex items-center gap-1 rounded-full border border-[#e8e2d7] bg-white px-2 py-1 text-[0.82rem] font-semibold text-[#171717] shadow-sm transition hover:border-amber-500 hover:text-amber-700 dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
                href={GITHUB_REPO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                title="Star on GitHub"
              >
                <FaGithub className="h-3.5 w-3.5" />
                <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                  {githubStars}
                </span>
              </a>

              <a
                href="/digital-garden#support"
                onClick={scrollToSupport}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e8e2d7] bg-white px-2.5 py-1 text-[0.82rem] font-semibold text-[#171717] no-underline shadow-sm transition hover:border-[#c4552d] hover:text-[#c4552d] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
              >
                <HiHeart className="h-3.5 w-3.5 text-[#c4552d]" />
                <span className="hidden md:inline">Support</span>
              </a>

              <a
                href="https://www.heyashu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#e8e2d7] bg-white px-2.5 py-1 text-sm font-medium text-[#171717] no-underline transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
                title="Who built this"
              >
                <HiMagnifyingGlass className="h-4 w-4 shrink-0" />
                <span className="hidden lg:inline">Who built this</span>
              </a>

              <button
                className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#e8e2d7] bg-white text-[#171717] transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef] dark:hover:border-[#22c55e]"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                type="button"
              >
                {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
              </button>
            </div>

            {/* Mobile: theme always visible + hamburger */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#e8e2d7] bg-white text-[#171717] transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef] dark:hover:border-[#22c55e]"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                type="button"
              >
                {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
              </button>
              <button
                type="button"
                className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#e8e2d7] bg-white text-[#171717] transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <HiOutlineBars3 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <div className="fixed inset-0 z-[60] sm:hidden" role="dialog" aria-modal="true">
            <motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="absolute left-3 right-3 top-[4.5rem] overflow-hidden rounded-2xl border border-[#e8e2d7] bg-[#faf7f2] shadow-2xl dark:border-[#1e3328] dark:bg-[#121e17]"
            >
              <div className="flex items-center justify-between border-b border-[#e8e2d7] px-4 py-3 dark:border-[#1e3328]">
                <span className="font-fraunces text-[15px] font-semibold">
                  Quick links
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-[#585858] dark:text-[#92a59a]"
                  aria-label="Close"
                >
                  <HiOutlineXMark className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 p-3">
                {navItems.map((item) => {
                  const active = isGardenNavItemActive(
                    item.href,
                    router.pathname,
                    router.asPath
                  );
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-xl px-3 py-3 no-underline ${navLinkClass(active)} ${
                        active
                          ? "bg-emerald-500/10"
                          : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <a
                  href={GITHUB_REPO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-[0.92rem] font-semibold text-[#585858] no-underline hover:bg-black/5 dark:text-[#92a59a] dark:hover:bg-white/5"
                >
                  <FaGithub className="h-4 w-4" />
                  Star on GitHub
                  <span className="ml-auto rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                    {githubStars}
                  </span>
                </a>
                <a
                  href="/digital-garden#support"
                  onClick={scrollToSupport}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-[0.92rem] font-semibold text-[#585858] no-underline hover:bg-black/5 dark:text-[#92a59a] dark:hover:bg-white/5"
                >
                  <HiHeart className="h-4 w-4 text-[#c4552d]" />
                  Support
                </a>
                <a
                  href="https://www.heyashu.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-[0.92rem] font-semibold text-[#585858] no-underline hover:bg-black/5 dark:text-[#92a59a] dark:hover:bg-white/5"
                >
                  <HiMagnifyingGlass className="h-4 w-4" />
                  Who built this
                </a>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {children}
    </div>
  );
}

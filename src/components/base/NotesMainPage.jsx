import React, { useEffect, useMemo, useState } from "react";
import {
  estimateReadingTime,
  formateDate,
  generateSlug,
  scrollToTop,
} from "@/utils/functions";
import ls from "local-storage";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import NotesContent from "@/components/tech/notes-layout/NotesContent";
import NotesReaderSidebar from "@/components/tech/notes-layout/NotesReaderSidebar";
import CommonSlugHeadTags from "@/components/seo/CommonSlugHeadTags";
import ContentFooter from "@/components/garden/ContentFooter";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import GardenCollabCard from "@/components/garden/GardenCollabCard";
import QuickReaderDrawer from "@/components/garden/AI/QuickReaderDrawer";
import QuestionsListDrawer from "@/components/garden/AI/QuestionsListDrawer";
import {
  DEFAULT_AVATAR,
  GITHUB_REPO_LINK,
} from "@/utils/constant";
import { absoluteUrl } from "@/utils/seo";
import {
  HiBolt,
  HiSparkles,
  HiChatBubbleLeftRight,
  HiOutlineShare,
  HiOutlineBookmark,
  HiOutlineArrowDownTray,
  HiOutlineSpeakerWave,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineSun,
  HiOutlineMoon,
  HiChevronLeft,
  HiChevronRight,
  HiArrowLeft,
  HiOutlinePencilSquare,
  HiOutlineStar,
} from "react-icons/hi2";
import { MdOutlineVisibility } from "react-icons/md";

const SIDEBAR_WIDTH = 340;

const THEME_STORAGE = "notes-reader-theme";

const THEMES = {
  light: {
    id: "light",
    label: "Light",
    icon: HiOutlineSun,
    vars: {
      "--nr-bg": "#ffffff",
      "--nr-surface": "#ffffff",
      "--nr-sidebar": "#f3f4f6",
      "--nr-sidebar-head": "#eaeaec",
      "--nr-nav": "#f3f4f6",
      "--nr-text": "#171717",
      "--nr-muted": "#6b7280",
      "--nr-border": "#e5e7eb",
      "--nr-accent": "#143825",
      "--nr-active": "#e8f0ea",
      "--nr-hover": "#f3f4f6",
      "--nr-heading": "#111111",
      "--nr-body": "#374151",
      "--nr-code-bg": "#1a1f1c",
    },
  },
  dark: {
    id: "dark",
    label: "Dark",
    icon: HiOutlineMoon,
    vars: {
      "--nr-bg": "#000000",
      "--nr-surface": "#0a0a0a",
      "--nr-sidebar": "#111111",
      "--nr-sidebar-head": "#171717",
      "--nr-nav": "#0f0f0f",
      "--nr-text": "#f5f5f5",
      "--nr-muted": "#a3a3a3",
      "--nr-border": "#262626",
      "--nr-accent": "#4ade80",
      "--nr-active": "#1a1a1a",
      "--nr-hover": "#1a1a1a",
      "--nr-heading": "#fafafa",
      "--nr-body": "#d4d4d4",
      "--nr-code-bg": "#0a0a0a",
    },
  },
  eye: {
    id: "eye",
    label: "Focus",
    icon: MdOutlineVisibility,
    vars: {
      "--nr-bg": "#f3ead8",
      "--nr-surface": "#f7efdf",
      "--nr-sidebar": "#ebe0c8",
      "--nr-sidebar-head": "#e0d2b0",
      "--nr-nav": "#ddcfae",
      "--nr-text": "#3d3429",
      "--nr-muted": "#7a6b58",
      "--nr-border": "#d4c4a4",
      "--nr-accent": "#5c4a32",
      "--nr-active": "#e4d5b5",
      "--nr-hover": "#e8dcc6",
      "--nr-heading": "#2f281f",
      "--nr-body": "#4a4034",
      "--nr-code-bg": "#2a241c",
    },
  },
};

function changeFilePath(filePath = "") {
  return String(filePath).replace("/public", "");
}

function flattenLessons(contentList = [], season2Data = [], show2ndSection) {
  return show2ndSection
    ? [...contentList, ...(season2Data || [])]
    : [...contentList];
}

const NotesMainPage = ({
  contentList = [],
  storageKey,
  contentListTitle,
  eachCardPrefix,
  msxSource,
  currentPageFrontMatter,
  contentListLength,
  subDomain = "namaste-node-js",
  show2ndSection,
  season2Data = [],
  shareImageEmbed,
  pageTitle,
}) => {
  const router = useRouter();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [fontScale, setFontScale] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [qnaOpen, setQnaOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [storedValues, setStoredValues] = useState(null);

  const STORAGE_KEY = storageKey;
  const allLessons = useMemo(
    () => flattenLessons(contentList, season2Data, show2ndSection),
    [contentList, season2Data, show2ndSection]
  );
  const totalCount = contentListLength || allLessons.length || 1;

  const title =
    currentPageFrontMatter?.name ||
    currentPageFrontMatter?.title ||
    "Untitled";
  const author = currentPageFrontMatter?.author || "Ashutosh Anand Tiwari";
  const avatar = currentPageFrontMatter?.profilePic
    ? changeFilePath(currentPageFrontMatter.profilePic)
    : DEFAULT_AVATAR;
  const formattedDate = formateDate(currentPageFrontMatter?.publishedOn);
  const readMins = estimateReadingTime(msxSource?.compiledSource);
  const thumb = currentPageFrontMatter?.thumbnail
    ? currentPageFrontMatter.thumbnail.includes("https")
      ? currentPageFrontMatter.thumbnail
      : changeFilePath(currentPageFrontMatter.thumbnail)
    : null;
  const courseDisplayTitle = String(pageTitle || contentListTitle || "Digital Notes")
    .replace(/\s*by\s+Ashutosh Anand Tiwari\s*/gi, "")
    .trim();

  // Per-chapter canonical for Google (prefer query.slug — reliable on SSG)
  const slugParam = router?.query?.slug;
  const chapterPath =
    typeof slugParam === "string"
      ? `/digital-garden/notes/${subDomain}/${slugParam}`
      : router?.asPath?.split("?")[0] || `/digital-garden/notes/${subDomain}`;
  const chapterCanonical = absoluteUrl(chapterPath);

  const SHELL = "mx-auto w-full max-w-[1400px] px-3 md:px-5";

  const currentIndex = useMemo(() => {
    return allLessons.findIndex(
      (item) =>
        item?.title === currentPageFrontMatter?.title ||
        item?.name === currentPageFrontMatter?.name ||
        item?.title === currentPageFrontMatter?.name
    );
  }, [allLessons, currentPageFrontMatter]);

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  const isCurrentComplete = !!(
    storedValues &&
    (storedValues[currentPageFrontMatter?.name] || storedValues[title])
  );

  const themeConfig = THEMES[theme] || THEMES.light;
  const bodyFontPx = 16 + fontScale;

  useEffect(() => {
    const saved = ls.get(THEME_STORAGE);
    if (saved && THEMES[saved]) setTheme(saved);
    refreshProgress();
  }, []);

  useEffect(() => {
    refreshProgress();
  }, [currentPageFrontMatter, STORAGE_KEY, totalCount]);

  function refreshProgress() {
    if (!STORAGE_KEY) return;
    const storageValue = ls.get(STORAGE_KEY) || {};
    setStoredValues(storageValue);
    const trueCount = Object.values(storageValue).filter((v) => v === true)
      .length;
    setCompletedCount(trueCount);
    const percentage = Math.round((trueCount / totalCount) * 100);
    setProgress(Number.isFinite(percentage) ? percentage : 0);
  }

  const handleThemeChange = (id) => {
    setTheme(id);
    ls.set(THEME_STORAGE, id);
  };

  const handleSectionClick = (section) => {
    const slug = generateSlug(section?.title || section?.name);
    router.push(`/digital-garden/notes/${subDomain}/` + slug);
    setMobileNavOpen(false);
    scrollToTop();
  };

  const handleMarkComplete = () => {
    if (!STORAGE_KEY) return;
    const key = currentPageFrontMatter?.name || title;
    const storageValue = ls.get(STORAGE_KEY) || {};
    const updated = {
      ...storageValue,
      [key]: !storageValue[key],
    };
    ls.set(STORAGE_KEY, updated);
    refreshProgress();
  };

  const bumpFont = (dir) => {
    setFontScale((s) => Math.max(-2, Math.min(4, s + dir)));
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link copied");
      }
    } catch (_) {}
  };

  const handleBookmark = () => {
    alert(
      "Press " +
        (navigator.userAgent.toLowerCase().includes("mac") ? "Cmd" : "Ctrl") +
        " + D to bookmark this page."
    );
  };

  const handleDownload = () => window.print();

  const handleSpeak = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const article = document.getElementById("garden-notes-article");
    const text = article?.innerText || title;
    const utter = new SpeechSynthesisUtterance(text.slice(0, 12000));
    utter.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  const lessonBadge =
    currentIndex >= 0
      ? `Lesson ${currentIndex + 1} of ${allLessons.length || totalCount}`
      : pageTitle || "Notes";

  // Always SSR article body for Google. Theme/progress hydrate after mount.
  return (
    <>
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
      <CommonSlugHeadTags
        frontMatter={currentPageFrontMatter}
        image={shareImageEmbed}
        url={chapterCanonical}
      />

      <div
        data-notes-theme={theme}
        className={`notes-reader min-h-screen font-ibm-sans ${theme === "dark" ? "dark" : ""}`}
        style={{
          ...themeConfig.vars,
          "--nr-font-size": `${bodyFontPx}px`,
        }}
      >
        <div className="bg-[var(--nr-bg)] text-[var(--nr-text)] transition-colors duration-300">
          {/* Top bar — same mid shell as sidebar + content */}
          <div className="sticky top-0 z-30 border-b border-[var(--nr-border)] bg-[var(--nr-nav)] backdrop-blur-md">
            <div
              className={`${SHELL} flex flex-wrap items-center justify-between gap-2 py-2.5 md:gap-3`}
            >
              <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
                <Link
                  href="/digital-garden"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-semibold text-white no-underline transition hover:bg-emerald-700"
                >
                  <HiArrowLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Digital Garden</span>
                  <span className="sm:hidden">Back</span>
                </Link>
                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)]/80 text-[var(--nr-muted)] transition hover:text-[var(--nr-text)] lg:hidden"
                  onClick={() => setMobileNavOpen(true)}
                  title="Course content"
                >
                  <HiOutlineBars3 className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="hidden h-9 w-9 place-items-center rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)]/80 text-[var(--nr-muted)] transition hover:text-[var(--nr-text)] lg:grid"
                  onClick={() => setIsSidebarVisible((v) => !v)}
                  title="Toggle sidebar"
                >
                  <HiOutlineBars3 className="h-5 w-5" />
                </button>
                <div className="min-w-0">
                  <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--nr-muted)]">
                    You are reading
                  </p>
                  <div className="flex min-w-0 flex-wrap items-baseline gap-1.5">
                    <span className="max-w-[240px] truncate font-fraunces text-[13px] font-semibold text-[var(--nr-text)] md:max-w-[300px] md:text-[14px]">
                      {courseDisplayTitle}
                    </span>
                    <a
                      href="https://www.heyashu.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] italic text-[var(--nr-muted)] no-underline transition hover:text-[var(--nr-accent)] md:text-[11px]"
                    >
                      by heyashu.in
                    </a>
                  </div>
                </div>
              </div>

              {/* AI actions — purple animated border + icons */}
              <div className="order-3 flex w-full flex-wrap items-center justify-center gap-1.5 sm:order-none sm:w-auto md:gap-2">
                <button
                  type="button"
                  onClick={() => setQuickOpen(true)}
                  className="ai-pill inline-flex items-center gap-1.5 rounded-full border border-purple-400/70 bg-[var(--nr-surface)] px-2.5 py-1.5 text-[10px] font-medium text-purple-700 animate-ai-border transition hover:bg-purple-50 md:px-3 md:text-[11px] dark:text-purple-300 dark:hover:bg-purple-950/40"
                >
                  <HiBolt className="h-3.5 w-3.5 shrink-0 animate-ai-icon text-purple-500" />
                  Quick AI Read
                </button>
                <button
                  type="button"
                  onClick={() => setQuickOpen(true)}
                  className="ai-pill inline-flex items-center gap-1.5 rounded-full border border-indigo-400/70 bg-[var(--nr-surface)] px-2.5 py-1.5 text-[10px] font-medium text-indigo-700 animate-ai-border transition hover:bg-indigo-50 md:px-3 md:text-[11px] dark:text-indigo-300 dark:hover:bg-indigo-950/40"
                  style={{ animationDelay: "0.4s" }}
                >
                  <HiSparkles className="h-3.5 w-3.5 shrink-0 animate-sparkle-pulse text-indigo-500" />
                  <span className="hidden md:inline">Summarize with AI</span>
                  <span className="md:hidden">Summarize</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQnaOpen(true)}
                  className="ai-pill inline-flex items-center gap-1.5 rounded-full border border-fuchsia-400/70 bg-[var(--nr-surface)] px-2.5 py-1.5 text-[10px] font-medium text-fuchsia-700 animate-ai-border transition hover:bg-fuchsia-50 md:px-3 md:text-[11px] dark:text-fuchsia-300 dark:hover:bg-fuchsia-950/40"
                  style={{ animationDelay: "0.8s" }}
                >
                  <HiChatBubbleLeftRight className="h-3.5 w-3.5 shrink-0 animate-ai-glow text-fuchsia-500" />
                  Q&amp;A
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={GITHUB_REPO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Star on GitHub"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] no-underline transition hover:text-[var(--nr-text)]"
                >
                  <HiOutlineStar className="h-4 w-4" />
                </a>
                <a
                  href={GITHUB_REPO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Edit on GitHub"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] no-underline transition hover:text-[var(--nr-text)]"
                >
                  <HiOutlinePencilSquare className="h-4 w-4" />
                </a>

                {/* Theme switcher — bordered area */}
                <div className="flex items-center gap-1 rounded-xl border border-[var(--nr-border)] bg-[var(--nr-surface)] p-1 shadow-sm">
                  {Object.values(THEMES).map((t) => {
                    const Icon = t.icon;
                    const active = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        title={t.label}
                        onClick={() => handleThemeChange(t.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition ${
                          active
                            ? "bg-[var(--nr-nav)] text-[var(--nr-text)] shadow-sm"
                            : "text-[var(--nr-muted)] hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className={`${SHELL} flex`}>
            {/* Desktop sidebar — aligned with navbar shell */}
            <AnimatePresence initial={false}>
              {isSidebarVisible ? (
                <motion.div
                  key="notes-sidebar"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: SIDEBAR_WIDTH, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 34 }}
                  className="sticky top-[57px] hidden h-[calc(100vh-57px)] shrink-0 overflow-hidden lg:block"
                >
                  <div className="h-full" style={{ width: SIDEBAR_WIDTH }}>
                    <NotesReaderSidebar
                      contentListTitle={contentListTitle}
                      data={contentList}
                      season2Data={season2Data}
                      show2ndSection={show2ndSection}
                      progress={progress}
                      completedCount={completedCount}
                      totalCount={totalCount}
                      selectedSection={currentPageFrontMatter}
                      storedValues={storedValues}
                      eachCardPrefix={eachCardPrefix}
                      onSectionClick={handleSectionClick}
                      onMarkComplete={handleMarkComplete}
                      isCurrentComplete={isCurrentComplete}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Main reading column */}
            <motion.main
              layout
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="relative min-w-0 flex-1 bg-[var(--nr-bg)]"
            >
              {/* Floating tools — far right of viewport */}
              <aside className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col overflow-hidden rounded-full border border-[var(--nr-border)] bg-[var(--nr-surface)]/95 shadow-sm lg:flex">
                <button
                  type="button"
                  title="Increase font size"
                  onClick={() => bumpFont(1)}
                  className="grid h-11 w-11 place-items-center border-b border-[var(--nr-border)] font-fraunces text-[13px] font-semibold text-[var(--nr-muted)] transition hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)]"
                >
                  +A
                </button>
                <button
                  type="button"
                  title="Decrease font size"
                  onClick={() => bumpFont(-1)}
                  className="grid h-11 w-11 place-items-center border-b border-[var(--nr-border)] font-fraunces text-[12px] font-semibold text-[var(--nr-muted)] transition hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)]"
                >
                  −A
                </button>
                {[
                  { label: "Share", icon: HiOutlineShare, onClick: handleShare },
                  {
                    label: "Bookmark",
                    icon: HiOutlineBookmark,
                    onClick: handleBookmark,
                  },
                  {
                    label: "Download",
                    icon: HiOutlineArrowDownTray,
                    onClick: handleDownload,
                  },
                  {
                    label: speaking ? "Stop" : "Speak",
                    icon: HiOutlineSpeakerWave,
                    onClick: handleSpeak,
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    title={item.label}
                    onClick={item.onClick}
                    className="grid h-11 w-11 place-items-center border-b border-[var(--nr-border)] text-[var(--nr-muted)] transition last:border-b-0 hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)]"
                  >
                    <item.icon className="h-4 w-4" />
                  </button>
                ))}
              </aside>

              <article className="w-full px-4 pb-14 pt-6 md:px-8 md:pt-8">
                {/* Lesson meta row */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex rounded-full border border-[var(--nr-border)] bg-[var(--nr-surface)] px-3 py-1 text-[11px] font-medium text-[var(--nr-accent)]">
                    {lessonBadge}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleMarkComplete}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition ${
                        isCurrentComplete
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600"
                          : "border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] hover:border-emerald-500/40 hover:text-emerald-600"
                      }`}
                    >
                      {isCurrentComplete ? "Completed" : "Mark as Complete"}
                    </button>
                    <button
                      type="button"
                      disabled={!prevLesson}
                      onClick={() => prevLesson && handleSectionClick(prevLesson)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] transition enabled:hover:text-[var(--nr-text)] disabled:opacity-35"
                      title="Previous"
                    >
                      <HiChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={!nextLesson}
                      onClick={() => nextLesson && handleSectionClick(nextLesson)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] transition enabled:hover:text-[var(--nr-text)] disabled:opacity-35"
                      title="Next"
                    >
                      <HiChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <header className="mb-6">
                  <h1 className="mb-4 font-fraunces text-[clamp(1.75rem,4vw,2.55rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--nr-heading)]">
                    {title}
                  </h1>

                  {/* Author · date · min read — bordered bar */}
                  <div className="flex w-full flex-wrap items-center gap-3 rounded-xl border border-[var(--nr-border)] bg-[var(--nr-surface)] px-4 py-3.5">
                    <img
                      src={avatar}
                      alt={author}
                      className="h-11 w-11 shrink-0 rounded-lg object-cover grayscale"
                    />
                    <div className="min-w-0 flex-1 leading-tight">
                      <span className="block truncate text-[14px] font-semibold text-[var(--nr-text)]">
                        By {author}
                      </span>
                      <span className="mt-1 block text-[12px] text-[var(--nr-muted)]">
                        {formattedDate || "Recently"}
                        {readMins ? ` · ${readMins} min read` : ""}
                      </span>
                    </div>
                  </div>
                </header>

                {thumb ? (
                  <figure className="mb-7">
                    <div className="overflow-hidden border border-[var(--nr-border)]">
                      <img
                        alt={title}
                        src={thumb}
                        width={1024}
                        height={560}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  </figure>
                ) : null}

                <div id="garden-notes-article" className="notes-reader-prose">
                  <NotesContent markdownContent={msxSource} large garden />
                </div>

                {/* Prev / Next */}
                <nav className="mt-14 grid gap-4 border-t border-[var(--nr-border)] pt-8 sm:grid-cols-2">
                  {prevLesson ? (
                    <button
                      type="button"
                      onClick={() => handleSectionClick(prevLesson)}
                      className="rounded-xl border border-[var(--nr-border)] bg-[var(--nr-surface)] p-4 text-left transition hover:border-[var(--nr-accent)]"
                    >
                      <span className="mb-1 flex items-center gap-1 text-[11px] font-medium text-[var(--nr-muted)]">
                        <HiChevronLeft className="h-3.5 w-3.5" />
                        Previous
                      </span>
                      <span className="font-fraunces text-[15px] font-semibold text-[var(--nr-text)]">
                        {prevLesson.name || prevLesson.title}
                      </span>
                    </button>
                  ) : (
                    <div />
                  )}
                  {nextLesson ? (
                    <button
                      type="button"
                      onClick={() => handleSectionClick(nextLesson)}
                      className="rounded-xl border border-[var(--nr-border)] bg-[var(--nr-surface)] p-4 text-right transition hover:border-[var(--nr-accent)] sm:justify-self-end"
                    >
                      <span className="mb-1 flex items-center justify-end gap-1 text-[11px] font-medium text-[var(--nr-muted)]">
                        Next
                        <HiChevronRight className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-fraunces text-[15px] font-semibold text-[var(--nr-text)]">
                        {nextLesson.name || nextLesson.title}
                      </span>
                    </button>
                  ) : null}
                </nav>

                <div className="mt-10">
                  <ContentFooter />
                </div>

                <GardenCollabCard className="mt-12" />
              </article>
            </motion.main>
          </div>

          <DigiGardenFooter />
        </div>

        {/* Mobile sidebar drawer */}
        {mobileNavOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="absolute bottom-0 left-0 top-0 flex w-[min(100%,320px)] flex-col bg-[var(--nr-sidebar)] shadow-xl">
              <div className="flex items-center justify-between border-b border-[var(--nr-border)] px-3 py-3">
                <span className="font-fraunces text-[14px] font-semibold">
                  Course Content
                </span>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-lg text-[var(--nr-muted)]"
                >
                  <HiOutlineXMark className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 flex-1">
                <NotesReaderSidebar
                  contentListTitle={contentListTitle}
                  data={contentList}
                  season2Data={season2Data}
                  show2ndSection={show2ndSection}
                  progress={progress}
                  completedCount={completedCount}
                  totalCount={totalCount}
                  selectedSection={currentPageFrontMatter}
                  storedValues={storedValues}
                  eachCardPrefix={eachCardPrefix}
                  onSectionClick={handleSectionClick}
                  onMarkComplete={handleMarkComplete}
                  isCurrentComplete={isCurrentComplete}
                />
              </div>
            </div>
          </div>
        ) : null}

        <QuickReaderDrawer isOpen={quickOpen} setIsOpen={setQuickOpen} />
        <QuestionsListDrawer isOpen={qnaOpen} setIsOpen={setQnaOpen} />
      </div>

      <style jsx global>{`
        .notes-reader-prose .prose {
          max-width: none !important;
          font-size: var(--nr-font-size, 16px) !important;
          line-height: 1.8 !important;
          color: var(--nr-body);
          font-family: "IBM Plex Sans", system-ui, sans-serif;
        }
        .notes-reader-prose .prose p,
        .notes-reader-prose .prose li {
          font-size: 1em !important;
          line-height: 1.8 !important;
          color: var(--nr-body);
        }
        .notes-reader-prose .prose p {
          margin-top: 0.95em !important;
          margin-bottom: 0.95em !important;
        }
        .notes-reader-prose .prose h1,
        .notes-reader-prose .prose h2,
        .notes-reader-prose .prose h3,
        .notes-reader-prose .prose h4 {
          color: var(--nr-heading);
          font-family: "Fraunces", Georgia, serif;
          letter-spacing: -0.015em;
          line-height: 1.3 !important;
        }
        .notes-reader-prose .prose a {
          color: var(--nr-accent);
        }
        .notes-reader-prose .prose strong {
          color: var(--nr-text);
        }
        .notes-reader-prose .prose blockquote {
          border-left-color: var(--nr-border);
          color: var(--nr-muted);
        }
        .notes-reader-prose .prose img {
          border-color: var(--nr-border);
        }
        .notes-reader-prose .prose pre,
        .notes-reader-prose .prose code {
          font-family: "IBM Plex Mono", monospace;
        }
        [data-notes-theme="eye"] .notes-reader-prose .prose {
          letter-spacing: 0.015em;
          line-height: 1.85 !important;
        }
      `}</style>
    </>
  );
};

export default NotesMainPage;

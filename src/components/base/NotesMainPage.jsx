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
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import GardenCollabCard from "@/components/garden/GardenCollabCard";
import QuickReaderDrawer from "@/components/garden/AI/QuickReaderDrawer";
import QuestionsListDrawer from "@/components/garden/AI/QuestionsListDrawer";
import AIQuestionDrawer from "@/components/garden/AIQuestionDrawer";
import ReaderRoomIntroducer from "@/components/garden/ReaderRoomIntroducer";
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
  HiOutlineXMark,
  HiOutlineEllipsisVertical,
  HiOutlineSun,
  HiOutlineMoon,
  HiChevronLeft,
  HiChevronRight,
  HiArrowLeft,
  HiArrowUturnLeft,
  HiOutlinePencilSquare,
  HiOutlineStar,
  HiOutlineRadio,
  HiOutlineViewColumns,
} from "react-icons/hi2";
import { MdOutlineVisibility } from "react-icons/md";

const SIDEBAR_WIDTH = 320;
/** Notes column width — cluster (sidebar + notes) stays screen-centered */
const CONTENT_WIDTH_WITH_SIDEBAR = 760;
const CONTENT_WIDTH_EXPANDED = 880;
const CORPORATE_RADIO_URL = "https://corporate-baaja.netlify.app/";

function openCorporateRadio() {
  if (typeof window === "undefined") return;
  window.open(
    CORPORATE_RADIO_URL,
    "_blank",
    "width=500,height=700,noopener,noreferrer"
  );
}

function CorporateRadioButton({ compact = false }) {
  return (
    <button
      type="button"
      onClick={openCorporateRadio}
      title="Corporate Radio"
      aria-label="Open Corporate Radio"
      className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] transition hover:border-emerald-500/40 hover:text-[var(--nr-text)] ${
        compact ? "grid h-9 w-9 place-items-center" : "px-2.5 py-1.5"
      }`}
    >
      <span className="relative grid place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/35" />
        <span className="absolute -inset-1 animate-pulse rounded-full bg-emerald-400/20" />
        <HiOutlineRadio className="relative h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      </span>
      {!compact ? (
        <span className="text-[11px] font-semibold text-[var(--nr-text)]">
          Corporate Radio
        </span>
      ) : null}
    </button>
  );
}

const THEME_STORAGE = "notes-reader-theme";

const THEMES = {
  light: {
    id: "light",
    label: "Light",
    icon: HiOutlineSun,
    vars: {
      "--nr-bg": "#fafbfc",
      "--nr-surface": "#ffffff",
      "--nr-sidebar": "#e8edf0",
      "--nr-sidebar-from": "#dfe6ea",
      "--nr-sidebar-to": "#f3f5f7",
      "--nr-sidebar-head": "#d5dde3",
      "--nr-nav": "#e8eee9",
      "--nr-nav-from": "#e4ece7",
      "--nr-nav-to": "#f7faf8",
      "--nr-text": "#111827",
      "--nr-muted": "#4b5563",
      "--nr-border": "#c5ced6",
      "--nr-accent": "#0f2d1c",
      "--nr-active": "#dcebe0",
      "--nr-hover": "#eef2f4",
      "--nr-heading": "#0a0a0a",
      "--nr-body": "#1f2937",
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
      "--nr-sidebar": "#101614",
      "--nr-sidebar-from": "#18201c",
      "--nr-sidebar-to": "#0a0d0c",
      "--nr-sidebar-head": "#1a2420",
      "--nr-nav": "#121816",
      "--nr-nav-from": "#1a2420",
      "--nr-nav-to": "#0b0f0d",
      "--nr-text": "#f5f5f5",
      "--nr-muted": "#a3a3a3",
      "--nr-border": "#2a3530",
      "--nr-accent": "#4ade80",
      "--nr-active": "#1a2a22",
      "--nr-hover": "#151c18",
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
      "--nr-sidebar": "#e4d6b6",
      "--nr-sidebar-from": "#ddcfb0",
      "--nr-sidebar-to": "#f1e6d0",
      "--nr-sidebar-head": "#d4c4a0",
      "--nr-nav": "#eadfc8",
      "--nr-nav-from": "#e6d9b8",
      "--nr-nav-to": "#f3ead8",
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
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [theme, setTheme] = useState("light");
  const [fontScale, setFontScale] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [qnaOpen, setQnaOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
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
    if (typeof window === "undefined") return undefined;
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
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
    const article = document.getElementById("ai-markdown-content");
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

      <ReaderRoomIntroducer />

      <div
        data-notes-theme={theme}
        className={`notes-reader min-h-screen font-ibm-sans ${theme === "dark" ? "dark" : ""}`}
        style={{
          ...themeConfig.vars,
          "--nr-font-size": `${bodyFontPx}px`,
        }}
      >
        <div className="bg-[var(--nr-bg)] text-[var(--nr-text)] transition-colors duration-300">
          {/* Top bar — mobile: full-width + gray bottom line; desktop: rounded shell */}
          <div
            className="sticky top-0 z-30 border-b border-[#c5ced6] dark:border-[#2a3530] lg:border-b-0"
            style={{
              background:
                "linear-gradient(180deg, var(--nr-nav-from) 0%, var(--nr-nav-to) 100%)",
            }}
          >
            <div className={SHELL}>
              <div className="relative px-0 py-2 md:px-4 md:py-2.5 lg:rounded-b-2xl">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
                    <Link
                      href="/digital-garden"
                      aria-label="Back to Digital Garden"
                      className="grid h-9 w-9 shrink-0 place-items-center bg-transparent text-[var(--nr-text)] no-underline lg:hidden"
                    >
                      <HiArrowUturnLeft className="h-5 w-5" />
                    </Link>
                    <Link
                      href="/digital-garden"
                      aria-label="Back to Digital Garden"
                      className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-semibold text-white no-underline transition hover:bg-emerald-700 lg:inline-flex"
                    >
                      <HiArrowLeft className="h-3.5 w-3.5" />
                      <span>Digital Garden</span>
                    </Link>
                    <button
                      type="button"
                      className="hidden h-9 w-9 place-items-center rounded-lg border border-[var(--nr-border)] bg-transparent text-[var(--nr-muted)] transition hover:text-[var(--nr-text)] lg:grid"
                      onClick={() => setIsSidebarVisible((v) => !v)}
                      title={isSidebarVisible ? "Hide course content" : "Show course content"}
                      aria-label={isSidebarVisible ? "Hide course content" : "Show course content"}
                    >
                      <HiOutlineViewColumns className="h-4 w-4" />
                    </button>
                    {/* Course name */}
                    <div className="min-w-0">
                      <p className="mb-0.5 hidden font-fraunces text-[11px] italic tracking-wide text-[var(--nr-muted)] sm:block">
                        You are reading
                      </p>
                      <div className="flex min-w-0 flex-wrap items-baseline gap-1.5">
                        <span className="max-w-[9.5rem] truncate font-fraunces text-[13px] font-semibold text-[var(--nr-text)] xs:max-w-[12rem] sm:max-w-[240px] md:max-w-[300px] md:text-[14px]">
                          {courseDisplayTitle}
                        </span>
                        <a
                          href="https://www.heyashu.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden text-[10px] italic text-[var(--nr-muted)] no-underline transition hover:text-[var(--nr-accent)] sm:inline md:text-[11px]"
                        >
                          by heyashu.in
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Desktop AI actions */}
                  <div className="hidden items-center gap-2 md:flex">
                    <button
                      type="button"
                      onClick={() => setQuickOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--nr-border)] bg-transparent px-3 py-1.5 text-[11px] font-medium text-[var(--nr-text)] transition hover:bg-[var(--nr-hover)]"
                    >
                      <HiBolt className="h-3.5 w-3.5 shrink-0 text-violet-500" />
                      Quick AI Read
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--nr-border)] bg-transparent px-3 py-1.5 text-[11px] font-medium text-[var(--nr-text)] transition hover:bg-[var(--nr-hover)]"
                    >
                      <HiSparkles className="h-3.5 w-3.5 shrink-0 text-sky-500" />
                      Attempt Quiz
                    </button>
                    <button
                      type="button"
                      onClick={() => setQnaOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--nr-border)] bg-transparent px-3 py-1.5 text-[11px] font-medium text-[var(--nr-text)] transition hover:bg-[var(--nr-hover)]"
                    >
                      <HiChatBubbleLeftRight className="h-3.5 w-3.5 shrink-0 text-violet-500" />
                      Q&amp;A
                    </button>
                  </div>

                  {/* Desktop tools */}
                  <div className="hidden items-center gap-2 lg:flex">
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
                      href="https://www.heyashu.in/admin"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Edit in admin"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] no-underline transition hover:text-[var(--nr-text)]"
                    >
                      <HiOutlinePencilSquare className="h-4 w-4" />
                    </a>
                    <div className="flex items-center gap-1 rounded-xl border border-[var(--nr-border)] bg-transparent p-1">
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
                                ? "bg-[var(--nr-hover)] text-[var(--nr-text)]"
                                : "text-[var(--nr-muted)] hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)]"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            <span className="hidden xl:inline">{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile — Corporate Radio (right of name) + tools */}
                  <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
                    <CorporateRadioButton compact />
                    <button
                      type="button"
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] text-[var(--nr-muted)] transition hover:text-[var(--nr-text)]"
                      onClick={() => setToolsMenuOpen((v) => !v)}
                      aria-label="Open tools"
                      title="Tools"
                    >
                      {toolsMenuOpen ? (
                        <HiOutlineXMark className="h-5 w-5" />
                      ) : (
                        <HiOutlineEllipsisVertical className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {toolsMenuOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      className="absolute right-2 top-[calc(100%+6px)] z-40 w-[min(100vw-1.5rem,260px)] overflow-hidden rounded-2xl border border-[var(--nr-border)] bg-[var(--nr-surface)] shadow-xl lg:hidden"
                    >
                      <div className="border-b border-[var(--nr-border)] px-3 py-2.5">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--nr-muted)]">
                          Reader tools
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 p-2">
                        <p className="px-2 pt-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--nr-muted)]">
                          Theme
                        </p>
                        <div className="mb-1 flex gap-1 px-1">
                          {Object.values(THEMES).map((t) => {
                            const Icon = t.icon;
                            const active = theme === t.id;
                            return (
                              <button
                                key={t.id}
                                type="button"
                                title={t.label}
                                onClick={() => {
                                  handleThemeChange(t.id);
                                  setToolsMenuOpen(false);
                                }}
                                className={`inline-flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium transition ${
                                  active
                                    ? "bg-[var(--nr-nav)] text-[var(--nr-text)] shadow-sm"
                                    : "text-[var(--nr-muted)] hover:bg-[var(--nr-hover)]"
                                }`}
                              >
                                <Icon className="h-3.5 w-3.5" />
                                {t.label}
                              </button>
                            );
                          })}
                        </div>
                        <a
                          href={GITHUB_REPO_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setToolsMenuOpen(false)}
                          className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[var(--nr-text)] no-underline hover:bg-[var(--nr-hover)]"
                        >
                          <HiOutlineStar className="h-4 w-4 text-[var(--nr-muted)]" />
                          Star on GitHub
                        </a>
                        <a
                          href="https://www.heyashu.in/admin"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setToolsMenuOpen(false)}
                          className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-medium text-[var(--nr-text)] no-underline hover:bg-[var(--nr-hover)]"
                        >
                          <HiOutlinePencilSquare className="h-4 w-4 text-[var(--nr-muted)]" />
                          Edit
                        </a>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Centered cluster: sidebar + notes mid-screen; notes grow & shift left when sidebar closes */}
          <div className={`${SHELL} flex justify-center`}>
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="flex w-full max-w-[900px] lg:w-auto lg:max-w-none"
            >
              <AnimatePresence initial={false}>
                {isSidebarVisible ? (
                  <motion.div
                    key="notes-sidebar"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: SIDEBAR_WIDTH, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 32 }}
                    className="sticky top-[57px] hidden h-[calc(100vh-57px)] shrink-0 overflow-hidden lg:block"
                  >
                    <div className="h-full" style={{ width: SIDEBAR_WIDTH }}>
                      <NotesReaderSidebar
                        courseName={courseDisplayTitle}
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

              <motion.main
                initial={false}
                animate={
                  isDesktop
                    ? {
                        width: isSidebarVisible
                          ? CONTENT_WIDTH_WITH_SIDEBAR
                          : CONTENT_WIDTH_EXPANDED,
                      }
                    : { width: "100%" }
                }
                transition={{ type: "spring", stiffness: 280, damping: 32 }}
                className="relative min-w-0 shrink-0 bg-[var(--nr-bg)]"
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

              <article className="w-full   pb-24 pt-2 md:px-6 md:pb-14 md:pt-3">
                {/* Lesson meta row */}
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 md:mb-3">
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

                <header className="mb-3 md:mb-6">
                  <h1 className="mb-2.5 font-fraunces text-[clamp(1.45rem,4vw,2.55rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--nr-heading)] md:mb-4">
                    {title}
                  </h1>

                  {/* Author · date · min read — Corporate Radio on the right (desktop) */}
                  <div className="flex w-full flex-wrap items-center gap-2.5 rounded-xl border border-[var(--nr-border)] bg-[var(--nr-surface)] px-3 py-2.5 md:gap-3 md:px-4 md:py-3.5">
                    <img
                      src={avatar}
                      alt={author}
                      className="h-9 w-9 shrink-0 rounded-lg object-cover grayscale md:h-11 md:w-11"
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
                    <div className="hidden shrink-0 lg:block">
                      <CorporateRadioButton />
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

                <div id="ai-markdown-content" className="notes-reader-prose">
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

                <GardenCollabCard className="mt-12" />
              </article>
              </motion.main>
            </motion.div>
          </div>

          <DigiGardenFooter compact />
        </div>

        {/* Mobile sticky AI + tools */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--nr-border)] bg-[var(--nr-surface)] px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-8px_24px_-16px_rgba(15,23,42,0.35)] md:hidden">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-1.5">
            <div className="flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => setQuickOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-[var(--nr-border)] bg-transparent px-2 py-2 text-[10px] font-medium text-[var(--nr-text)]"
              >
                <HiBolt className="h-3.5 w-3.5 shrink-0 text-violet-500" />
                Quick Read
              </button>
              <button
                type="button"
                onClick={() => setQuizOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-[var(--nr-border)] bg-transparent px-2 py-2 text-[10px] font-medium text-[var(--nr-text)]"
              >
                <HiSparkles className="h-3.5 w-3.5 shrink-0 text-sky-500" />
                Quiz
              </button>
              <button
                type="button"
                onClick={() => setQnaOpen(true)}
                className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-[var(--nr-border)] bg-transparent px-2 py-2 text-[10px] font-medium text-[var(--nr-text)]"
              >
                <HiChatBubbleLeftRight className="h-3.5 w-3.5 shrink-0 text-violet-500" />
                Q&amp;A
              </button>
            </div>
            <div className="flex items-center justify-between gap-1 rounded-xl border border-[var(--nr-border)] bg-[var(--nr-bg)] px-1 py-0.5">
              <button
                type="button"
                title="Increase font size"
                onClick={() => bumpFont(1)}
                className="grid h-9 flex-1 place-items-center rounded-lg font-fraunces text-[12px] font-semibold text-[var(--nr-muted)] transition hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)]"
              >
                +A
              </button>
              <button
                type="button"
                title="Decrease font size"
                onClick={() => bumpFont(-1)}
                className="grid h-9 flex-1 place-items-center rounded-lg font-fraunces text-[11px] font-semibold text-[var(--nr-muted)] transition hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)]"
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
                  className="grid h-9 flex-1 place-items-center rounded-lg text-[var(--nr-muted)] transition hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)]"
                >
                  <item.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile — left-mid peek to open course content */}
        {!mobileNavOpen ? (
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            title="Course content"
            aria-label="Open course content"
            className="fixed left-0 top-1/2 z-[45] flex h-16 w-7 -translate-y-1/2 items-center justify-center rounded-r-lg border border-l-0 border-[var(--nr-border)]/40 bg-transparent opacity-45 transition hover:opacity-90 lg:hidden"
          >
            <HiOutlineViewColumns className="h-4 w-4 text-[var(--nr-accent)]" />
          </button>
        ) : null}

        {/* Mobile sidebar drawer — smooth slide */}
        <AnimatePresence>
          {mobileNavOpen ? (
            <div className="fixed inset-0 z-50 lg:hidden">
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/45"
                aria-label="Close menu"
                onClick={() => setMobileNavOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
                className="absolute bottom-0 left-0 top-0 flex w-[min(100%,320px)] flex-col shadow-xl"
                style={{
                  background:
                    "linear-gradient(180deg, var(--nr-sidebar-from) 0%, var(--nr-sidebar-to) 100%)",
                }}
              >
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
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <NotesReaderSidebar
                    courseName={courseDisplayTitle}
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
            </div>
          ) : null}
        </AnimatePresence>
      
        <QuickReaderDrawer isOpen={quickOpen} setIsOpen={setQuickOpen} />
        <QuestionsListDrawer isOpen={qnaOpen} setIsOpen={setQnaOpen} />
        {quizOpen ? (
          <AIQuestionDrawer isOpen={quizOpen} setIsOpen={setQuizOpen} />
        ) : null}
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

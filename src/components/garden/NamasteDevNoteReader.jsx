import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  HiOutlineChevronLeft,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ls from "local-storage";
import MDXRenderer from "@/components/base/MDXRenderer";
import CommonSlugHeadTags from "@/components/seo/CommonSlugHeadTags";
import NamasteDevNotesShell from "@/components/garden/NamasteDevNotesShell";
import ChapterSelectDropdown from "@/components/garden/ChapterSelectDropdown";
import NamasteDevLearnBanner from "@/components/garden/NamasteDevLearnBanner";
import {
  NotesReaderAiButtons,
  NotesReaderAiDrawers,
  useNotesReaderAi,
} from "@/components/garden/NotesReaderAiToolkit";
import { buildNotesSidebarList } from "@/data/note/sidebarList";
import {
  namasteAiDevNotesHref,
  getEpisodeDisplayTitle,
} from "@/data/note/namaste-ai-notes/dev-notes";
import {
  READER_THEME_STORAGE,
  READER_THEMES,
} from "@/data/note/readerThemes";
import { AI_MARKDOWN_CONTENT_ID } from "@/utils/aiOpenRouter";

dayjs.extend(customParseFormat);

const FONT_SCALE_STORAGE = "namaste-dev-notes-font-scale";

function formatDate(raw) {
  if (!raw) return "";
  const formats = ["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY"];
  for (const f of formats) {
    const d = dayjs(raw, f, true);
    if (d.isValid()) return d.format("MMM D, YYYY");
  }
  const d = dayjs(raw);
  return d.isValid() ? d.format("MMM D, YYYY") : String(raw);
}

function ReaderToolbarControls({
  theme,
  onThemeChange,
  onFontBump,
  variant = "default",
}) {
  const onHeader = variant === "header";
  const groupClass = onHeader
    ? "rounded-lg border border-white/20 bg-white/10 p-0.5 backdrop-blur-sm"
    : "rounded-lg border border-[var(--nr-border)] bg-[var(--nr-surface)] p-0.5";
  const btnClass = onHeader
    ? "text-white/85 hover:bg-white/15 hover:text-white"
    : "text-[var(--nr-muted)] hover:bg-[var(--nr-hover)] hover:text-[var(--nr-text)]";
  const activeClass = onHeader
    ? "bg-white/20 text-white"
    : "bg-[var(--nr-hover)] text-[var(--nr-text)]";

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
      <div className={`flex items-center ${groupClass}`} role="group" aria-label="Font size">
        <button
          type="button"
          title="Decrease font size"
          onClick={() => onFontBump(-1)}
          className={`grid h-8 w-8 place-items-center rounded-md font-fraunces text-[12px] font-semibold transition ${btnClass}`}
        >
          −A
        </button>
        <button
          type="button"
          title="Increase font size"
          onClick={() => onFontBump(1)}
          className={`grid h-8 w-8 place-items-center rounded-md font-fraunces text-[13px] font-semibold transition ${btnClass}`}
        >
          +A
        </button>
      </div>

      <div
        className={`flex items-center gap-0.5 ${groupClass}`}
        role="group"
        aria-label="Reader theme"
      >
        {Object.values(READER_THEMES).map((t) => {
          const Icon = t.icon;
          const active = theme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              title={t.label}
              aria-label={t.label}
              aria-pressed={active}
              onClick={() => onThemeChange(t.id)}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition ${
                active ? activeClass : btnClass
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function EpisodeHeroBanner({
  collectionLabel,
  episode,
  title,
  publishedOn,
  chapters,
  currentSlug,
  onChapterSelect,
}) {
  return (
    <div className="mx-auto max-w-[920px] px-5 pt-4 md:px-8 md:pt-6">
      <Link
        href="/digital-garden/notes"
        className="mb-5 inline-flex items-center gap-0.5 text-[12px] font-medium text-[var(--nr-muted)] no-underline transition hover:text-[var(--nr-accent)]"
      >
        <HiOutlineChevronLeft className="h-3.5 w-3.5" />
        All notes
      </Link>

      <header className="flex flex-col items-center text-center">
        <div className="mb-5 w-full max-w-md px-1">
          <ChapterSelectDropdown
            chapters={chapters}
            currentSlug={currentSlug}
            onSelect={onChapterSelect}
          />
        </div>

        {episode != null ? (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700">
            {collectionLabel} · Episode {episode}
          </p>
        ) : null}

        <h1 className="mx-auto mb-4 max-w-[24ch] font-fraunces text-[clamp(1.9rem,4.5vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--nr-heading)]">
          {title}
        </h1>

        {publishedOn ? (
          <p className="text-[13px] text-[var(--nr-muted)]">{publishedOn}</p>
        ) : null}
      </header>
    </div>
  );
}

export default function NamasteDevNoteReader({
  notes = [],
  currentPageMDX,
  currentPageFrontMatter,
  currentSlug,
  collectionLabel = "Namaste AI Notes",
}) {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [fontScale, setFontScale] = useState(0);
  const ai = useNotesReaderAi();

  const chapters = useMemo(() => buildNotesSidebarList(notes), [notes]);

  const currentIndex = chapters.findIndex((c) => c.slug === currentSlug);
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < chapters.length - 1
      ? chapters[currentIndex + 1]
      : null;

  const title = getEpisodeDisplayTitle(currentPageFrontMatter);
  const publishedOn = formatDate(
    currentPageFrontMatter?.publishedOn || currentPageFrontMatter?.date
  );
  const thumb = currentPageFrontMatter?.thumbnail;
  const episode = currentPageFrontMatter?.episode;

  const themeConfig = READER_THEMES[theme] || READER_THEMES.light;
  const bodyFontPx = 16 + fontScale;

  useEffect(() => {
    const savedTheme = ls.get(READER_THEME_STORAGE);
    if (savedTheme && READER_THEMES[savedTheme]) setTheme(savedTheme);

    const savedScale = ls.get(FONT_SCALE_STORAGE);
    if (typeof savedScale === "number" && Number.isFinite(savedScale)) {
      setFontScale(Math.max(-2, Math.min(4, savedScale)));
    }
  }, []);

  const handleThemeChange = (id) => {
    setTheme(id);
    ls.set(READER_THEME_STORAGE, id);
  };

  const bumpFont = (dir) => {
    setFontScale((s) => {
      const nextScale = Math.max(-2, Math.min(4, s + dir));
      ls.set(FONT_SCALE_STORAGE, nextScale);
      return nextScale;
    });
  };

  const onChapterSelect = (slug) => {
    if (slug && slug !== currentSlug) {
      router.push(namasteAiDevNotesHref(slug));
    }
  };

  const shellStyle = {
    ...themeConfig.vars,
    "--nr-font-size": `${bodyFontPx}px`,
  };

  return (
    <NamasteDevNotesShell
      themeStyle={shellStyle}
      headerEnd={
        <div className="flex flex-wrap items-center justify-end gap-2">
          <ReaderToolbarControls
            variant="header"
            theme={theme}
            onThemeChange={handleThemeChange}
            onFontBump={bumpFont}
          />
          <NotesReaderAiButtons
            variant="header"
            activeMode={
              ai.quickOpen
                ? "quick"
                : ai.quizOpen
                  ? "quiz"
                  : ai.qnaOpen
                    ? "qna"
                    : null
            }
            onQuickOpen={ai.openQuickRead}
            onQuizOpen={ai.openQuiz}
            onQnaOpen={ai.openQna}
          />
        </div>
      }
    >
      <CommonSlugHeadTags
        frontMatter={currentPageFrontMatter}
        url={`https://www.heyashu.in${namasteAiDevNotesHref(currentSlug)}`}
        tags="Namaste AI Notes, Namaste AI digital notes, Akshay Saini AI notes, LLM notes, GenAI, digital garden, heyashu"
        collectionName="Namaste AI Notes"
        collectionPath="/digital-garden/notes/namaste-ai-notes"
      />

      <EpisodeHeroBanner
        collectionLabel={collectionLabel}
        episode={episode}
        title={title}
        publishedOn={publishedOn}
        chapters={chapters}
        currentSlug={currentSlug}
        onChapterSelect={onChapterSelect}
      />

      <article className="mx-auto max-w-[920px] px-5 pb-20 pt-2 md:px-8 md:pt-3">
        {thumb ? (
          <figure className="mb-8">
            <div className="overflow-hidden border border-[var(--nr-border)]">
              <Image
                alt=""
                src={thumb}
                width={1024}
                height={560}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </figure>
        ) : null}

        <div
          id={AI_MARKDOWN_CONTENT_ID}
          className="garden-blog-prose prose max-w-none text-left
            prose-headings:font-fraunces prose-headings:font-semibold prose-headings:!text-[var(--nr-heading)]
            prose-h2:!text-[1.22em] prose-h3:!text-[1.1em]
            prose-p:!leading-[1.7] prose-p:!text-[var(--nr-body)]
            prose-strong:!font-semibold prose-strong:!text-[var(--nr-heading)]
            prose-li:!text-[var(--nr-body)]
            prose-a:!text-[var(--nr-accent)]
            prose-img:!rounded-none prose-img:border prose-img:border-[var(--nr-border)]
            prose-pre:!rounded-none prose-pre:!text-[var(--nr-body)] prose-pre:!bg-[var(--nr-code-bg)]
            prose-code:!text-[var(--nr-heading)] prose-code:!bg-[var(--nr-hover)] prose-code:!font-medium"
          style={{ fontSize: "var(--nr-font-size, 16px)" }}
        >
          <MDXRenderer markdownContent={currentPageMDX} variant="garden-reader" />
        </div>

        <NamasteDevLearnBanner />

        {(prev || next) && (
          <nav
            className="mt-8 grid gap-4 sm:grid-cols-2"
            aria-label="Chapter navigation"
          >
            {prev ? (
              <Link
                href={namasteAiDevNotesHref(prev.slug)}
                className="rounded-xl border border-[var(--nr-border)] bg-[var(--nr-surface)] p-4 text-left no-underline transition hover:border-[var(--nr-accent)]"
              >
                <span className="mb-1 flex items-center gap-1 text-[11px] font-medium text-[var(--nr-muted)]">
                  <HiChevronLeft className="h-3.5 w-3.5" />
                  Previous
                  {prev.episode != null ? ` · Episode ${prev.episode}` : ""}
                </span>
                <span className="font-fraunces text-[15px] font-semibold leading-snug text-[var(--nr-text)]">
                  {getEpisodeDisplayTitle(prev)}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={namasteAiDevNotesHref(next.slug)}
                className="rounded-xl border border-[var(--nr-border)] bg-[var(--nr-surface)] p-4 text-right no-underline transition hover:border-[var(--nr-accent)] sm:justify-self-end"
              >
                <span className="mb-1 flex items-center justify-end gap-1 text-[11px] font-medium text-[var(--nr-muted)]">
                  Next
                  {next.episode != null ? ` · Episode ${next.episode}` : ""}
                  <HiChevronRight className="h-3.5 w-3.5" />
                </span>
                <span className="font-fraunces text-[15px] font-semibold leading-snug text-[var(--nr-text)]">
                  {getEpisodeDisplayTitle(next)}
                </span>
              </Link>
            ) : null}
          </nav>
        )}
      </article>

      <NotesReaderAiDrawers {...ai} cacheSlug={currentSlug} />
    </NamasteDevNotesShell>
  );
}

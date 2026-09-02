import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import MDXRenderer from "@/components/base/MDXRenderer";
import CommonSlugHeadTags from "@/components/seo/CommonSlugHeadTags";
import NamasteDevNotesShell from "@/components/garden/NamasteDevNotesShell";
import ChapterSelectDropdown from "@/components/garden/ChapterSelectDropdown";
import NamasteDevLearnBanner from "@/components/garden/NamasteDevLearnBanner";
import { buildNotesSidebarList } from "@/data/note/sidebarList";
import {
  namasteAiDevNotesHref,
  getEpisodeDisplayTitle,
} from "@/data/note/namaste-ai-notes/dev-notes";
import { READER_THEMES } from "@/data/note/readerThemes";
import { AI_MARKDOWN_CONTENT_ID } from "@/utils/aiOpenRouter";

function EpisodeHeroBanner({
  seasonNumber = 1,
  title,
  chapters,
  currentSlug,
  onChapterSelect,
}) {
  return (
    <div className="mx-auto max-w-[920px] px-5 pt-4 md:px-8 md:pt-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f97316] text-[12px] font-bold tracking-wide text-white"
            aria-hidden="true"
          >
            AI
          </span>
          <p className="text-[14px] font-bold uppercase tracking-[0.06em] text-[#f97316] sm:text-[15px]">
            Namaste AI Notes : Season {seasonNumber}
          </p>
        </div>

        <div className="w-full max-w-[11rem] shrink-0 print:hidden sm:w-auto sm:min-w-[10rem]">
          <ChapterSelectDropdown
            chapters={chapters}
            currentSlug={currentSlug}
            onSelect={onChapterSelect}
            labelMode="episode"
          />
        </div>
      </div>

      <header className="text-left">
        <h1 className="max-w-[28ch] font-ibm-sans text-[clamp(1.85rem,4.5vw,2.65rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[#111827]">
          {title}
        </h1>
      </header>
    </div>
  );
}

export default function NamasteDevNoteReader({
  notes = [],
  currentPageMDX,
  currentPageFrontMatter,
  currentSlug,
}) {
  const router = useRouter();
  const chapters = useMemo(() => buildNotesSidebarList(notes), [notes]);

  const title = getEpisodeDisplayTitle(currentPageFrontMatter);
  const thumb = currentPageFrontMatter?.thumbnail;
  const seasonNumber = currentPageFrontMatter?.seasonNumber || 1;

  const themeConfig = READER_THEMES.light;

  const onChapterSelect = (slug) => {
    if (slug && slug !== currentSlug) {
      router.push(namasteAiDevNotesHref(slug));
    }
  };

  const shellStyle = {
    ...themeConfig.vars,
    "--nr-font-size": "18px",
  };

  return (
    <NamasteDevNotesShell themeStyle={shellStyle}>
      <CommonSlugHeadTags
        frontMatter={currentPageFrontMatter}
        url={`https://www.heyashu.in${namasteAiDevNotesHref(currentSlug)}`}
        tags="Namaste AI Notes, Namaste AI digital notes, Akshay Saini AI notes, LLM notes, GenAI, digital garden, heyashu"
        collectionName="Namaste AI Notes"
        collectionPath="/digital-garden/notes/namaste-ai-notes"
      />

      <EpisodeHeroBanner
        seasonNumber={seasonNumber}
        title={title}
        chapters={chapters}
        currentSlug={currentSlug}
        onChapterSelect={onChapterSelect}
      />

      <article className="mx-auto max-w-[920px] px-5 pb-20 pt-6 md:px-8 md:pt-8">
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
          className="garden-blog-prose prose max-w-none text-left font-source-serif
            prose-headings:font-source-serif prose-headings:font-semibold prose-headings:!text-[var(--nr-heading)]
            prose-h2:!text-[1.28em] prose-h3:!text-[1.12em]
            prose-p:!leading-[1.75] prose-p:!text-[var(--nr-body)]
            prose-strong:!font-semibold prose-strong:!text-[var(--nr-heading)]
            prose-li:!text-[var(--nr-body)] prose-li:!leading-[1.7]
            prose-a:!text-[var(--nr-accent)]
            prose-img:!rounded-none prose-img:border prose-img:border-[var(--nr-border)]
            prose-pre:!rounded-none prose-pre:!text-[var(--nr-body)] prose-pre:!bg-[var(--nr-code-bg)]
            prose-code:!text-[var(--nr-heading)] prose-code:!bg-[var(--nr-hover)] prose-code:!font-medium"
          style={{ fontSize: "var(--nr-font-size, 18px)" }}
        >
          <MDXRenderer markdownContent={currentPageMDX} variant="garden-reader" />
        </div>

        <NamasteDevLearnBanner />
      </article>
    </NamasteDevNotesShell>
  );
}

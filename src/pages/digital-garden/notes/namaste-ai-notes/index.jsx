import React, { useMemo } from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import BackToGarden from "@/components/garden/BackToGarden";
import { withDigitalGardenLayout } from "@/layouts";
import { buildNotesSidebarList } from "@/data/note/sidebarList";
import { loadNotesMetaFromDir } from "@/data/note/loadNotesMeta";
import {
  metaTagsForNamasteAI,
  NAMASTE_AI_COURSE_ABOUT,
} from "@/data/note/namaste-ai-notes/meta-tags";
import { getEpisodeDisplayTitle } from "@/data/note/namaste-ai-notes/dev-notes";
import {
  breadcrumbList,
  courseSchema,
  itemListSchema,
  NAMASTE_AI_KEYWORDS,
} from "@/utils/seoJsonLd";
import { SITE_ORIGIN } from "@/utils/seo";

const COURSE_URL = `${SITE_ORIGIN}/digital-garden/notes/namaste-ai-notes`;
const OG_IMAGE = metaTagsForNamasteAI.ogImage;

function NamasteAiNotesLanding({ notes = [] }) {
  const chapters = useMemo(() => buildNotesSidebarList(notes), [notes]);
  const startHref =
    chapters[0]?.slug
      ? `/digital-garden/notes/namaste-ai-notes/${chapters[0].slug}`
      : metaTagsForNamasteAI.startPath;

  const jsonLd = [
    courseSchema({
      name: "Namaste AI Notes",
      description: metaTagsForNamasteAI.description,
      url: "/digital-garden/notes/namaste-ai-notes",
      image: OG_IMAGE,
      about: NAMASTE_AI_COURSE_ABOUT,
    }),
    itemListSchema({
      name: "Namaste AI Notes — Episodes",
      url: "/digital-garden/notes/namaste-ai-notes",
      items: chapters.map((ch) => ({
        name: getEpisodeDisplayTitle(ch),
        url: `/digital-garden/notes/namaste-ai-notes/${ch.slug}`,
      })),
    }),
    breadcrumbList([
      { name: "Digital Garden", url: "/digital-garden" },
      { name: "Digital Notes", url: "/digital-garden/notes" },
      { name: "Namaste AI Notes", url: "/digital-garden/notes/namaste-ai-notes" },
    ]),
  ];

  return (
    <div className="bg-[#f7f4ee] dark:bg-[#0b120e]">
      <CommonHeadTags
        title={metaTagsForNamasteAI.title}
        url={COURSE_URL}
        image={OG_IMAGE}
        shortDec={metaTagsForNamasteAI.ogDescription}
        mainDesc={metaTagsForNamasteAI.description}
        tags={NAMASTE_AI_KEYWORDS}
        jsonLd={jsonLd}
      />

      <main className="mx-auto max-w-3xl px-6 pb-16 pt-10 md:pt-14">
        <BackToGarden />
        <p className="mb-4">
          <Link
            href="/digital-garden/notes"
            className="text-[13px] font-medium text-[#6b6458] no-underline hover:text-[#143825] dark:text-[#92a59a]"
          >
            ← All notes collections
          </Link>
        </p>

        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-700 dark:text-violet-400">
          Free open-source course notes
        </p>
        <h1 className="mb-3 font-fraunces text-[clamp(1.85rem,4vw,2.75rem)] font-semibold tracking-[-0.02em] text-[#171717] dark:text-[#f0f4ef]">
          Namaste AI Notes
        </h1>
        <p className="mb-6 max-w-[60ch] text-[15px] leading-relaxed text-[#4a453d] dark:text-[#c5d0c8]">
          Free digital notes for{" "}
          <strong>Akshay Saini’s Namaste AI</strong> course — episode-wise
          explainers on LLMs, tokenization, embeddings, transformers &amp;
          attention. Searchable, AI study tools, PDF &amp; Book Mode.
          Curated in the heyashu Digital Garden.
        </p>

        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href={startHref}
            className="inline-flex items-center rounded-full bg-[#143825] px-5 py-2.5 text-[13px] font-semibold text-white no-underline transition hover:bg-[#1a4730] dark:bg-[#22c55e] dark:text-[#0b120e]"
          >
            Start Reading →
          </Link>
          <Link
            href="/digital-garden/notes"
            className="inline-flex items-center rounded-full border border-[#ddd5c8] px-5 py-2.5 text-[13px] font-semibold text-[#171717] no-underline transition hover:border-[#143825] dark:border-[#1e3328] dark:text-[#f0f4ef]"
          >
            All collections
          </Link>
        </div>

        <h2 className="mb-4 font-fraunces text-lg font-semibold text-[#171717] dark:text-[#f0f4ef]">
          All episodes
        </h2>
        <ol className="space-y-2">
          {chapters.map((ch) => (
            <li key={ch.slug}>
              <Link
                href={`/digital-garden/notes/namaste-ai-notes/${ch.slug}`}
                className="flex items-baseline gap-2 rounded-xl border border-[#e8e2d7] bg-white px-4 py-3 no-underline transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:hover:border-[#22c55e]"
              >
                {ch.episode != null ? (
                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-[#8a8276]">
                    Ep {ch.episode}
                  </span>
                ) : null}
                <span className="font-fraunces text-[15px] font-semibold text-[#171717] dark:text-[#f0f4ef]">
                  {getEpisodeDisplayTitle(ch)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </main>

      <DigiGardenFooter compact />
    </div>
  );
}

NamasteAiNotesLanding.getLayout = withDigitalGardenLayout;
export default NamasteAiNotesLanding;

export async function getStaticProps() {
  const directory = path.join(process.cwd(), "src/content/namaste-ai-notes");
  const notes = fs.existsSync(directory)
    ? loadNotesMetaFromDir(directory)
    : [];
  return { props: { notes } };
}

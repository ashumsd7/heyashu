import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import GardenCollabCard from "@/components/garden/GardenCollabCard";
import {
  NOTES_CONFIG,
  getNoteStatusChips,
  getNotesIndexList,
  getNotesStartRoute,
  NOTE_STATUS_CHIP_TONES,
} from "@/data/note/allNotes";
import { GARDEN_KHAKI_ITEMS } from "@/data/garden";
import { withDigitalGardenLayout } from "@/layouts";
import { GITHUB_REPO_LINK } from "@/utils/constant";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function toneClasses(tone) {
  return NOTE_STATUS_CHIP_TONES[tone] || NOTE_STATUS_CHIP_TONES.neutral;
}

function CardBgPattern() {
  return (
    <div
      className="pointer-events-none absolute -right-4 -top-6 text-[#143825] dark:text-[#22c55e]"
      aria-hidden="true"
    >
      <svg width="160" height="160" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 10C120 40 180 60 190 100C200 140 150 180 100 190C50 180 0 140 10 100C20 60 80 40 100 10Z"
          fill="currentColor"
          opacity="0.045"
        />
        <path
          d="M100 20C110 50 150 70 160 100C170 130 130 160 100 170C70 160 30 130 40 100C50 70 90 50 100 20Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.1"
        />
        <circle cx="150" cy="40" r="18" stroke="currentColor" strokeWidth="1" opacity="0.08" />
        <circle cx="170" cy="70" r="8" fill="currentColor" opacity="0.06" />
      </svg>
    </div>
  );
}

function NotesCollectionPage() {
  const router = useRouter();
  const notes = getNotesIndexList();

  return (
    <div className="bg-[#f7f4ee] dark:bg-[#0b120e]">
      <CommonHeadTags
        title="Index of Notes Collection — Digital Garden | heyashu"
        url="https://www.heyashu.in/digital-garden/notes"
        image="https://i.ibb.co/zHFrGsK/diginotes-thumb.jpg"
      />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 md:pt-16">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-10 max-w-3xl"
        >
          <h1 className="mb-4 font-fraunces text-[clamp(2.4rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#171717] dark:text-[#f0f4ef]">
            Index of Notes Collection
          </h1>
          <p className="text-[1.05rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
            Curated from Books, Courses and Research Papers
          </p>
        </motion.header>

        <div className="flex flex-col gap-4">
          {notes.map((note, index) => {
            const statusChips = getNoteStatusChips(note);
            return (
              <motion.article
                key={note.id || `${note.title}-${index}`}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ delay: Math.min(index * 0.06, 0.3) }}
                whileHover={note.isComingSoon ? undefined : { y: -2 }}
                onClick={() => {
                  if (note.isComingSoon) return;
                  const start = getNotesStartRoute(note);
                  if (start) router.push(start);
                }}
                className={`relative grid grid-cols-1 overflow-hidden rounded-md border border-[#e6e0d6] bg-white dark:border-[#1e3328] dark:bg-[#121e17] md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] ${
                  note.isComingSoon
                    ? "cursor-default opacity-90"
                    : "cursor-pointer hover:shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
                }`}
              >
                <div className="h-[140px] overflow-hidden border-b border-[#ece7de] dark:border-[#1e3328] md:h-auto md:min-h-[150px] md:border-b-0 md:border-r">
                  <img
                    src={
                      note.thumbnailUrl ||
                      "https://i.ibb.co/td4c8w0/namaste-node-js.png"
                    }
                    alt={note.title}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                <div className="relative flex flex-col justify-between gap-3 overflow-hidden p-4 md:p-5">
                  <CardBgPattern />
                  <div className="relative z-[1]">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {statusChips.length > 0 ? (
                        statusChips.map((chip) => (
                          <span
                            key={chip.key}
                            className={`rounded-sm px-2.5 py-0.5 text-[11px] font-semibold ${toneClasses(
                              chip.tone
                            )}`}
                          >
                            {chip.label}
                          </span>
                        ))
                      ) : (
                        <span
                          className={`rounded-sm px-2.5 py-0.5 text-[11px] font-semibold ${toneClasses(
                            "neutral"
                          )}`}
                        >
                          Available
                        </span>
                      )}
                    </div>

                    <h2 className="mb-1 font-fraunces text-[clamp(1.15rem,2vw,1.45rem)] font-semibold leading-snug text-[#171717] dark:text-[#f0f4ef]">
                      {note.title}
                    </h2>

                    <p className="mb-1 text-xs text-[#6b6458] dark:text-[#92a59a]">
                      By {note.by}
                      {note.sourceName ? (
                        <>
                          <span className="mx-1">•</span>
                          {note.sourceLink ? (
                            <a
                              href={note.sourceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="underline decoration-[#d5cec2] underline-offset-2 hover:text-[#9a4f2e]"
                            >
                              {note.sourceName}
                            </a>
                          ) : (
                            note.sourceName
                          )}
                        </>
                      ) : null}
                      {note.publishedOn ? (
                        <span className="text-[#8a8276]">
                          <span className="mx-1">•</span>
                          Published: {note.publishedOn}
                        </span>
                      ) : null}
                    </p>

                    <p className="mb-2 line-clamp-2 max-w-[70ch] text-[0.86rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
                      {note.shortDesc ||
                        "Open this collection to explore chapter-wise digital notes."}
                    </p>
                    <p className="text-[11px] text-[#8a8276] dark:text-[#92a59a]">
                      {note.startedOn ? `Started ${note.startedOn}` : null}
                      {note.endedOn ? ` · Ended ${note.endedOn}` : " · Ongoing"}
                      {note.completedPercent != null
                        ? ` · ${note.completedPercent}% complete`
                        : null}
                      {note.chapterCount ? ` · ${note.chapterCount} chapters` : null}
                    </p>
                  </div>

                  <div className="relative z-[1] mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {(note.tags || []).map((tag) => (
                        <span
                          key={`${note.title}-${tag}`}
                          className="rounded-full bg-[#f3eee5] px-2 py-0.5 text-[11px] font-medium capitalize text-[#5f584e] dark:bg-[#172a20] dark:text-[#92a59a]"
                        >
                          {String(tag).replace(/_/g, " ").replace(/-/g, " ")}
                        </span>
                      ))}
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                      <motion.a
                        href={
                          note.githubLink && note.githubLink !== "#"
                            ? note.githubLink
                            : GITHUB_REPO_LINK
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Source code on GitHub"
                        aria-label="Source code on GitHub"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) => e.stopPropagation()}
                        className="grid h-9 w-9 place-items-center rounded-sm border border-[#e0d9cd] bg-white text-[#171717] transition hover:border-[#1f2a22] hover:bg-[#1f2a22] hover:text-white dark:border-[#1e3328] dark:bg-[#0b120e] dark:text-[#f0f4ef] dark:hover:border-[#22c55e] dark:hover:bg-[#22c55e] dark:hover:text-[#0b120e]"
                      >
                        <FaGithub className="h-4 w-4" />
                      </motion.a>

                      <Link
                        href={
                          note.isComingSoon
                            ? "#"
                            : getNotesStartRoute(note)
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          if (note.isComingSoon) e.preventDefault();
                        }}
                        className={`rounded-sm px-4 py-2 text-xs font-medium no-underline transition ${
                          note.isComingSoon
                            ? "cursor-not-allowed bg-slate-400/20 text-slate-600 dark:text-slate-400"
                            : "bg-[#1f2a22] text-white hover:bg-[#143825] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
                        }`}
                      >
                        {note.isComingSoon ? "Coming Soon" : "Start Reading"}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Khaki marquee strip */}
      <div className="mx-auto mb-8 mt-2 max-w-6xl px-6">
        <div
          className="group origin-center overflow-hidden rounded-sm border-y-2 border-[#8b7355] bg-[#c2b280] py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_22px_rgba(0,0,0,0.08)] [mask-image:linear-gradient(90deg,transparent,black_9%,black_91%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_9%,black_91%,transparent)]"
          style={{ transform: "rotate(-3.5deg)" }}
          aria-label="Notes collection highlights"
        >
          <div className="flex w-max animate-khaki-marquee group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div
                className="flex items-center whitespace-nowrap"
                key={copy}
                aria-hidden={copy === 1}
              >
                {GARDEN_KHAKI_ITEMS.map((item) => (
                  <React.Fragment key={`${copy}-${item}`}>
                    <span className="inline-flex items-center gap-2.5 px-7 font-ibm-mono text-[0.82rem] font-bold uppercase tracking-[0.04em] text-[#1a1a1a]">
                      {item}
                    </span>
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a1a1a]/55"
                      aria-hidden="true"
                    />
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Request / Collaborate */}
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <GardenCollabCard />
      </div>

      <DigiGardenFooter />
    </div>
  );
}

export default NotesCollectionPage;

NotesCollectionPage.getLayout = withDigitalGardenLayout;

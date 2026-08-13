import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { motion } from "framer-motion";
import {
  HiBookOpen,
  HiFolderOpen,
  HiStar,
  HiUsers,
  HiSparkles,
  HiBolt,
  HiAcademicCap,
  HiMagnifyingGlass,
  HiOutlineBookmark,
  HiNewspaper,
  HiChatBubbleLeftRight,
  HiServer,
  HiUserGroup,
  HiHeart,
} from "react-icons/hi2";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import {
  DEFAULT_AVATAR,
  GITHUB_REPO_LINK,
} from "@/utils/constant";
import { removePublicFromPath } from "@/utils/functions";
import { withDigitalGardenLayout } from "@/layouts";
import {
  getHomeFeaturedNotes,
  getNotesStartRoute,
} from "@/data/note/allNotes";
import {
  GARDEN_ADMIN_URL,
  GARDEN_FALLBACK_TESTIMONIALS,
  GARDEN_HELP_CHAI,
  GARDEN_HELP_CHAI_IMG,
  GARDEN_HELP_CHAI_URL,
  GARDEN_HERO_STATS,
  GARDEN_KHAKI_ITEMS,
  GARDEN_SUPPORT_QR,
  GARDEN_SUPPORT_URL,
  formatComment,
  formatGardenDate,
  pickFreshGardenBlogs,
} from "@/data/garden";

/** Top N notes cards on the garden home (from NOTES_CONFIG). */
const HOME_NOTES = getHomeFeaturedNotes(4);

const HERO_STAT_UI = {
  emerald: {
    Icon: HiBookOpen,
    card: "border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 to-teal-500/5 dark:from-emerald-500/20",
    icon: "bg-emerald-600/15 text-emerald-700 dark:text-emerald-400",
  },
  orange: {
    Icon: HiFolderOpen,
    card: "border-orange-500/20 bg-gradient-to-br from-orange-500/15 to-amber-500/5",
    icon: "bg-orange-600/15 text-orange-700 dark:text-orange-400",
  },
  yellow: {
    Icon: HiStar,
    card: "border-yellow-500/20 bg-gradient-to-br from-yellow-500/15 to-amber-500/5",
    icon: "bg-yellow-600/15 text-yellow-700 dark:text-yellow-400",
  },
  violet: {
    Icon: HiUsers,
    card: "border-violet-500/20 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/5",
    icon: "bg-violet-600/15 text-violet-700 dark:text-violet-400",
  },
};

function DigitalGarden({ posts, blogs }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  // Latest post first + random rest from the full list; reshuffle on every visit
  const [freshBlogs, setFreshBlogs] = useState(() =>
    pickFreshGardenBlogs(blogs || [], 4)
  );

  useEffect(() => {
    setFreshBlogs(pickFreshGardenBlogs(blogs || [], 4));
  }, [blogs]);

  // Support chip deep-link: /digital-garden#support
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#support") return;
    const t = window.setTimeout(() => {
      document.getElementById("support")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
    return () => window.clearTimeout(t);
  }, []);

  const userTestimonials = posts.map((post) => ({
    name: post.frontMatter?.name || post?.frontMatter?.title || "Anonymous Developer",
    role: post.role || post.frontMatter?.role || "Software Engineer",
    comment: formatComment(post.content),
    avatar:
      removePublicFromPath(post.frontMatter?.profilePic) ||
      removePublicFromPath(post?.profilePic) ||
      DEFAULT_AVATAR,
  }));

  const fallbackTestimonials = GARDEN_FALLBACK_TESTIMONIALS.map((t) => ({
    ...t,
    comment: formatComment(t.comment),
  }));

  const allTestimonials =
    userTestimonials.length >= 3
      ? userTestimonials
      : [...userTestimonials, ...fallbackTestimonials];
  const marqueeTestimonials = [...allTestimonials, ...allTestimonials];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/digital-garden/notes?query=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/digital-garden/notes");
    }
  };

  return (
    <>
      <CommonHeadTags
        title="The Garden — Free Digital Notes of Your Favourite Teachers | heyashu"
        url="https://www.heyashu.in/digital-garden"
        shortDec="Free, open-source digital garden of coding notes from Akshay Saini, ProCodrr, and top teachers. Summarize, quiz, and revise Node.js and system design."
        mainDesc="Digital Garden by Ashutosh Anand Tiwari. Clean, searchable, open-source notes from popular engineering courses."
        image="https://i.ibb.co/zHFrGsK/diginotes-thumb.jpg"
      />

      {/* HERO */}
      <section className="relative overflow-hidden px-0 pb-16 pt-3 text-center md:pt-4">
        <div className="mx-auto w-full max-w-[1120px] px-6">
          {/* Intro logo — cropped tight under nav (less empty frame above art) */}
          <div className="pointer-events-none relative mx-auto mb-0 flex h-[170px] w-[240px] items-end justify-center overflow-hidden sm:h-[200px] sm:w-[300px] md:h-[230px] md:w-[340px]">
            <video
              className="h-[240px] w-full origin-bottom scale-125 object-contain object-bottom opacity-100 mix-blend-multiply sm:h-[300px] md:h-[340px] dark:mix-blend-screen"
              src="/intrologo.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            />
          </div>

          <div className="relative z-[1] mx-auto mb-[18px] inline-flex items-center gap-1.5 rounded-full border border-violet-500/35 bg-gradient-to-br from-violet-500/12 to-pink-500/10 px-4 py-1.5 text-[0.82rem] font-bold tracking-[0.01em] text-violet-600 dark:text-violet-300">
            <HiSparkles size={14} />
            AI Powered Digital Notes &amp; Blogs
          </div>
          <h1 className="mx-auto mb-[18px] max-w-[22ch] font-fraunces text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[#171717] dark:text-[#f0f4ef]">
            One Stop for Free Digital Notes of Your Favourite Teachers
          </h1>
          <p className="mx-auto mb-8 max-w-[58ch] text-[1.1rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
            Curated from Handwritten Notes
          </p>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-3.5">
            <a
              className="rounded-xl bg-[#143825] px-6 py-3 text-[0.95rem] font-semibold text-white no-underline transition hover:bg-[#0d281a] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
              href="/digital-garden/notes"
            >
              📖 Read Digital Notes
            </a>
            <a
              className="rounded-xl border border-[#e8e2d7] bg-white px-6 py-3 text-[0.95rem] font-semibold text-[#171717] no-underline transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
              href={GITHUB_REPO_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              ⭐ Star the repo
            </a>
          </div>

          <div className="mb-8 grid grid-cols-1 items-center gap-8 rounded-[20px] border border-[#e8e2d7] bg-white p-8 text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-[#1e3328] dark:bg-[#121e17] md:grid-cols-2 md:p-10">
            <div>
              <h2 className="mb-3 font-fraunces text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#171717] dark:text-[#f0f4ef]">
                Open-sourced Digital Garden
              </h2>
              <p className="mb-6 text-[0.98rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                A collaborative space for open-source knowledge sharing. Built on
                the principles of public learning, this garden allows anyone to
                contribute, refine, and access high-quality educational materials
                curated by experts.
              </p>
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3 text-[0.95rem] text-[#171717] dark:text-[#f0f4ef]">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#f2eee5] text-lg dark:bg-[#172a20]">🎯</div>
                  <span>Evergreen content updated regularly</span>
                </div>
                <div className="flex items-center gap-3 text-[0.95rem] text-[#171717] dark:text-[#f0f4ef]">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#f2eee5] text-lg dark:bg-[#172a20]">👥</div>
                  <span>Community-driven corrections</span>
                </div>
                <div className="flex items-center gap-3 text-[0.95rem] text-[#171717] dark:text-[#f0f4ef]">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#f2eee5] text-lg dark:bg-[#172a20]">💬</div>
                  <span>Curated from handwritten notes</span>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#e8e2d7] dark:border-[#1e3328]">
              <video
                className="aspect-video h-full w-full object-cover"
                src="/notes_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Open-sourced Digital Garden Notes Preview Video"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GARDEN_HERO_STATS.map((stat) => {
              const ui = HERO_STAT_UI[stat.tone] || HERO_STAT_UI.emerald;
              const Icon = ui.Icon;
              return (
                <div
                  key={stat.label}
                  className={`flex items-center gap-3.5 rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${ui.card}`}
                >
                  <div className={`grid h-11 w-11 place-items-center rounded-xl text-xl ${ui.icon}`}>
                    <Icon />
                  </div>
                  <div className="text-left">
                    <div className="font-fraunces text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-[#585858] dark:text-[#92a59a]">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* KHAKI MARQUEE */}
      <div className="mx-auto mb-5 mt-7 max-w-[1120px] px-6">
        <div
          className="group origin-center overflow-hidden rounded-sm border-y-2 border-[#8b7355] bg-[#c2b280] py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_22px_rgba(0,0,0,0.08)] [mask-image:linear-gradient(90deg,transparent,black_9%,black_91%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_9%,black_91%,transparent)]"
          style={{ transform: "rotate(-3.5deg)" }}
          aria-label="Digital Garden highlights"
        >
          <div className="flex w-max animate-khaki-marquee group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div className="flex items-center whitespace-nowrap" key={copy} aria-hidden={copy === 1}>
                {GARDEN_KHAKI_ITEMS.map((item) => (
                  <React.Fragment key={`${copy}-${item}`}>
                    <span className="inline-flex items-center gap-2.5 px-7 font-ibm-mono text-[0.82rem] font-bold uppercase tracking-[0.04em] text-[#1a1a1a]">
                      {item}
                    </span>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a1a1a]/55" aria-hidden="true" />
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COLLECTIONS */}
      <section id="collections" className="py-[72px]">
        <div className="mx-auto w-full max-w-[1120px] px-6">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-fraunces text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold tracking-[-0.02em] text-[#171717] dark:text-[#f0f4ef]">Notes &amp; Course Collections</h2>
              <p className="mt-2 max-w-[54ch] text-[1.02rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                High-quality notes from popular instructors, formatted for fast revision and interview readiness.
              </p>
            </div>
            <a href="/digital-garden/notes" className="inline-flex items-center gap-1 text-[0.92rem] font-semibold text-[#143825] transition hover:text-[#0d281a] dark:text-[#22c55e] dark:hover:text-[#16a34a]">
              Read all notes →
            </a>
          </div>

          <div className="flex flex-col gap-5">
            {HOME_NOTES.map((note) => {
              const startHref = getNotesStartRoute(note);
              return (
                <motion.article
                  key={note.id}
                  whileHover={{ scale: 1.008 }}
                  transition={{ duration: 0.2 }}
                  className="group relative grid cursor-pointer grid-cols-1 overflow-hidden rounded-[20px] border border-[#e8e2d7] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:shadow-[0_16px_36px_-8px_rgba(20,56,37,0.12)] dark:border-[#1e3328] dark:bg-[#121e17] md:grid-cols-[260px_1fr]"
                  onClick={() => router.push(startHref)}
                >
                  <div className="pointer-events-none absolute -right-6 -top-6 text-[#143825] opacity-100 dark:text-[#22c55e]" aria-hidden="true">
                    <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 10C120 40 180 60 190 100C200 140 150 180 100 190C50 180 0 140 10 100C20 60 80 40 100 10Z" fill="currentColor" opacity="0.04"/>
                      <path d="M100 20C110 50 150 70 160 100C170 130 130 160 100 170C70 160 30 130 40 100C50 70 90 50 100 20Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.08"/>
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <img
                      className="h-[200px] w-full object-cover transition duration-300 group-hover:scale-[1.03] md:h-full md:min-h-[220px]"
                      src={note.bannerUrl || note.thumbnailUrl}
                      alt={note.homeTitle || note.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="relative z-[1] flex flex-col justify-center p-6 md:p-7">
                    <h3 className="mb-2 font-fraunces text-[clamp(1.4rem,2.8vw,1.85rem)] font-extrabold tracking-[-0.01em] text-[#171717] [text-shadow:0_1px_0_rgba(0,0,0,0.04)] dark:text-[#f0f4ef]">
                      {note.homeTitle || note.title}
                    </h3>
                    <p className="mb-3 text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                      {note.homeDesc || note.shortDesc}
                    </p>
                    <div className="mb-5 text-xs text-[#585858] dark:text-[#92a59a]">
                      {note.homeMeta}
                      {note.completedPercent != null ? ` · ${note.completedPercent}% done` : ""}
                    </div>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#143825] text-sm font-bold text-white dark:bg-[#22c55e] dark:text-[#0b120e]">
                          {note.authorInitials || "AT"}
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="text-sm font-semibold text-[#171717] dark:text-[#f0f4ef]">{note.authorDisplay || note.by}</span>
                          <span className="text-xs text-[#585858] dark:text-[#92a59a]">{note.authorOrg || note.sourceName}</span>
                        </div>
                      </div>
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center rounded-xl bg-[#143825] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d281a] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
                        href={startHref}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read Digital Notes →
                      </motion.a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

{/* AI TOOLS */}
      <section className="bg-white py-[72px] dark:bg-[#121e17]">
        <div className="mx-auto w-full max-w-[1120px] px-6">
          <div className="mb-9">
            <h2 className="mb-2 flex flex-wrap items-center gap-2.5 font-fraunces text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold">
              <HiSparkles className="animate-sparkle-pulse text-violet-500" />
              <span>
                <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">AI</span> Powered Study Tools
              </span>
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-violet-600 dark:text-violet-300">
                Beta Version
              </span>
            </h2>
            <p className="mt-2 max-w-[54ch] text-[1.02rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
              Bored from watching videos? Here is the solution.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 rounded-[20px] border border-[#e8e2d7] bg-[#faf7f2] p-6 dark:border-[#1e3328] dark:bg-[#0b120e] md:grid-cols-2 md:p-8">
            <div className="overflow-hidden rounded-2xl border border-[#e8e2d7] dark:border-[#1e3328]">
              <video
                className="aspect-video h-full w-full object-cover"
                src="/notes_ai_feature.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="AI Powered Study Tools Video Preview"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-xl text-violet-600"><HiBolt /></div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">Summarize With <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">AI</span></h3>
                  <p className="text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                    Turn any chapter into a tight revision card. Perfect for quick reviews right before your interview round.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pink-500/15 text-xl text-pink-600"><HiAcademicCap /></div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">Practice <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">AI</span> Quiz</h3>
                  <p className="text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                    Instant multiple-choice and coding questions generated directly from the notes you just finished reading.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-500/15 text-xl text-indigo-600"><HiMagnifyingGlass /></div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">Quick <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">AI</span> Read</h3>
                  <p className="text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                    Search, summarize key takeaways, and generate <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">AI</span> flashcards to master complex concepts in minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section id="blogs" className="relative overflow-hidden py-[72px]">
        <div className="pointer-events-none absolute inset-0 text-[#143825]/40 opacity-[0.35] dark:text-[#22c55e]/30" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="garden-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#garden-dot-grid)" />
          </svg>
        </div>

        <div className={`relative z-[1] mx-auto w-full max-w-[1120px] px-6`}>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-0 flex items-center gap-2.5">
                <HiNewspaper className="h-6 w-6 shrink-0 text-[#143825] dark:text-[#22c55e]" />
                <h2 className={`font-fraunces text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold tracking-[-0.02em] text-[#171717] dark:text-[#f0f4ef] m-0`}>Fresh From The Garden</h2>
              </div>
              <p className={`mt-2 max-w-[54ch] text-[1.02rem] leading-relaxed text-[#585858] dark:text-[#92a59a] mt-2`}>
                Short, opinionated tech posts and engineering discoveries gathered from the digital garden.
              </p>
            </div>
            <a href="/blog" className="inline-flex items-center gap-1 text-[0.92rem] font-semibold text-[#143825] transition hover:text-[#0d281a] dark:text-[#22c55e] dark:hover:text-[#16a34a]">
              View all blogs →
            </a>
          </div>

          <div className="flex flex-col gap-5">
            {freshBlogs && freshBlogs.length > 0 && (() => {
              const feat = freshBlogs[0];
              const title = feat.frontMatter?.title || feat.frontMatter?.name || "Untitled Post";
              const desc = feat.frontMatter?.description || feat.frontMatter?.metaContent || "Read full engineering blog post...";
              const rawTag = feat.frontMatter?.tags || feat.frontMatter?.tag || "javascript";
              const tagList = Array.isArray(rawTag) ? rawTag : rawTag.split(",").map((t) => t.trim());
              const thumb = feat.frontMatter?.thumbnail || feat.frontMatter?.profilePic || "https://i.ibb.co/8rFR7vK/ex3.jpg";
              const author = feat.frontMatter?.author || "Ashutosh Anand Tiwari";
              const dateRaw = feat.frontMatter?.date || feat.frontMatter?.publishedOn || "Recently";
              const formattedDate = formatGardenDate(dateRaw);

              return (
                <motion.article
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="grid cursor-pointer grid-cols-1 overflow-hidden rounded-[20px] border border-[#e8e2d7] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-[#1e3328] dark:bg-[#121e17] md:grid-cols-[1.1fr_1.2fr]"
                  onClick={() => router.push(`/blog/${feat.slug}`)}
                >
                  <div className="overflow-hidden">
                    <img className="h-56 w-full object-cover md:h-full" src={thumb} alt={title} loading="lazy" />
                  </div>
                  <div className="flex flex-col p-6 md:p-7">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {tagList.slice(0, 3).map((t, i) => (
                          <span key={i} className={i % 2 === 1 ? "rounded-full bg-[#143825]/10 px-2.5 py-1 text-xs font-medium text-[#143825] dark:bg-[#22c55e]/15 dark:text-[#22c55e]" : "rounded-full bg-[#f2eee5] px-2.5 py-1 text-xs font-medium text-[#585858] dark:bg-[#172a20] dark:text-[#92a59a]"}>
                            • {t.replace(/^#/, "")}
                          </span>
                        ))}
                      </div>
                      <button
                        className="grid h-9 w-9 place-items-center rounded-lg border border-[#e8e2d7] text-[#585858] dark:border-[#1e3328]"
                        title="Bookmark"
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <HiOutlineBookmark />
                      </button>
                    </div>
                    <h3 className="mb-2 font-fraunces text-[clamp(1.35rem,2.5vw,1.85rem)] font-bold text-[#171717] dark:text-[#f0f4ef]">{title}</h3>
                    <p className="mb-6 line-clamp-3 text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">{desc}</p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-sm text-[#585858] dark:text-[#92a59a]">
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-[#143825] text-xs font-bold text-white dark:bg-[#22c55e] dark:text-[#0b120e]">
                          {author.slice(0, 1)}
                        </div>
                        <span>{author} &nbsp;•&nbsp; {formattedDate}</span>
                      </div>
                      <span className="font-semibold text-[#143825] dark:text-[#22c55e]">Read Story →</span>
                    </div>
                  </div>
                </motion.article>
              );
            })()}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {freshBlogs && freshBlogs.length > 1 ? (
                freshBlogs.slice(1, 4).map((blog, idx) => {
                  const title = blog.frontMatter?.title || blog.frontMatter?.name || "Untitled Post";
                  const desc = blog.frontMatter?.description || blog.frontMatter?.metaContent || "Read full engineering blog post...";
                  const rawTag = blog.frontMatter?.tags || blog.frontMatter?.tag || "tech";
                  const tagList = Array.isArray(rawTag) ? rawTag : rawTag.split(",").map((t) => t.trim());
                  const dateRaw = blog.frontMatter?.date || blog.frontMatter?.publishedOn || "Recently";
                  const formattedDate = formatGardenDate(dateRaw);

                  return (
                    <motion.article
                      key={blog.slug || idx}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="flex min-h-[220px] cursor-pointer flex-col justify-between rounded-[20px] border border-[#e8e2d7] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:shadow-[0_16px_36px_-8px_rgba(20,56,37,0.12)] dark:border-[#1e3328] dark:bg-[#121e17]"
                      onClick={() => router.push(`/blog/${blog.slug}`)}
                    >
                      <div>
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <div className="flex flex-wrap gap-2">
                            {tagList.slice(0, 2).map((t, i) => (
                              <span key={i} className={i % 2 === 1 ? "rounded-full bg-[#143825]/10 px-2.5 py-1 text-xs font-medium text-[#143825] dark:bg-[#22c55e]/15 dark:text-[#22c55e]" : "rounded-full bg-[#f2eee5] px-2.5 py-1 text-xs font-medium text-[#585858] dark:bg-[#172a20] dark:text-[#92a59a]"}>
                                • {t.replace(/^#/, "")}
                              </span>
                            ))}
                          </div>
                          <button
                            className="grid h-8 w-8 place-items-center rounded-lg border border-[#e8e2d7] text-[#585858] dark:border-[#1e3328]"
                            title="Bookmark"
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <HiOutlineBookmark />
                          </button>
                        </div>
                        <h3 className="mb-2 font-fraunces text-xl font-bold text-[#171717] dark:text-[#f0f4ef]">{title}</h3>
                        <p className="line-clamp-3 text-sm leading-relaxed text-[#585858] dark:text-[#92a59a]">{desc}</p>
                      </div>
                      <div className="mt-5 flex items-center justify-between text-sm text-[#585858] dark:text-[#92a59a]">
                        <span>{formattedDate}</span>
                        <span className="font-semibold text-[#143825] dark:text-[#22c55e]">Read Story →</span>
                      </div>
                    </motion.article>
                  );
                })
              ) : (
                <>
                  {[
                    { tags: ["nodejs", "architecture"], title: "Namaste Node.js Architecture", desc: "Deep dive into Node.js event loop, thread pool, and non-blocking I/O." },
                    { tags: ["frontend", "systemdesign"], title: "Frontend System Design Best Practices", desc: "Building scalable web architectures with micro-frontends and caching." },
                    { tags: ["performance", "metrics"], title: "Event Loop Latency Profiling", desc: "How we diagnosed p99 latency spikes in high-throughput Node services." },
                  ].map((item) => (
                    <motion.article
                      key={item.title}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="flex min-h-[220px] cursor-pointer flex-col justify-between rounded-[20px] border border-[#e8e2d7] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:shadow-[0_16px_36px_-8px_rgba(20,56,37,0.12)] dark:border-[#1e3328] dark:bg-[#121e17]"
                      onClick={() => router.push("/blog")}
                    >
                      <div>
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#f2eee5] px-2.5 py-1 text-xs font-medium text-[#585858] dark:bg-[#172a20] dark:text-[#92a59a]">• {item.tags[0]}</span>
                            <span className="rounded-full bg-[#143825]/10 px-2.5 py-1 text-xs font-medium text-[#143825] dark:bg-[#22c55e]/15 dark:text-[#22c55e]">• {item.tags[1]}</span>
                          </div>
                          <button className="grid h-8 w-8 place-items-center rounded-lg border border-[#e8e2d7] text-[#585858] dark:border-[#1e3328]" title="Bookmark" type="button">
                            <HiOutlineBookmark />
                          </button>
                        </div>
                        <h3 className="mb-2 font-fraunces text-xl font-bold">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-[#585858] dark:text-[#92a59a]">{item.desc}</p>
                      </div>
                      <div className="mt-5 flex items-center justify-between text-sm text-[#585858] dark:text-[#92a59a]">
                        <span>Recent</span>
                        <span className="font-semibold text-[#143825] dark:text-[#22c55e]">Read Story →</span>
                      </div>
                    </motion.article>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-[72px]">
        <div className="mx-auto w-full max-w-[1120px] px-6">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-0 flex items-center gap-2.5">
                <HiChatBubbleLeftRight className="h-6 w-6 shrink-0 text-[#143825] dark:text-[#22c55e]" />
                <h2 className={`font-fraunces text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold tracking-[-0.02em] text-[#171717] dark:text-[#f0f4ef] m-0`}>Reader Feedback</h2>
              </div>
              <p className={`mt-2 max-w-[54ch] text-[1.02rem] leading-relaxed text-[#585858] dark:text-[#92a59a] mt-2`}>
                Unedited feedback from developers who studied from these notes.
              </p>
            </div>
            <a href={GARDEN_ADMIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[0.92rem] font-semibold text-[#143825] transition hover:text-[#0d281a] dark:text-[#22c55e] dark:hover:text-[#16a34a]">
              View all feedback →
            </a>
          </div>

          <div className="mb-8 overflow-hidden">
            <div className="flex w-max animate-garden-marquee gap-4 hover:[animation-play-state:paused]">
              {marqueeTestimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="flex w-[320px] shrink-0 flex-col justify-between rounded-2xl border border-[#e8e2d7] bg-white p-5 dark:border-[#1e3328] dark:bg-[#121e17]"
                >
                  <div>
                    <div className="mb-2 font-fraunces text-[2.8rem] leading-none text-[#143825] dark:text-[#22c55e]">“</div>
                    <p className="mb-4 text-[0.92rem] leading-snug text-[#171717] dark:text-[#f0f4ef]">{item.comment}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img className="h-9 w-9 rounded-full object-cover" src={item.avatar} alt={item.name} />
                    <div>
                      <strong className="block text-sm text-[#171717] dark:text-[#f0f4ef]">{item.name}</strong>
                      <span className="block text-xs text-[#585858] dark:text-[#92a59a]">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={GARDEN_ADMIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#e8e2d7] bg-white px-5 py-3 text-sm font-semibold text-[#171717] no-underline shadow-sm transition hover:border-[#143825] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
            >
              <HiChatBubbleLeftRight /> Provide a feedback
            </motion.a>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" className="py-[72px]">
        <div className="mx-auto w-full max-w-[1120px] px-6">
          <div className="mb-7">
            <div className="mb-0 flex items-center gap-2.5">
              <HiHeart className="h-6 w-6 shrink-0 text-[#c4552d]" />
              <h2 className={`font-fraunces text-[clamp(1.8rem,3.5vw,2.4rem)] font-bold tracking-[-0.02em] text-[#171717] dark:text-[#f0f4ef] m-0`}>Support The Garden</h2>
            </div>
            <p className={`mt-2 max-w-[54ch] text-[1.02rem] leading-relaxed text-[#585858] dark:text-[#92a59a] mt-2`}>
              Help keep this open-source digital garden online, fast, and 100% ad-free for every learner.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 rounded-[20px] border border-[#e8e2d7] bg-white p-6 dark:border-[#1e3328] dark:bg-[#121e17] md:grid-cols-[1.2fr_0.8fr] md:p-8">
            <div className="flex flex-col gap-7">
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500/15 text-xl text-emerald-700 dark:text-emerald-400"><HiServer /></div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">Hosting &amp; Server Infrastructure</h3>
                  <p className="text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                    Contributions directly fund high-speed CDN hosting, bandwidth, domain renewals, and database servers so the notes stay online 24/7 without ad clutter.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-500/15 text-xl text-orange-700 dark:text-orange-400"><HiUserGroup /></div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">Donations to Old Boys &amp; Students</h3>
                  <p className="text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                    Empowering old batchmates, students, and junior developers from underrepresented backgrounds with learning resources, books, and course access.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-t border-dashed border-[#e8e2d7] pt-7 dark:border-[#1e3328] md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#c4552d]/10 px-3 py-1.5 text-sm font-semibold text-[#c4552d]">
                <HiHeart /> Scan to Support Digital Garden
              </div>
              <div className="mb-4 rounded-2xl border border-[#e8e2d7] bg-white p-3 dark:border-[#1e3328]">
                <img
                  className="h-[180px] w-[180px]"
                  src={GARDEN_SUPPORT_QR}
                  alt="Topmate Payment QR Code for Digital Garden Support"
                  loading="lazy"
                />
              </div>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={GARDEN_SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-[#143825] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d281a] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
              >
                Click or Scan to Support →
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* HELP CHAI */}
      <section id="help-chai" className="pb-[72px]">
        <div className="mx-auto w-full max-w-[1120px] px-6">
          <div className="flex flex-col items-center gap-6 rounded-[20px] border border-[#e8e2d7] bg-white p-6 dark:border-[#1e3328] dark:bg-[#121e17] sm:flex-row sm:items-start sm:gap-7 sm:p-8">
            <div className="h-[120px] w-[120px] shrink-0 overflow-hidden rounded-2xl border border-[#e8e2d7] dark:border-[#1e3328]">
              <img
                className="h-full w-full object-cover"
                src={GARDEN_HELP_CHAI_IMG}
                alt="Chai the rescue dog needs help"
                loading="lazy"
              />
            </div>
            <div>
              <div className="mb-2 inline-flex rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600">
                {GARDEN_HELP_CHAI.badge}
              </div>
              <h3 className="mb-2 font-fraunces text-2xl font-bold">{GARDEN_HELP_CHAI.title}</h3>
              <p className="mb-4 max-w-[62ch] text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                {GARDEN_HELP_CHAI.body}
              </p>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={GARDEN_HELP_CHAI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-[#d63031] px-[22px] py-2.5 text-[0.88rem] font-semibold text-white no-underline shadow-[0_4px_14px_rgba(214,48,49,0.22)]"
              >
                {GARDEN_HELP_CHAI.cta}
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      <DigiGardenFooter />
    </>
  );
}

DigitalGarden.getLayout = withDigitalGardenLayout;

export default DigitalGarden;

export async function getStaticProps() {
  const testimonialsDir = path.join(
    process.cwd(),
    "src/content/testimonials"
  );

  let posts = [];
  try {
    const filenames = fs.readdirSync(testimonialsDir);
    posts = filenames.map((filename) => {
      const fileContent = fs.readFileSync(
        path.join(testimonialsDir, filename),
        "utf-8"
      );
      const { data: frontMatter, content } = matter(fileContent);
      return {
        frontMatter,
        content,
        slug: filename.replace(".md", ""),
      };
    });
  } catch (e) {
    posts = [];
  }

  // All blogs (same pool as /blog), newest-first — shuffled on client for Fresh section
  const { loadAllGardenBlogs } = await import("@/data/garden/loadBlogs");
  const blogs = loadAllGardenBlogs(process.cwd());

  return {
    props: {
      posts,
      blogs,
    },
  };
}

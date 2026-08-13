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
import { DEFAULT_NOTES_START_ROUTE } from "@/data/note/startRoutes";
import { NOTES_CONFIG } from "@/data/note/allNotes";

function getConfigRoute(titlePart) {
  return (
    NOTES_CONFIG.find((n) =>
      String(n.title).toLowerCase().includes(String(titlePart).toLowerCase())
    )?.route || DEFAULT_NOTES_START_ROUTE
  );
}

function DigitalGarden({ posts, blogs }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [shuffledBlogs, setShuffledBlogs] = useState(blogs || []);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const arr = [...blogs];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setShuffledBlogs(arr);
    }
  }, [blogs]);

  const formatGardenDate = (dateStr) => {
    if (!dateStr || dateStr === "Recently") return "Recently";
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const parts = String(dateStr).trim().split(/[-/]/);
    if (parts.length === 3) {
      let day, monthIdx, year;
      if (parts[0].length === 4) {
        year = parts[0];
        monthIdx = parseInt(parts[1], 10) - 1;
        day = parseInt(parts[2], 10);
      } else {
        const p0 = parseInt(parts[0], 10);
        const p1 = parseInt(parts[1], 10);
        const p2 = parts[2];
        year = p2.length === 2 ? `20${p2}` : p2;

        if (p0 > 12) {
          day = p0;
          monthIdx = p1 - 1;
        } else if (p1 > 12) {
          monthIdx = p0 - 1;
          day = p1;
        } else {
          day = p0;
          monthIdx = p1 - 1;
        }
      }

      if (monthIdx >= 0 && monthIdx < 12) {
        const formattedDay = String(day).padStart(2, "0");
        return `${formattedDay} ${months[monthIdx]}, ${year}`;
      }
    }

    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const formattedDay = String(d.getDate()).padStart(2, "0");
      return `${formattedDay} ${months[d.getMonth()]}, ${d.getFullYear()}`;
    }

    return dateStr;
  };

  const formatComment = (text, maxWords = 14) => {
    if (!text) return "High quality notes for fast interview revision...";
    const clean = text.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
    const words = clean.split(" ");
    if (words.length <= maxWords) {
      const joined = words.join(" ");
      return joined.endsWith("...") ? joined : `${joined}...`;
    }
    return `${words.slice(0, maxWords).join(" ")}...`;
  };

  const userTestimonials = posts.map((post) => ({
    name: post.frontMatter?.name || post?.frontMatter?.title || "Anonymous Developer",
    role: post.role || post.frontMatter?.role || "Software Engineer",
    comment: formatComment(post.content),
    avatar:
      removePublicFromPath(post.frontMatter?.profilePic) ||
      removePublicFromPath(post?.profilePic) ||
      DEFAULT_AVATAR,
  }));

  const fallbackTestimonials = [
    {
      name: "Rahul Sharma",
      role: "Final-year CS student, Pune",
      comment: formatComment(
        "I watched the whole course last year and remembered none of it. Two evenings with these notes and the event loop finally clicked!"
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      name: "Ananya Mehta",
      role: "Backend Engineer, Fintech",
      comment: formatComment(
        "I keep the Node internals chapter open in a tab at work. It's the only reference that explains backpressure without a wall of text."
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
    },
    {
      name: "Sneha Verma",
      role: "SDE-1, Bengaluru",
      comment: formatComment(
        "Printed the machine coding season, annotated it on the train, cleared two rounds the same week. Zero rupees spent."
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    },
    {
      name: "Daniel Koch",
      role: "Contributor & SRE, Berlin",
      comment: formatComment(
        "Submitted a fix to a system design note on a Sunday, merged by Monday. It genuinely feels maintained and active."
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    },
    {
      name: "Manas Tiwari",
      role: "Club Lead, NIT Trichy",
      comment: formatComment(
        "I teach a college club and we run sessions straight off these chapters. The order of explanation is top tier."
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manas",
    },
    {
      name: "Farah Ali",
      role: "Full-stack Developer, Dubai",
      comment: formatComment(
        "Every paid interview course I bought is gathering dust. This digital garden is free and far better organized."
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farah",
    },
  ];

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
              href={DEFAULT_NOTES_START_ROUTE}
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
            <div className="flex items-center gap-3.5 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 to-teal-500/5 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:from-emerald-500/20">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-600/15 text-xl text-emerald-700 dark:text-emerald-400"><HiBookOpen /></div>
              <div className="text-left">
                <div className="font-fraunces text-2xl font-bold">120+</div>
                <div className="text-sm text-[#585858] dark:text-[#92a59a]">Free chapters</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5 rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/15 to-amber-500/5 p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-600/15 text-xl text-orange-700 dark:text-orange-400"><HiFolderOpen /></div>
              <div className="text-left">
                <div className="font-fraunces text-2xl font-bold">14</div>
                <div className="text-sm text-[#585858] dark:text-[#92a59a]">Course collections</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/15 to-amber-500/5 p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-yellow-600/15 text-xl text-yellow-700 dark:text-yellow-400"><HiStar /></div>
              <div className="text-left">
                <div className="font-fraunces text-2xl font-bold">30+</div>
                <div className="text-sm text-[#585858] dark:text-[#92a59a]">GitHub stars</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/5 p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-600/15 text-xl text-violet-700 dark:text-violet-400"><HiUsers /></div>
              <div className="text-left">
                <div className="font-fraunces text-2xl font-bold">10+</div>
                <div className="text-sm text-[#585858] dark:text-[#92a59a]">Contributors</div>
              </div>
            </div>
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
                <span className="inline-flex items-center gap-2.5 px-7 font-ibm-mono text-[0.82rem] font-bold uppercase tracking-[0.04em] text-[#1a1a1a]">120+ Chapters · Free of Cost</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a1a1a]/55" aria-hidden="true" />
                <span className="inline-flex items-center gap-2.5 px-7 font-ibm-mono text-[0.82rem] font-bold uppercase tracking-[0.04em] text-[#1a1a1a]">Open Source Digital Notes · aka Digital Garden</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a1a1a]/55" aria-hidden="true" />
                <span className="inline-flex items-center gap-2.5 px-7 font-ibm-mono text-[0.82rem] font-bold uppercase tracking-[0.04em] text-[#1a1a1a]">Curated from Handwritten Notes</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a1a1a]/55" aria-hidden="true" />
                <span className="inline-flex items-center gap-2.5 px-7 font-ibm-mono text-[0.82rem] font-bold uppercase tracking-[0.04em] text-[#1a1a1a]">Interview Ready · Season by Season</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a1a1a]/55" aria-hidden="true" />
                <span className="inline-flex items-center gap-2.5 px-7 font-ibm-mono text-[0.82rem] font-bold uppercase tracking-[0.04em] text-[#1a1a1a]">Community Driven Corrections</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a1a1a]/55" aria-hidden="true" />
                <span className="inline-flex items-center gap-2.5 px-7 font-ibm-mono text-[0.82rem] font-bold uppercase tracking-[0.04em] text-[#1a1a1a]">100% Ad-Free Learning</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a1a1a]/55" aria-hidden="true" />
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
            <motion.article
              whileHover={{ scale: 1.008 }}
              transition={{ duration: 0.2 }}
              className="group relative grid cursor-pointer grid-cols-1 overflow-hidden rounded-[20px] border border-[#e8e2d7] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:shadow-[0_16px_36px_-8px_rgba(20,56,37,0.12)] dark:border-[#1e3328] dark:bg-[#121e17] md:grid-cols-[260px_1fr]"
              onClick={() => router.push(getConfigRoute("Namaste Node"))}
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
                  src="https://i.ibb.co/2hq8tjW/akshays-banner.jpg"
                  alt="Namaste Node.js by Akshay Saini"
                  loading="lazy"
                />
              </div>

              <div className="relative z-[1] flex flex-col justify-center p-6 md:p-7">
                <h3 className="mb-2 font-fraunces text-[clamp(1.4rem,2.8vw,1.85rem)] font-extrabold uppercase tracking-wide text-[#171717] [text-shadow:0_1px_0_rgba(0,0,0,0.04)] dark:text-[#f0f4ef]">
                  Namaste Node.js
                </h3>
                <p className="mb-3 text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                  Execution context, V8 Engine, libuv, Event Loop, Async I/O, Thread Pool &amp; HTTP Server creation explained with clean diagrams.
                </p>
                <div className="mb-5 text-xs text-[#585858] dark:text-[#92a59a]">
                  NamasteDev &nbsp;•&nbsp; Season 01 &amp; 02 &nbsp;•&nbsp; Akshay Saini
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#143825] text-sm font-bold text-white dark:bg-[#22c55e] dark:text-[#0b120e]">
                      AS
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-[#171717] dark:text-[#f0f4ef]">Akshay Saini</span>
                      <span className="text-xs text-[#585858] dark:text-[#92a59a]">NamasteDev</span>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center rounded-xl bg-[#143825] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d281a] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
                    href={getConfigRoute("Namaste Node")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Digital Notes →
                  </motion.a>
                </div>
              </div>
            </motion.article>

            <motion.article
              whileHover={{ scale: 1.008 }}
              transition={{ duration: 0.2 }}
              className="group relative grid cursor-pointer grid-cols-1 overflow-hidden rounded-[20px] border border-[#e8e2d7] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:shadow-[0_16px_36px_-8px_rgba(20,56,37,0.12)] dark:border-[#1e3328] dark:bg-[#121e17] md:grid-cols-[260px_1fr]"
              onClick={() => router.push(getConfigRoute("Frontend System"))}
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
                  src="https://i.ibb.co/2hq8tjW/akshays-banner.jpg"
                  alt="Frontend System Design by Akshay Saini"
                  loading="lazy"
                />
              </div>

              <div className="relative z-[1] flex flex-col justify-center p-6 md:p-7">
                <h3 className="mb-2 font-fraunces text-[clamp(1.4rem,2.8vw,1.85rem)] font-extrabold uppercase tracking-wide text-[#171717] [text-shadow:0_1px_0_rgba(0,0,0,0.04)] dark:text-[#f0f4ef]">
                  Frontend System Design
                </h3>
                <p className="mb-3 text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                  WebSockets, Long Polling, GraphQL vs REST, HTTP headers &amp; Config-Driven UI architectures for staff-level interviews.
                </p>
                <div className="mb-5 text-xs text-[#585858] dark:text-[#92a59a]">
                  Masterclass &nbsp;•&nbsp; System Design &nbsp;•&nbsp; 12 Chapters
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#143825] text-sm font-bold text-white dark:bg-[#22c55e] dark:text-[#0b120e]">
                      AS
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-[#171717] dark:text-[#f0f4ef]">Akshay Saini</span>
                      <span className="text-xs text-[#585858] dark:text-[#92a59a]">NamasteDev</span>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center rounded-xl bg-[#143825] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d281a] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
                    href={getConfigRoute("Frontend System")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Digital Notes →
                  </motion.a>
                </div>
              </div>
            </motion.article>

            <motion.article
              whileHover={{ scale: 1.008 }}
              transition={{ duration: 0.2 }}
              className="group relative grid cursor-pointer grid-cols-1 overflow-hidden rounded-[20px] border border-[#e8e2d7] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:shadow-[0_16px_36px_-8px_rgba(20,56,37,0.12)] dark:border-[#1e3328] dark:bg-[#121e17] md:grid-cols-[260px_1fr]"
              onClick={() => router.push(getConfigRoute("ProCodrr"))}
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
                  src="https://tagmango.com/publicassets/-backend-with-nodejs-1-f59defad2193f9e9223bfa2a3ad3ac47.png"
                  alt="Backend with Node.js by ProCodrr"
                  loading="lazy"
                />
              </div>

              <div className="relative z-[1] flex flex-col justify-center p-6 md:p-7">
                <h3 className="mb-2 font-fraunces text-[clamp(1.4rem,2.8vw,1.85rem)] font-extrabold uppercase tracking-wide text-[#171717] [text-shadow:0_1px_0_rgba(0,0,0,0.04)] dark:text-[#f0f4ef]">
                  Backend with Node.js
                </h3>
                <p className="mb-3 text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                  OS Processes, Threads, Concurrency, Parallelism, Environment Variables, CLI vs GUI &amp; File permissions in simple Hinglish.
                </p>
                <div className="mb-5 text-xs text-[#585858] dark:text-[#92a59a]">
                  ProCodrr &nbsp;•&nbsp; Backend Node.js &nbsp;•&nbsp; Hinglish Notes
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#143825] text-sm font-bold text-white dark:bg-[#22c55e] dark:text-[#0b120e]">
                      PC
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-[#171717] dark:text-[#f0f4ef]">Anurag Singh</span>
                      <span className="text-xs text-[#585858] dark:text-[#92a59a]">ProCodrr</span>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center rounded-xl bg-[#143825] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d281a] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
                    href={getConfigRoute("ProCodrr")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Digital Notes →
                  </motion.a>
                </div>
              </div>
            </motion.article>

            <motion.article
              whileHover={{ scale: 1.008 }}
              transition={{ duration: 0.2 }}
              className="group relative grid cursor-pointer grid-cols-1 overflow-hidden rounded-[20px] border border-[#e8e2d7] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:shadow-[0_16px_36px_-8px_rgba(20,56,37,0.12)] dark:border-[#1e3328] dark:bg-[#121e17] md:grid-cols-[260px_1fr]"
              onClick={() => router.push(getConfigRoute("JS Quick"))}
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
                  src="https://i.ibb.co/x7kYDW1/snippets.jpg"
                  alt="JavaScript Snippets & YDKJS Notes"
                  loading="lazy"
                />
              </div>

              <div className="relative z-[1] flex flex-col justify-center p-6 md:p-7">
                <h3 className="mb-2 font-fraunces text-[clamp(1.4rem,2.8vw,1.85rem)] font-extrabold uppercase tracking-wide text-[#171717] [text-shadow:0_1px_0_rgba(0,0,0,0.04)] dark:text-[#f0f4ef]">
                  JavaScript Snippets &amp; Book Notes
                </h3>
                <p className="mb-3 text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                  100+ tricky JS interview snippets and simplified book notes on Kyle Simpson's You Don't Know JS series.
                </p>
                <div className="mb-5 text-xs text-[#585858] dark:text-[#92a59a]">
                  Curated Notes &nbsp;•&nbsp; 100+ Snippets &nbsp;•&nbsp; YDKJS
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#143825] text-sm font-bold text-white dark:bg-[#22c55e] dark:text-[#0b120e]">
                      AT
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-[#171717] dark:text-[#f0f4ef]">Ashutosh Anand Tiwari</span>
                      <span className="text-xs text-[#585858] dark:text-[#92a59a]">heyashu.in</span>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center rounded-xl bg-[#143825] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d281a] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
                    href={getConfigRoute("JS Quick")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Digital Notes →
                  </motion.a>
                </div>
              </div>
            </motion.article>
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
            {shuffledBlogs && shuffledBlogs.length > 0 && (() => {
              const feat = shuffledBlogs[0];
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
              {shuffledBlogs && shuffledBlogs.length > 1 ? (
                shuffledBlogs.slice(1, 4).map((blog, idx) => {
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
            <a href="#testimonials" className="inline-flex items-center gap-1 text-[0.92rem] font-semibold text-[#143825] transition hover:text-[#0d281a] dark:text-[#22c55e] dark:hover:text-[#16a34a]">
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
              href="https://github.com/ashumsd7/heyashu/issues/new"
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
                  src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://topmate.io/aat/1148709/pay"
                  alt="Topmate Payment QR Code for Digital Garden Support"
                  loading="lazy"
                />
              </div>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://topmate.io/aat/1148709/pay"
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
                src="https://help-chai.netlify.app/chai_hero.png"
                alt="Chai the rescue dog needs help"
                loading="lazy"
              />
            </div>
            <div>
              <div className="mb-2 inline-flex rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600">
                🐾 Urgent Rescue Cause
              </div>
              <h3 className="mb-2 font-fraunces text-2xl font-bold">Help Chai Heal &amp; Recover</h3>
              <p className="mb-4 max-w-[62ch] text-[0.95rem] leading-relaxed text-[#585858] dark:text-[#92a59a]">
                Chai is a gentle 1.5-year-old rescue mother who suffered severe fractures in both hind legs in Ayodhya. She needs 24x7 nursing observation &amp; care in Lucknow. A small contribution can save her life and help her heal.
              </p>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://help-chai.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-[#d63031] px-[22px] py-2.5 text-[0.88rem] font-semibold text-white no-underline shadow-[0_4px_14px_rgba(214,48,49,0.22)]"
              >
                Donate for Chai's Recovery →
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
  const blogDir = path.join(process.cwd(), "src/content/blog");

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

  let blogs = [];
  try {
    blogs = fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".md"))
      .map((filename) => {
        const fileContent = fs.readFileSync(
          path.join(blogDir, filename),
          "utf-8"
        );
        const { data: frontMatter } = matter(fileContent);
        return {
          frontMatter,
          slug: filename.replace(".md", ""),
        };
      })
      .sort((a, b) => {
        const da = a.frontMatter?.publishedOn || a.frontMatter?.date || "";
        const db = b.frontMatter?.publishedOn || b.frontMatter?.date || "";
        return db.localeCompare(da);
      });
  } catch (e) {
    blogs = [];
  }

  return {
    props: {
      posts,
      blogs,
    },
  };
}

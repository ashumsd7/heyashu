import {
  AKSHAY_SAINI,
  BACKEND,
  FRONTEND,
  JAVASCRIPT,
  NEWBIE,
  NODEJS,
} from "../blog";

// Tag aliases matching NOTES_CONFIG
export { BACKEND, NODEJS, AKSHAY_SAINI, FRONTEND, NEWBIE, JAVASCRIPT };

/**
 * Single source of truth for notes collections.
 * Used by:
 * - /digital-garden (top featured cards, less info)
 * - /digital-garden/notes (full index cards)
 * - Start Reading / Read Digital Notes → startRoute (first chapter)
 *
 * Dynamic chapter markdown still lives under src/content/*.
 */

export const AKSHAY_SAINI_AVATAR="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLsta1rjvtSLTy5cqxWHC0b05h8ZoHejpHwWmZ-yPxV7jkotf0G9PVMIWl&s=10"
export const ANURAG_SINGH_AVATAR="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhdpdiLTqbrt6YF5rbegaFIIkd0r6C7QXutI9hi1KEJw&s=10"
export const ASHUTOSH_ANAND_TIWARI_AVATAR="https://heyashu.in/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F40313523%3Fv%3D4&w=48&q=75"
export const NOTES_CONFIG = [
  {
    id: "namaste-ai",
    title: "Namaste AI Notes",
    homeTitle: "Namaste AI Notes",
    by: "Akshay Saini",
    authorDisplay: "Akshay Saini Sir",
    authorInitials: "AS",
    authorOrg: "NamasteDev",
    authorAvatar: AKSHAY_SAINI_AVATAR,
    sourceName: "Namaste Dev",
    sourceLink: "https://namastedev.com/",
    publishedOn: "Start Today",
    startedOn: new Date().toISOString().slice(0, 10),
    endedOn: null,
    lastUpdated: new Date().toISOString().slice(0, 10),
    completedPercent: 0,
    chapterCount: 0,
    thumbnailUrl: "https://i.ibb.co/PZBv2cdX/namaste-ai-1-1.jpg",
    bannerUrl: "https://i.ibb.co/PZBv2cdX/namaste-ai-1-1.jpg",
    isProgress: true,
    isComingSoon: false,
    isAlmostDone: false,
    extraChipText: "Daily Updated",
    tags: [FRONTEND, JAVASCRIPT, NEWBIE],
    githubLink: "#",
    route: "/digital-garden/notes/namaste-ai-notes/welcome-to-namaste-ai-notes",
    startRoute: "/digital-garden/notes/namaste-ai-notes/welcome-to-namaste-ai-notes",
    shortDesc:
      "Kickstart your journey into AI with Namaste AI – the latest, daily-updated course blending hands-on notes and crystal-clear learning, directly from Akshay Saini’s ecosystem.",
    homeDesc:
      "Daily updated, in-progress AI course covering fundamentals, modern techniques, and real-world applications — designed for all, from complete beginners to advanced learners.",
    homeMeta: "NamasteDev · Namaste AI · Akshay Saini",
    featuredOnHome: true,
    homeOrder: 1,
    isNew: true,
  },
  {
    id: "ai-clopedia",
    title: "AI-clopedia: AI ka Gyan",
    homeTitle: "AI-clopedia: AI ka Gyan",
    by: "Ashutosh Anand Tiwari",
    authorDisplay: "Ashutosh Anand Tiwari",
    authorInitials: "AT",
    authorOrg: "Curated",
    authorAvatar: ASHUTOSH_ANAND_TIWARI_AVATAR,
    sourceName: "Curated · SiffPlatform",
    sourceLink: "#",
    publishedOn: "Coming Soon",
    startedOn: null,
    endedOn: null,
    lastUpdated: null,
    completedPercent: 0,
    chapterCount: 0,
    thumbnailUrl: "https://i.ibb.co/kg1Xt5mx/ai-ka-gyan.jpg",
    bannerUrl: "https://i.ibb.co/kg1Xt5mx/ai-ka-gyan.jpg",
    isProgress: false,
    isComingSoon: true,
    isAlmostDone: false,
    extraChipText: "Coming Soon",
    tags: [
      "AI",
      "GenAI",
      "Python",
      "JavaScript",
      NEWBIE,
      FRONTEND,
      BACKEND,
      "basics",
      "examples",
      "curated",
    ],
    githubLink: "#",
    route: "/digital-garden/notes/ai-clopedia/introduction",
    startRoute: "/digital-garden/notes/ai-clopedia/introduction",
    shortDesc:
      "AI-clopedia: Basics and practical examples of AI & Gen-AI—curated and simplified explanations, hands-on code in Python and JavaScript. Your beginner’s encyclopedia to applied AI.",
    homeDesc:
      "A beginner-friendly, curated resource for learning basic concepts of Artificial Intelligence and Generative AI with example code in Python and JavaScript. Perfect for understanding all the essentials for real-world application.",
    homeMeta: "AI · GenAI · Python · JS · Curated by Ashutosh",
    featuredOnHome: true,
    homeOrder: 2,
    isNew: true,
  },
  {
    id: "front-end-design-system",
    title: "Frontend System Design",
    homeTitle: "Frontend System Design Notes",
    by: "Akshay Saini, Chirag Goel",
    authorDisplay: "Akshay Saini Sir",
    authorInitials: "AS",
    authorOrg: "NamasteDev",
    authorAvatar: AKSHAY_SAINI_AVATAR,
    sourceName: "NamasteDev",
    sourceLink: "https://namastedev.com/learn/namaste-frontend-system-design",
    publishedOn: "22 Dec 2024",
    startedOn: "2024-12-22",
    endedOn: null,
    lastUpdated: "2025-03-01",
    completedPercent: 90,
    chapterCount: 12,
    thumbnailUrl: "https://i.ibb.co/yF03rTBv/namaste-fsd-1-1.jpg",
    bannerUrl: "https://i.ibb.co/yF03rTBv/namaste-fsd-1-1.jpg",
    isProgress: false,
    isComingSoon: false,
    isAlmostDone: true,
    extraChipText: "90% Completed",
    tags: [FRONTEND, NEWBIE, "WEB"],
    githubLink: "#",
    route: "/digital-garden/notes/front-end-design-system/how-the-web-works",
    startRoute: "/digital-garden/notes/front-end-design-system/how-the-web-works",
    shortDesc:
      "Dive into our digital garden for frontend system design notes — protocols, performance, and interview-ready HLD/LLD.",
    homeDesc:
      "WebSockets, Long Polling, GraphQL vs REST, HTTP headers & Config-Driven UI architectures for staff-level interviews.",
    homeMeta: "Masterclass · System Design · 12 Chapters",
    featuredOnHome: true,
    homeOrder: 3,
    isNew: false,
  },
  {
    id: "namaste-node-js",
    title: "Namaste Node JS Notes",
    homeTitle: "Namaste Node.js Notes",
    by: "Akshay Saini",
    authorDisplay: "Akshay Saini Sir",
    authorInitials: "AS",
    authorOrg: "NamasteDev",
    authorAvatar: AKSHAY_SAINI_AVATAR,
    sourceName: "Namaste Dev",
    sourceLink: "https://namastedev.com/",
    publishedOn: "17 Aug 2024",
    startedOn: "2024-08-17",
    endedOn: null,
    lastUpdated: "2024-12-01",
    completedPercent: 70,
    chapterCount: 17,
    thumbnailUrl: "https://i.ibb.co/PsGRmP9Z/namaste-node-js-1-1.jpg",
    bannerUrl: "https://i.ibb.co/PsGRmP9Z/namaste-node-js-1-1.jpg",
    isProgress: true,
    isComingSoon: false,
    isAlmostDone: false,
    extraChipText: "Season 1 Completed",
    tags: [BACKEND, NODEJS, AKSHAY_SAINI],
    githubLink: "#",
    route: "/digital-garden/notes/namaste-node-js/prerequisite",
    startRoute: "/digital-garden/notes/namaste-node-js/prerequisite",
    shortDesc:
      "Get the best-explained notes for each chapter of the Namaste Node.js course by Akshay Saini. These notes are written by Ashutosh and can be edited on GitHub.",
    homeDesc:
      "Execution context, V8 Engine, libuv, Event Loop, Async I/O, Thread Pool & HTTP Server creation explained with clean diagrams.",
    homeMeta: "NamasteDev · Season 01 & 02 · Akshay Saini",
    featuredOnHome: true,
    homeOrder: 4,
    isNew: false,
  },
  {
    id: "javascript-snippets",
    title: "JS Quick Snippets",
    homeTitle: "JavaScript Snippets ",
    by: "Ashutosh Anand Tiwari",
    authorDisplay: "Ashutosh Anand Tiwari",
    authorInitials: "AT",
    authorOrg: "heyashu.in",
    authorAvatar: ASHUTOSH_ANAND_TIWARI_AVATAR,
    sourceName: "Google..etc.. ",
    sourceLink: "https://google.com/",
    publishedOn: "21 Aug 2024",
    startedOn: "2024-08-21",
    endedOn: null,
    lastUpdated: "2025-02-01",
    completedPercent: 85,
    chapterCount: 10,
    thumbnailUrl: "https://i.ibb.co/ds408dm1/js-quik-snippets-4-3.png",
    bannerUrl: "https://i.ibb.co/ds408dm1/js-quik-snippets-4-3.png",
    isProgress: true,
    isComingSoon: false,
    isAlmostDone: false,
    extraChipText: "10+ Snippets Added",
    tags: [FRONTEND, NEWBIE, JAVASCRIPT],
    githubLink: "#",
    route: "/digital-garden/notes/javascript-snippets/data-types-in-javascript",
    startRoute:
      "/digital-garden/notes/javascript-snippets/data-types-in-javascript",
    shortDesc:
      "Dive into our digital garden for 100+ JavaScript code snippets—perfect for interview prep or brushing up on your skills!",
    homeDesc:
      "100+ tricky JS interview snippets and simplified book notes on Kyle Simpson's You Don't Know JS series.",
    homeMeta: "Curated Notes · 100+ Snippets · YDKJS",
    featuredOnHome: false,
    homeOrder: 5,
    isNew: false,
  },
  {
    id: "procodrr-nodejs",
    title: "ProCodrr | NodeJs",
    homeTitle: "Backend with Node.js",
    by: "ProCodrr | Anurag Singh",
    authorDisplay: "Anurag Singh Sir",
    authorInitials: "PC",
    authorOrg: "ProCodrr",
    authorAvatar: ANURAG_SINGH_AVATAR,
    sourceName: "ProCodrr",
    sourceLink:
      "https://app.procodrr.com/web/checkout/66c86939c0a286ccc32c0d8b",
    publishedOn: "1 Sep 2024",
    startedOn: "2024-09-01",
    endedOn: null,
    lastUpdated: "2025-01-15",
    completedPercent: 55,
    chapterCount: 22,
    thumbnailUrl: "https://i.ibb.co/8Dws7shj/node-js-procdrr-1-1.jpg",
    bannerUrl: "https://i.ibb.co/8Dws7shj/node-js-procdrr-1-1.jpg",
    isProgress: true,
    isComingSoon: false,
    isAlmostDone: false,
    extraChipText: "In Progress",
    tags: ["nodejs", "procdrr", NEWBIE, "hindi"],
    githubLink: "#",
    route:
      "/digital-garden/notes/backend-with-nodejs-by-procoderr-notes/e1-welcome",
    startRoute:
      "/digital-garden/notes/backend-with-nodejs-by-procoderr-notes/e1-welcome",
    shortDesc:
      "(HINDI | HINGLISH) Get the best-explained notes for each chapter of the Procdrr Node.js course by Anurag Singh.",
    homeDesc:
      "OS Processes, Threads, Concurrency, Parallelism, Environment Variables, CLI vs GUI & File permissions in simple Hinglish.",
    homeMeta: "ProCodrr · Backend Node.js · Hinglish Notes",
    featuredOnHome: true,
    homeOrder: 6,
    isNew: false,
  },
  // ---- ADD: Namaste DSA Notes after procodrr-nodejs ----
  {
    id: "namaste-dsa",
    title: "Namaste DSA Notes",
    homeTitle: "Namaste DSA Notes",
    by: "Akshay Saini",
    authorDisplay: "Akshay Saini Sir",
    authorInitials: "AS",
    authorOrg: "NamasteDev",
    authorAvatar: AKSHAY_SAINI_AVATAR,
    sourceName: "Namaste Dev",
    sourceLink: "https://namastedev.com/",
    publishedOn: "Coming Soon",
    startedOn: null,
    endedOn: null,
    lastUpdated: null,
    completedPercent: 0,
    chapterCount: 0,
    thumbnailUrl: "https://i.ibb.co/1fWgxS0F/namaste-dsa-1-1.jpg",
    bannerUrl: "https://i.ibb.co/1fWgxS0F/namaste-dsa-1-1.jpg",
    isProgress: false,
    isComingSoon: true,
    isAlmostDone: false,
    extraChipText: "Not Started",
    tags: ["DSA", "data structures", "algorithms", "prep", NEWBIE, AKSHAY_SAINI],
    githubLink: "#",
    route: "/digital-garden/notes/namaste-dsa/welcome",
    startRoute: "/digital-garden/notes/namaste-dsa/welcome",
    shortDesc:
      "Namaste DSA: The highly awaited DSA notes and structured learning roadmap by Akshay Saini Sir. Your new destination for Data Structures & Algorithms essentials, interview prep, cheat sheets and more.",
    homeDesc:
      "All-in-one place for absolute beginner to advanced DSA (Data Structures & Algorithms) — curated explanations, real-world examples, diagrams, and problem sets from the NamasteDev ecosystem. Learn with clarity and catch every insight directly from Akshay Saini’s innovative approach.",
    homeMeta: "NamasteDev · DSA · Akshay Saini · Coming Soon",
    featuredOnHome: true,
    homeOrder: 6.5,
    isNew: true,
  },
  // ---- END Namaste DSA Notes ----
  {
    id: "ydkjs",
    title: "You dont know JS",
    homeTitle: "You Don't Know JS",
    by: "Notes: By Ashutosh Anand Tiwari",
    authorDisplay: "Ashutosh Anand Tiwari",
    authorInitials: "AT",
    authorOrg: "heyashu.in",
    authorAvatar: ASHUTOSH_ANAND_TIWARI_AVATAR,
    sourceName: "Book ",
    sourceLink: "https://me.getify.com/",
    publishedOn: "29 Dec 2024",
    startedOn: "2024-12-29",
    endedOn: null,
    lastUpdated: "2025-04-01",
    completedPercent: 40,
    chapterCount: 17,
    thumbnailUrl: "https://i.ibb.co/8gktfjjD/ydkjs-4-3.png",
    bannerUrl: "https://i.ibb.co/8gktfjjD/ydkjs-4-3.png",
    isProgress: true,
    isComingSoon: false,
    isAlmostDone: false,
    extraChipText: "4 Chapters Completed",
    tags: [FRONTEND, "book", "js-basics"],
    githubLink: "#",
    route: "/digital-garden/notes/ydkjs/e1-into-programming",
    startRoute: "/digital-garden/notes/ydkjs/e1-into-programming",
    shortDesc:
      "Comprehensive notes covering JavaScript fundamentals including scope, closures, this keyword, objects, prototypes, types, and coercion from the YDKJS series.",
    homeDesc:
      "Scope, closures, this, objects, prototypes, types & coercion — distilled from Kyle Simpson's YDKJS.",
    homeMeta: "Book Notes · YDKJS · In Progress",
    featuredOnHome: false,
    homeOrder: 7,
    isNew: false,
  },
];

/** @deprecated use NOTES_CONFIG — kept for existing imports */
export const NOTES_CARD_DATA = NOTES_CONFIG;

/** First chapter URL for Start Reading / home CTAs. */
export function getNotesStartRoute(noteOrRoute) {
  if (typeof noteOrRoute === "string") return noteOrRoute;
  return (
    noteOrRoute?.startRoute ||
    noteOrRoute?.route ||
    "/digital-garden/notes"
  );
}

/** Featured collections for /digital-garden — `featuredOnHome: true` (incl. coming soon). */
export function getHomeFeaturedNotes() {
  return [...NOTES_CONFIG]
    .filter((n) => n.featuredOnHome === true)
    .sort((a, b) => (a.homeOrder || 99) - (b.homeOrder || 99));
}

/** All notes for /digital-garden/notes index (incl. coming soon). */
export function getNotesIndexList() {
  return [...NOTES_CONFIG].sort(
    (a, b) => (a.homeOrder || 99) - (b.homeOrder || 99)
  );
}

/** Status chips from NOTES_CONFIG flags (home + notes index). */
export function getNoteStatusChips(note = {}) {
  const chips = [];
  const labels = new Set();

  const add = (key, label, tone) => {
    const normalized = label.trim().toLowerCase();
    if (labels.has(normalized)) return;
    labels.add(normalized);
    chips.push({ key, label, tone });
  };

  if (note.isComingSoon) add("soon", "Coming Soon", "soon");
  if (note.isProgress) add("progress", "In Progress", "progress");
  if (note.isAlmostDone) add("almost", "Almost Done", "almost");

  if (note.extraChipText) {
    const extra = String(note.extraChipText).trim();
    // Skip if extraChipText repeats a status label (e.g. "In Progress" + isProgress)
    if (!labels.has(extra.toLowerCase())) {
      add("extra", extra, "neutral");
    }
  }

  return chips;
}

export function noteIsNew(note = {}) {
  return !!(note.isNew ?? note.inNew);
}

export const NOTE_STATUS_CHIP_TONES = {
  soon:
    "rounded-full border border-slate-400/35 bg-slate-500/15 text-slate-700 dark:text-slate-300",
  progress:
    "rounded-full border border-amber-600 bg-amber-400 text-black shadow-sm dark:border-amber-300 dark:bg-amber-600 dark:text-white",
  almost:
    "rounded-full border border-emerald-700/50 bg-emerald-600 text-white shadow-sm dark:border-emerald-400/60 dark:bg-emerald-500 dark:text-[#0b120e]",
  neutral:
    "rounded-full border border-[#e8e2d7] bg-[#f2eee5] text-[#585858] dark:border-[#1e3328] dark:bg-[#172a20] dark:text-[#92a59a]",
};

/** Default marketing entry into the notes reader. */
export const DEFAULT_NOTES_START_ROUTE =
  getNotesStartRoute(
    NOTES_CONFIG.find((n) => !n.isComingSoon && (n.startRoute || n.route))
  ) || "/digital-garden/notes/namaste-node-js/prerequisite";

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

export const NOTES_CONFIG = [
  {
    title: "Namaste Node JS",
    by: "Akshay Saini",
    sourceName: "Namaste Dev",
    sourceLink: "https://namastedev.com/",
    publishedOn: "17 Aug 2024",
    thumbnailUrl: "https://i.ibb.co/td4c8w0/namaste-node-js.png",
    isProgress: true,
    isComingSoon: false,
    isAlmostDone: false,
    extraChipText: "Season 1 Completed",
    tags: [BACKEND, NODEJS, AKSHAY_SAINI],
    githubLink: "#",
    route: "/digital-garden/notes/namaste-node-js/prerequisite",
    shortDesc:
      "Get the best-explained notes for each chapter of the Namaste Node.js course by Akshay Saini. These notes are written by Ashutosh and can be edited on GitHub.",
  },
  {
    title: "Frontend System Design",
    by: "Akshay Sain, Chirag Goel",
    sourceName: "NamasteDev",
    sourceLink: "https://namastedev.com/learn/namaste-frontend-system-design",
    publishedOn: "22 Dec 2024",
    thumbnailUrl: "https://i.ibb.co/td4c8w0/namaste-node-js.png",
    isProgress: false,
    isComingSoon: false,
    isAlmostDone: true,
    extraChipText: "90% Completed",
    tags: [FRONTEND, NEWBIE, "WEB"],
    githubLink: "#",
    route: "/digital-garden/notes/front-end-design-system/how-the-web-works",
    shortDesc:
      "Dive into our digital garden for 100+ JavaScript code snippets—perfect for interview prep or brushing up on your skills! 🚀",
  },
  {
    title: "You dont know JS",
    by: "Notes: By Ashutosh Anand Tiwari",
    sourceName: "Book ",
    sourceLink: "https://me.getify.com/",
    lastUpdated: "",
    publishedOn: "29 Dec 2024",
    thumbnailUrl: "https://i.ibb.co/td4c8w0/namaste-node-js.png",
    isProgress: true,
    isComingSoon: false,
    extraChipText: "4 Chapters Completed",
    tags: [FRONTEND, "book", "js-basics"],
    githubLink: "#",
    route: "/digital-garden/notes/ydkjs/e1-into-programming",
    shortDesc:
      "Comprehensive notes covering JavaScript fundamentals including scope, closures, this keyword, objects, prototypes, types, and coercion from the YDKJS series.",
  },
  {
    title: "ProCodrr | NodeJs",
    by: "ProCodrr | Anurag Singh",
    sourceName: "ProCodrr",
    sourceLink:
      "https://app.procodrr.com/web/checkout/66c86939c0a286ccc32c0d8b",
    publishedOn: "1 Sep 2024",
    thumbnailUrl: "https://i.ibb.co/td4c8w0/namaste-node-js.png",
    isProgress: true,
    isComingSoon: false,
    extraChipText: "",
    tags: ["nodejs", "procdrr", NEWBIE, "hindi"],
    githubLink: "#",
    route:
      "/digital-garden/notes/backend-with-nodejs-by-procoderr-notes/e1-welcome",
    shortDesc:
      "(HINDI | HINGLISH) Get the best-explained notes for each chapter of the Procdrr Node.js course by Anurag Singh.",
  },
  {
    title: "JS Quick Snippets",
    by: "Ashutosh Anand Tiwari",
    sourceName: "Google..etc.. ",
    sourceLink: "https://google.com/",
    lastUpdated: "",
    publishedOn: "21 Aug 2024",
    thumbnailUrl: "https://i.ibb.co/td4c8w0/namaste-node-js.png",
    isProgress: false,
    isComingSoon: false,
    isAlmostDone: true,
    extraChipText: "10+ Snippets Added",
    tags: [FRONTEND, NEWBIE, JAVASCRIPT],
    githubLink: "#",
    route: "/digital-garden/notes/javascript-snippets/data-types-in-javascript",
    shortDesc:
      " Dive into our digital garden for 100+ JavaScript code snippets—perfect for interview prep or brushing up on your skills!  🚀",
  },
];

/** @deprecated use NOTES_CONFIG — kept for existing imports */
export const NOTES_CARD_DATA = NOTES_CONFIG;

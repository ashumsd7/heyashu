/**
 * Central social & contact links for Ashutosh / heyashu.in
 * Import from here — do not hardcode URLs in pages/components.
 */

export const SOCIAL_PROFILE = {
  name: "Ashutosh Anand Tiwari",
  displayHandle: "heyashu.in",
};

export const SOCIAL_LINKS = {
  website: "https://heyashu.in/",
  /** Dev / digital garden / tech — @javascripterrr */
  instagramDev: "https://www.instagram.com/javascripterrr",
  /** Travel content — @heyashu.in */
  instagramTravel: "https://instagram.com/heyashu.in",
  /** Default Instagram (dev) */
  instagram: "https://www.instagram.com/javascripterrr",
  youtube: "https://www.youtube.com/@heyashu_in",
  twitter: "https://twitter.com/JavaScripterrr",
  github: "https://github.com/ashumsd7",
  githubRepo: "https://github.com/ashumsd7/heyashu/",
  linkedin: "https://www.linkedin.com/in/ashutoshanandtiwari",
  topmate: "https://topmate.io/aat/1148709/pay",
  topmateInterview: "https://topmate.io/aat/1150933",
  wakatime: "https://wakatime.com/@aat",
  peerlist: "https://peerlist.io/ashumsd7",
  quora:
    "https://www.quora.com/profile/%E0%A4%86%E0%A4%B6%E0%A5%81%E0%A4%A4%E0%A5%8B%E0%A4%B7-%E0%A4%86%E0%A4%A8%E0%A4%A8%E0%A5%8D%E0%A4%A6-%E0%A4%A4%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%B0%E0%A5%80-Ashutosh-Anand-Tiwari",
  whatsappCommunity: "https://chat.whatsapp.com/L0YFv4DQRCpJAcmRFPWT6r",
  travelBlog: "https://heyashu.in/blog?search=travel",
  admin: "https://heyashu.in/admin/",
};

/** @deprecated use SOCIAL_LINKS.topmate */
export const PHONE_CALL_THIRTY_MIN = SOCIAL_LINKS.topmate;

/** @deprecated use SOCIAL_LINKS.topmateInterview */
export const INTERVIEW_CALL_SIXTY_MIN = SOCIAL_LINKS.topmateInterview;

export const GITHUB_REPO_LINK = SOCIAL_LINKS.githubRepo;
export const DEFAULT_FOLLOW_LINK = SOCIAL_LINKS.github;
export const CONNECT_LINK_TOPMATE = SOCIAL_LINKS.github;
export const DEFAULT_FOLLOW_LINK_INSTA = SOCIAL_LINKS.instagramDev;
export const ADMIN_LINK = SOCIAL_LINKS.admin;

const HREF_BY_KEY = {
  twitter: SOCIAL_LINKS.twitter,
  instagram: SOCIAL_LINKS.instagramDev,
  instagramDev: SOCIAL_LINKS.instagramDev,
  instagramTravel: SOCIAL_LINKS.instagramTravel,
  website: SOCIAL_LINKS.website,
  github: SOCIAL_LINKS.github,
  githubRepo: SOCIAL_LINKS.githubRepo,
  wakatime: SOCIAL_LINKS.wakatime,
  peerlist: SOCIAL_LINKS.peerlist,
  youtube: SOCIAL_LINKS.youtube,
  topmate: SOCIAL_LINKS.topmate,
  linkedin: SOCIAL_LINKS.linkedin,
  quora: SOCIAL_LINKS.quora,
  whatsappCommunity: SOCIAL_LINKS.whatsappCommunity,
  travelBlog: SOCIAL_LINKS.travelBlog,
};

export function getSocialHref(key) {
  return HREF_BY_KEY[key] || SOCIAL_LINKS.website;
}

/** Home page (`/`) social icon row */
export const HOME_SOCIAL_ITEMS = [
  { key: "github", label: "GitHub" },
  { key: "twitter", label: "Twitter" },
  { key: "quora", label: "Quora" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "instagram", label: "Instagram" },
  { key: "wakatime", label: "WakaTime" },
];

/** Digital garden footer icon row */
export const GARDEN_FOOTER_SOCIAL_ITEMS = [
  { key: "twitter", label: "X / Twitter" },
  { key: "instagram", label: "Instagram" },
  { key: "website", label: "Website" },
  { key: "github", label: "GitHub" },
  { key: "wakatime", label: "WakaTime" },
  { key: "peerlist", label: "Peerlist" },
  { key: "youtube", label: "YouTube" },
  { key: "topmate", label: "Book a call" },
];

/** Content footer / notes landing compact row */
export const CONTENT_FOOTER_SOCIAL_KEYS = [
  "twitter",
  "instagram",
  "website",
  "github",
  "wakatime",
  "peerlist",
  "topmate",
];

/** Notes collection landing pages (author links) */
export const NOTES_LANDING_SOCIAL_KEYS = ["twitter", "instagram", "website"];

/** Travel page social cards */
export const TRAVEL_SOCIAL_CARDS = [
  {
    key: "instagramTravel",
    title: "Instagram",
    description: "Travel moments captured",
    external: true,
  },
  {
    key: "youtube",
    title: "YouTube",
    description: "Travel vlogs & stories",
    external: true,
  },
  {
    key: "travelBlog",
    title: "Blog",
    description: "Detailed travel guides",
    href: SOCIAL_LINKS.travelBlog,
    external: false,
  },
  {
    key: "topmate",
    title: "Let's Plan a trip",
    description: "Connect to explore the world together",
    external: true,
  },
];

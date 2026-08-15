/**
 * Catalog at /product
 *
 * type: "product" — full page at /product/[slug]
 * type: "service" — listing CTA opens `link` in a new tab
 * type: "tool"    — listing CTA opens `link` in a new tab
 */

export const CATALOG = [
  {
    type: "service",
    title: "Ask / Request / Query anything",
    description:
      "Let's connect and discuss your tech questions. I'll help guide you forward.",
    icon: "question",
    buttonText: "Ask a Question",
    link: "https://topmate.io/aat/1148709/pay",
  },
  {
    type: "service",
    title: "Resume Review (0–3 Years)",
    description:
      "Let's review your resume together and make it stand out to recruiters.",
    icon: "resume",
    buttonText: "Schedule a Call",
    link: "https://topmate.io/aat/1148672",
  },
  {
    type: "service",
    title: "Frontend Fresher's Interview",
    description:
      "Practice frontend interviews with me to boost your confidence and skills.",
    icon: "mic",
    buttonText: "Schedule a Call",
    link: "https://topmate.io/aat/1148651",
  },
  {
    type: "service",
    title: "Career Guidance (0–3 Years)",
    description:
      "Let's map out your tech career path and create a growth strategy.",
    icon: "target",
    buttonText: "Schedule a Call",
    link: "https://topmate.io/aat/1148715",
  },
  {
    type: "service",
    title: "Mock Frontend Interview (1–2 Years)",
    description:
      "Practice interviews to overcome hesitation and master frontend concepts.",
    icon: "code",
    buttonText: "Schedule a Call",
    link: "https://topmate.io/aat/1148690",
  },
  {
    type: "service",
    title: "Mock Interview (3 Years)",
    description:
      "Let's prepare you for senior roles with focused interview practice.",
    icon: "rocket",
    buttonText: "Schedule a Call",
    link: "https://topmate.io/aat/1148727",
  },
  {
    type: "tool",
    title: "Corporate Radio",
    description:
      "Listen to songs when you're bored at your workplace or while reading notes.",
    icon: "radio",
    squareImage: "",
    buttonText: "Use tool",
    link: "https://corporate-baaja.netlify.app/",
  },
  {
    type: "product",
    name: "Conversational Agent (AI Chatbot) Building",
    slug: "gecx-conversational-agent-studio",
    description:
      "Learn how to build customized, multilingual conversational AI agents using GECX, CX Agent Studio, and modern LLM capabilities. Go from basic concepts to building, testing, deploying, and monitoring real-world AI agents.",

    squareImage: "https://i.ibb.co/Fb8Lkxb2/cx-agent-1-1.png",
    thumbnailImage: "https://i.ibb.co/Fb065NJC/cx-agent-banner.png",

    hashtags: [
      "GECX",
      "ConversationalAI",
      "AIAgents",
      "CXAgentStudio",
      "LLM",
      "GenerativeAI",
      "VoiceAI"
    ],

    link: "/product/gecx-conversational-agent-studio",
    ctaLink: "",
    ctaLabel: "View Course",
    queryLink: "https://topmate.io/aat/1148709/pay",

    notice:
      "I'm building these notes and resources for this product. Please hold on — thank you for your patience.",

    launch: {
      isLaunched: false,
      launchedOn: "",
      lastUpdated: "2026-08-15",
    },

    comingSoon: {
      isComingSoon: true,
      launchingOn: "NA",
    },

    showOnHome: true,

    forWho: `This course is for you if you are:
  
  - A developer, engineer, or tech professional interested in **Conversational AI**
  - Interested in building **AI agents instead of simple chatbots**
  - Looking to understand and use **GECX and CX Agent Studio**
  - Interested in building **multilingual and voice-based AI agents**
  - Wanting to learn how modern **LLMs can power real-world applications**
  - Looking to build an AI agent for your **portfolio or real project**
  
  You don't need to know everything about AI beforehand. We will learn the important concepts step-by-step.`,

    prerequisites: `Before starting, it is helpful to have:
  
  - Basic programming knowledge
  - Basic understanding of APIs and web applications
  - Familiarity with JavaScript or Python is helpful
  - Basic understanding of how AI and chatbots work
  
  You don't need to be an AI expert. We will cover the required concepts as we build.`,

    whatYouWillLearn: `In this course we will:
  
  - Understand the fundamentals of **GECX and Conversational AI**
  - Learn how to create customized **Conversational Agents**
  - Work with **CX Agent Studio**
  - Understand and use **LLMs** with conversational agents
  - Build **multilingual AI agents**
  - Create more natural and human-like conversations
  - Explore **real-time voice assistants**
  - Build personal conversational agents for your **portfolio**
  - Learn how to build, test, deploy, and monitor AI agents
  - Work with real-world AI use cases instead of only learning theory
  
  The goal is simple: **learn the concepts, build the agent, and understand how it works in a real application.**`,
  },
  
];

export function isProduct(item) {
  return item?.type === "product";
}

export function isService(item) {
  return item?.type === "service";
}

export function isTool(item) {
  return item?.type === "tool";
}

export function getCatalog() {
  return CATALOG;
}

export function getProducts() {
  return CATALOG.filter(isProduct);
}

export function getServices() {
  return CATALOG.filter(isService);
}

export function getTools() {
  return CATALOG.filter(isTool);
}

export function getFeaturedProduct() {
  return getProducts()[0] || null;
}

export function typeLabel(item) {
  if (isProduct(item)) return "Product";
  if (isTool(item)) return "Tool";
  return "Service";
}

export function getProductBySlug(slug) {
  if (!slug) return null;
  return getProducts().find((item) => item.slug === slug) || null;
}

export function getHomeProducts() {
  return getProducts().filter((item) => item.showOnHome);
}

export function catalogTitle(item) {
  return item?.name || item?.title || "Untitled";
}

export function catalogLink(item) {
  return item?.link || item?.buttonLink || "";
}

export function catalogCtaLabel(item) {
  if (isProduct(item)) return "View Details";
  return item?.buttonText || "Open";
}

export function catalogHref(item) {
  if (isProduct(item) && item.slug) return `/product/${item.slug}`;
  return catalogLink(item);
}

export function opensExternally(item) {
  return !isProduct(item);
}

export function formatCatalogDate(value) {
  if (!value) return "";
  const raw = String(value).trim();
  if (/^(na|n\/a|-)$/i.test(raw)) return "NA";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Launch state for listing + slug pages. isLaunched is the source of truth. */
export function getProductStatus(item) {
  const launched = Boolean(item?.launch?.isLaunched);
  const comingSoon = Boolean(item?.comingSoon?.isComingSoon) || !launched;
  return {
    launched,
    comingSoon,
    launchingOn: formatCatalogDate(item?.comingSoon?.launchingOn) || "NA",
    publishedOn: formatCatalogDate(item?.launch?.launchedOn) || "NA",
    lastUpdated: formatCatalogDate(item?.launch?.lastUpdated) || "NA",
  };
}

/**
 * JSON-LD builders for garden / notes SEO + GEO (LLM-friendly structured data).
 */
import {
  LINK_PREVIEW_FALLBACK,
  SITE_NAME,
  SITE_ORIGIN,
  absoluteUrl,
} from "@/utils/seo";

export const PERSON_ASHUTOSH = {
  "@type": "Person",
  name: "Ashutosh Anand Tiwari",
  url: SITE_ORIGIN,
  sameAs: [
    "https://github.com/ashumsd7",
    "https://www.linkedin.com/in/ashumsd7/",
    "https://twitter.com/ashumsd7",
    "https://www.instagram.com/javascripterrr",
  ],
};

export const ORG_HEYASHU = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: {
    "@type": "ImageObject",
    url: LINK_PREVIEW_FALLBACK,
  },
  founder: PERSON_ASHUTOSH,
};

export function jsonLdScript(data) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data.filter(Boolean) : [data];
  if (!payload.length) return null;
  return {
    __html: JSON.stringify(
      payload.length === 1
        ? { "@context": "https://schema.org", ...payload[0] }
        : {
            "@context": "https://schema.org",
            "@graph": payload,
          }
    ),
  };
}

export function breadcrumbList(items = []) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function webPageSchema({
  name,
  description,
  url,
  image,
  datePublished,
  dateModified,
}) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(url)}#webpage`,
    url: absoluteUrl(url),
    name,
    description,
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    about: { "@id": `${SITE_ORIGIN}/digital-garden#garden` },
    primaryImageOfPage: image
      ? { "@type": "ImageObject", url: image }
      : undefined,
    datePublished,
    dateModified,
    inLanguage: "en-IN",
    author: PERSON_ASHUTOSH,
    publisher: ORG_HEYASHU,
  };
}

export function collectionPageSchema({
  name,
  description,
  url,
  image,
  about = [],
}) {
  return {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(url)}#collection`,
    url: absoluteUrl(url),
    name,
    description,
    image,
    about: about.map((name) => ({ "@type": "Thing", name })),
    isPartOf: { "@id": `${SITE_ORIGIN}/digital-garden#garden` },
    publisher: ORG_HEYASHU,
    author: PERSON_ASHUTOSH,
    inLanguage: "en-IN",
  };
}

export function courseSchema({
  name,
  description,
  url,
  image,
  providerName = "heyashu.in Digital Garden",
  educationalLevel = "Beginner to Intermediate",
  about = [],
  hasCourseInstance,
}) {
  return {
    "@type": "Course",
    "@id": `${absoluteUrl(url)}#course`,
    name,
    description,
    url: absoluteUrl(url),
    image,
    provider: {
      "@type": "Organization",
      name: providerName,
      sameAs: SITE_ORIGIN,
    },
    instructor: {
      "@type": "Person",
      name: "Akshay Saini",
      sameAs: "https://namastedev.com/",
    },
    author: PERSON_ASHUTOSH,
    publisher: ORG_HEYASHU,
    isAccessibleForFree: true,
    inLanguage: "en-IN",
    educationalLevel,
    about: about.map((n) => ({ "@type": "Thing", name: n })),
    learningResourceType: "Digital Notes",
    teaches: about,
    hasCourseInstance: hasCourseInstance || {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT20H",
    },
  };
}

export function itemListSchema({ name, url, items = [] }) {
  return {
    "@type": "ItemList",
    name,
    url: absoluteUrl(url),
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}

export function learningResourceSchema({
  name,
  description,
  url,
  image,
  datePublished,
  dateModified,
  keywords = [],
  authorName,
  isPartOfUrl,
  isPartOfName,
}) {
  return {
    "@type": "LearningResource",
    "@id": `${absoluteUrl(url)}#resource`,
    name,
    headline: name,
    description,
    url: absoluteUrl(url),
    image,
    datePublished,
    dateModified,
    keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    learningResourceType: "Notes",
    educationalUse: "self-study",
    author: {
      "@type": "Person",
      name: authorName || "Ashutosh Anand Tiwari",
    },
    publisher: ORG_HEYASHU,
    isPartOf: isPartOfUrl
      ? {
          "@type": "Course",
          name: isPartOfName || "Namaste AI Notes",
          url: absoluteUrl(isPartOfUrl),
        }
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(url),
    },
  };
}

/** High-intent keywords for Namaste AI ranking / GEO. */
export const NAMASTE_AI_KEYWORDS = [
  "Namaste AI Notes",
  "Namaste AI digital notes",
  "Namaste AI course notes",
  "Akshay Saini AI notes",
  "NamasteDev AI notes",
  "free AI notes",
  "LLM notes",
  "GenAI notes",
  "transformers attention notes",
  "embeddings explained",
  "tokenization LLM",
  "digital garden AI notes",
  "heyashu Namaste AI",
].join(", ");

export const GARDEN_KEYWORDS = [
  "digital garden",
  "free digital notes",
  "Namaste AI Notes",
  "Namaste Node.js notes",
  "Akshay Saini notes",
  "open source coding notes",
  "frontend system design notes",
  "JavaScript notes",
  "heyashu",
  "Ashutosh Anand Tiwari",
].join(", ");

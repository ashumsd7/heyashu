/** Namaste Dev Notes — simplified reader routes (separate from /notes/* sidebar UI). */

export const NAMASTE_AI_NOTE_ID = "namaste-ai";

export const NAMASTE_DEV_LOGO_URL =
  "https://do6gp1uxl3luu.cloudfront.net/banner+and+logos/name.webp";

export const NAMASTE_DEV_LEARN_URL = "https://namastedev.com/learn";

export const NAMASTE_AI_DEV_NOTES_BASE =
  "/digital-garden/namaste-dev-notes/namaste-ai-notes";

export const NAMASTE_AI_DEV_NOTES_START = `${NAMASTE_AI_DEV_NOTES_BASE}/welcome-to-namaste-ai-notes`;

export function namasteAiDevNotesHref(slug) {
  return `${NAMASTE_AI_DEV_NOTES_BASE}/${slug}`;
}

export function isNamasteAiDevReaderNote(note) {
  return note?.id === NAMASTE_AI_NOTE_ID;
}

/** Dev reader display title: episodeTitle → name → title */
export function getEpisodeDisplayTitle(frontMatter = {}) {
  return (
    frontMatter.episodeTitle?.trim() ||
    frontMatter.name?.trim() ||
    frontMatter.title ||
    "Chapter"
  );
}

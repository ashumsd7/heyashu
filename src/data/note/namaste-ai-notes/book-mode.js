/** Combined Namaste AI notes PDF (all episodes, text-focused). */
export const NAMASTE_AI_ALL_EPISODES_PDF =
  "/pdfs/namaste-ai/namaste-ai-all-episodes.pdf";

export const NAMASTE_AI_ALL_EPISODES_FILENAME = "namaste-ai-all-episodes.pdf";

/**
 * 1-indexed start page per episode slug in the combined PDF.
 * Update these when the master PDF is regenerated.
 */
export const EPISODE_BOOK_START_PAGES = {
  "welcome-to-namaste-ai-notes": 1,
  "complete-artificial-intelligence-history": 1,
  "chatgpt-vs-google-search-engine-how-llms-work": 1,
  "llm-language-tokenization-misconceptions": 1,
  "llm-embeddings-explained-1": 1,
  "how-llms-work-transformers-attention": 1,
};

export function getBookModeStartPage(slug) {
  if (!slug) return 1;
  return EPISODE_BOOK_START_PAGES[slug] ?? 1;
}

export function isNamasteAiBookModeAvailable(slug) {
  return Boolean(slug && EPISODE_BOOK_START_PAGES[slug] != null);
}

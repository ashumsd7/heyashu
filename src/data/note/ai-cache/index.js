import welcomeSummary from "./namaste-ai/summary/welcome-to-namaste-ai-notes.json";
import historySummary from "./namaste-ai/summary/complete-artificial-intelligence-history.json";
import chatgptSummary from "./namaste-ai/summary/chatgpt-vs-google-search-engine-how-llms-work.json";
import tokenSummary from "./namaste-ai/summary/llm-language-tokenization-misconceptions.json";
import embedSummary from "./namaste-ai/summary/llm-embeddings-explained-1.json";
import transformerSummary from "./namaste-ai/summary/how-llms-work-transformers-attention.json";

import welcomeQuiz from "./namaste-ai/quiz/welcome-to-namaste-ai-notes.json";
import historyQuiz from "./namaste-ai/quiz/complete-artificial-intelligence-history.json";
import chatgptQuiz from "./namaste-ai/quiz/chatgpt-vs-google-search-engine-how-llms-work.json";
import tokenQuiz from "./namaste-ai/quiz/llm-language-tokenization-misconceptions.json";
import embedQuiz from "./namaste-ai/quiz/llm-embeddings-explained-1.json";
import transformerQuiz from "./namaste-ai/quiz/how-llms-work-transformers-attention.json";

import welcomeQna from "./namaste-ai/qna/welcome-to-namaste-ai-notes.json";
import historyQna from "./namaste-ai/qna/complete-artificial-intelligence-history.json";
import chatgptQna from "./namaste-ai/qna/chatgpt-vs-google-search-engine-how-llms-work.json";
import tokenQna from "./namaste-ai/qna/llm-language-tokenization-misconceptions.json";
import embedQna from "./namaste-ai/qna/llm-embeddings-explained-1.json";
import transformerQna from "./namaste-ai/qna/how-llms-work-transformers-attention.json";

const NAMASTE_AI_CACHE = {
  summary: {
    "welcome-to-namaste-ai-notes": welcomeSummary,
    "complete-artificial-intelligence-history": historySummary,
    "chatgpt-vs-google-search-engine-how-llms-work": chatgptSummary,
    "llm-language-tokenization-misconceptions": tokenSummary,
    "llm-embeddings-explained-1": embedSummary,
    "how-llms-work-transformers-attention": transformerSummary,
  },
  quiz: {
    "welcome-to-namaste-ai-notes": welcomeQuiz,
    "complete-artificial-intelligence-history": historyQuiz,
    "chatgpt-vs-google-search-engine-how-llms-work": chatgptQuiz,
    "llm-language-tokenization-misconceptions": tokenQuiz,
    "llm-embeddings-explained-1": embedQuiz,
    "how-llms-work-transformers-attention": transformerQuiz,
  },
  qna: {
    "welcome-to-namaste-ai-notes": welcomeQna,
    "complete-artificial-intelligence-history": historyQna,
    "chatgpt-vs-google-search-engine-how-llms-work": chatgptQna,
    "llm-language-tokenization-misconceptions": tokenQna,
    "llm-embeddings-explained-1": embedQna,
    "how-llms-work-transformers-attention": transformerQna,
  },
};

const NAMASTE_AI_PDF_SLUGS = new Set(Object.keys(NAMASTE_AI_CACHE.summary));

/** Public URL for a cached Namaste AI note PDF (served from public/pdfs/namaste-ai/). */
export function getNamasteAiPdfUrl(slug) {
  if (!slug || !NAMASTE_AI_PDF_SLUGS.has(slug)) return null;
  return `/pdfs/namaste-ai/${slug}.pdf`;
}

export function hasNamasteAiPdf(slug) {
  return Boolean(getNamasteAiPdfUrl(slug));
}

/** @param {'summary'|'quiz'|'qna'} type */
export function getNamasteAiCache(type, slug) {
  if (!type || !slug) return null;
  return NAMASTE_AI_CACHE[type]?.[slug] ?? null;
}

export function hasNamasteAiCache(type, slug) {
  return Boolean(getNamasteAiCache(type, slug));
}

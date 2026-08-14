/**
 * Shared OpenRouter helpers for AI drawers (Quick Read, Q&A, Quiz).
 * Content is always read from #ai-markdown-content on the page.
 */

export const AI_MARKDOWN_CONTENT_ID = "ai-markdown-content";

export const OPENROUTER_API_URL =
  "https://openrouter.ai/api/v1/chat/completions";
export const OPENROUTER_SITE_URL = "https://heyashu.in";
export const OPENROUTER_SITE_NAME = "Ashutosh Anand's Digital Garden";

/** Model from env only — set NEXT_PUBLIC_OPENROUTER_MODEL locally / on Netlify */
export function getOpenRouterModel() {
  const model = process.env.NEXT_PUBLIC_OPENROUTER_MODEL;
  if (!model) {
    throw new Error(
      "Missing NEXT_PUBLIC_OPENROUTER_MODEL. Add it to .env.local and Netlify."
    );
  }
  return model;
}

export function getOpenRouterApiKey() {
  const key = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  if (!key) {
    throw new Error(
      "Missing NEXT_PUBLIC_OPENROUTER_API_KEY. Add it to .env.local and Netlify."
    );
  }
  return key;
}

/** Read only the article markdown container — never the whole page. */
export function getAiMarkdownContent() {
  if (typeof document === "undefined") return "";
  const el = document.getElementById(AI_MARKDOWN_CONTENT_ID);
  const text = el?.innerText?.trim() || "";
  if (!text) {
    throw new Error(
      "No article content found. Open a notes or blog page with rendered markdown."
    );
  }
  return text;
}

export function parseAiJsonResponse(response) {
  if (!response || typeof response !== "string") return null;
  try {
    return JSON.parse(response);
  } catch (_) {
    /* continue */
  }
  const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch?.[1]) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (_) {
      /* continue */
    }
  }
  const possibleJson = response.match(/\{[\s\S]*\}/);
  if (possibleJson) {
    try {
      return JSON.parse(possibleJson[0]);
    } catch (_) {
      /* continue */
    }
  }
  return null;
}

export async function callOpenRouter(messages) {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getOpenRouterApiKey()}`,
      "HTTP-Referer": OPENROUTER_SITE_URL,
      "X-Title": OPENROUTER_SITE_NAME,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: getOpenRouterModel(),
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Invalid API response format");
  }
  return content;
}

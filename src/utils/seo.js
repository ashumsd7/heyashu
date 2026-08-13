/**
 * Site-wide SEO / absolute URL helpers.
 * Prefer www.heyashu.in everywhere (canonical + OG + sitemap).
 */
export const SITE_ORIGIN = "https://www.heyashu.in";
export const SITE_NAME = "Digital Garden — heyashu.in";
export const TWITTER_HANDLE = "@ashumsd7";
export const DEFAULT_OG_IMAGE =
  "https://i.ibb.co/zHFrGsK/diginotes-thumb.jpg";

/** Build absolute URL from a path (`/blog` → `https://www.heyashu.in/blog`). */
export function absoluteUrl(path = "/") {
  if (!path) return SITE_ORIGIN;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Strip query/hash for canonicals
  const clean = normalized.split("#")[0].split("?")[0];
  return `${SITE_ORIGIN}${clean}`;
}

/** Make image URLs absolute for Open Graph. */
export function absoluteImageUrl(image, fallback = DEFAULT_OG_IMAGE) {
  if (!image) return fallback;
  if (/^https?:\/\//i.test(image)) return image;
  return absoluteUrl(String(image).replace(/^\/public/, "") || fallback);
}

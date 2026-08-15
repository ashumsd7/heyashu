/**
 * Site-wide SEO / absolute URL helpers.
 * Prefer www.heyashu.in everywhere (canonical + OG + sitemap).
 */
export const SITE_ORIGIN = "https://www.heyashu.in";
export const SITE_NAME = "Digital Garden — heyashu.in";
export const TWITTER_HANDLE = "@ashumsd7";

/** WhatsApp / LinkedIn / Twitter card image when a page has no thumbnail. */
export const LINK_PREVIEW_FALLBACK =
  "https://i.ibb.co/prr2Csjt/link-preview-fallabck.jpg";

/** @deprecated use LINK_PREVIEW_FALLBACK */
export const DEFAULT_OG_IMAGE = LINK_PREVIEW_FALLBACK;

/** Build absolute URL from a path (`/blog` → `https://www.heyashu.in/blog`). */
export function absoluteUrl(path = "/") {
  if (!path) return SITE_ORIGIN;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const clean = normalized.split("#")[0].split("?")[0];
  return `${SITE_ORIGIN}${clean}`;
}

function firstImageCandidate(...candidates) {
  for (const c of candidates) {
    const v = String(c || "")
      .trim()
      .replace(/^\/public/, "");
    if (v) return v;
  }
  return "";
}

/** Make image URLs absolute for Open Graph / Twitter / WhatsApp. */
export function absoluteImageUrl(image, fallback = LINK_PREVIEW_FALLBACK) {
  const src = firstImageCandidate(image);
  if (!src) return fallback;
  if (/^https?:\/\//i.test(src)) return src;
  return absoluteUrl(src);
}

/**
 * Link-preview image: frontmatter thumbnail first, then any extra src, then fallback.
 */
export function pickLinkPreviewImage(...candidates) {
  return absoluteImageUrl(
    firstImageCandidate(...candidates),
    LINK_PREVIEW_FALLBACK
  );
}

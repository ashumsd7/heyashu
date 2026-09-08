/**
 * CMS boolean: Feature as blog.
 * Missing/undefined defaults to true so existing markdown stays listed.
 */
export function isFeaturedAsBlog(frontMatter = {}) {
  const v = frontMatter.featureAsBlog;
  if (v === false || v === "false" || v === 0 || v === "0") return false;
  return true;
}

/**
 * Main site navbar config (heyashu.in — not Digital Garden chrome).
 * Toggle `enabled: false` to hide a link without deleting it.
 */

export const NAV_ITEMS = [
  { href: "/blog", label: "Blogs", enabled: true },
  { href: "/tech", label: "Tech", enabled: true },
  { href: "/product", label: "Products", enabled: false },
  {
    href: "/digital-garden",
    label: "Digital Garden ft. Notes",
    isSpecial: true,
    enabled: true,
  },
  { href: "/travel", label: "Travel", enabled: true },
  { href: "/misc", label: "More", enabled: true },
];

/** Clock icon → /journey (Archives), shown before theme toggle */
export const NAV_SHOW_JOURNEY_ICON = true;

export function getNavbarItems() {
  return NAV_ITEMS.filter((item) => item.enabled !== false);
}

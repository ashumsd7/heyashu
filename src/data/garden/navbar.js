/**
 * Digital Garden navbar link config.
 * Toggle `enabled: false` to hide a link without deleting it.
 */

export const GARDEN_NAV_ITEMS = [
  { href: "/blog", label: "Blogs", enabled: true },
  { href: "/digital-garden/notes", label: "Notes", enabled: true },
  { href: "/product", label: "Products", enabled: false },
];

export function getGardenNavItems() {
  return GARDEN_NAV_ITEMS.filter((item) => item.enabled !== false);
}

export function isGardenNavItemActive(href, pathname = "", asPath = "") {
  if (href === "/blog") return pathname.startsWith("/blog");
  if (href === "/digital-garden/notes") {
    return (
      pathname.startsWith("/digital-garden/notes") ||
      asPath.startsWith("/digital-garden/notes")
    );
  }
  if (href !== "/") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return false;
}

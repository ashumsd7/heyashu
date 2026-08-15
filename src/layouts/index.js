import Navbar from "@/components/base/Navbar";
import Layout from "@/components/base/Layout";
import DigitalGardenLayout from "@/components/garden/DigitalGardenLayout";

/**
 * Two choosable page layouts (Next.js pages router + getLayout).
 *
 * Usage on a page:
 *   import { withDigitalGardenLayout } from "@/layouts";
 *   MyPage.getLayout = withDigitalGardenLayout;
 *
 * Or rely on path-based auto-pick in `_app.js` for /blog, /product, and /digital-garden.
 */

export function withSiteLayout(page) {
  return (
    <>
      <Navbar />
      <Layout>{page}</Layout>
    </>
  );
}

export function withDigitalGardenLayout(page) {
  return <DigitalGardenLayout>{page}</DigitalGardenLayout>;
}

/** Full-bleed pages with no site / garden chrome (notes chapter reader) */
export function withBareLayout(page) {
  return page;
}

/** /digital-garden/notes/:series/:slug — immersive notes reader */
export function isNotesChapterPage(pathname = "") {
  const parts = pathname.split("/").filter(Boolean);
  return (
    parts[0] === "digital-garden" &&
    parts[1] === "notes" &&
    parts.length >= 4
  );
}

/** Routes that should use the Digital Garden navbar by default */
export function shouldUseDigitalGardenLayout(pathname = "") {
  if (isNotesChapterPage(pathname)) return false;
  return (
    pathname.startsWith("/digital-garden") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/product")
  );
}

import {
  buildSitemapXml,
  collectSitemapUrls,
} from "@/data/garden/sitemapUrls";

/**
 * Dynamic sitemap — always reflects current markdown + key garden routes.
 * Served at /sitemap.xml (overrides stale public/sitemap.xml once that file is removed).
 */
function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const urls = collectSitemapUrls(process.cwd());
  const xml = buildSitemapXml(urls);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=604800"
  );
  res.write(xml);
  res.end();

  return { props: {} };
}

export default SiteMap;

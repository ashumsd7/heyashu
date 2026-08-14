/**
 * Writes public/sitemap.xml at build time so /sitemap.xml does not need a server function.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildSitemapXml,
  collectSitemapUrls,
} from "../src/data/garden/sitemapUrls.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const urls = collectSitemapUrls(root);
const xml = buildSitemapXml(urls);
const out = path.join(root, "public", "sitemap.xml");

fs.writeFileSync(out, xml, "utf-8");
console.log(`[sitemap] wrote ${urls.length} URLs → public/sitemap.xml`);

/**
 * One-off: generate PDF from a namaste-ai notes markdown file.
 * Usage: node scripts/generate-note-pdf.mjs [slug]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SLUG = process.argv[2] || "complete-artificial-intelligence-history";
const MD_PATH = path.join(ROOT, "src/content/namaste-ai-notes", `${SLUG}.md`);
const OUT_DIR = path.join(ROOT, "public/pdfs/namaste-ai");
const CACHE_PDF_DIR = path.join(
  ROOT,
  "src/data/note/ai-cache/namaste-ai/pdf"
);
const OUT_PDF = path.join(OUT_DIR, `${SLUG}.pdf`);
const CACHE_PDF = path.join(CACHE_PDF_DIR, `${SLUG}.pdf`);
const TMP_HTML = path.join(OUT_DIR, `${SLUG}.html`);

function pathToFileUrl(absPath) {
  return `file:///${path.resolve(absPath).replace(/\\/g, "/")}`;
}

function toFileUrl(relativePath) {
  const abs = path.resolve(ROOT, "public", relativePath.replace(/^\//, ""));
  return pathToFileUrl(abs);
}

function findBrowser() {
  const candidates = [
    process.env.LOCALAPPDATA &&
      path.join(
        process.env.LOCALAPPDATA,
        "Google/Chrome/Application/chrome.exe"
      ),
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    process.env.PROGRAMFILES &&
      path.join(process.env.PROGRAMFILES, "Microsoft/Edge/Application/msedge.exe"),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    process.env.LOCALAPPDATA &&
      path.join(
        process.env.LOCALAPPDATA,
        "Microsoft/Edge/Application/msedge.exe"
      ),
  ].filter(Boolean);

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const CSS = `
  @page { margin: 18mm 16mm; size: A4; }
  * { box-sizing: border-box; }
  body {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 11pt;
    line-height: 1.65;
    color: #1c1c1c;
    max-width: 100%;
    margin: 0;
    padding: 0;
  }
  .cover {
    margin-bottom: 28px;
    padding-bottom: 20px;
    border-bottom: 2px solid #143825;
  }
  .cover img {
    width: 100%;
    max-height: 220px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 16px;
  }
  h1 {
    font-size: 22pt;
    line-height: 1.2;
    margin: 0 0 8px;
    color: #143825;
  }
  .meta {
    font-family: Arial, sans-serif;
    font-size: 9.5pt;
    color: #555;
    margin-bottom: 4px;
  }
  .series {
    font-family: Arial, sans-serif;
    font-size: 9pt;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #888;
  }
  h3 {
    font-size: 14pt;
    margin: 22px 0 10px;
    color: #143825;
    page-break-after: avoid;
  }
  p { margin: 0 0 12px; }
  strong { color: #111; }
  code {
    font-family: Consolas, monospace;
    font-size: 9.5pt;
    background: #f3f0ea;
    padding: 2px 5px;
    border-radius: 3px;
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 16px auto;
    border: 1px solid #e0dbd2;
    border-radius: 4px;
    page-break-inside: avoid;
  }
  a {
    color: #143825;
    text-decoration: underline;
  }
  .footer {
    margin-top: 32px;
    padding-top: 12px;
    border-top: 1px solid #ddd;
    font-family: Arial, sans-serif;
    font-size: 8.5pt;
    color: #777;
    text-align: center;
  }
`;

async function main() {
  if (!fs.existsSync(MD_PATH)) {
    console.error("Markdown not found:", MD_PATH);
    process.exit(1);
  }

  const raw = fs.readFileSync(MD_PATH, "utf8");
  const { data, content } = matter(raw);

  const htmlBody = await remark().use(remarkGfm).use(remarkHtml).process(content);
  let bodyHtml = String(htmlBody);
  bodyHtml = bodyHtml.replace(
    /src="(\/images\/[^"]+)"/g,
    (_m, imgPath) => `src="${toFileUrl(imgPath)}"`
  );

  const title = (data.name || data.title || SLUG).trim();
  const author = data.author || "Ashutosh Anand Tiwari";
  const date = data.publishedOn || "";
  const cover = data.thumbnail ? toFileUrl(data.thumbnail) : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <style>${CSS}</style>
</head>
<body>
  <div class="cover">
    ${cover ? `<img src="${cover}" alt="" />` : ""}
    <p class="series">Namaste AI Notes · Episode ${data.episode || ""}</p>
    <h1>${title}</h1>
    <p class="meta">By ${author}${date ? ` · ${date}` : ""}</p>
    <p class="meta">heyashu.in/digital-garden/notes/namaste-ai-notes/${SLUG}</p>
  </div>
  ${bodyHtml}
  <div class="footer">Digital Garden — heyashu.in · ${new Date().getFullYear()}</div>
</body>
</html>`;

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(TMP_HTML, html, "utf8");
  console.log("HTML written:", TMP_HTML);

  const browser = findBrowser();
  if (!browser) {
    console.error("Chrome/Edge not found. Open the HTML file and Print → Save as PDF:");
    console.error(TMP_HTML);
    process.exit(1);
  }

  const htmlUrl = pathToFileUrl(TMP_HTML);
  const cmd = `"${browser}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${OUT_PDF.replace(/\\/g, "/")}" "${htmlUrl}"`;

  try {
    execSync(cmd, { stdio: "inherit", timeout: 60000 });
    fs.mkdirSync(CACHE_PDF_DIR, { recursive: true });
    fs.copyFileSync(OUT_PDF, CACHE_PDF);
    console.log("PDF saved:", OUT_PDF);
    console.log("AI cache copy:", CACHE_PDF);
  } catch (err) {
    console.error("PDF generation failed:", err.message);
    console.error("Fallback: open", TMP_HTML, "and use Print → Save as PDF");
    process.exit(1);
  }
}

main();

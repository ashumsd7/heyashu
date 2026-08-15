import fs from "fs";
import path from "path";

const EXTS = [".jpeg", ".jpg", ".png", ".webp", ".gif"];

function normalizeSrc(src = "") {
  let p = String(src).trim().replace(/\\/g, "/").replace("/public", "");
  if (!p) return "";
  if (!p.startsWith("/") && !/^https?:\/\//i.test(p)) p = `/${p}`;
  return p;
}

function publicAbs(webPath) {
  return path.join(process.cwd(), "public", webPath.replace(/^\//, ""));
}

function fileExistsOnDisk(webPath) {
  try {
    return fs.existsSync(publicAbs(webPath));
  } catch {
    return false;
  }
}

function withExistingExt(webPath) {
  if (fileExistsOnDisk(webPath)) return webPath;
  const dir = path.dirname(publicAbs(webPath));
  const base = path.basename(webPath, path.extname(webPath));
  if (!fs.existsSync(dir)) return webPath;
  for (const ext of EXTS) {
    const candidate = path.join(dir, `${base}${ext}`);
    if (fs.existsSync(candidate)) {
      const rel = path
        .relative(path.join(process.cwd(), "public"), candidate)
        .replace(/\\/g, "/");
      return `/${rel}`;
    }
  }
  return webPath;
}

/**
 * Local images for Namaste AI live in public/images/namaste-ai/
 * (not public/images/ or public/images/blogs/).
 * Also retries common extensions when CMS writes .png but disk has .jpeg.
 */
export function resolveLocalImageSrc(src, { collection } = {}) {
  if (!src || typeof src !== "string") return src || "";
  if (/^https?:\/\//i.test(src)) return src;

  let p = normalizeSrc(src);
  const isNamasteCollection = collection === "namaste-ai-notes";
  const looksNamaste =
    isNamasteCollection ||
    p.includes("/namaste-ai/") ||
    p.includes("/images/blogs/namaste-ai/");

  if (looksNamaste) {
    p = p.replace(/^\/images\/blogs\/namaste-ai\//, "/images/namaste-ai/");
    if (!p.startsWith("/images/namaste-ai/")) {
      const file = p.split("/").filter(Boolean).pop();
      p = `/images/namaste-ai/${file}`;
    }
  }

  return withExistingExt(p);
}

export function isNamasteAiContentPath(filePath = "") {
  return String(filePath).replace(/\\/g, "/").includes("namaste-ai-notes");
}

/**
 * Pure helpers for Digital Garden pages.
 * Blog/notes content still comes from markdown files via getStaticProps.
 */

/**
 * Parse common garden date strings into a readable label.
 * Supports DD-MM-YYYY, YYYY-MM-DD, and Date-parseable values.
 */
export function formatGardenDate(dateStr) {
  if (!dateStr || dateStr === "Recently") return "Recently";
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const parts = String(dateStr).trim().split(/[-/]/);
  if (parts.length === 3) {
    let day;
    let monthIdx;
    let year;
    if (parts[0].length === 4) {
      year = parts[0];
      monthIdx = parseInt(parts[1], 10) - 1;
      day = parseInt(parts[2], 10);
    } else {
      const p0 = parseInt(parts[0], 10);
      const p1 = parseInt(parts[1], 10);
      const p2 = parts[2];
      year = p2.length === 2 ? `20${p2}` : p2;
      if (p0 > 12) {
        day = p0;
        monthIdx = p1 - 1;
      } else if (p1 > 12) {
        monthIdx = p0 - 1;
        day = p1;
      } else {
        day = p0;
        monthIdx = p1 - 1;
      }
    }
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${String(day).padStart(2, "0")} ${months[monthIdx]}, ${year}`;
    }
  }

  const d = new Date(dateStr);
  if (!Number.isNaN(d.getTime())) {
    return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]}, ${d.getFullYear()}`;
  }
  return String(dateStr);
}

/** First usable image from markdown body (`![](url)` or <img src>). */
export function firstMarkdownImage(content = "") {
  if (!content) return "";
  const mdMatch = String(content).match(/!\[[^\]]*\]\(\s*([^)\s]+)\s*(?:["'][^"']*["'])?\s*\)/);
  const mdSrc = mdMatch?.[1]?.trim();
  if (mdSrc && mdSrc !== "#" && !mdSrc.startsWith("data:")) {
    return mdSrc.replace("/public", "");
  }
  const htmlMatch = String(content).match(/<img[^>]+src=["']([^"']+)["']/i);
  const htmlSrc = htmlMatch?.[1]?.trim();
  if (htmlSrc) return htmlSrc.replace("/public", "");
  return "";
}

/** Timestamp for sorting (newer = larger). Invalid dates → 0. */
export function gardenDateValue(dateStr) {
  if (!dateStr) return 0;
  const raw = String(dateStr).trim();

  // "17 Aug 2024" / "Aug 17, 2024"
  const named = Date.parse(raw);
  if (!Number.isNaN(named) && /[a-zA-Z]/.test(raw)) {
    return named;
  }

  const parts = raw.split(/[-/./]/).filter(Boolean);
  if (parts.length === 3) {
    let y;
    let m;
    let d;
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      y = +parts[0];
      m = +parts[1];
      d = +parts[2];
    } else {
      const p0 = +parts[0];
      const p1 = +parts[1];
      const p2 = parts[2].length === 2 ? +`20${parts[2]}` : +parts[2];
      // heyashu blog convention: MM-DD-YYYY (e.g. 03-28-2025, 09-02-2024)
      if (p1 > 12) {
        // MM-DD where day > 12
        m = p0;
        d = p1;
        y = p2;
      } else if (p0 > 12) {
        // DD-MM-YYYY
        d = p0;
        m = p1;
        y = p2;
      } else {
        // Ambiguous → MM-DD-YYYY (site default)
        m = p0;
        d = p1;
        y = p2;
      }
    }
    const t = Date.UTC(y, m - 1, d);
    return Number.isNaN(t) ? 0 : t;
  }

  const t = new Date(raw).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/** Truncate feedback text for marquee cards. */
export function formatComment(text, maxWords = 14) {
  if (!text) return "High quality notes for fast interview revision...";
  const clean = String(text).replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  const words = clean.split(" ");
  if (words.length <= maxWords) {
    const joined = words.join(" ");
    return joined.endsWith("...") ? joined : `${joined}...`;
  }
  return `${words.slice(0, maxWords).join(" ")}...`;
}

/** Fisher–Yates shuffle (copy). */
export function shuffleArray(list = []) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Fresh From The Garden picker:
 * - first item = latest blog by date
 * - remaining items = random from the rest (from the full blog list)
 */
export function pickFreshGardenBlogs(blogs = [], total = 4) {
  if (!Array.isArray(blogs) || blogs.length === 0) return [];
  const withDates = blogs.map((b) => ({
    ...b,
    _ts: gardenDateValue(b.frontMatter?.publishedOn || b.frontMatter?.date),
  }));
  withDates.sort((a, b) => b._ts - a._ts);
  const latest = withDates[0];
  const rest = withDates.slice(1);
  const randomRest = shuffleArray(rest).slice(0, Math.max(0, total - 1));
  return [latest, ...randomRest].map(({ _ts, ...blog }) => blog);
}

/** Duplicate marquee items so CSS loop looks continuous. */
export function buildMarqueeLoop(items = [], copies = 2) {
  return Array.from({ length: copies }, (_, copy) => ({
    copy,
    items,
  }));
}

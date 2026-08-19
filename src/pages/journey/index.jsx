import React, { useEffect, useMemo, useRef, useState } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  HiOutlineMagnifyingGlass,
  HiChevronDown,
  HiOutlineHeart,
  HiHeart,
  HiOutlineShare,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlineFlag,
  HiOutlineArchiveBox,
} from "react-icons/hi2";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { JOURNEY_CATEGORIES, getJourneyCategory } from "@/data/journey/categories";
import { SOCIAL_PROFILE } from "@/data/social";
import { withBareLayout } from "@/layouts";
import Link from "next/link";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const AVATAR = "https://avatars.githubusercontent.com/u/40313523?v=4";

const DATE_FORMATS = [
  "MM-DD-YYYY hh:mm A",
  "MM-DD-YYYY HH:mm",
  "MM-DD-YYYY",
  "YYYY-MM-DDTHH:mm:ssZ",
  "YYYY-MM-DD HH:mm",
  "YYYY-MM-DD",
];

const SORT_OPTIONS = [
  { id: "new", label: "Newest first" },
  { id: "old", label: "Oldest first" },
];

function parseEntryDate(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  const d = dayjs(s, DATE_FORMATS, true);
  if (d.isValid()) return d;
  const fallback = dayjs(s);
  return fallback.isValid() ? fallback : null;
}

function hasRecordedTime(raw) {
  return /[:]|am|pm/i.test(String(raw || ""));
}

function parseHashtags(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((t) => String(t).replace(/^#/, "").trim()).filter(Boolean);
  }
  return String(raw)
    .split(",")
    .map((t) => t.replace(/^#/, "").trim())
    .filter(Boolean);
}

function formatWhen(raw) {
  const d = parseEntryDate(raw);
  if (!d) return raw || "";
  if (hasRecordedTime(raw)) return d.format("D MMM YYYY, h:mm A");
  return d.format("D MMM YYYY");
}

function formatRelative(raw) {
  const d = parseEntryDate(raw);
  if (!d) return "";
  return d.fromNow();
}

export async function getStaticProps() {
  const directory = path.join(process.cwd(), "src/content/my-life-archive");
  if (!fs.existsSync(directory)) {
    return { props: { entries: [] } };
  }
  const files = fs.readdirSync(directory).filter((f) => f.endsWith(".md"));
  const entries = files.map((filename) => {
    const raw = fs.readFileSync(path.join(directory, filename), "utf-8");
    const { data } = matter(raw);
    const slug = filename.replace(/\.md$/, "");
    return {
      slug: data.title || slug,
      title: data.name || data.title || slug,
      category: data.category || "general",
      date: data.date || "",
      summary: data.summary || "",
      hashtags: parseHashtags(data.hashtags || data.tags),
      img1: data.img1 || "",
    };
  });

  return { props: { entries } };
}

function TailwindSelect({ value, onChange, options, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = options.find((o) => o.id === value);

  useEffect(() => {
    const onDoc = (ev) => {
      if (ref.current && !ref.current.contains(ev.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative min-w-0 flex-1" ref={ref}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 border border-black/10 bg-white px-3 py-2 text-left text-[13px] font-medium text-slate-700 dark:border-white/10 dark:bg-[#16181c] dark:text-slate-200"
      >
        <span className="truncate">{current?.label}</span>
        <HiChevronDown className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-auto border border-black/10 bg-white py-1 shadow-lg dark:border-white/10 dark:bg-[#16181c]">
          {options.map((opt) => (
            <li key={opt.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-[13px] ${
                  value === opt.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                    : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function PostActions() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes] = useState(12);
  const [shares] = useState(3);

  return (
    <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/10">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          className={`inline-flex items-center gap-1 text-[12px] ${
            liked ? "text-rose-500" : "text-slate-500 hover:text-rose-500"
          }`}
          aria-label="Like"
        >
          {liked ? <HiHeart className="h-4 w-4" /> : <HiOutlineHeart className="h-4 w-4" />}
          {likes + (liked ? 1 : 0)}
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-[12px] text-slate-500 hover:text-sky-500"
          aria-label="Share"
        >
          <HiOutlineShare className="h-4 w-4" />
          {shares}
        </button>
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          className={`inline-flex items-center gap-1 text-[12px] ${
            saved ? "text-amber-500" : "text-slate-500 hover:text-amber-500"
          }`}
          aria-label="Bookmark"
        >
          {saved ? <HiBookmark className="h-4 w-4" /> : <HiOutlineBookmark className="h-4 w-4" />}
        </button>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-1 text-[12px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        aria-label="Report"
      >
        <HiOutlineFlag className="h-4 w-4" />
      </button>
    </div>
  );
}

function PostCard({ entry }) {
  const cat = getJourneyCategory(entry.category);
  return (
    <article className="overflow-hidden border border-black/10 bg-white dark:border-white/10 dark:bg-[#16181c]">
      <div className={`h-1 w-full ${cat.bar}`} />
      <div className="p-4">
        <div className="mb-3 flex items-start gap-3">
          <img
            src={AVATAR}
            alt={SOCIAL_PROFILE.name}
            className="h-10 w-10 shrink-0 object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="text-[14px] font-semibold text-slate-900 dark:text-white">
                {SOCIAL_PROFILE.name}
              </span>
              <span className="text-[12px] text-slate-500">@{SOCIAL_PROFILE.displayHandle}</span>
              <span className="text-[12px] text-slate-400">· {formatRelative(entry.date)}</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold ${cat.bg} ${cat.text}`}>
                {cat.label}
              </span>
              <span className="text-[11px] text-slate-400">{formatWhen(entry.date)}</span>
            </div>
          </div>
        </div>
        <h2 className="mb-1.5 font-serif text-[17px] font-semibold leading-snug text-slate-900 dark:text-white">
          {entry.title}
        </h2>
        {entry.summary ? (
          <p className="mb-3 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">
            {entry.summary}
          </p>
        ) : null}
        {entry.img1 ? (
          <div className="mb-3 overflow-hidden border border-black/5 dark:border-white/10">
            <img src={entry.img1} alt="" className="h-48 w-full object-cover" />
          </div>
        ) : null}
        {entry.hashtags.length ? (
          <div className="flex flex-wrap gap-1.5">
            {entry.hashtags.map((tag) => (
              <span key={tag} className="text-[12px] font-medium text-sky-600 dark:text-sky-400">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        <PostActions />
      </div>
    </article>
  );
}

function JourneyPage({ entries = [] }) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("new");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = entries.filter((e) => {
      if (filter !== "all" && e.category !== filter) return false;
      if (!q) return true;
      const hay = `${e.title} ${e.summary} ${e.hashtags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
    return [...list].sort((a, b) => {
      const da = parseEntryDate(a.date)?.valueOf() || 0;
      const db = parseEntryDate(b.date)?.valueOf() || 0;
      return sortBy === "old" ? da - db : db - da;
    });
  }, [entries, filter, sortBy, query]);

  const ogImage = entries[0]?.img1 || undefined;

  return (
    <div className="min-h-screen bg-[#faf8f4] dark:bg-[#0c0e12]">
      <CommonHeadTags
        title="Life Archive — Ashutosh Anand Tiwari"
        url="https://www.heyashu.in/journey"
        shortDec="A living record of books, films, travel, people, and moments."
        mainDesc="Ashutosh’s personal life archive — books, webseries, travel, family, dishes, and anything worth remembering."
        tags="Life Archive, Journey, Ashutosh Anand Tiwari, heyashu"
        image={ogImage}
      />

      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#faf8f4]/90 backdrop-blur-md dark:border-white/10 dark:bg-[#0c0e12]/90">
        <div className="mx-auto max-w-[540px] px-4 py-3">
          <div className="flex items-center gap-2">
            <HiOutlineArchiveBox className="h-6 w-6 text-violet-500" />
            <p className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text font-serif text-2xl font-bold tracking-tight text-transparent">
              Archives
            </p>
          </div>
          <Link
            href="/"
            className="mt-0.5 inline-block text-[10px] leading-none text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[540px] px-4 pb-16 pt-5">
      <div className="relative mb-3">
        <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts, tags, moments…"
          className="w-full border border-black/10 bg-white py-2.5 pl-9 pr-4 text-[13px] text-slate-800 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-violet-400/40 dark:border-white/10 dark:bg-[#16181c] dark:text-slate-100"
        />
      </div>

      <div className="mb-6 flex gap-2">
        <TailwindSelect
          label="Filter by type"
          value={filter}
          onChange={setFilter}
          options={JOURNEY_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))}
        />
        <TailwindSelect
          label="Sort posts"
          value={sortBy}
          onChange={setSortBy}
          options={SORT_OPTIONS}
        />
      </div>

      <div className="mb-4 flex items-end justify-between gap-3">
        <h1 className="font-serif text-[1.65rem] font-semibold italic tracking-tight text-slate-900 dark:text-white">
          Ashu&apos;s Achievements
        </h1>
        <span className="shrink-0 pb-1 text-[12px] font-medium text-slate-500">
          {entries.length} {entries.length === 1 ? "post" : "posts"}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.length ? (
          filtered.map((entry, i) => (
            <motion.div
              key={entry.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.2) }}
            >
              <PostCard entry={entry} />
            </motion.div>
          ))
        ) : (
          <p className="py-10 text-center text-sm text-slate-500">No posts match this yet.</p>
        )}
      </div>
      </div>
    </div>
  );
}

export default JourneyPage;
JourneyPage.getLayout = withBareLayout;

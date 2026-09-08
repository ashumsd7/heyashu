import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown, HiMagnifyingGlass } from "react-icons/hi2";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import { withDigitalGardenLayout } from "@/layouts";
import { metaTagsForAiInterviewHandbook } from "@/data/note/ai-clopedia/meta-tags";
import { PAGE_TITLE } from "@/data/note/ai-clopedia/constant";

const SORT_OPTIONS = [
  { id: "default", label: "Default" },
  { id: "old", label: "Old watered" },
  { id: "new", label: "Newly watered" },
];

const HANDBOOK_FILTER_TAGS = [
  { id: "PromptEngineering", label: "#PromptEngineering" },
  { id: "GenAI", label: "#GenAI" },
  { id: "LLM", label: "#LLM" },
  { id: "ArtificialIntelligence", label: "#ArtificialIntelligence" },
];

function parseHandbookTags(tags) {
  if (!tags) return [];
  const raw = Array.isArray(tags) ? tags : String(tags).split(",");
  return raw
    .map((t) => String(t).replace(/^[#\s]+/, "").trim())
    .filter(Boolean);
}

function formatCardDate(raw) {
  if (!raw) return "";
  const parts = String(raw).trim().split(/[-/]/);
  if (parts.length !== 3) return String(raw);
  let day;
  let month;
  let year;
  if (parts[0].length === 4) {
    year = Number(parts[0]);
    month = Number(parts[1]);
    day = Number(parts[2]);
  } else {
    const a = Number(parts[0]);
    const b = Number(parts[1]);
    year = parts[2].length === 2 ? Number(`20${parts[2]}`) : Number(parts[2]);
    if (a > 12) {
      day = a;
      month = b;
    } else {
      month = a;
      day = b;
    }
  }
  const d = new Date(year, month - 1, day);
  if (Number.isNaN(d.getTime())) return String(raw);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function timestampFromDate(raw) {
  if (!raw) return 0;
  const parts = String(raw).trim().split(/[-/]/);
  if (parts.length !== 3) {
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? 0 : d.getTime();
  }
  let day;
  let month;
  let year;
  if (parts[0].length === 4) {
    year = Number(parts[0]);
    month = Number(parts[1]);
    day = Number(parts[2]);
  } else {
    const a = Number(parts[0]);
    const b = Number(parts[1]);
    year = parts[2].length === 2 ? Number(`20${parts[2]}`) : Number(parts[2]);
    if (a > 12) {
      day = a;
      month = b;
    } else {
      month = a;
      day = b;
    }
  }
  const d = new Date(year, month - 1, day);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

function HandbookPage({ posts }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = (posts || []).filter((post) => {
      const hay = `${post.title} ${post.slug} ${post.category} ${post.tags.join(" ")}`.toLowerCase();
      const matchesSearch = !q || hay.includes(q);
      const matchesTag =
        activeTag === "all" ||
        post.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
      return matchesSearch && matchesTag;
    });

    if (sortBy === "new") {
      list = [...list].sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === "old") {
      list = [...list].sort((a, b) => a.timestamp - b.timestamp);
    } else {
      list = [...list].sort(
        (a, b) => (a.episode || 0) - (b.episode || 0) || a.title.localeCompare(b.title)
      );
    }
    return list;
  }, [posts, query, activeTag, sortBy]);

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.id === sortBy)?.label || "Default";

  return (
    <div className="bg-[#f7f4ee] dark:bg-[#0b120e]">
      <CommonHeadTags
        title={metaTagsForAiInterviewHandbook.title}
        url={`https://www.heyashu.in${metaTagsForAiInterviewHandbook.coursePath}`}
        image={metaTagsForAiInterviewHandbook.ogImage}
        shortDec={metaTagsForAiInterviewHandbook.ogDescription}
        mainDesc={metaTagsForAiInterviewHandbook.description}
        tags={metaTagsForAiInterviewHandbook.keywords}
      />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-14">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="mb-0 font-fraunces text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[#171717] dark:text-[#f0f4ef]">
            {PAGE_TITLE}
          </h1>
          <Link
            href="/contributing-guide?type=new"
            className="inline-flex shrink-0 items-center self-start rounded-sm bg-[#1f2a22] px-5 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-[#143825] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
          >
            Add Topic
          </Link>
        </div>
        <p className="mb-8 max-w-2xl text-[1.05rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
          Curated learner topics that can be asked in interviews. Review these
          notes, and contribute anything besides as your topic.
        </p>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative min-w-0 w-full max-w-xl">
            <HiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8276]" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              aria-label="Search AI Interview QnA Handbook"
              className="w-full rounded-full border border-[#e0d9cd] bg-white py-3 pl-11 pr-4 text-sm text-[#171717] outline-none transition placeholder:text-[#9a9286] focus:border-[#9a4f2e]/50 focus:ring-2 focus:ring-[#9a4f2e]/15 dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
            />
          </div>

          <div ref={sortRef} className="relative w-full sm:ml-auto sm:w-auto">
            <div className="flex w-full items-center justify-start gap-2.5 sm:justify-end">
              <span className="whitespace-nowrap text-sm font-medium text-[#6b6458] dark:text-[#92a59a]">
                Sort by
              </span>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((v) => !v)}
                className="inline-flex min-w-0 flex-1 items-center justify-between gap-3 rounded-full border border-[#e0d9cd] bg-white px-4 py-3 text-left text-sm text-[#171717] transition hover:border-[#cfc6b8] focus:outline-none focus:ring-2 focus:ring-[#9a4f2e]/15 dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef] sm:w-[200px] sm:flex-none"
              >
                <span className="truncate">{activeSortLabel}</span>
                <HiChevronDown
                  className={`h-4 w-4 shrink-0 text-[#8a8276] transition ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            <AnimatePresence>
              {sortOpen ? (
                <motion.ul
                  role="listbox"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute left-0 z-30 mt-2 w-full overflow-hidden rounded-2xl border border-[#e0d9cd] bg-white py-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:border-[#1e3328] dark:bg-[#121e17] sm:left-auto sm:right-0 sm:w-[200px]"
                >
                  {SORT_OPTIONS.map((opt) => {
                    const active = sortBy === opt.id;
                    return (
                      <li key={opt.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            setSortBy(opt.id);
                            setSortOpen(false);
                          }}
                          className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition ${
                            active
                              ? "bg-[#1f2a22] text-white dark:bg-[#22c55e] dark:text-[#0b120e]"
                              : "text-[#3f3a34] hover:bg-[#f3eee5] dark:text-[#f0f4ef] dark:hover:bg-[#172a20]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTag("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTag === "all"
                ? "bg-[#1f2a22] text-white dark:bg-[#22c55e] dark:text-[#0b120e]"
                : "bg-[#ece7de] text-[#5f584e] hover:bg-[#e0d9cd] dark:bg-[#172a20] dark:text-[#92a59a]"
            }`}
          >
            All
          </button>
          {HANDBOOK_FILTER_TAGS.map((tag) => {
            const selected = activeTag.toLowerCase() === tag.id.toLowerCase();
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => setActiveTag(tag.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? "bg-[#1f2a22] text-white dark:bg-[#22c55e] dark:text-[#0b120e]"
                    : "bg-[#ece7de] text-[#5f584e] hover:bg-[#e0d9cd] dark:bg-[#172a20] dark:text-[#92a59a]"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-[15px] text-[#8a8276] dark:text-[#92a59a]">
            No matching notes.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[180px] flex-col rounded-sm border border-[#e6e0d6] bg-white p-6 no-underline transition hover:-translate-y-0.5 hover:border-[#143825] hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] dark:border-[#1e3328] dark:bg-[#121e17] dark:hover:border-[#22c55e]"
              >
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.cardTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] font-medium text-[#9a4f2e] dark:text-[#22c55e]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="m-0 font-fraunces text-[1.15rem] font-bold leading-snug text-[#171717] dark:text-[#f0f4ef]">
                  {post.title}
                </h2>
                <div className="mt-auto flex items-end justify-between gap-3 pt-6 text-[13px] text-[#8a8276] dark:text-[#92a59a]">
                  <span className="font-medium text-[#3f3a34] dark:text-[#d5ddd7]">
                    {post.author}
                  </span>
                  <span>{post.dateLabel}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <DigiGardenFooter />
    </div>
  );
}

export default HandbookPage;

HandbookPage.getLayout = withDigitalGardenLayout;

export async function getStaticProps() {
  const directory = path.join(process.cwd(), "src/content/ai-clopedia");
  const posts = fs
    .readdirSync(directory)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(directory, filename), "utf-8");
      const { data } = matter(raw);
      const slug = filename.replace(/\.md$/, "");
      const tags = parseHandbookTags(data.tags);
      const uniqueTags = [];
      const seen = new Set();
      tags.forEach((tag) => {
        const key = tag.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        uniqueTags.push(tag);
      });
      const published = data.publishedOn || data.date || data.updatedOn || "";
      return {
        slug,
        title: data.name || data.title || slug,
        category: data.category || "",
        tags: uniqueTags,
        cardTags: uniqueTags.slice(0, 2),
        author: data.author || "Ashutosh Anand Tiwari",
        dateLabel: formatCardDate(published),
        timestamp: timestampFromDate(published),
        episode: Number(data.episode) || 0,
      };
    });

  return { props: { posts } };
}

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown, HiMagnifyingGlass, HiOutlineLightBulb, HiOutlineSparkles } from "react-icons/hi2";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import { withDigitalGardenLayout } from "@/layouts";
import { generateSlug } from "@/utils/functions";
import { firstMarkdownImage } from "@/data/garden/utils";
import { resolveLocalImageSrc } from "@/utils/publicImage";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "javascript", label: "Javascript" },
  { id: "nodejs", label: "Nodejs" },
  { id: "frontend", label: "Frontend" },
  { id: "python", label: "Python" },
  { id: "interview", label: "Interview" },
  { id: "ai", label: "AI Blogs" },
];

const SORT_OPTIONS = [
  { id: "default", label: "Default" },
  { id: "old", label: "Old watered" },
  { id: "new", label: "Newly watered" },
];

const PAGE_SIZE = 12;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: Math.min(i * 0.045, 0.35),
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

const CATEGORY_MATCHERS = {
  javascript: ["javascript", "js", "ecmascript", "typescript", "ts"],
  nodejs: ["nodejs", "node.js", "node", "backend", "express"],
  frontend: ["frontend", "front-end", "react", "css", "html", "ui", "system design", "design system"],
  python: ["python", "django", "flask", "fastapi", "pandas", "numpy"],
  interview: ["interview", "dsa", "coding interview", "system design"],
  ai: ["ai", "llm", "openai", "chatgpt", "gpt", "machine learning", "ml", "prompt"],
};

const FOLDER_CATEGORY = {
  blog: null,
  experience: null,
  jsSnippets: "javascript",
  nodejsProcodrr: "nodejs",
  fsd: "frontend",
  nodejsS1AkshaySaini: "nodejs",
  namasteAiNotes: "ai",
  ydkjs: "javascript",
  stories: null,
};

function shuffleArray(items = []) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getPostTimestamp(post) {
  const raw =
    post?.frontMatter?.updateDate ||
    post?.frontMatter?.publishedOn ||
    post?.frontMatter?.date;
  if (!raw) return 0;
  const parts = String(raw).trim().split(/[-/]/);
  if (parts.length === 3) {
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
    if (!Number.isNaN(d.getTime())) return d.getTime();
  }
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

function parseTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim().toLowerCase()).filter(Boolean);
  return String(tags)
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

function getSearchText(content = "") {
  return String(content)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[#>*_`~]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 2000);
}

function getExcerpt(content = "", description = "") {
  if (description) return description;
  const clean = String(content)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[#>*_`~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return "Open this entry to read the full note from the digital garden.";
  return clean.length > 160 ? `${clean.slice(0, 160).trim()}…` : clean;
}

function formatBlogDate(raw) {
  if (!raw) return "Recently";
  const parts = String(raw).trim().split(/[-/]/);
  if (parts.length === 3) {
    let day;
    let month;
    let year;
    if (parts[0].length === 4) {
      year = Number(parts[0]);
      month = Number(parts[1]);
      day = Number(parts[2]);
    } else if (parts[2].length === 4 || parts[2].length === 2) {
      // MM-DD-YYYY or DD-MM-YYYY — prefer MM-DD when first <= 12
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
    if (month >= 1 && month <= 12 && day >= 1) {
      const d = new Date(year, month - 1, day);
      if (!Number.isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    }
  }
  const d = new Date(raw);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return raw;
}

function matchesCategory(post, categoryId) {
  if (categoryId === "all") return true;

  const tags = parseTags(post.frontMatter?.tags);
  const haystack = [
    ...tags,
    post.frontMatter?.title,
    post.frontMatter?.name,
    post.frontMatter?.description,
    post.folder,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const folderCat = FOLDER_CATEGORY[post.folder];
  if (folderCat === categoryId) return true;

  const keys = CATEGORY_MATCHERS[categoryId] || [];
  return keys.some((k) => haystack.includes(k));
}

function normalizeThumb(src) {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  return src.replace(/^\/public/, "") || null;
}

function getPostHref(post) {
  const title = post.frontMatter?.title || post.frontMatter?.name || post.slug;
  return `/blog/${generateSlug(title) || post.slug}`;
}

function categoryLabel(post) {
  const tags = parseTags(post.frontMatter?.tags);
  if (tags[0]) return tags[0].replace(/-/g, " ");
  if (FOLDER_CATEGORY[post.folder]) return FOLDER_CATEGORY[post.folder];
  return "Note";
}

export async function getStaticProps() {
  const contentFolders = {
    blog: path.join(process.cwd(), "src/content/blog"),
    experience: path.join(process.cwd(), "src/content/experience"),
    jsSnippets: path.join(process.cwd(), "src/content/js-snippets"),
    nodejsProcodrr: path.join(process.cwd(), "src/content/node-js-procodrr"),
    fsd: path.join(process.cwd(), "src/content/front-end-design-system"),
    nodejsS1AkshaySaini: path.join(
      process.cwd(),
      "src/content/notes-namaste-node-js"
    ),
    namasteAiNotes: path.join(process.cwd(), "src/content/namaste-ai-notes"),
    ydkjs: path.join(process.cwd(), "src/content/ydkjs"),
    stories: path.join(process.cwd(), "src/content/stories"),
  };

  let posts = [];

  for (const [folderKey, folderPath] of Object.entries(contentFolders)) {
    try {
      const folderFileNames = fs.readdirSync(folderPath);

      folderFileNames.forEach((filename) => {
        const filePath = path.join(folderPath, filename);

        if (filename.endsWith(".md")) {
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const { data: frontMatter, content } = matter(fileContent);
          const collection =
            folderKey === "namasteAiNotes" ? "namaste-ai-notes" : undefined;
          const thumbFromBody = firstMarkdownImage(content);

          posts.push({
            frontMatter: {
              ...frontMatter,
              thumbnail: resolveLocalImageSrc(
                String(frontMatter?.thumbnail || "").trim() || thumbFromBody,
                { collection }
              ),
            },
            excerpt: getExcerpt(
              content,
              frontMatter?.description || frontMatter?.metaContent
            ),
            searchText: getSearchText(content),
            slug: filename.replace(".md", ""),
            folder: folderKey,
          });
        }
      });
    } catch (error) {
      console.error(`Error reading files from ${folderPath}: `, error);
    }
  }

  return {
    props: {
      posts,
    },
  };
}

function NoteCard({ post, variant = "text", onOpen, index = 0 }) {
  const title = post.frontMatter?.name || post.frontMatter?.title || "Untitled";
  const excerpt =
    post.excerpt ||
    getExcerpt(post.content, post.frontMatter?.description || post.frontMatter?.metaContent);
  const dateLabel = formatBlogDate(post.frontMatter?.publishedOn || post.frontMatter?.date);
  const cat = categoryLabel(post);
  const thumb = normalizeThumb(post.frontMatter?.thumbnail);

  if (variant === "quote") {
    return (
      <motion.article
        layout
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        whileHover={{ y: -3 }}
        onClick={onOpen}
        className="mb-5 break-inside-avoid cursor-pointer rounded-sm bg-[#e7e1d4] px-7 py-10 text-center"
      >
        <div className="mb-4 font-fraunces text-5xl leading-none text-[#9a4f2e]">“</div>
        <p className="mx-auto max-w-[22ch] font-fraunces text-[1.35rem] font-semibold leading-snug text-[#1c1c1c]">
          {title}
        </p>
        <p className="mt-8 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[#6b6458]">
          — {cat}
        </p>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -3 }}
      onClick={onOpen}
      className="group mb-5 break-inside-avoid cursor-pointer overflow-hidden rounded-sm border border-[#e6e0d6] bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:border-[#1e3328] dark:bg-[#121e17]"
    >
      {variant === "image" && thumb ? (
        <div className="overflow-hidden border-b border-[#ece7de] dark:border-[#1e3328]">
          <img
            src={thumb}
            alt={title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover grayscale transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        </div>
      ) : null}

      <div className="p-6 md:p-7">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="font-fraunces text-[0.95rem] capitalize text-[#9a4f2e]">
            {cat}
          </span>
          {variant === "image" ? (
            <HiOutlineSparkles className="h-5 w-5 text-[#cfc7b8]" />
          ) : (
            <HiOutlineLightBulb className="h-5 w-5 text-[#cfc7b8]" />
          )}
        </div>

        <h3 className="mb-3 font-fraunces text-[1.55rem] font-semibold leading-snug text-[#171717] dark:text-[#f0f4ef]">
          {title}
        </h3>

        <p className="mb-8 text-[0.95rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
          {excerpt}
        </p>

        <div className="flex items-center justify-between gap-3 border-t border-[#ece7de] pt-4 text-sm dark:border-[#1e3328]">
          <span className="text-[#8a8276]">{dateLabel}</span>
          <span className="font-medium text-[#1c1c1c] transition group-hover:text-[#9a4f2e] dark:text-[#f0f4ef]">
            Read Full Blog
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function BlogsPage({ posts }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [shuffledPosts, setShuffledPosts] = useState(posts || []);
  const [featuredPost, setFeaturedPost] = useState(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const shuffled = shuffleArray(posts || []);
    setShuffledPosts(shuffled);

    const withThumb = shuffled.filter((p) => normalizeThumb(p.frontMatter?.thumbnail));
    const pool = withThumb.length > 0 ? withThumb : shuffled;
    setFeaturedPost(pool.length ? pool[Math.floor(Math.random() * pool.length)] : null);
  }, [posts]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 220);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filteredPosts = useMemo(() => {
    const q = debouncedSearch.toLowerCase();

    let filtered = (shuffledPosts || []).filter((post) => {
      const title = (post.frontMatter?.title || post.frontMatter?.name || "").toLowerCase();
      const desc = (
        post.frontMatter?.description ||
        post.frontMatter?.metaContent ||
        ""
      ).toLowerCase();
      const tags = parseTags(post.frontMatter?.tags).join(" ");

      const matchesSearch =
        !q ||
        title.includes(q) ||
        desc.includes(q) ||
        tags.includes(q) ||
        (post.searchText || post.content || "").toLowerCase().includes(q);

      return matchesSearch && matchesCategory(post, selectedCategory);
    });

    if (sortBy === "new") {
      filtered = [...filtered].sort((a, b) => getPostTimestamp(b) - getPostTimestamp(a));
    } else if (sortBy === "old") {
      filtered = [...filtered].sort((a, b) => getPostTimestamp(a) - getPostTimestamp(b));
    }
    // default → keep load shuffle order

    return filtered;
  }, [shuffledPosts, debouncedSearch, selectedCategory, sortBy]);

  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter(
      (p) => !(p.slug === featuredPost.slug && p.folder === featuredPost.folder)
    );
  }, [filteredPosts, featuredPost]);

  const visiblePosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;
  const listKey = `${selectedCategory}::${debouncedSearch}::${sortBy}`;

  const openPost = (post) => {
    router.push(getPostHref(post));
  };

  const onFilter = (id) => {
    setSelectedCategory(id);
    setVisibleCount(PAGE_SIZE);
  };

  const onSortChange = (value) => {
    setSortBy(value);
    setSortOpen(false);
    setVisibleCount(PAGE_SIZE);
  };

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.id === sortBy)?.label || "Default";

  return (
    <div className="bg-[#f7f4ee] dark:bg-[#0b120e]">
      <CommonHeadTags
        image="https://i.ibb.co/Cm127c4/blogs-thumb.jpg"
        title="Index of Blogs — Digital Garden | heyashu"
        url="https://www.heyashu.in/blog"
      />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 md:pt-16">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-10 max-w-2xl"
        >
          <h1 className="mb-4 font-fraunces text-[clamp(2.6rem,6vw,4.4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#171717] dark:text-[#f0f4ef]">
            Index of Blogs
          </h1>
          <p className="text-[1.05rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
            A curated collection of thoughts, observations, and engineering notes —
            sifted from daily reading, courses, and ongoing research.
          </p>
        </motion.header>

        {/* Featured full-width card */}
        {featuredPost ? (
          <motion.article
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.08 }}
            whileHover={{ y: -2 }}
            onClick={() => openPost(featuredPost)}
            className="mb-8 grid cursor-pointer grid-cols-1 overflow-hidden rounded-md border border-[#e6e0d6] bg-white hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] dark:border-[#1e3328] dark:bg-[#121e17] md:grid-cols-[1.35fr_1fr]"
          >
            <div className="flex flex-col justify-between p-7 md:p-9">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#ece7de] px-3 py-1 text-xs font-medium capitalize text-[#5f584e] dark:bg-[#172a20] dark:text-[#92a59a]">
                    {categoryLabel(featuredPost)}
                  </span>
                  <span className="text-sm text-[#8a8276]">
                    {formatBlogDate(
                      featuredPost.frontMatter?.publishedOn ||
                        featuredPost.frontMatter?.date
                    )}
                  </span>
                </div>

                <h2 className="mb-4 max-w-[18ch] font-fraunces text-[clamp(1.7rem,3.2vw,2.35rem)] font-semibold leading-[1.15] text-[#171717] dark:text-[#f0f4ef]">
                  {featuredPost.frontMatter?.name ||
                    featuredPost.frontMatter?.title ||
                    "Untitled"}
                </h2>

                <p className="mb-8 max-w-[52ch] text-[0.98rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
                  {featuredPost.excerpt ||
                    getExcerpt(
                      featuredPost.content,
                      featuredPost.frontMatter?.description ||
                        featuredPost.frontMatter?.metaContent
                    )}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      normalizeThumb(featuredPost.frontMatter?.profilePic) ||
                      "https://i.ibb.co/v71k25N/pfpppp.png"
                    }
                    alt={featuredPost.frontMatter?.author || "Author"}
                    className="h-9 w-9 rounded-full object-cover grayscale"
                  />
                  <span className="text-sm font-medium text-[#1c1c1c] dark:text-[#f0f4ef]">
                    {featuredPost.frontMatter?.author || "Ashutosh Anand Tiwari"}
                  </span>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openPost(featuredPost);
                  }}
                  className="rounded-sm bg-[#1f2a22] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#143825] dark:bg-[#22c55e] dark:text-[#0b120e] dark:hover:bg-[#16a34a]"
                >
                  Read Full Blog
                </motion.button>
              </div>
            </div>

            <div className="min-h-[240px] overflow-hidden border-t border-[#ece7de] dark:border-[#1e3328] md:min-h-full md:border-l md:border-t-0">
              <img
                src={
                  normalizeThumb(featuredPost.frontMatter?.thumbnail) ||
                  "https://i.ibb.co/Cm127c4/blogs-thumb.jpg"
                }
                alt={
                  featuredPost.frontMatter?.name ||
                  featuredPost.frontMatter?.title ||
                  "Featured blog"
                }
                className="h-full w-full object-cover grayscale"
                loading="eager"
              />
            </div>
          </motion.article>
        ) : null}

        {/* Search + Sort */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.12 }}
          className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="relative min-w-0 w-full max-w-xl">
            <HiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8276]" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search blogs, tags, or topics…"
              className="w-full rounded-full border border-[#e0d9cd] bg-white py-3 pl-11 pr-4 text-sm text-[#171717] outline-none transition placeholder:text-[#9a9286] focus:border-[#9a4f2e]/50 focus:ring-2 focus:ring-[#9a4f2e]/15 dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
            />
          </div>

          <div ref={sortRef} className="relative ml-auto w-full sm:w-auto">
            <div className="flex items-center justify-end gap-2.5">
              <span className="whitespace-nowrap text-sm font-medium text-[#6b6458] dark:text-[#92a59a]">
                Sort by
              </span>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                onClick={() => setSortOpen((v) => !v)}
                className="inline-flex w-[200px] items-center justify-between gap-3 rounded-full border border-[#e0d9cd] bg-white px-4 py-3 text-left text-sm text-[#171717] transition hover:border-[#cfc6b8] focus:outline-none focus:ring-2 focus:ring-[#9a4f2e]/15 dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
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
                  className="absolute right-0 z-30 mt-2 w-[200px] overflow-hidden rounded-2xl border border-[#e0d9cd] bg-white py-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:border-[#1e3328] dark:bg-[#121e17]"
                >
                  {SORT_OPTIONS.map((opt) => {
                    const active = sortBy === opt.id;
                    return (
                      <li key={opt.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => onSortChange(opt.id)}
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
        </motion.div>

        {/* Filter chips */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.16 }}
          className="mb-10 flex flex-wrap gap-2.5"
        >
          {FILTERS.map((filter) => {
            const active = selectedCategory === filter.id;
            return (
              <motion.button
                key={filter.id}
                type="button"
                layout
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onFilter(filter.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#1f2a22] text-white dark:bg-[#22c55e] dark:text-[#0b120e]"
                    : "bg-[#ebe6dc] text-[#5f584e] hover:bg-[#e2dbcf] dark:bg-[#172a20] dark:text-[#92a59a]"
                }`}
              >
                {filter.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          {visiblePosts.length > 0 ? (
            <motion.div
              key={listKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="columns-1 gap-5 md:columns-2 lg:columns-3"
            >
              <AnimatePresence initial={false}>
                {visiblePosts.map((post, index) => {
                  const thumb = normalizeThumb(post.frontMatter?.thumbnail);
                  let variant = "text";
                  if (index % 7 === 5) variant = "quote";
                  else if (thumb && (index % 4 === 2 || index % 5 === 0)) variant = "image";

                  return (
                    <NoteCard
                      key={`${listKey}-${post.folder}-${post.slug}`}
                      post={post}
                      variant={variant}
                      index={index}
                      onOpen={() => openPost(post)}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key={`empty-${listKey}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-sm border border-dashed border-[#d9d2c5] bg-white/60 px-6 py-16 text-center dark:border-[#1e3328] dark:bg-[#121e17]/60"
            >
              <p className="font-fraunces text-2xl text-[#171717] dark:text-[#f0f4ef]">
                No blogs found
              </p>
              <p className="mt-2 text-sm text-[#6b6458] dark:text-[#92a59a]">
                Try another filter or clear the search.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {hasMore ? (
          <div className="mt-12 flex justify-center">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
              className="rounded-sm border border-[#1c1c1c] bg-transparent px-8 py-3 text-sm font-medium tracking-wide text-[#1c1c1c] transition hover:bg-[#1c1c1c] hover:text-white dark:border-[#f0f4ef] dark:text-[#f0f4ef] dark:hover:bg-[#f0f4ef] dark:hover:text-[#0b120e]"
            >
              Load Older Blogs
            </motion.button>
          </div>
        ) : null}

        <p className="mt-6 text-center text-xs text-[#8a8276]">
          Showing {Math.min(visibleCount, gridPosts.length)} of {gridPosts.length} blogs
        </p>
      </section>

      <DigiGardenFooter />
    </div>
  );
}

export default BlogsPage;

BlogsPage.getLayout = withDigitalGardenLayout;

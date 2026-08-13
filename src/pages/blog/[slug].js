import React, { useMemo, useState } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineBookmark,
  HiOutlineShare,
  HiOutlineArrowDownTray,
  HiOutlineSpeakerWave,
  HiBolt,
  HiSparkles,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import MDXRenderer from "@/components/base/MDXRenderer";
import CommonSlugHeadTags from "@/components/seo/CommonSlugHeadTags";
import ContentFooter from "@/components/garden/ContentFooter";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import GardenCollabCard from "@/components/garden/GardenCollabCard";
import AIQuestionWrapper from "@/components/garden/AIQuestionWrapper";
import QuickReaderDrawer from "@/components/garden/AI/QuickReaderDrawer";
import QuestionsListDrawer from "@/components/garden/AI/QuestionsListDrawer";
import { withDigitalGardenLayout } from "@/layouts";
import { estimateReadingTime } from "@/utils/functions";
import { DEFAULT_AVATAR } from "@/utils/constant";

dayjs.extend(customParseFormat);

const contentFolders = [
  "src/content/blog",
  "src/content/experience",
  "src/content/js-snippets",
  "src/content/node-js-procodrr",
  "src/content/notes-namaste-node-js",
  "src/content/stories",
  "src/content/front-end-design-system",
];

function changeFilePath(filePath = "") {
  return filePath.replace("/public", "");
}

function formatPublishedDate(raw) {
  if (!raw) return "Recently";
  const formats = ["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY"];
  for (const f of formats) {
    const d = dayjs(raw, f, true);
    if (d.isValid()) return d.format("MMM D, YYYY");
  }
  const d = dayjs(raw);
  return d.isValid() ? d.format("MMM D, YYYY") : String(raw);
}

export async function getStaticProps({ params }) {
  let filePath;
  for (const folder of contentFolders) {
    const possiblePath = path.join(process.cwd(), folder, `${params.slug}.md`);
    if (fs.existsSync(possiblePath)) {
      filePath = possiblePath;
      break;
    }
  }

  if (!filePath) {
    return { notFound: true };
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  // Related posts for "Continue Exploring"
  let related = [];
  try {
    const all = [];
    for (const folder of contentFolders) {
      const dir = path.join(process.cwd(), folder);
      if (!fs.existsSync(dir)) continue;
      fs.readdirSync(dir)
        .filter((f) => f.endsWith(".md") && f.replace(".md", "") !== params.slug)
        .forEach((filename) => {
          const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
          const { data: fm } = matter(raw);
          all.push({
            slug: filename.replace(".md", ""),
            title: fm.name || fm.title || filename,
            description:
              fm.description ||
              fm.metaContent ||
              "Continue exploring notes from the digital garden.",
            label: folder.includes("blog") ? "ESSAY" : "COLLECTION",
          });
        });
    }
    // stable-ish pick: shuffle then take 2
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    related = all.slice(0, 2);
  } catch (e) {
    related = [];
  }

  return {
    props: {
      frontMatter: data,
      mdxSource,
      related,
      slug: params.slug,
    },
  };
}

export async function getStaticPaths() {
  let paths = [];

  contentFolders.forEach((folder) => {
    const dir = path.join(process.cwd(), folder);
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    const folderPaths = files
      .filter((f) => f.endsWith(".md"))
      .map((fileName) => ({
        params: { slug: fileName.replace(".md", "") },
      }));
    paths = [...paths, ...folderPaths];
  });

  return {
    paths,
    fallback: false,
  };
}

export default function BlogPost({ frontMatter, mdxSource, related = [], slug }) {
  const [quickOpen, setQuickOpen] = useState(false);
  const [qnaOpen, setQnaOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [fontScale, setFontScale] = useState(0); // -2..3 steps

  const title = frontMatter?.name || frontMatter?.title || "Untitled";
  const subtitle =
    frontMatter?.description ||
    frontMatter?.metaContent ||
    frontMatter?.metaName ||
    "";
  const publishedOn = formatPublishedDate(
    frontMatter?.publishedOn || frontMatter?.date
  );
  const readMins = useMemo(() => {
    const mins = estimateReadingTime(mdxSource?.compiledSource);
    return mins ? `${mins} min read` : "5 min read";
  }, [mdxSource]);
  const author = frontMatter?.author || "Ashutosh Anand Tiwari";
  const avatar = frontMatter?.profilePic
    ? changeFilePath(frontMatter.profilePic)
    : DEFAULT_AVATAR;
  const thumb = frontMatter?.thumbnail
    ? frontMatter.thumbnail.includes("https")
      ? frontMatter.thumbnail
      : changeFilePath(frontMatter.thumbnail)
    : null;

  const bodyFontPx = 14 + fontScale; // base 14px, adjustable

  const bumpFont = (dir) => {
    setFontScale((s) => Math.max(-2, Math.min(4, s + dir)));
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link copied");
      }
    } catch (_) {}
  };

  const handleBookmark = () => {
    alert(
      "Press " +
        (navigator.userAgent.toLowerCase().includes("mac") ? "Cmd" : "Ctrl") +
        " + D to bookmark this page."
    );
  };

  const handleDownload = () => {
    window.print();
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const article = document.getElementById("garden-blog-article");
    const text = article?.innerText || title;
    const utter = new SpeechSynthesisUtterance(text.slice(0, 12000));
    utter.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="bg-[#f7f4ee] text-[#1c1c1c] dark:bg-[#0b120e] dark:text-[#f0f4ef]">
      <CommonSlugHeadTags
        image={thumb || frontMatter?.thumbnail}
        frontMatter={frontMatter}
        url={`https://www.heyashu.in/blog/${slug || ""}`}
      />

      {/* Floating tools + font size */}
      <aside className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col overflow-hidden rounded-full border border-[#ddd5c8] bg-white/95 shadow-sm dark:border-[#1e3328] dark:bg-[#121e17]/95 lg:flex">
        <button
          type="button"
          title="Increase font size"
          onClick={() => bumpFont(1)}
          className="grid h-11 w-11 place-items-center border-b border-[#ece7de] font-fraunces text-[13px] font-semibold text-[#5f584e] transition hover:bg-[#f3eee5] hover:text-[#1c1c1c] dark:border-[#1e3328] dark:text-[#92a59a] dark:hover:bg-[#172a20] dark:hover:text-[#f0f4ef]"
        >
          +A
        </button>
        <button
          type="button"
          title="Decrease font size"
          onClick={() => bumpFont(-1)}
          className="grid h-11 w-11 place-items-center border-b border-[#ece7de] font-fraunces text-[12px] font-semibold text-[#5f584e] transition hover:bg-[#f3eee5] hover:text-[#1c1c1c] dark:border-[#1e3328] dark:text-[#92a59a] dark:hover:bg-[#172a20] dark:hover:text-[#f0f4ef]"
        >
          −A
        </button>
        {[
          { label: "Share", icon: HiOutlineShare, onClick: handleShare },
          { label: "Bookmark", icon: HiOutlineBookmark, onClick: handleBookmark },
          { label: "Download", icon: HiOutlineArrowDownTray, onClick: handleDownload },
          {
            label: speaking ? "Stop" : "Speak it",
            icon: HiOutlineSpeakerWave,
            onClick: handleSpeak,
          },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            title={item.label}
            onClick={item.onClick}
            className="grid h-11 w-11 place-items-center border-b border-[#ece7de] text-[#5f584e] transition last:border-b-0 hover:bg-[#f3eee5] hover:text-[#1c1c1c] dark:border-[#1e3328] dark:text-[#92a59a] dark:hover:bg-[#172a20] dark:hover:text-[#f0f4ef]"
          >
            <item.icon className="h-4 w-4" />
          </button>
        ))}
      </aside>

      <article className="mx-auto max-w-[920px] px-5 pb-16 pt-10 md:px-8 md:pt-12">
        {/* AI action pills — centered */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setQuickOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#ddd5c8] bg-white px-3.5 py-1.5 text-[11px] font-medium text-[#3f3a34] transition hover:border-[#1f2a22] hover:bg-[#1f2a22] hover:text-white dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
          >
            <HiBolt className="h-3.5 w-3.5" />
            Quick AI Read
          </button>
          <button
            type="button"
            onClick={() => setQuickOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#ddd5c8] bg-white px-3.5 py-1.5 text-[11px] font-medium text-[#3f3a34] transition hover:border-[#1f2a22] hover:bg-[#1f2a22] hover:text-white dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
          >
            <HiSparkles className="h-3.5 w-3.5" />
            Summarize with AI
          </button>
          <button
            type="button"
            onClick={() => setQnaOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#ddd5c8] bg-white px-3.5 py-1.5 text-[11px] font-medium text-[#3f3a34] transition hover:border-[#1f2a22] hover:bg-[#1f2a22] hover:text-white dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#f0f4ef]"
          >
            <HiChatBubbleLeftRight className="h-3.5 w-3.5" />
            Q&amp;A Mode
          </button>
        </div>

        {/* Title + meta — centered */}
        <header className="mb-9 flex flex-col items-center text-center">
          <h1 className="mb-6 max-w-[22ch] font-fraunces text-[clamp(2.1rem,5vw,3.15rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[#171717] dark:text-[#f0f4ef]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mb-6 max-w-[40ch] font-fraunces text-[1rem] italic leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
              {subtitle}
            </p>
          ) : null}

          {/* Author meta — avatar left, 2-line text right (screenshot match) */}
          <div className="flex items-center gap-3 text-left">
            <img
              src={avatar}
              alt={author}
              className="h-11 w-11 shrink-0 rounded-lg object-cover grayscale"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[14px] font-semibold text-[#1c1c1c] dark:text-[#f0f4ef]">
                By {author}
              </span>
              <span className="mt-1 text-[12px] text-[#8a8276] dark:text-[#92a59a]">
                Published {publishedOn} · {readMins}
              </span>
            </div>
          </div>
        </header>

        {/* Hero image — sharp corners */}
        {thumb ? (
          <figure className="mb-8 text-left">
            <div className="overflow-hidden rounded-none border border-[#e6e0d6] dark:border-[#1e3328]">
              <Image
                alt={title}
                src={thumb}
                width={1024}
                height={560}
                className="h-auto w-full rounded-none object-cover"
                priority
              />
            </div>
            {(frontMatter?.imageCaption || frontMatter?.caption) && (
              <figcaption className="mt-2 text-center text-[11px] text-[#8a8276]">
                {frontMatter.imageCaption || frontMatter.caption}
              </figcaption>
            )}
          </figure>
        ) : null}

        {/* Article body — smaller markdown typography */}
        <div
          id="garden-blog-article"
          style={{ fontSize: `${bodyFontPx}px` }}
          className="garden-blog-prose prose max-w-none text-left dark:prose-invert
            prose-headings:font-fraunces prose-headings:font-semibold prose-headings:tracking-[-0.01em]
            prose-headings:text-[#171717] dark:prose-headings:text-[#f0f4ef]
            prose-h1:!text-[1.35em] prose-h2:!text-[1.22em] prose-h3:!text-[1.1em]
            prose-p:!text-[1em] prose-p:!leading-[1.7] prose-p:!my-3
            prose-p:!text-[#3f3a34] dark:prose-p:!text-[#d5ddd7]
            prose-li:!text-[1em] prose-li:!leading-[1.65] prose-li:!my-1
            prose-a:!text-[#143825] prose-a:underline prose-a:decoration-[#cfc6b8] prose-a:underline-offset-2
            dark:prose-a:!text-[#22c55e]
            prose-blockquote:border-l-[#cfc6b8] prose-blockquote:pl-3 prose-blockquote:font-fraunces
            prose-blockquote:!text-[1.05em] prose-blockquote:italic prose-blockquote:!text-[#4a453d]
            prose-img:!rounded-none prose-img:border prose-img:border-[#e6e0d6]
            prose-pre:!rounded-none prose-pre:!text-[0.85em]
            prose-code:!text-[0.88em]
            prose-strong:!text-[#1c1c1c] dark:prose-strong:!text-[#f0f4ef]
            [&_p:first-of-type]:first-letter:float-left
            [&_p:first-of-type]:first-letter:mr-2
            [&_p:first-of-type]:first-letter:mt-0.5
            [&_p:first-of-type]:first-letter:font-fraunces
            [&_p:first-of-type]:first-letter:text-[2.4em]
            [&_p:first-of-type]:first-letter:font-semibold
            [&_p:first-of-type]:first-letter:leading-[0.85]
            [&_p:first-of-type]:first-letter:text-[#1c1c1c]
            dark:[&_p:first-of-type]:first-letter:text-[#f0f4ef]
          "
        >
          <MDXRenderer markdownContent={mdxSource} variant="garden" />
        </div>

        {/* AI Quiz */}
        <div className="mt-10 border border-[#ddd5c8] bg-[#f1ece3] dark:border-[#1e3328] dark:bg-[#121e17]">
          <div className="flex items-center justify-center px-4 py-3 [&_button]:w-full [&_button]:justify-center [&_button]:rounded-none [&_button]:bg-transparent [&_button]:px-0 [&_button]:py-1 [&_button]:font-fraunces [&_button]:text-[0.9rem] [&_button]:font-semibold [&_button]:text-[#1c1c1c] dark:[&_button]:text-[#f0f4ef]">
            <AIQuestionWrapper />
          </div>
        </div>

        {/* Continue Exploring */}
        {related?.length > 0 ? (
          <section className="mt-14 text-left">
            <h2 className="mb-5 text-center font-fraunces text-base font-semibold text-[#171717] dark:text-[#f0f4ef]">
              Continue Exploring
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="block rounded-none border border-[#ddd5c8] bg-white p-4 no-underline transition hover:border-[#1c1c1c] dark:border-[#1e3328] dark:bg-[#121e17] dark:hover:border-[#22c55e]"
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a8276]">
                    {item.label}
                  </p>
                  <h3 className="mb-2 font-fraunces text-[0.95rem] font-semibold leading-snug text-[#171717] dark:text-[#f0f4ef]">
                    {item.title}
                  </h3>
                  <p className="line-clamp-3 text-[0.78rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-12 text-left">
          <ContentFooter
            name={author}
            photoSrc={avatar}
            description="Writer & curator of this digital garden — open notes for learners worldwide."
          />
        </div>

        <GardenCollabCard className="mt-12" />
      </article>

      <QuickReaderDrawer isOpen={quickOpen} setIsOpen={setQuickOpen} />
      <QuestionsListDrawer isOpen={qnaOpen} setIsOpen={setQnaOpen} />

      <DigiGardenFooter />
    </div>
  );
}

BlogPost.getLayout = withDigitalGardenLayout;

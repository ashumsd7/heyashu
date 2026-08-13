import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { motion } from "framer-motion";
import {
  HiBookOpen,
  HiFolderOpen,
  HiStar,
  HiUsers,
  HiSparkles,
  HiBolt,
  HiAcademicCap,
  HiMagnifyingGlass,
  HiOutlineBookmark,
  HiNewspaper,
  HiChatBubbleLeftRight,
  HiServer,
  HiUserGroup,
  HiHeart,
} from "react-icons/hi2";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import {
  ADMIN_LINK,
  DEFAULT_AVATAR,
  GITHUB_REPO_LINK,
  PHONE_CALL_THIRTY_MIN,
} from "@/utils/constant";
import { removePublicFromPath } from "@/utils/functions";

function DigitalGarden({ posts, blogs }) {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [shuffledBlogs, setShuffledBlogs] = useState(blogs || []);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const arr = [...blogs];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setShuffledBlogs(arr);
    }
  }, [blogs]);

  const formatGardenDate = (dateStr) => {
    if (!dateStr || dateStr === "Recently") return "Recently";
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const parts = String(dateStr).trim().split(/[-/]/);
    if (parts.length === 3) {
      let day, monthIdx, year;
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
        const formattedDay = String(day).padStart(2, "0");
        return `${formattedDay} ${months[monthIdx]}, ${year}`;
      }
    }

    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const formattedDay = String(d.getDate()).padStart(2, "0");
      return `${formattedDay} ${months[d.getMonth()]}, ${d.getFullYear()}`;
    }

    return dateStr;
  };

  useEffect(() => {
    const docTheme =
      document.documentElement.getAttribute("data-theme") ||
      (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setTheme(docTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const formatComment = (text, maxWords = 14) => {
    if (!text) return "High quality notes for fast interview revision...";
    const clean = text.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
    const words = clean.split(" ");
    if (words.length <= maxWords) {
      const joined = words.join(" ");
      return joined.endsWith("...") ? joined : `${joined}...`;
    }
    return `${words.slice(0, maxWords).join(" ")}...`;
  };

  const userTestimonials = posts.map((post) => ({
    name: post.frontMatter?.name || post?.frontMatter?.title || "Anonymous Developer",
    role: post.role || post.frontMatter?.role || "Software Engineer",
    comment: formatComment(post.content),
    avatar:
      removePublicFromPath(post.frontMatter?.profilePic) ||
      removePublicFromPath(post?.profilePic) ||
      DEFAULT_AVATAR,
  }));

  const fallbackTestimonials = [
    {
      name: "Rahul Sharma",
      role: "Final-year CS student, Pune",
      comment: formatComment(
        "I watched the whole course last year and remembered none of it. Two evenings with these notes and the event loop finally clicked!"
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      name: "Ananya Mehta",
      role: "Backend Engineer, Fintech",
      comment: formatComment(
        "I keep the Node internals chapter open in a tab at work. It's the only reference that explains backpressure without a wall of text."
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
    },
    {
      name: "Sneha Verma",
      role: "SDE-1, Bengaluru",
      comment: formatComment(
        "Printed the machine coding season, annotated it on the train, cleared two rounds the same week. Zero rupees spent."
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    },
    {
      name: "Daniel Koch",
      role: "Contributor & SRE, Berlin",
      comment: formatComment(
        "Submitted a fix to a system design note on a Sunday, merged by Monday. It genuinely feels maintained and active."
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    },
    {
      name: "Manas Tiwari",
      role: "Club Lead, NIT Trichy",
      comment: formatComment(
        "I teach a college club and we run sessions straight off these chapters. The order of explanation is top tier."
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manas",
    },
    {
      name: "Farah Ali",
      role: "Full-stack Developer, Dubai",
      comment: formatComment(
        "Every paid interview course I bought is gathering dust. This digital garden is free and far better organized."
      ),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farah",
    },
  ];

  const allTestimonials =
    userTestimonials.length >= 3
      ? userTestimonials
      : [...userTestimonials, ...fallbackTestimonials];
  const marqueeTestimonials = [...allTestimonials, ...allTestimonials];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/digital-garden/notes?query=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/digital-garden/notes");
    }
  };

  return (
    <div className="garden-root">
      <CommonHeadTags
        title="The Garden — Free Digital Notes of Your Favourite Teachers | heyashu"
        url="https://www.heyashu.in/digital-garden"
        shortDec="Free, open-source digital garden of coding notes from Akshay Saini, ProCodrr, and top teachers. Summarize, quiz, and revise Node.js and system design."
        mainDesc="Digital Garden by Ashutosh Anand Tiwari. Clean, searchable, open-source notes from popular engineering courses."
        image="https://i.ibb.co/zHFrGsK/diginotes-thumb.jpg"
      />

      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        .garden-root {
          --bg-paper: #faf7f2;
          --bg-card: #ffffff;
          --text-main: #171717;
          --text-muted: #585858;
          --border-subtle: #e8e2d7;
          --green-brand: #143825;
          --green-brand-hover: #0d281a;
          --accent-saffron: #c4552d;
          --chip-bg: #f2eee5;
          --radius-card: 20px;
          --radius-sm: 12px;
          --shadow-clean: 0 4px 20px rgba(0, 0, 0, 0.03);
          --shadow-hover: 0 16px 36px -8px rgba(20, 56, 37, 0.12);

          background-color: var(--bg-paper);
          color: var(--text-main);
          font-family: "IBM Plex Sans", system-ui, -apple-system, sans-serif;
          line-height: 1.6;
          min-height: 100vh;
          transition: background-color 0.25s ease, color 0.25s ease;
        }

        .dark .garden-root,
        [data-theme="dark"] .garden-root {
          --bg-paper: #0b120e;
          --bg-card: #121e17;
          --text-main: #f0f4ef;
          --text-muted: #92a59a;
          --border-subtle: #1e3328;
          --green-brand: #22c55e;
          --green-brand-hover: #16a34a;
          --accent-saffron: #f08355;
          --chip-bg: #172a20;
          --shadow-clean: 0 4px 20px rgba(0, 0, 0, 0.3);
          --shadow-hover: 0 16px 36px -8px rgba(34, 197, 94, 0.2);
        }

        .garden-root * {
          box-sizing: border-box;
        }

        .garden-wrap {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Top Clean Navigation */
        .garden-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: color-mix(in oklab, var(--bg-paper) 90%, transparent);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 16px 0;
        }

        .garden-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .garden-logo {
          font-family: "Fraunces", Georgia, serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-main);
          text-decoration: none;
          letter-spacing: -0.01em;
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
        }

        .garden-logo-sub {
          font-family: "IBM Plex Mono", monospace;
          font-size: 0.58rem;
          font-weight: 500;
          font-style: italic;
          letter-spacing: 0.03em;
          display: inline-flex;
          align-items: baseline;
          gap: 4px;
        }

        .garden-logo-sub-by {
          color: var(--text-muted);
          opacity: 0.75;
        }

        .garden-logo-sub-domain {
          color: #0d9488;
        }

        .garden-menu-links {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-left: auto;
          margin-right: 18px;
        }

        .garden-menu-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 600;
          transition: color 0.15s ease;
        }

        .garden-menu-links a:hover {
          color: var(--green-brand);
        }

        .garden-star-pill-btn {
          background-color: var(--bg-card);
          color: var(--text-main) !important;
          border: 1px solid var(--border-subtle);
          font-size: 0.82rem !important;
          font-weight: 600;
          padding: 6px 16px;
          border-radius: 20px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        .garden-star-pill-btn:hover {
          border-color: #f59e0b !important;
          color: #d97706 !important;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.18) !important;
        }

        .garden-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .garden-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-card);
          color: var(--text-main);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .garden-icon-btn:hover {
          border-color: var(--green-brand);
          color: var(--green-brand);
        }

        .garden-profile-btn {
          background-color: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border-subtle);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .garden-profile-btn:hover {
          border-color: var(--green-brand);
          color: var(--green-brand);
        }

        /* Hero Section */
        .garden-hero {
          padding: 120px 0 64px;
          text-align: center;
        }

        .garden-hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin: 0 auto 22px;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid color-mix(in oklab, #8b5cf6 35%, var(--border-subtle));
          background: linear-gradient(
            135deg,
            color-mix(in oklab, #8b5cf6 12%, var(--bg-card)),
            color-mix(in oklab, #ec4899 10%, var(--bg-card))
          );
          color: #7c3aed;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.01em;
        }

        .garden-hero-title {
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(2.4rem, 5.5vw, 4rem);
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.12;
          max-width: 22ch;
          margin: 0 auto 18px;
          letter-spacing: -0.02em;
        }

        .garden-hero-sub {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 58ch;
          margin: 0 auto 32px;
          line-height: 1.6;
        }

        .garden-hero-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .garden-btn-primary {
          background-color: var(--green-brand);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 12px 24px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .garden-btn-primary:hover {
          background-color: var(--green-brand-hover);
          transform: translateY(-1px);
        }

        .garden-btn-secondary {
          background-color: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border-subtle);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 12px 22px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .garden-btn-secondary:hover {
          border-color: var(--green-brand);
          color: var(--green-brand);
          transform: translateY(-1px);
        }

        /* Hero Featured White Card (Matching Screenshot) */
        .garden-featured-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-card);
          padding: 44px;
          margin-top: 56px;
          box-shadow: var(--shadow-clean);
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: center;
          text-align: left;
        }

        .garden-feat-title {
          font-family: "Fraunces", Georgia, serif;
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 14px;
          line-height: 1.25;
        }

        .garden-feat-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.65;
          margin: 0 0 24px;
        }

        .garden-feat-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .garden-feat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-main);
        }

        .garden-feat-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: var(--chip-bg);
          color: var(--green-brand);
          display: grid;
          place-items: center;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .garden-feat-media {
          width: 100%;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          background-color: var(--bg-paper);
        }

        .garden-feat-img,
        .garden-feat-video {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
        }

        /* Stats Grid Bar */
        .garden-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 32px;
        }

        .garden-stat-card {
          position: relative;
          border-radius: var(--radius-sm);
          padding: 20px 22px;
          text-align: left;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          overflow: hidden;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
        }

        .garden-stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        }

        /* Card 1: Green Accent */
        .garden-stat-card.stat-green {
          background: linear-gradient(135deg, rgba(20, 56, 37, 0.06) 0%, rgba(34, 197, 94, 0.02) 100%), var(--bg-card);
          border-color: rgba(34, 197, 94, 0.25);
        }
        .dark .garden-stat-card.stat-green,
        [data-theme="dark"] .garden-stat-card.stat-green {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(20, 56, 37, 0.25) 100%), var(--bg-card);
          border-color: rgba(34, 197, 94, 0.35);
        }

        /* Card 2: Orange / Saffron Accent */
        .garden-stat-card.stat-saffron {
          background: linear-gradient(135deg, rgba(196, 85, 45, 0.06) 0%, rgba(240, 131, 85, 0.02) 100%), var(--bg-card);
          border-color: rgba(240, 131, 85, 0.25);
        }
        .dark .garden-stat-card.stat-saffron,
        [data-theme="dark"] .garden-stat-card.stat-saffron {
          background: linear-gradient(135deg, rgba(240, 131, 85, 0.12) 0%, rgba(196, 85, 45, 0.25) 100%), var(--bg-card);
          border-color: rgba(240, 131, 85, 0.35);
        }

        /* Card 3: Gold Accent */
        .garden-stat-card.stat-gold {
          background: linear-gradient(135deg, rgba(202, 138, 4, 0.06) 0%, rgba(250, 204, 21, 0.02) 100%), var(--bg-card);
          border-color: rgba(234, 179, 8, 0.25);
        }
        .dark .garden-stat-card.stat-gold,
        [data-theme="dark"] .garden-stat-card.stat-gold {
          background: linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(161, 98, 7, 0.25) 100%), var(--bg-card);
          border-color: rgba(234, 179, 8, 0.35);
        }

        /* Card 4: Purple / Indigo Accent */
        .garden-stat-card.stat-purple {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(129, 140, 248, 0.02) 100%), var(--bg-card);
          border-color: rgba(99, 102, 241, 0.25);
        }
        .dark .garden-stat-card.stat-purple,
        [data-theme="dark"] .garden-stat-card.stat-purple {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(67, 56, 202, 0.25) 100%), var(--bg-card);
          border-color: rgba(99, 102, 241, 0.35);
        }

        .garden-stat-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: #ffffff;
          font-size: 1.25rem;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .stat-green .garden-stat-badge {
          background: linear-gradient(135deg, #143825, #22c55e);
        }
        .stat-saffron .garden-stat-badge {
          background: linear-gradient(135deg, #c4552d, #f08355);
        }
        .stat-gold .garden-stat-badge {
          background: linear-gradient(135deg, #ca8a04, #eab308);
        }
        .stat-purple .garden-stat-badge {
          background: linear-gradient(135deg, #4f46e5, #818cf8);
        }

        .garden-stat-num {
          font-family: "Fraunces", Georgia, serif;
          font-size: 1.65rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.1;
        }

        .garden-stat-label {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: 3px;
          font-weight: 500;
        }

        /* Section Title Layout */
        .garden-sec {
          padding: 72px 0;
        }

        .garden-khaki-outer {
          max-width: var(--garden-wrap-max, 1120px);
          margin: 28px auto 20px;
          padding: 0 24px;
        }

        .garden-khaki-strip {
          width: 100%;
          overflow: hidden;
          background: #c2b280;
          border-top: 2px solid #8b7355;
          border-bottom: 2px solid #8b7355;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.25),
            0 8px 22px rgba(0, 0, 0, 0.08);
          padding: 12px 0;
          border-radius: 2px;
          transform: rotate(-3.5deg);
          transform-origin: center center;
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            #000 9%,
            #000 91%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            #000 9%,
            #000 91%,
            transparent 100%
          );
        }

        .garden-khaki-track {
          display: flex;
          width: max-content;
          animation: khakiMarquee 38s linear infinite;
          will-change: transform;
        }

        .garden-khaki-strip:hover .garden-khaki-track {
          animation-play-state: paused;
        }

        .garden-khaki-group {
          display: flex;
          align-items: center;
          gap: 0;
          white-space: nowrap;
        }

        .garden-khaki-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #1a1a1a;
          font-family: "IBM Plex Mono", monospace;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0 28px;
          text-shadow: none;
        }

        .garden-khaki-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #1a1a1a;
          opacity: 0.55;
          flex-shrink: 0;
        }

        @keyframes khakiMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .garden-sec-header {
          margin-bottom: 36px;
        }

        .garden-sec-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 36px;
        }

        .garden-sec-cta {
          color: var(--green-brand);
          font-weight: 600;
          font-size: 0.92rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 0.15s ease;
        }

        .garden-sec-cta:hover {
          color: var(--green-brand-hover);
        }

        .garden-sec-title {
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 8px;
          letter-spacing: -0.015em;
        }

        .garden-sec-desc {
          font-size: 0.98rem;
          color: var(--text-muted);
          margin: 0;
          max-width: 60ch;
        }

        /* Course Collection Cards (Image Left, Big Bold Title, 2-Liner Desc & CTA) */
        .garden-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .garden-course-card {
          position: relative;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-card);
          padding: 28px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          align-items: center;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .garden-course-card:hover {
          border-color: var(--green-brand);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .garden-card-bg-pattern {
          position: absolute;
          right: -20px;
          bottom: -20px;
          pointer-events: none;
          color: var(--green-brand);
          z-index: 0;
          opacity: 0.05;
          transition: opacity 0.3s ease;
        }

        .garden-course-card:hover .garden-card-bg-pattern {
          opacity: 0.1;
        }

        .garden-course-thumb-wrap {
          width: 100%;
          height: 190px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          position: relative;
          background-color: var(--bg-paper);
          z-index: 1;
        }

        .garden-course-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .garden-course-card:hover .garden-course-thumb {
          transform: scale(1.03);
        }

        .garden-course-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          z-index: 1;
          position: relative;
        }

        .garden-hashtags-xs {
          font-family: "IBM Plex Mono", monospace;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--green-brand);
          letter-spacing: 0.04em;
          margin-bottom: 8px;
        }

        .garden-course-name {
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(1.4rem, 2.8vw, 1.85rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          color: var(--text-main);
          margin: 0 0 10px;
          line-height: 1.2;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        }

        .dark .garden-course-name,
        [data-theme="dark"] .garden-course-name {
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .garden-course-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0 0 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .garden-bullets-xs {
          font-family: inherit;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.01em;
          margin-bottom: 16px;
        }

        .garden-course-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }

        .garden-instructor {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .garden-instructor-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #143825, #22c55e);
          color: #ffffff;
          display: grid;
          place-items: center;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: "IBM Plex Mono", monospace;
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.25);
        }

        .garden-instructor-meta {
          display: flex;
          flex-direction: column;
        }

        .garden-instructor-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.2;
        }

        .garden-instructor-company {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: "IBM Plex Mono", monospace;
        }

        .garden-cta-link {
          background: linear-gradient(135deg, var(--green-brand), var(--green-brand-hover));
          color: #ffffff;
          font-weight: 600;
          font-size: 0.88rem;
          padding: 9px 20px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(20, 56, 37, 0.18);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .garden-course-card:hover .garden-cta-link,
        .garden-cta-link:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 20px rgba(34, 197, 94, 0.32);
          background: linear-gradient(135deg, #16a34a, #15803d);
        }

        /* AI Features Section */
        .garden-ai-title {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          font-weight: 700;
          margin: 0 0 8px;
          letter-spacing: -0.015em;
          color: var(--text-main);
        }

        .ai-gradient-text {
          background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #ec4899 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          display: inline-block;
        }

        .dark .ai-gradient-text,
        [data-theme="dark"] .ai-gradient-text {
          background: linear-gradient(135deg, #a78bfa 0%, #c084fc 50%, #f472b6 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .garden-ai-title-text {
          color: var(--text-main);
        }

        .garden-beta-chip {
          font-family: "IBM Plex Mono", monospace;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 3px 10px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(236, 72, 153, 0.12) 100%);
          color: #8b5cf6;
          border: 1px solid rgba(139, 92, 246, 0.3);
          margin-left: 12px;
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1);
        }

        .dark .garden-beta-chip,
        [data-theme="dark"] .garden-beta-chip {
          background: linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(244, 114, 182, 0.2) 100%);
          color: #c084fc;
          border-color: rgba(192, 132, 252, 0.4);
        }

        @keyframes aiTitleShimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .garden-ai-sparkle-icon {
          color: #9333ea;
          font-size: 1.8rem;
          flex-shrink: 0;
          animation: sparklePulse 3s ease-in-out infinite;
        }

        .dark .garden-ai-sparkle-icon,
        [data-theme="dark"] .garden-ai-sparkle-icon {
          color: #c084fc;
        }

        @keyframes sparklePulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 6px rgba(147, 51, 234, 0.4));
          }
          50% {
            transform: scale(1.18) rotate(15deg);
            filter: drop-shadow(0 0 12px rgba(192, 132, 252, 0.8));
          }
        }

        .garden-ai-featured-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-card);
          padding: 36px;
          box-shadow: var(--shadow-clean);
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 36px;
          align-items: center;
          text-align: left;
        }

        .garden-ai-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .garden-ai-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .garden-ai-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-size: 1.3rem;
          color: #ffffff;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(124, 58, 237, 0.18);
        }

        .ai-badge-purple {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
        }

        .ai-badge-pink {
          background: linear-gradient(135deg, #db2777, #f472b6);
        }

        .ai-badge-indigo {
          background: linear-gradient(135deg, #4f46e5, #818cf8);
        }

        .garden-ai-item-title {
          font-family: "Fraunces", Georgia, serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 4px;
          line-height: 1.3;
        }

        .garden-ai-item-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        /* Blogs Section with Pattern & Stack Layout */
        .garden-blogs-sec {
          position: relative;
          background-color: var(--bg-paper);
          overflow: hidden;
        }

        .garden-blogs-bg-pattern {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.04;
          color: var(--green-brand);
          z-index: 0;
        }

        .garden-sec-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .garden-sec-title-icon {
          font-size: 1.8rem;
          color: var(--green-brand);
          flex-shrink: 0;
        }

        .garden-blogs-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        /* Featured Blog Card (Full width top card) */
        .garden-blog-featured-card {
          position: relative;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-card);
          padding: 28px;
          box-shadow: var(--shadow-clean);
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 28px;
          align-items: center;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }

        .garden-blog-featured-card:hover {
          border-color: var(--green-brand);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.07);
          transform: translateY(-2px);
        }

        .garden-blog-featured-thumb-wrap {
          width: 100%;
          height: 190px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          position: relative;
          background-color: var(--bg-paper);
        }

        .garden-blog-featured-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .garden-blog-featured-card:hover .garden-blog-featured-thumb {
          transform: scale(1.04);
        }

        .garden-blog-featured-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        /* Top Bar inside Card */
        .garden-blog-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 12px;
        }

        .garden-blog-tags-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .garden-tag-pill {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          font-family: inherit;
          background: rgba(34, 197, 94, 0.08);
          color: var(--green-brand);
          border: 1px solid rgba(34, 197, 94, 0.2);
          letter-spacing: 0.01em;
        }

        .dark .garden-tag-pill,
        [data-theme="dark"] .garden-tag-pill {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          border-color: rgba(74, 222, 128, 0.3);
        }

        .garden-tag-pill-alt {
          background: rgba(196, 85, 45, 0.08);
          color: var(--accent-saffron);
          border: 1px solid rgba(196, 85, 45, 0.2);
        }

        .dark .garden-tag-pill-alt,
        [data-theme="dark"] .garden-tag-pill-alt {
          background: rgba(240, 131, 85, 0.15);
          color: #fb923c;
          border-color: rgba(251, 146, 60, 0.3);
        }

        .garden-blog-bookmark-btn {
          color: var(--text-muted);
          font-size: 1.15rem;
          background: transparent;
          border: none;
          cursor: pointer;
          display: grid;
          place-items: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.2s ease, background-color 0.2s ease;
        }

        .garden-blog-bookmark-btn:hover {
          color: var(--green-brand);
          background-color: var(--bg-paper);
        }

        .garden-blog-featured-title {
          font-family: "Fraunces", Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 10px;
          line-height: 1.3;
        }

        .garden-blog-featured-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0 0 18px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Blog Card Footer */
        .garden-blog-meta-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-top: 12px;
          border-top: 1px dashed var(--border-subtle);
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .garden-blog-author-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .garden-blog-author-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--border-subtle);
        }

        .garden-blog-author-initial {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--green-brand);
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 700;
          display: grid;
          place-items: center;
        }

        .garden-blog-read-link {
          color: var(--green-brand);
          font-weight: 600;
          font-family: "IBM Plex Mono", monospace;
          font-size: 0.82rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Below Cards Grid (3 Column Grid) */
        .garden-blogs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .garden-blog-card {
          position: relative;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-card);
          padding: 24px;
          box-shadow: var(--shadow-clean);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }

        .garden-blog-card:hover {
          border-color: var(--green-brand);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
          transform: translateY(-3px);
        }

        .garden-blog-card-body {
          display: flex;
          flex-direction: column;
        }

        .garden-blog-card h3 {
          font-family: "Fraunces", Georgia, serif;
          font-size: 1.22rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 10px;
          line-height: 1.35;
        }

        .garden-blog-card p {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin: 0 0 16px;
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 900px) {
          .garden-blog-featured-card {
            grid-template-columns: 1fr;
          }
          .garden-blog-featured-thumb-wrap {
            height: 180px;
          }
          .garden-blogs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .garden-blogs-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Testimonials Section Marquee */
        .garden-testimonials-sec {
          padding: 72px 0;
          overflow: hidden;
        }

        .garden-marquee-wrap {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 12px 0;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        .garden-marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marqueeScroll 55s linear infinite;
        }

        .garden-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .garden-quote-card {
          width: 320px;
          flex-shrink: 0;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-clean);
        }

        .garden-feedback-cta-wrap {
          display: flex;
          justify-content: center;
          margin-top: 32px;
          position: relative;
          z-index: 2;
        }

        .garden-provide-feedback-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border-subtle);
          padding: 10px 24px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .garden-provide-feedback-btn:hover {
          border-color: var(--green-brand);
          color: var(--green-brand);
          box-shadow: 0 4px 18px rgba(34, 197, 94, 0.15);
        }

        /* Single Main Support Card Layout */
        .garden-support-sec {
          background-color: var(--bg-paper);
          position: relative;
        }

        .garden-single-support-card {
          position: relative;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-card);
          padding: 36px;
          box-shadow: var(--shadow-clean);
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 40px;
          align-items: center;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .garden-single-support-card:hover {
          border-color: var(--green-brand);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.07);
        }

        .garden-support-main-left {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .garden-support-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .garden-support-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          font-size: 1.35rem;
          flex-shrink: 0;
        }

        .badge-hosting {
          background: rgba(34, 197, 94, 0.1);
          color: var(--green-brand);
          border: 1px solid rgba(34, 197, 94, 0.25);
        }

        .badge-oldboys {
          background: rgba(196, 85, 45, 0.1);
          color: var(--accent-saffron);
          border: 1px solid rgba(196, 85, 45, 0.25);
        }

        .garden-support-item-content {
          display: flex;
          flex-direction: column;
        }

        .garden-support-title {
          font-family: "Fraunces", Georgia, serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 6px;
        }

        .garden-support-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        /* Right Side QR Box inside Card */
        .garden-support-main-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-left: 28px;
          border-left: 1px dashed var(--border-subtle);
        }

        .garden-qr-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(34, 197, 94, 0.1);
          color: var(--green-brand);
          border: 1px solid rgba(34, 197, 94, 0.25);
          margin-bottom: 14px;
        }

        .garden-qr-img-wrap {
          background: #ffffff;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid var(--border-subtle);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          margin-bottom: 12px;
        }

        .garden-qr-img {
          width: 170px;
          height: 170px;
          display: block;
        }

        .garden-qr-title {
          font-family: "Fraunces", Georgia, serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 4px;
        }

        .garden-qr-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin: 0 0 12px;
          line-height: 1.4;
        }

        .garden-qr-pay-methods {
          font-family: "IBM Plex Mono", monospace;
          font-size: 0.7rem;
          color: var(--green-brand);
          font-weight: 600;
          margin-bottom: 14px;
        }

        .garden-qr-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: linear-gradient(135deg, var(--green-brand), var(--green-brand-hover));
          color: #ffffff;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 10px 16px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(20, 56, 37, 0.18);
          transition: all 0.2s ease;
        }

        /* Help Chai Section */
        .garden-chai-sec {
          background-color: var(--bg-paper);
          position: relative;
        }

        .garden-chai-card {
          background-color: var(--bg-card);
          border: 1px solid rgba(225, 112, 85, 0.3);
          border-radius: var(--radius-card);
          padding: 28px 32px;
          box-shadow: 0 4px 20px rgba(225, 112, 85, 0.08);
          display: flex;
          align-items: center;
          gap: 28px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .garden-chai-card:hover {
          border-color: #e17055;
          box-shadow: 0 10px 30px rgba(225, 112, 85, 0.15);
        }

        .garden-chai-img-wrap {
          width: 130px;
          height: 130px;
          flex-shrink: 0;
          border-radius: 20px;
          overflow: hidden;
          border: 2px solid rgba(225, 112, 85, 0.25);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          background-color: var(--bg-paper);
        }

        .garden-chai-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .garden-chai-card:hover .garden-chai-img {
          transform: scale(1.06);
        }

        .garden-chai-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }

        .garden-chai-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(225, 112, 85, 0.12);
          color: #d63031;
          border: 1px solid rgba(225, 112, 85, 0.3);
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }

        .garden-chai-title {
          font-family: "Fraunces", Georgia, serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0 0 8px;
        }

        .garden-chai-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0 0 16px;
          max-width: 65ch;
        }

        .garden-chai-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #e17055, #d63031);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.88rem;
          padding: 10px 22px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(214, 48, 49, 0.22);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        @media (max-width: 680px) {
          .garden-chai-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            gap: 20px;
          }
          .garden-chai-img-wrap {
            width: 110px;
            height: 110px;
          }
        }

        @media (max-width: 900px) {
          .garden-single-support-card {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 24px;
          }

          .garden-support-main-right {
            border-left: none;
            border-top: 1px dashed var(--border-subtle);
            padding-left: 0;
            padding-top: 28px;
          }
        }

        .garden-quote-mark {
          font-family: "Fraunces", serif;
          font-size: 2.8rem;
          line-height: 0.8;
          color: var(--green-brand);
          margin-bottom: 8px;
        }

        .garden-quote-text {
          font-size: 0.92rem;
          color: var(--text-main);
          line-height: 1.5;
          margin-bottom: 18px;
        }

        .garden-quote-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .garden-quote-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--border-subtle);
          background-color: var(--chip-bg);
        }

        .garden-quote-info strong {
          display: block;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .garden-quote-info span {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .garden-featured-card {
            grid-template-columns: 1fr;
            padding: 32px 24px;
          }
          .garden-course-card {
            grid-template-columns: 1fr;
          }
          .garden-course-thumb {
            height: 200px;
          }
          .garden-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .garden-ai-featured-card {
            grid-template-columns: 1fr;
            padding: 24px;
          }
          .garden-blogs-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .garden-menu-links {
            display: none;
          }
          .garden-stats-grid {
            grid-template-columns: 1fr;
          }
          .garden-hero-title {
            font-size: 2.2rem;
          }
        }
      `}</style>

      {/* TOP CLEAN NAVIGATION */}
      <header className="garden-nav">
        <div className="garden-wrap garden-nav-inner">
          <a href="#" className="garden-logo">
            <span>Digital Garden</span>
            <span className="garden-logo-sub">
              <span className="garden-logo-sub-by">by</span>
              <span className="garden-logo-sub-domain">heyashu.in</span>
            </span>
          </a>

          <nav className="garden-menu-links">
            <a href="#blogs">Blogs</a>
            <a href="#collections">Notes</a>
            <a
              className="garden-star-pill-btn"
              href={GITHUB_REPO_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              Star on GitHub ★
            </a>
          </nav>

          <div className="garden-nav-actions">
            <button
              className="garden-icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? "☀️" : "🌐"}
            </button>
            <a className="garden-profile-btn" href="/">
              ← Ashu's Profile
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="garden-hero">
        <div className="garden-wrap">
          <div className="garden-hero-chip">
            <HiSparkles size={14} />
            AI Powered Digital Notes &amp; Blogs
          </div>
          <h1 className="garden-hero-title">
            One Stop for Free Digital Notes of Your Favourite Teachers
          </h1>
          <p className="garden-hero-sub">
            From coding to interviews — neatly organized, always growing.
          </p>

          <div className="garden-hero-buttons">
            <a className="garden-btn-primary" href="#collections">
              📖 Read Digital Notes
            </a>
            <a
              className="garden-btn-secondary"
              href={GITHUB_REPO_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              ⭐ Star the repo
            </a>
          </div>

          {/* FEATURED WHITE CARD (MATCHING SCREENSHOT) */}
          <div className="garden-featured-card">
            <div>
              <h2 className="garden-feat-title">Open-sourced Digital Garden</h2>
              <p className="garden-feat-desc">
                A collaborative space for open-source knowledge sharing. Built on
                the principles of public learning, this garden allows anyone to
                contribute, refine, and access high-quality educational materials
                curated by experts.
              </p>
              <div className="garden-feat-list">
                <div className="garden-feat-item">
                  <div className="garden-feat-icon">🎯</div>
                  <span>Evergreen content updated regularly</span>
                </div>
                <div className="garden-feat-item">
                  <div className="garden-feat-icon">👥</div>
                  <span>Community-driven corrections</span>
                </div>
                <div className="garden-feat-item">
                  <div className="garden-feat-icon">💬</div>
                  <span>Curated from handwritten notes</span>
                </div>
              </div>
            </div>

            <div className="garden-feat-media">
              <video
                className="garden-feat-video"
                src="/notes_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Open-sourced Digital Garden Notes Preview Video"
              />
            </div>
          </div>

          {/* STATS BAR */}
          <div className="garden-stats-grid">
            <div className="garden-stat-card stat-green">
              <div className="garden-stat-badge">
                <HiBookOpen />
              </div>
              <div>
                <div className="garden-stat-num">120+</div>
                <div className="garden-stat-label">Free chapters</div>
              </div>
            </div>

            <div className="garden-stat-card stat-saffron">
              <div className="garden-stat-badge">
                <HiFolderOpen />
              </div>
              <div>
                <div className="garden-stat-num">14</div>
                <div className="garden-stat-label">Course collections</div>
              </div>
            </div>

            <div className="garden-stat-card stat-gold">
              <div className="garden-stat-badge">
                <HiStar />
              </div>
              <div>
                <div className="garden-stat-num">30+</div>
                <div className="garden-stat-label">GitHub stars</div>
              </div>
            </div>

            <div className="garden-stat-card stat-purple">
              <div className="garden-stat-badge">
                <HiUsers />
              </div>
              <div>
                <div className="garden-stat-num">10+</div>
                <div className="garden-stat-label">Contributors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE COLLECTIONS SECTION */}
      {/* KHAKI KEY POINTS MARQUEE */}
      <div className="garden-khaki-outer">
        <div className="garden-khaki-strip" aria-label="Digital Garden highlights">
          <div className="garden-khaki-track">
            {[0, 1].map((copy) => (
              <div className="garden-khaki-group" key={copy} aria-hidden={copy === 1}>
                <span className="garden-khaki-item">120+ Chapters · Free of Cost</span>
                <span className="garden-khaki-dot" aria-hidden="true" />
                <span className="garden-khaki-item">Open Source Digital Notes · aka Digital Garden</span>
                <span className="garden-khaki-dot" aria-hidden="true" />
                <span className="garden-khaki-item">Curated from Handwritten Notes</span>
                <span className="garden-khaki-dot" aria-hidden="true" />
                <span className="garden-khaki-item">Interview Ready · Season by Season</span>
                <span className="garden-khaki-dot" aria-hidden="true" />
                <span className="garden-khaki-item">Community Driven Corrections</span>
                <span className="garden-khaki-dot" aria-hidden="true" />
                <span className="garden-khaki-item">100% Ad-Free Learning</span>
                <span className="garden-khaki-dot" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="collections" className="garden-sec">
        <div className="garden-wrap">
          <div className="garden-sec-header-row">
            <div>
              <h2 className="garden-sec-title">
                Notes &amp; Course Collections
              </h2>
              <p className="garden-sec-desc">
                High-quality notes from popular instructors, formatted for fast revision and interview readiness.
              </p>
            </div>
            <a href="/digital-garden/notes" className="garden-sec-cta">
              Read all notes →
            </a>
          </div>

          <div className="garden-cards-stack">
            {/* COURSE CARD 1: NAMASTE NODE.JS */}
            <motion.article
              whileHover={{ scale: 1.008 }}
              transition={{ duration: 0.2 }}
              className="garden-course-card"
              onClick={() =>
                router.push(
                  "/digital-garden/notes/namaste-node-js/prerequisite"
                )
              }
            >
              <div className="garden-card-bg-pattern" aria-hidden="true">
                <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 10C120 40 180 60 190 100C200 140 150 180 100 190C50 180 0 140 10 100C20 60 80 40 100 10Z" fill="currentColor" opacity="0.04"/>
                  <path d="M100 20C110 50 150 70 160 100C170 130 130 160 100 170C70 160 30 130 40 100C50 70 90 50 100 20Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.08"/>
                </svg>
              </div>

              <div className="garden-course-thumb-wrap">
                <img
                  className="garden-course-thumb"
                  src="https://i.ibb.co/2hq8tjW/akshays-banner.jpg"
                  alt="Namaste Node.js by Akshay Saini"
                  loading="lazy"
                />
              </div>

              <div className="garden-course-info">
                <h3 className="garden-course-name">Namaste Node.js</h3>
                <p className="garden-course-desc">
                  Execution context, V8 Engine, libuv, Event Loop, Async I/O, Thread Pool &amp; HTTP Server creation explained with clean diagrams.
                </p>
                <div className="garden-bullets-xs">
                  NamasteDev &nbsp;•&nbsp; Season 01 &amp; 02 &nbsp;•&nbsp; Akshay Saini
                </div>
                <div className="garden-course-footer">
                  <div className="garden-instructor">
                    <div className="garden-instructor-avatar">AS</div>
                    <div className="garden-instructor-meta">
                      <span className="garden-instructor-name">Akshay Saini</span>
                      <span className="garden-instructor-company">NamasteDev</span>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="garden-cta-link"
                    href="/digital-garden/notes/namaste-node-js/prerequisite"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Digital Notes →
                  </motion.a>
                </div>
              </div>
            </motion.article>

            {/* COURSE CARD 2: FRONTEND SYSTEM DESIGN */}
            <motion.article
              whileHover={{ scale: 1.008 }}
              transition={{ duration: 0.2 }}
              className="garden-course-card"
              onClick={() =>
                router.push(
                  "/digital-garden/notes/front-end-design-system/how-the-web-works"
                )
              }
            >
              <div className="garden-card-bg-pattern" aria-hidden="true">
                <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 10C120 40 180 60 190 100C200 140 150 180 100 190C50 180 0 140 10 100C20 60 80 40 100 10Z" fill="currentColor" opacity="0.04"/>
                  <path d="M100 20C110 50 150 70 160 100C170 130 130 160 100 170C70 160 30 130 40 100C50 70 90 50 100 20Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.08"/>
                </svg>
              </div>

              <div className="garden-course-thumb-wrap">
                <img
                  className="garden-course-thumb"
                  src="https://i.ibb.co/2hq8tjW/akshays-banner.jpg"
                  alt="Frontend System Design by Akshay Saini"
                  loading="lazy"
                />
              </div>

              <div className="garden-course-info">
                <h3 className="garden-course-name">Frontend System Design</h3>
                <p className="garden-course-desc">
                  WebSockets, Long Polling, GraphQL vs REST, HTTP headers &amp; Config-Driven UI architectures for staff-level interviews.
                </p>
                <div className="garden-bullets-xs">
                  Masterclass &nbsp;•&nbsp; System Design &nbsp;•&nbsp; 12 Chapters
                </div>
                <div className="garden-course-footer">
                  <div className="garden-instructor">
                    <div className="garden-instructor-avatar">AS</div>
                    <div className="garden-instructor-meta">
                      <span className="garden-instructor-name">Akshay Saini</span>
                      <span className="garden-instructor-company">NamasteDev</span>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="garden-cta-link"
                    href="/digital-garden/notes/front-end-design-system/how-the-web-works"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Digital Notes →
                  </motion.a>
                </div>
              </div>
            </motion.article>

            {/* COURSE CARD 3: PROCODRR BACKEND NODE.JS */}
            <motion.article
              whileHover={{ scale: 1.008 }}
              transition={{ duration: 0.2 }}
              className="garden-course-card"
              onClick={() =>
                router.push(
                  "/digital-garden/notes/backend-with-nodejs-by-procoderr-notes/e1-welcome"
                )
              }
            >
              <div className="garden-card-bg-pattern" aria-hidden="true">
                <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 10C120 40 180 60 190 100C200 140 150 180 100 190C50 180 0 140 10 100C20 60 80 40 100 10Z" fill="currentColor" opacity="0.04"/>
                  <path d="M100 20C110 50 150 70 160 100C170 130 130 160 100 170C70 160 30 130 40 100C50 70 90 50 100 20Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.08"/>
                </svg>
              </div>

              <div className="garden-course-thumb-wrap">
                <img
                  className="garden-course-thumb"
                  src="https://tagmango.com/publicassets/-backend-with-nodejs-1-f59defad2193f9e9223bfa2a3ad3ac47.png"
                  alt="Backend with Node.js by ProCodrr"
                  loading="lazy"
                />
              </div>

              <div className="garden-course-info">
                <h3 className="garden-course-name">Backend with Node.js</h3>
                <p className="garden-course-desc">
                  OS Processes, Threads, Concurrency, Parallelism, Environment Variables, CLI vs GUI &amp; File permissions in simple Hinglish.
                </p>
                <div className="garden-bullets-xs">
                  ProCodrr &nbsp;•&nbsp; Backend Node.js &nbsp;•&nbsp; Hinglish Notes
                </div>
                <div className="garden-course-footer">
                  <div className="garden-instructor">
                    <div className="garden-instructor-avatar">PC</div>
                    <div className="garden-instructor-meta">
                      <span className="garden-instructor-name">Anurag Singh</span>
                      <span className="garden-instructor-company">ProCodrr</span>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="garden-cta-link"
                    href="/digital-garden/notes/backend-with-nodejs-by-procoderr-notes/e1-welcome"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Digital Notes →
                  </motion.a>
                </div>
              </div>
            </motion.article>

            {/* COURSE CARD 4: JAVASCRIPT SNIPPETS & YDKJS */}
            <motion.article
              whileHover={{ scale: 1.008 }}
              transition={{ duration: 0.2 }}
              className="garden-course-card"
              onClick={() =>
                router.push(
                  "/digital-garden/notes/javascript-snippets/data-types-in-javascript"
                )
              }
            >
              <div className="garden-card-bg-pattern" aria-hidden="true">
                <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 10C120 40 180 60 190 100C200 140 150 180 100 190C50 180 0 140 10 100C20 60 80 40 100 10Z" fill="currentColor" opacity="0.04"/>
                  <path d="M100 20C110 50 150 70 160 100C170 130 130 160 100 170C70 160 30 130 40 100C50 70 90 50 100 20Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.08"/>
                </svg>
              </div>

              <div className="garden-course-thumb-wrap">
                <img
                  className="garden-course-thumb"
                  src="https://i.ibb.co/x7kYDW1/snippets.jpg"
                  alt="JavaScript Snippets & YDKJS Notes"
                  loading="lazy"
                />
              </div>

              <div className="garden-course-info">
                <h3 className="garden-course-name">
                  JavaScript Snippets &amp; Book Notes
                </h3>
                <p className="garden-course-desc">
                  100+ tricky JS interview snippets and simplified book notes on Kyle Simpson's You Don't Know JS series.
                </p>
                <div className="garden-bullets-xs">
                  Curated Notes &nbsp;•&nbsp; 100+ Snippets &nbsp;•&nbsp; YDKJS
                </div>
                <div className="garden-course-footer">
                  <div className="garden-instructor">
                    <div className="garden-instructor-avatar">AT</div>
                    <div className="garden-instructor-meta">
                      <span className="garden-instructor-name">Ashutosh Anand Tiwari</span>
                      <span className="garden-instructor-company">heyashu.in</span>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="garden-cta-link"
                    href="/digital-garden/notes/javascript-snippets/data-types-in-javascript"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read Digital Notes →
                  </motion.a>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* AI FEATURES SECTION */}
      <section className="garden-sec" style={{ backgroundColor: "var(--bg-card)" }}>
        <div className="garden-wrap">
          <div className="garden-sec-header">
            <h2 className="garden-ai-title">
              <HiSparkles className="garden-ai-sparkle-icon" />
              <span className="garden-ai-title-text">
                <span className="ai-gradient-text">AI</span> Powered Study Tools
              </span>
              <span className="garden-beta-chip">Beta Version</span>
            </h2>
            <p className="garden-sec-desc">
              Bored from watching videos? Here is the solution.
            </p>
          </div>

          <div className="garden-ai-featured-card">
            <div className="garden-feat-media">
              <video
                className="garden-feat-video"
                src="/notes_ai_feature.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="AI Powered Study Tools Video Preview"
              />
            </div>

            <div className="garden-ai-list">
              <div className="garden-ai-item">
                <div className="garden-ai-icon-badge ai-badge-purple">
                  <HiBolt />
                </div>
                <div>
                  <h3 className="garden-ai-item-title">
                    Summarize With <span className="ai-gradient-text">AI</span>
                  </h3>
                  <p className="garden-ai-item-desc">
                    Turn any chapter into a tight revision card. Perfect for quick reviews right before your interview round.
                  </p>
                </div>
              </div>

              <div className="garden-ai-item">
                <div className="garden-ai-icon-badge ai-badge-pink">
                  <HiAcademicCap />
                </div>
                <div>
                  <h3 className="garden-ai-item-title">
                    Practice <span className="ai-gradient-text">AI</span> Quiz
                  </h3>
                  <p className="garden-ai-item-desc">
                    Instant multiple-choice and coding questions generated directly from the notes you just finished reading.
                  </p>
                </div>
              </div>

              <div className="garden-ai-item">
                <div className="garden-ai-icon-badge ai-badge-indigo">
                  <HiMagnifyingGlass />
                </div>
                <div>
                  <h3 className="garden-ai-item-title">
                    Quick <span className="ai-gradient-text">AI</span> Read
                  </h3>
                  <p className="garden-ai-item-desc">
                    Search, summarize key takeaways, and generate <span className="ai-gradient-text">AI</span> flashcards to master complex concepts in minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOGS SECTION */}
      <section id="blogs" className="garden-sec garden-blogs-sec">
        {/* Background Pattern */}
        <div className="garden-blogs-bg-pattern" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="garden-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#garden-dot-grid)" />
          </svg>
        </div>

        <div className="garden-wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="garden-sec-header-row">
            <div>
              <div className="garden-sec-title-wrap">
                <HiNewspaper className="garden-sec-title-icon" />
                <h2 className="garden-sec-title" style={{ margin: 0 }}>
                  Fresh From The Garden
                </h2>
              </div>
              <p className="garden-sec-desc" style={{ marginTop: 8 }}>
                Short, opinionated tech posts and engineering discoveries gathered from the digital garden.
              </p>
            </div>
            <a href="/blog" className="garden-sec-cta">
              View all blogs →
            </a>
          </div>

          <div className="garden-blogs-stack">
            {/* FEATURED BLOG CARD (Top Full Width Card) */}
            {shuffledBlogs && shuffledBlogs.length > 0 && (() => {
              const feat = shuffledBlogs[0];
              const title = feat.frontMatter?.title || feat.frontMatter?.name || "Untitled Post";
              const desc = feat.frontMatter?.description || feat.frontMatter?.metaContent || "Read full engineering blog post...";
              const rawTag = feat.frontMatter?.tags || feat.frontMatter?.tag || "javascript";
              const tagList = Array.isArray(rawTag) ? rawTag : rawTag.split(",").map((t) => t.trim());
              const thumb = feat.frontMatter?.thumbnail || feat.frontMatter?.profilePic || "https://i.ibb.co/8rFR7vK/ex3.jpg";
              const author = feat.frontMatter?.author || "Ashutosh Anand Tiwari";
              const dateRaw = feat.frontMatter?.date || feat.frontMatter?.publishedOn || "Recently";
              const formattedDate = formatGardenDate(dateRaw);

              return (
                <motion.article
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="garden-blog-featured-card"
                  onClick={() => router.push(`/blog/${feat.slug}`)}
                >
                  <div className="garden-blog-featured-thumb-wrap">
                    <img
                      className="garden-blog-featured-thumb"
                      src={thumb}
                      alt={title}
                      loading="lazy"
                    />
                  </div>

                  <div className="garden-blog-featured-info">
                    <div className="garden-blog-card-top">
                      <div className="garden-blog-tags-row">
                        {tagList.slice(0, 3).map((t, i) => (
                          <span key={i} className={`garden-tag-pill ${i % 2 === 1 ? 'garden-tag-pill-alt' : ''}`}>
                            • {t.replace(/^#/, '')}
                          </span>
                        ))}
                      </div>
                      <button
                        className="garden-blog-bookmark-btn"
                        title="Bookmark"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <HiOutlineBookmark />
                      </button>
                    </div>

                    <h3 className="garden-blog-featured-title">{title}</h3>
                    <p className="garden-blog-featured-desc">{desc}</p>

                    <div className="garden-blog-meta-footer">
                      <div className="garden-blog-author-box">
                        <div className="garden-blog-author-initial">
                          {author.slice(0, 1)}
                        </div>
                        <span>{author} &nbsp;•&nbsp; {formattedDate}</span>
                      </div>
                      <span className="garden-blog-read-link">Read Story →</span>
                    </div>
                  </div>
                </motion.article>
              );
            })()}

            {/* BELOW CARDS GRID (3 Columns) */}
            <div className="garden-blogs-grid">
              {shuffledBlogs && shuffledBlogs.length > 1 ? (
                shuffledBlogs.slice(1, 4).map((blog, idx) => {
                  const title = blog.frontMatter?.title || blog.frontMatter?.name || "Untitled Post";
                  const desc = blog.frontMatter?.description || blog.frontMatter?.metaContent || "Read full engineering blog post...";
                  const rawTag = blog.frontMatter?.tags || blog.frontMatter?.tag || "tech";
                  const tagList = Array.isArray(rawTag) ? rawTag : rawTag.split(",").map((t) => t.trim());
                  const dateRaw = blog.frontMatter?.date || blog.frontMatter?.publishedOn || "Recently";
                  const formattedDate = formatGardenDate(dateRaw);

                  return (
                    <motion.article
                      key={blog.slug || idx}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      className="garden-blog-card"
                      onClick={() => router.push(`/blog/${blog.slug}`)}
                    >
                      <div className="garden-blog-card-body">
                        <div className="garden-blog-card-top">
                          <div className="garden-blog-tags-row">
                            {tagList.slice(0, 2).map((t, i) => (
                              <span key={i} className={`garden-tag-pill ${i % 2 === 1 ? 'garden-tag-pill-alt' : ''}`}>
                                • {t.replace(/^#/, '')}
                              </span>
                            ))}
                          </div>
                          <button
                            className="garden-blog-bookmark-btn"
                            title="Bookmark"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <HiOutlineBookmark />
                          </button>
                        </div>

                        <h3>{title}</h3>
                        <p>{desc}</p>
                      </div>

                      <div className="garden-blog-meta-footer">
                        <span>{formattedDate}</span>
                        <span className="garden-blog-read-link">Read Story →</span>
                      </div>
                    </motion.article>
                  );
                })
              ) : (
                <>
                  <motion.article
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="garden-blog-card"
                    onClick={() => router.push("/blog")}
                  >
                    <div className="garden-blog-card-body">
                      <div className="garden-blog-card-top">
                        <div className="garden-blog-tags-row">
                          <span className="garden-tag-pill">#nodejs</span>
                          <span className="garden-tag-pill garden-tag-pill-alt">#architecture</span>
                        </div>
                        <button className="garden-blog-bookmark-btn" title="Bookmark">
                          <HiOutlineBookmark />
                        </button>
                      </div>
                      <h3>Namaste Node.js Architecture</h3>
                      <p>
                        Deep dive into Node.js event loop, thread pool, and non-blocking I/O.
                      </p>
                    </div>
                    <div className="garden-blog-meta-footer">
                      <span>Recent</span>
                      <span className="garden-blog-read-link">Read Story →</span>
                    </div>
                  </motion.article>

                  <motion.article
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="garden-blog-card"
                    onClick={() => router.push("/blog")}
                  >
                    <div className="garden-blog-card-body">
                      <div className="garden-blog-card-top">
                        <div className="garden-blog-tags-row">
                          <span className="garden-tag-pill">#frontend</span>
                          <span className="garden-tag-pill garden-tag-pill-alt">#systemdesign</span>
                        </div>
                        <button className="garden-blog-bookmark-btn" title="Bookmark">
                          <HiOutlineBookmark />
                        </button>
                      </div>
                      <h3>Frontend System Design Best Practices</h3>
                      <p>
                        Building scalable web architectures with micro-frontends and caching.
                      </p>
                    </div>
                    <div className="garden-blog-meta-footer">
                      <span>Recent</span>
                      <span className="garden-blog-read-link">Read Story →</span>
                    </div>
                  </motion.article>

                  <motion.article
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className="garden-blog-card"
                    onClick={() => router.push("/blog")}
                  >
                    <div className="garden-blog-card-body">
                      <div className="garden-blog-card-top">
                        <div className="garden-blog-tags-row">
                          <span className="garden-tag-pill">#performance</span>
                          <span className="garden-tag-pill garden-tag-pill-alt">#metrics</span>
                        </div>
                        <button className="garden-blog-bookmark-btn" title="Bookmark">
                          <HiOutlineBookmark />
                        </button>
                      </div>
                      <h3>Event Loop Latency Profiling</h3>
                      <p>
                        How we diagnosed p99 latency spikes in high-throughput Node services.
                      </p>
                    </div>
                    <div className="garden-blog-meta-footer">
                      <span>Recent</span>
                      <span className="garden-blog-read-link">Read Story →</span>
                    </div>
                  </motion.article>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="garden-testimonials-sec">
        <div className="garden-wrap">
          <div className="garden-sec-header-row">
            <div>
              <div className="garden-sec-title-wrap">
                <HiChatBubbleLeftRight className="garden-sec-title-icon" />
                <h2 className="garden-sec-title" style={{ margin: 0 }}>
                  Reader Feedback
                </h2>
              </div>
              <p className="garden-sec-desc" style={{ marginTop: 8 }}>
                Unedited feedback from developers who studied from these notes.
              </p>
            </div>
            <a href="#testimonials" className="garden-sec-cta">
              View all feedback →
            </a>
          </div>

          <div className="garden-marquee-wrap">
            <div className="garden-marquee-track">
              {marqueeTestimonials.map((item, idx) => (
                <div key={idx} className="garden-quote-card">
                  <div>
                    <div className="garden-quote-mark">“</div>
                    <p className="garden-quote-text">{item.comment}</p>
                  </div>

                  <div className="garden-quote-author">
                    <img
                      className="garden-quote-avatar"
                      src={item.avatar}
                      alt={item.name}
                    />
                    <div className="garden-quote-info">
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Centered Provide Feedback Button */}
          <div className="garden-feedback-cta-wrap">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="https://github.com/ashumsd7/heyashu/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="garden-provide-feedback-btn"
            >
              <HiChatBubbleLeftRight /> Provide a feedback
            </motion.a>
          </div>
        </div>
      </section>

      {/* SUPPORT & DONATION SECTION */}
      <section id="support" className="garden-sec garden-support-sec">
        <div className="garden-wrap">
          {/* Section Header Top */}
          <div className="garden-sec-header-row" style={{ marginBottom: 28 }}>
            <div>
              <div className="garden-sec-title-wrap">
                <HiHeart className="garden-sec-title-icon" style={{ color: "#c4552d" }} />
                <h2 className="garden-sec-title" style={{ margin: 0 }}>
                  Support The Garden
                </h2>
              </div>
              <p className="garden-sec-desc" style={{ marginTop: 8 }}>
                Help keep this open-source digital garden online, fast, and 100% ad-free for every learner.
              </p>
            </div>
          </div>

          {/* Single Support Main Card */}
          <div className="garden-single-support-card">
            {/* Left Side Content Items */}
            <div className="garden-support-main-left">
              {/* ITEM 1: HOSTING */}
              <div className="garden-support-item">
                <div className="garden-support-icon-badge badge-hosting">
                  <HiServer />
                </div>
                <div className="garden-support-item-content">
                  <h3 className="garden-support-title">Hosting &amp; Server Infrastructure</h3>
                  <p className="garden-support-desc">
                    Contributions directly fund high-speed CDN hosting, bandwidth, domain renewals, and database servers so the notes stay online 24/7 without ad clutter.
                  </p>
                </div>
              </div>

              {/* ITEM 2: DONATIONS TO OLD BOYS */}
              <div className="garden-support-item">
                <div className="garden-support-icon-badge badge-oldboys">
                  <HiUserGroup />
                </div>
                <div className="garden-support-item-content">
                  <h3 className="garden-support-title">Donations to Old Boys &amp; Students</h3>
                  <p className="garden-support-desc">
                    Empowering old batchmates, students, and junior developers from underrepresented backgrounds with learning resources, books, and course access.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side QR Code & CTA */}
            <div className="garden-support-main-right">
              <div className="garden-qr-badge">
                <HiHeart /> Scan to Support Digital Garden
              </div>

              <div className="garden-qr-img-wrap">
                <img
                  className="garden-qr-img"
                  src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://topmate.io/aat/1148709/pay"
                  alt="Topmate Payment QR Code for Digital Garden Support"
                  loading="lazy"
                />
              </div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://topmate.io/aat/1148709/pay"
                target="_blank"
                rel="noopener noreferrer"
                className="garden-qr-btn"
              >
                Click or Scan to Support →
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* HELP CHAI SECTION */}
      <section id="help-chai" className="garden-sec garden-chai-sec" style={{ paddingTop: 0 }}>
        <div className="garden-wrap">
          <div className="garden-chai-card">
            <div className="garden-chai-img-wrap">
              <img
                className="garden-chai-img"
                src="https://help-chai.netlify.app/chai_hero.png"
                alt="Chai the rescue dog needs help"
                loading="lazy"
              />
            </div>

            <div className="garden-chai-info">
              <div className="garden-chai-badge">
                🐾 Urgent Rescue Cause
              </div>
              <h3 className="garden-chai-title">Help Chai Heal &amp; Recover</h3>
              <p className="garden-chai-desc">
                Chai is a gentle 1.5-year-old rescue mother who suffered severe fractures in both hind legs in Ayodhya. She needs 24x7 nursing observation &amp; care in Lucknow. A small contribution can save her life and help her heal.
              </p>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://help-chai.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="garden-chai-btn"
              >
                Donate for Chai's Recovery →
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      <DigiGardenFooter />
    </div>
  );
}

DigitalGarden.getLayout = (page) => page;

export default DigitalGarden;

export async function getStaticProps() {
  const testimonialsDir = path.join(
    process.cwd(),
    "src/content/testimonials"
  );
  const blogDir = path.join(process.cwd(), "src/content/blog");

  let posts = [];
  try {
    const filenames = fs.readdirSync(testimonialsDir);
    posts = filenames.map((filename) => {
      const fileContent = fs.readFileSync(
        path.join(testimonialsDir, filename),
        "utf-8"
      );
      const { data: frontMatter, content } = matter(fileContent);
      return {
        frontMatter,
        content,
        slug: filename.replace(".md", ""),
      };
    });
  } catch (e) {
    posts = [];
  }

  let blogs = [];
  try {
    blogs = fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".md"))
      .map((filename) => {
        const fileContent = fs.readFileSync(
          path.join(blogDir, filename),
          "utf-8"
        );
        const { data: frontMatter } = matter(fileContent);
        return {
          frontMatter,
          slug: filename.replace(".md", ""),
        };
      })
      .sort((a, b) => {
        const da = a.frontMatter?.publishedOn || a.frontMatter?.date || "";
        const db = b.frontMatter?.publishedOn || b.frontMatter?.date || "";
        return db.localeCompare(da);
      });
  } catch (e) {
    blogs = [];
  }

  return {
    props: {
      posts,
      blogs,
    },
  };
}

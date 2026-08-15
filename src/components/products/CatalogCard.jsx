import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiArrowUpRight,
  HiOutlineArrowRight,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCommandLine,
  HiOutlineDocumentText,
  HiOutlineFlag,
  HiOutlineMicrophone,
  HiOutlineQuestionMarkCircle,
  HiOutlineRadio,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import SquareMedia from "@/components/products/SquareMedia";
import {
  catalogCtaLabel,
  catalogHref,
  catalogTitle,
  getProductStatus,
  isProduct,
  isTool,
  opensExternally,
  typeLabel,
} from "@/data/products/catalog";

const TYPE_TONE = {
  Product: "bg-emerald-500/12 text-emerald-800 dark:text-emerald-300",
  Service: "bg-sky-500/12 text-sky-800 dark:text-sky-300",
  Tool: "bg-violet-500/12 text-violet-800 dark:text-violet-300",
};

const SERVICE_ICONS = {
  question: HiOutlineQuestionMarkCircle,
  resume: HiOutlineDocumentText,
  mic: HiOutlineMicrophone,
  target: HiOutlineFlag,
  code: HiOutlineCommandLine,
  rocket: HiOutlineRocketLaunch,
  radio: HiOutlineRadio,
  chat: HiOutlineChatBubbleLeftRight,
};

function ServiceIcon({ name }) {
  const Icon = SERVICE_ICONS[name] || HiOutlineChatBubbleLeftRight;
  return <Icon className="h-8 w-8 text-[#143825] dark:text-[#22c55e]" />;
}

export function ProductStatusPills({ item }) {
  const status = getProductStatus(item);
  if (status.comingSoon) {
    return (
      <>
        <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300">
          Coming soon
        </span>
        <span className="rounded-full bg-[#f3eee5] px-2.5 py-0.5 text-[10px] font-semibold text-[#5f584e] dark:bg-[#172a20] dark:text-[#92a59a]">
          Launching on · {status.launchingOn}
        </span>
      </>
    );
  }
  return (
    <>
      <span className="rounded-full bg-emerald-500/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-300">
        Published · {status.publishedOn}
      </span>
      <span className="rounded-full bg-[#f3eee5] px-2.5 py-0.5 text-[10px] font-semibold text-[#5f584e] dark:bg-[#172a20] dark:text-[#92a59a]">
        Last updated · {status.lastUpdated}
      </span>
    </>
  );
}

function BannerPattern() {
  return (
    <div
      className="pointer-events-none absolute -right-6 -top-8 h-56 w-56 text-[#8a9098] opacity-[0.22] dark:text-[#9aa3ab] dark:opacity-[0.16]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
        <circle cx="140" cy="50" r="46" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="140" cy="50" r="28" stroke="currentColor" strokeWidth="1" />
        <path
          d="M20 160h160M20 140h160M20 120h160"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 7"
        />
        <rect x="108" y="18" width="64" height="64" rx="8" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function FeaturedProductBanner({ item }) {
  if (!item) return null;

  const title = catalogTitle(item);
  const href = catalogHref(item);
  const tags = item.hashtags || [];

  return (
    <Link
      href={href}
      className="group relative flex w-full flex-col items-stretch gap-6 overflow-hidden rounded-3xl border border-[#c5c9ce] bg-gradient-to-br from-white via-[#f7f8fa] to-[#eceef1] px-5 py-6 no-underline shadow-[0_18px_48px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-[#7a838c] dark:from-[#161d22] dark:via-[#12181d] dark:to-[#0e1318] sm:flex-row sm:items-center sm:gap-8 sm:px-8 sm:py-8"
    >
      <BannerPattern />
      <SquareMedia
        src={item.squareImage}
        alt={title}
        sizeClass="relative z-[1] h-[220px] w-full sm:h-[240px] sm:w-[240px] lg:h-[280px] lg:w-[280px]"
        rounded="rounded-2xl"
      />
      <div className="relative z-[1] flex min-w-0 flex-1 flex-col justify-center gap-4 py-1">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${TYPE_TONE.Product}`}>
              Product
            </span>
            <ProductStatusPills item={item} />
          </div>
          <h2 className="mb-3 font-fraunces text-[clamp(1.7rem,3.4vw,2.55rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#171717] dark:text-[#f0f4ef]">
            {title}
          </h2>
          <p className="max-w-[62ch] text-[1.02rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
            {item.description}
          </p>
        </div>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/80 px-2.5 py-0.5 text-[12px] font-medium text-[#5f584e] ring-1 ring-[#c5c9ce]/70 dark:bg-[#172a20] dark:text-[#92a59a] dark:ring-[#3d4a42]"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        <span className="catalog-cta inline-flex w-fit items-center gap-1.5 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white shadow-md">
          View Details
          <HiOutlineArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export default function CatalogCard({ item, index = 0 }) {
  const product = isProduct(item);
  const tool = isTool(item);
  const title = catalogTitle(item);
  const href = catalogHref(item);
  const tags = product ? item.hashtags || [] : [];
  const cta = catalogCtaLabel(item);
  const kind = typeLabel(item);
  const external = opensExternally(item);

  const inner = (
    <>
      {tool ? (
        <span
          className="pointer-events-none absolute -right-4 -top-6 h-28 w-28 text-violet-400/35 dark:text-violet-300/20"
          aria-hidden="true"
        >
          <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
            <circle cx="80" cy="32" r="28" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="80" cy="32" r="14" stroke="currentColor" />
            <path d="M8 88h96M8 100h72" stroke="currentColor" strokeDasharray="3 5" />
          </svg>
        </span>
      ) : null}
      <SquareMedia
        src={product || tool ? item.squareImage : ""}
        alt={title}
        fallback={!product ? <ServiceIcon name={item.icon} /> : null}
        sizeClass="relative z-[1] h-[96px] w-[96px] sm:h-[108px] sm:w-[108px]"
      />

      <div className="relative z-[1] flex min-w-0 flex-1 flex-col justify-between gap-2.5">
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${TYPE_TONE[kind]}`}
            >
              {kind}
            </span>
            {product ? <ProductStatusPills item={item} /> : null}
          </div>

          <h2 className="mb-1 font-fraunces text-[1.05rem] font-semibold leading-snug tracking-[-0.01em] text-[#171717] dark:text-[#f0f4ef] sm:text-[1.12rem]">
            {title}
          </h2>
          <p className="line-clamp-2 text-[0.84rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#f3eee5] px-2 py-0.5 text-[10px] font-medium text-[#5f584e] dark:bg-[#172a20] dark:text-[#92a59a]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <span className="catalog-cta inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm">
            {cta}
            {external ? (
              <HiArrowUpRight className="h-3 w-3" />
            ) : (
              <HiOutlineArrowRight className="h-3 w-3" />
            )}
          </span>
        </div>
      </div>
    </>
  );

  const shellClass = tool
    ? "group relative flex h-full w-full items-stretch gap-3.5 overflow-hidden rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50 via-fuchsia-50/50 to-amber-50 p-4 no-underline shadow-[0_8px_28px_rgba(109,40,217,0.08)] transition duration-300 hover:bg-violet-100/70 hover:shadow-[0_14px_36px_rgba(109,40,217,0.14)] dark:border-violet-500/25 dark:from-[#1a1524] dark:via-[#16121f] dark:to-[#121e17] dark:hover:bg-[#241a33]"
    : "group flex h-full w-full items-stretch gap-3.5 rounded-2xl border border-[#e8e2d7] bg-white p-4 no-underline shadow-[0_8px_28px_rgba(20,56,37,0.06)] transition duration-300 hover:bg-emerald-50/70 hover:shadow-[0_14px_36px_rgba(20,56,37,0.1)] dark:border-[#1e3328] dark:bg-[#121e17] dark:hover:bg-[#173024]";

  const motionProps = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.4, delay: Math.min(index * 0.05, 0.3) },
  };

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
        className={shellClass}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps} className="h-full">
      <Link href={href} className={shellClass}>
        {inner}
      </Link>
    </motion.div>
  );
}

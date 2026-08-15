import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiArrowLeft,
  HiArrowUpRight,
  HiOutlineAcademicCap,
  HiOutlineCheckBadge,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import CommonSlugHeadTags from "@/components/seo/CommonSlugHeadTags";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import ProductMarkdown from "@/components/products/ProductMarkdown";
import { ThumbnailMedia } from "@/components/products/SquareMedia";
import { ProductStatusPills } from "@/components/products/CatalogCard";
import { withDigitalGardenLayout } from "@/layouts";
import {
  getProductBySlug,
  getProductStatus,
  getProducts,
} from "@/data/products/catalog";

export async function getStaticPaths() {
  return {
    paths: getProducts().map((item) => ({ params: { slug: item.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { notFound: true };
  return { props: { product } };
}

function SectionCard({ title, icon: Icon, children }) {
  if (!children) return null;
  return (
    <section className="rounded-2xl border border-[#e8e2d7] bg-white p-5 shadow-[0_8px_28px_rgba(20,56,37,0.05)] dark:border-[#1e3328] dark:bg-[#121e17] sm:p-7">
      <h2 className="mb-4 flex items-center gap-2.5 font-fraunces text-[1.25rem] font-semibold tracking-[-0.01em] text-[#171717] dark:text-[#f0f4ef]">
        {Icon ? (
          <Icon className="h-5 w-5 shrink-0 text-[#143825] dark:text-[#22c55e]" />
        ) : null}
        {title}
      </h2>
      {children}
    </section>
  );
}

function ProductSlugPage({ product }) {
  const status = getProductStatus(product);
  const ctaHref = product.ctaLink || "";
  const thumb = product.thumbnailImage || product.squareImage || "";

  return (
    <div className="bg-[#faf7f2] dark:bg-[#0b120e]">
      <CommonSlugHeadTags
        title={product.name}
        url={`https://www.heyashu.in/product/${product.slug}`}
        image={thumb || undefined}
        shortDesc={product.description}
        mainDesc={product.description}
        tags={(product.hashtags || []).join(", ")}
        frontMatter={{
          name: product.name,
          description: product.description,
          thumbnail: thumb,
          publishedOn: product.launch?.launchedOn,
          lastModified: product.launch?.lastUpdated,
        }}
      />

      <article className="mx-auto w-full max-w-[1040px] px-4 pb-10 pt-8 sm:px-6 md:pt-12">
        <Link
          href="/product"
          className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#585858] no-underline hover:text-[#143825] dark:text-[#92a59a] dark:hover:text-[#22c55e]"
        >
          <HiArrowLeft className="h-4 w-4" />
          All products
        </Link>

        {(product.hashtags || []).length > 0 ? (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {product.hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#f3eee5] px-2.5 py-0.5 text-[12px] font-medium text-[#5f584e] dark:bg-[#172a20] dark:text-[#92a59a]"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        <ThumbnailMedia
          src={thumb}
          alt={product.name}
          className="mb-7 aspect-[16/9] w-full"
        />

        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-7"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-500/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-300">
              Product
            </span>
            <ProductStatusPills item={product} />
          </div>

          <h1 className="font-fraunces text-[clamp(1.85rem,4vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#171717] dark:text-[#f0f4ef]">
            {product.name}
          </h1>
          {product.description ? (
            <p className="mt-3 max-w-[68ch] text-[1.05rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
              {product.description}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {status.comingSoon || !ctaHref ? (
              <span
                aria-disabled="true"
                title="Course is not launched yet"
                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-xl bg-slate-300/80 px-5 py-2.5 text-[13px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-400"
              >
                View Course
              </span>
            ) : (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="catalog-cta inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white no-underline shadow-md"
              >
                View Course
                <HiArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}

            <a
              href={product.queryLink || "https://topmate.io/aat/1148709/pay"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#c5c9ce] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#171717] no-underline shadow-sm transition hover:border-[#143825] hover:bg-[#f7f8fa] dark:border-[#3d4a42] dark:bg-[#121e17] dark:text-[#f0f4ef] dark:hover:border-[#22c55e]"
            >
              Have a query?
              <HiArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.header>

        {product.notice ? (
          <aside className="mb-6 rounded-2xl border border-amber-300/80 bg-amber-50 px-5 py-4 text-[0.95rem] leading-relaxed text-amber-950 shadow-[0_8px_24px_rgba(180,120,20,0.08)] dark:border-amber-500/30 dark:bg-amber-400/10 dark:text-amber-100">
            <p className="mb-1 font-ibm-mono text-[10px] font-bold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300">
              Notice
            </p>
            <p className="m-0">{product.notice}</p>
          </aside>
        ) : null}

        <div className="flex flex-col gap-5">
          <SectionCard title="Who this is for" icon={HiOutlineUserGroup}>
            <ProductMarkdown content={product.forWho} />
          </SectionCard>
          <SectionCard title="What you will learn" icon={HiOutlineAcademicCap}>
            <ProductMarkdown content={product.whatYouWillLearn} />
          </SectionCard>
          <SectionCard title="Prerequisites" icon={HiOutlineCheckBadge}>
            <ProductMarkdown content={product.prerequisites} />
          </SectionCard>
        </div>
      </article>

      <DigiGardenFooter />
    </div>
  );
}

export default ProductSlugPage;

ProductSlugPage.getLayout = withDigitalGardenLayout;

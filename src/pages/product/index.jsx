import React, { useMemo, useState } from "react";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";
import CatalogCard, { FeaturedProductBanner } from "@/components/products/CatalogCard";
import { withDigitalGardenLayout } from "@/layouts";
import {
  getCatalog,
  getFeaturedProduct,
  isProduct,
  isService,
  isTool,
} from "@/data/products/catalog";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "product", label: "Product" },
  { id: "service", label: "Services" },
  { id: "tool", label: "Tools" },
];

function ProductIndexPage() {
  const catalog = getCatalog();
  const featured = getFeaturedProduct();
  const [filter, setFilter] = useState("all");

  const counts = useMemo(
    () => ({
      all: catalog.length,
      product: catalog.filter(isProduct).length,
      service: catalog.filter(isService).length,
      tool: catalog.filter(isTool).length,
    }),
    [catalog]
  );

  const items = useMemo(() => {
    const list =
      filter === "all" ? catalog : catalog.filter((item) => item.type === filter);
    if (!featured) return list;
    return list.filter((item) => item !== featured);
  }, [catalog, filter, featured]);

  return (
    <div className="bg-[#faf7f2] dark:bg-[#0b120e]">
      <CommonHeadTags
        title="Products — Digital Garden | heyashu"
        url="https://www.heyashu.in/product"
        shortDec="Products, 1:1 services, and tools from Ashutosh Anand Tiwari."
        mainDesc="Explore products, 1:1 career sessions, and tools from Ashutosh Anand Tiwari."
        tags="Products, Mentoring, Conversational AI, Career Guidance, Ashutosh Anand Tiwari"
      />

      <div className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-10 sm:px-6 md:pt-14">
        <header className="mb-8 max-w-3xl">
          <p className="mb-3 font-ibm-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a8276] dark:text-[#6d7f74]">
            Digital Garden · Catalog
          </p>
          <h1 className="mb-3 font-fraunces text-[clamp(2.1rem,5vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#171717] dark:text-[#f0f4ef]">
            Products &amp; Services
          </h1>
          <p className="text-[1.05rem] leading-relaxed text-[#6b6458] dark:text-[#92a59a]">
            Get in touch, learn, or connect 1:1. Products open a full page.
            Services book a live call with me.
          </p>
        </header>

        <section className="mb-10">
          <FeaturedProductBanner item={featured} />
        </section>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded-full border px-4 py-1.5 text-[13px] font-semibold transition ${
                  active
                    ? "border-[#1f2a22] bg-[#1f2a22] text-white dark:border-[#22c55e] dark:bg-[#22c55e] dark:text-[#0b120e]"
                    : "border-[#e8e2d7] bg-white text-[#585858] hover:border-[#cfc6b8] dark:border-[#1e3328] dark:bg-[#121e17] dark:text-[#92a59a]"
                }`}
              >
                {f.label}
                <span className="ml-1.5 text-[11px] opacity-70">{counts[f.id]}</span>
              </button>
            );
          })}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {items.map((item, index) => (
              <CatalogCard
                key={item.slug || item.link || item.title}
                item={item}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-[#e8e2d7] bg-white/60 px-5 py-10 text-center text-sm text-[#6b6458] dark:border-[#1e3328] dark:bg-[#121e17]/60 dark:text-[#92a59a]">
            Nothing in this filter yet.
          </p>
        )}
      </div>

      <DigiGardenFooter />
    </div>
  );
}

export default ProductIndexPage;

ProductIndexPage.getLayout = withDigitalGardenLayout;

import React, { useEffect } from "react";
import Head from "next/head";
import { loadNotesStaticPaths } from "@/data/note/loadNotesMeta";
import { withBareLayout } from "@/layouts";
import { SITE_ORIGIN } from "@/utils/seo";

export default function AiCyclopediaToBlog({ slug }) {
  const href = `/blog/${slug}`;

  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0;url=${href}`} />
        <link rel="canonical" href={`${SITE_ORIGIN}${href}`} />
        <title>Redirecting…</title>
      </Head>
      <p className="p-8 text-center text-sm text-[#5f584e]">
        Opening{" "}
        <a href={href} className="underline">
          {href}
        </a>
        …
      </p>
    </>
  );
}

AiCyclopediaToBlog.getLayout = withBareLayout;

export async function getStaticPaths() {
  return loadNotesStaticPaths("ai-clopedia");
}

export async function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}

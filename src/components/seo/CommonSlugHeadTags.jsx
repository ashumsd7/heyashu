import Head from "next/head";
import React from "react";
import {
  LINK_PREVIEW_FALLBACK,
  SITE_NAME,
  SITE_ORIGIN,
  TWITTER_HANDLE,
  absoluteUrl,
  pickLinkPreviewImage,
} from "@/utils/seo";
import {
  breadcrumbList,
  jsonLdScript,
  learningResourceSchema,
} from "@/utils/seoJsonLd";

function CommonSlugHeadTags({
  frontMatter,
  image,
  url,
  title,
  shortDesc = "Explore curated technical notes, tutorials, and insights on JavaScript, Node.js, React, and more.",
  mainDesc = "Comprehensive collection of programming tutorials, tech insights, and development best practices by Ashutosh Anand Tiwari.",
  tags = "JavaScript, Node.js, React, Web Development, Programming Tutorials, Tech Blog, Digital Garden",
  collectionName,
  collectionPath,
  breadcrumbs,
  extraJsonLd,
}) {
  const headline =
    frontMatter?.episodeTitle?.trim() ||
    frontMatter?.name ||
    frontMatter?.title ||
    title ||
    "Digital Garden — Knowledge Hub by Ashutosh Anand Tiwari";

  const pageTitle = collectionName
    ? `${headline} | ${collectionName} — Digital Garden | heyashu`
    : `${headline} | ${
        frontMatter?.author || "Ashutosh Anand Tiwari"
      } — Digital Garden`;

  const description =
    frontMatter?.description ||
    frontMatter?.metaContent ||
    shortDesc ||
    `Read ${headline} — ${mainDesc}`;

  const keywordList = [
    tags,
    frontMatter?.tags,
    collectionName,
    frontMatter?.name,
    "digital notes",
    "heyashu",
  ]
    .flatMap((t) =>
      String(t || "")
        .split(/[,#]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    )
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(", ");

  const canonical = absoluteUrl(url || `${SITE_ORIGIN}/digital-garden`);
  const absoluteImage = pickLinkPreviewImage(frontMatter?.thumbnail, image);
  const datePublished =
    frontMatter?.publishedOn || frontMatter?.date || undefined;
  const dateModified =
    frontMatter?.lastModified ||
    frontMatter?.updatedOn ||
    datePublished ||
    undefined;

  const crumbItems =
    breadcrumbs ||
    [
      { name: "Digital Garden", url: "/digital-garden" },
      { name: "Notes", url: "/digital-garden/notes" },
      collectionName && collectionPath
        ? { name: collectionName, url: collectionPath }
        : null,
      { name: headline, url: canonical },
    ].filter(Boolean);

  const ld = jsonLdScript([
    learningResourceSchema({
      name: headline,
      description,
      url: canonical,
      image: absoluteImage,
      datePublished,
      dateModified,
      keywords: keywordList,
      authorName: frontMatter?.author || "Ashutosh Anand Tiwari",
      isPartOfUrl: collectionPath,
      isPartOfName: collectionName,
    }),
    {
      "@type": "Article",
      headline,
      image: absoluteImage,
      author: {
        "@type": "Person",
        name: frontMatter?.author || "Ashutosh Anand Tiwari",
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: LINK_PREVIEW_FALLBACK,
        },
      },
      url: canonical,
      description,
      datePublished,
      dateModified,
      keywords: keywordList,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
      isAccessibleForFree: true,
    },
    breadcrumbList(crumbItems),
    ...(Array.isArray(extraJsonLd) ? extraJsonLd : extraJsonLd ? [extraJsonLd] : []),
  ]);

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/fav_main.ico" />
      <link rel="apple-touch-icon" href="/fav_main.ico" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordList} />
      <meta
        name="author"
        content={frontMatter?.author || "Ashutosh Anand Tiwari"}
      />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:secure_url" content={absoluteImage} />
      <meta property="og:image:alt" content={headline} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="article:author" content={frontMatter?.author || "Ashutosh Anand Tiwari"} />
      {datePublished ? (
        <meta property="article:published_time" content={datePublished} />
      ) : null}
      {dateModified ? (
        <meta property="article:modified_time" content={dateModified} />
      ) : null}
      <meta itemProp="image" content={absoluteImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={headline} />

      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={canonical} />
      <link
        rel="alternate"
        type="text/plain"
        href={`${SITE_ORIGIN}/llms.txt`}
        title="llms.txt"
      />

      {ld ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={ld} />
      ) : null}
    </Head>
  );
}

export default CommonSlugHeadTags;

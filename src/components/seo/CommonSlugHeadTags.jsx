import Head from "next/head";
import React from "react";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  TWITTER_HANDLE,
  absoluteImageUrl,
  absoluteUrl,
} from "@/utils/seo";

function CommonSlugHeadTags({
  frontMatter,
  image,
  url,
  title,
  shortDesc = "Explore curated technical notes, tutorials, and insights on JavaScript, Node.js, React, and more.",
  mainDesc = "Comprehensive collection of programming tutorials, tech insights, and development best practices by Ashutosh Anand Tiwari.",
  tags = "JavaScript, Node.js, React, Web Development, Programming Tutorials, Tech Blog, Digital Garden",
}) {
  const headline =
    frontMatter?.name ||
    frontMatter?.title ||
    title ||
    "Digital Garden — Knowledge Hub by Ashutosh Anand Tiwari";

  const pageTitle = `${headline} | ${
    frontMatter?.author || "Ashutosh Anand Tiwari"
  } — Digital Garden`;

  const description =
    frontMatter?.description ||
    frontMatter?.metaContent ||
    shortDesc ||
    `Read ${headline} — ${mainDesc}`;

  const canonical = absoluteUrl(url || `${SITE_ORIGIN}/digital-garden`);
  const absoluteImage = absoluteImageUrl(
    image || frontMatter?.thumbnail,
    DEFAULT_OG_IMAGE
  );
  const datePublished =
    frontMatter?.publishedOn || frontMatter?.date || undefined;
  const dateModified =
    frontMatter?.lastModified ||
    frontMatter?.updatedOn ||
    datePublished ||
    undefined;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/fav_main.ico" />
      <link rel="apple-touch-icon" href="/fav_main.ico" />
      <meta name="description" content={description} />
      <meta name="keywords" content={tags} />
      <meta
        name="author"
        content={frontMatter?.author || "Ashutosh Anand Tiwari"}
      />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={canonical} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: pageTitle,
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
                url: absoluteUrl("/images/profile.jpg"),
              },
            },
            url: canonical,
            description,
            datePublished,
            dateModified,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonical,
            },
          }),
        }}
      />
    </Head>
  );
}

export default CommonSlugHeadTags;

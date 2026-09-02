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
import { jsonLdScript } from "@/utils/seoJsonLd";

function CommonHeadTags({
  image,
  url = `${SITE_ORIGIN}/digital-garden`,
  title = "Digital Notes by Ashutosh Anand Tiwari",
  shortDec = "Explore a rich collection of blogs, digital notes, reviews experiences and stories covering JavaScript, Node.js, React, and more.",
  mainDesc = "Explore a collection of blogs, digital notes, reviews experiences and stories on various topics, including JavaScript, React, and more. Learn from curated content and insights by Ashutosh Anand Tiwari.",
  tags = "JavaScript, Node.js, React, Digital Notes, Ashutosh Anand Tiwari, Programming, Web Development",
  type = "website",
  siteName = SITE_NAME,
  twitterHandle = TWITTER_HANDLE,
  jsonLd,
}) {
  const canonical = absoluteUrl(url);
  const previewImage = pickLinkPreviewImage(image) || LINK_PREVIEW_FALLBACK;
  const ld = jsonLdScript(jsonLd);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={mainDesc} />
      <meta name="keywords" content={tags} />
      <meta name="author" content="Ashutosh Anand Tiwari" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={shortDec} />
      <meta property="og:image" content={previewImage} />
      <meta property="og:image:secure_url" content={previewImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />
      <meta itemProp="image" content={previewImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={shortDec} />
      <meta name="twitter:image" content={previewImage} />
      <meta name="twitter:image:alt" content={title} />

      <link rel="icon" href="/fav_main.ico" />
      <link rel="apple-touch-icon" href="/fav_main.ico" />
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

export default CommonHeadTags;

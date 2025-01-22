import Head from "next/head";
import React from "react";

function CommonHeadTags({
  image = "https://i.ibb.co/zHFrGsK/diginotes-thumb.jpg",
  url = "https://www.heyashu.com/tech/notes", 
  title = "Digital Notes by Ashutosh Anand Tiwari",
  shortDec = "Explore a rich collection of blogs, digital notes, reviews experiences and stories covering JavaScript, Node.js, React, and more.",
  mainDesc = "Explore a collection of blogs, digital notes, reviews experiences and stories on various topics, including JavaScript, React, and more. Learn from curated content and insights by Ashutosh Anand Tiwari.",
  tags = "JavaScript, Node.js, React, Digital Notes, Ashutosh Anand Tiwari, Programming, Web Development",
  type = "website",
  siteName = "Ashutosh's Digital Garden",
  twitterHandle = "@ashumsd7"
}) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={mainDesc} />
      <meta name="keywords" content={tags} />
      <meta name="author" content="Ashutosh Anand Tiwari" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={shortDec} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={shortDec} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* Favicon */}
      <link rel="icon" href="/digigarden.ico" />
      <link rel="apple-touch-icon" href="/digigarden.ico" />
      <link rel="canonical" href={url} />
    </Head>
  );
}

export default CommonHeadTags;

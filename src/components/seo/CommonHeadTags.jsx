import Head from "next/head";
import React from "react";

function CommonHeadTags({
  image = "https://i.ibb.co/KLn1GDh/notes-logo.jpg",
  url = "https://www.heyashu.com/tech/notes",
  title = "Digital Notes by Ashutosh Anand Tiwari",
  shortDec = "Explore a rich collection of  blogs ,digital notes, reviews experiences and stories covering JavaScript, Node.js, React, and more.",
  mainDesc = "Explore a collection of blogs ,digital notes, reviews experiences and stories  on various topics, including JavaScript, React, and more. Learn from curated content and insights by Ashutosh Anand Tiwari.",
  tags = "JavaScript, Node.js, React, Digital Notes, Ashutosh Anand Tiwari, Programming, Web Development",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={mainDesc} />
      <meta name="keywords" content={tags} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={shortDec} />
      {/* <meta property="og:image" content={image} /> */}
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" /> 
      <meta name="twitter:title" content={shortDec} />
      <meta name="twitter:description" content={shortDec} />
      {/* <meta name="twitter:image" content={image} /> */}
      <link rel="icon" href="/digigarden.ico" />
    </Head>
  );
}

export default CommonHeadTags;

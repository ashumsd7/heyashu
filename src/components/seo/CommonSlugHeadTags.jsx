import Head from "next/head";
import React from "react";

function CommonSlugHeadTags({
  frontMatter,
  image = "https://i.ibb.co/h1Lv81t/digiden-notes.png",
  url = "https://www.heyashu.com/tech/notes",
  title = "Digital Notes by Ashutosh Anand Tiwari",
  shortDec = "Explore a rich collection of digital notes covering JavaScript, Node.js, React, and more.",
  mainDesc = "Explore a collection of digital notes on various topics, including JavaScript, React, and more. Learn from curated content and insights by Ashutosh Anand Tiwari.",
  tags = "JavaScript, Node.js, React, Digital Notes, Ashutosh Anand Tiwari, Programming, Web Development",
}) {
  console.log("frontMatter",frontMatter);
  return (
    <Head>
      <title>
        Article on {frontMatter?.name} by {frontMatter?.author || 'Ashutosh Anand Tiwari'} on heyashu.in 
      </title>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/notes.ico" />

      <meta
        name="description"
        content={`Explore the latest article  posts by ${frontMatter?.author || 'Ashutosh Anand Tiwari'}, on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari.`}
      />
      <meta name="keywords" content={tags} />
      <meta
        property="og:title"
        content={`Read Blog  by ${frontMatter?.title}`}
      />
      <meta
        property="og:description"
        content={`Stay updated with the latest articles and blogs by ${frontMatter?.title} on multiple topics on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari.`}
      />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={`Read  Blog Feed by ${frontMatter?.title} on multiple topics on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari`}
      />
      <meta
        name="twitter:description"
        content={`Read  Blog Feed by ${frontMatter?.title} on multiple topics on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari`}
      />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}

export default CommonSlugHeadTags;

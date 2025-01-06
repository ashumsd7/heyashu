import Head from "next/head";
import React from "react";

function CommonSlugHeadTags({
  frontMatter,
  image = frontMatter?.thumbnail,
  url = "https://www.heyashu.com/tech/notes",
  title = "Digital blogs, notes, reviews experiences and stories on Digital Garden of Ashutosh Anand Tiwari on heyashu.in",
  shortDec = "Explore a rich collection of digital notes covering JavaScript, Node.js, React, and more.",
  mainDesc = "Explore a collection of blogs ,digital notes, reviews experiences and stories on various topics, including JavaScript, React, and more. Learn from curated content and insights by Ashutosh Anand Tiwari.",
  tags = "JavaScript, Node.js, React, Digital Notes, Ashutosh Anand Tiwari, Programming, Web Development",
}) {
  return (
    <Head>
      <title>
        Blog on {frontMatter?.name || frontMatter?.title} by{" "}
        {frontMatter?.author || "Ashutosh Anand Tiwari"} on heyashu.in
      </title>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/notes.ico" />

      <meta
        name="description"
        content={`Explore the latest article  posts by ${
          frontMatter?.author || "Ashutosh Anand Tiwari"
        }, on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari.`}
      />
      <meta name="keywords" content={tags} />
      <meta
        property="og:title"
        content={`Read latest article by ${frontMatter?.author}  on multiple topics on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari`}
      />
      <meta
        property="og:description"
        content={`Stay updated with the latest articles and blogs by ${frontMatter?.author} on multiple topics on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari.`}
      />
      <meta property="og:image" content={frontMatter?.thumbnail || image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={`Read latest article by ${frontMatter?.author} on multiple topics on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari`}
      />
      <meta
        name="twitter:description"
        content={`Read  Blog Feed by ${frontMatter?.author} on multiple topics on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari`}
      />
      <meta name="twitter:image" content={frontMatter?.thumbnail || image} />
    </Head>
  );
}

export default CommonSlugHeadTags;

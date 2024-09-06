import Head from 'next/head'
import React from 'react'

function CommonSlugHeadTags({frontMatter}) {
  return (
    <Head>
    <title>
      {" "}
      Blog on {frontMatter?.title} by {frontMatter?.author} on heyashu.in by
      Ashutosh Anand Tiwari{" "}
    </title>

    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/universe.ico" />

    <meta
      name="description"
      content={`Explore the latest blog posts by ${frontMatter?.author}, on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari.`}
    />
    <meta
      name="keywords"
      content="Blogs, JavaScript, Web Development, Ashutosh Anand Tiwari, Programming, Writing, open source"
    />
    <meta
      property="og:title"
      content={`Read Blog  by ${frontMatter?.title}`}
    />
    <meta
      property="og:description"
      content={`Stay updated with the latest articles and blogs by ${frontMatter?.title} on multiple topics on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari.`}
    />
    <meta
      property="og:image"
      content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
    />
    <meta property="og:url" content="https://www.heyashu.com/blog" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content={`Read  Blog Feed by ${frontMatter?.title} on multiple topics on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari`}
    />
    <meta
      name="twitter:description"
      content={`Read  Blog Feed by ${frontMatter?.title} on multiple topics on https://heyashu/in An open source blog writing platform by Ashutosh Anand Tiwari`}
    />
    <meta
      name="twitter:image"
      content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
    />
  </Head>
  )
}

export default CommonSlugHeadTags
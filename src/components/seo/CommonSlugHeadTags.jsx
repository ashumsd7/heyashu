import Head from "next/head";
import React from "react";

function CommonSlugHeadTags({
  frontMatter,
  image = frontMatter?.thumbnail,
  url = "https://www.heyashu.com/tech/notes",
  title = "Digital Garden - Knowledge Hub by Ashutosh Anand Tiwari",
  shortDesc = "Explore curated technical notes, tutorials, and insights on JavaScript, Node.js, React, and more.",
  mainDesc = "Comprehensive collection of programming tutorials, tech insights, and development best practices by Ashutosh Anand Tiwari.",
  tags = "JavaScript, Node.js, React, Web Development, Programming Tutorials, Tech Blog, Digital Garden",
}) {
  // Construct SEO-friendly title
  const pageTitle = `${frontMatter?.name || frontMatter?.title} | ${
    frontMatter?.author || "Ashutosh Anand Tiwari"
  } - Digital Garden`;

  // Construct clean description without repetition
  const description = frontMatter?.description || 
    `Read ${frontMatter?.name || frontMatter?.title} - ${mainDesc}`;

  // Ensure absolute URL for image
  const absoluteImageUrl = image?.startsWith('http') 
    ? image 
    : `https://www.heyashu.com${image || '/images/default-og-image.jpg'}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/notes.ico" />
      <meta name="description" content={description} />
      <meta name="keywords" content={tags} />
      <meta name="author" content={frontMatter?.author || "Ashutosh Anand Tiwari"} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Digital Garden - heyashu.com" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yourtwitterhandle" />
      <meta name="twitter:creator" content="@yourtwitterhandle" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Schema.org markup for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": pageTitle,
          "image": absoluteImageUrl,
          "author": {
            "@type": "Person",
            "name": frontMatter?.author || "Ashutosh Anand Tiwari"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Digital Garden - heyashu.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.heyashu.com/logo.png"
            }
          },
          "url": url,
          "description": description,
          "datePublished": frontMatter?.date,
          "dateModified": frontMatter?.lastModified || frontMatter?.date
        })}
      </script>
    </Head>
  );
}

export default CommonSlugHeadTags;
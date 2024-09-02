import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import BlogMetaInfo from "@/components/tech/notes-layout/BlogMetaInfo";
import { estimateReadingTime } from "@/utils/functions";
import { DEFAULT_AVATAR, DEFAULT_FOLLOW_LINK } from "@/utils/constant";
import dayjs from "dayjs";
import Image from "next/image";

// Function to fetch the content of the blog post
export async function getStaticProps({ params }) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "blog",
    `${params.slug}.md`
  );
  const fileContents = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter: data,
      mdxSource,
    },
  };
}

// Function to fetch all blog slugs
export async function getStaticPaths() {
  const files = fs.readdirSync(
    path.join(process.cwd(), "src", "content", "blog")
  );

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

// Component to render the blog post
export default function BlogPost({ frontMatter, mdxSource, large = false }) {
  const formattedDate = dayjs(frontMatter?.date, "DD-MM-YYYY").format(
    "DD MMM, YYYY"
  );
  function changeFilePath(filePath) {
    const newFilePath = filePath.replace("/public", "");
    return newFilePath;
  }
  function getImagePath(path) {
    // Remove the 'public' part from the path
    return path.replace(/^\/?public/, "");
  }

  const components = {
    img: ({ src, alt, ...rest }) => {
      // Adjust the path using the utility function
      const adjustedSrc = getImagePath(src);
      return <img src={adjustedSrc} alt={alt} layout="responsive" {...rest} />;
    },
  };

  return (
    <>
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

      <div
        className={`flex flex-col gap-2  max-w-screen-[1000px] m-auto ${
          large ? "max-w-screen-lg" : "max-w-screen-md"
        }`}
      >
        {/* Blog Title */}
        {frontMatter?.title && (
          <h3 className="md:text-5xl text-3xl text-[#130101] font-extrabold my-6 font-sans">
            {" "}
            {frontMatter?.title}
          </h3>
        )}

        {/* Blog Hero Image */}
        {frontMatter?.thumbnail && (
          <Image
            alt={frontMatter?.title}
            src={changeFilePath(frontMatter?.thumbnail)}
            width="1024"
            height={"300"}
          />
        )}

        {/* Blog Meta Info */}
        <div className="mb-4">
          <BlogMetaInfo
            data={{
              name: frontMatter?.author,
              publishedOn: formattedDate,
              title: frontMatter.title,
              timeRead: estimateReadingTime(mdxSource?.compiledSource),
              profilePic: frontMatter.profilePic || DEFAULT_AVATAR,
              followLink: frontMatter?.followLink || DEFAULT_FOLLOW_LINK,
              metaInfo: [
                {
                  name:
                    frontMatter?.metaName ||
                    "Read Write and Download blogs and digital notes on heyashu.in by Ashutosh Anand Tiwari",
                  content:
                    frontMatter?.metaContent ||
                    "Get Latest Digital notes and blogs on heyashu.in nby Ashutosh Anand Tiwari",
                },
              ],
            }}
          />
        </div>
        {/* Main Blog Content */}
        <div
          className={`prose container mx-auto p-0  mb-28 ${
            large ? "max-w-screen-lg" : "max-w-screen-md"
          }`}
        >
          <MDXRemote {...mdxSource} components={components} />
        </div>
      </div>
    </>
  );
}

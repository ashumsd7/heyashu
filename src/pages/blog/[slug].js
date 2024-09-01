import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import BlogMetaInfo from "@/components/tech/notes-layout/BlogMetaInfo";
import { estimateReadingTime } from "@/utils/functions";

// Function to fetch the content of the blog post
export async function getStaticProps({ params }) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "blog",
    `${params.slug}.md`
  );
  console.log("filePath", filePath);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  console.log("fileContents", fileContents);

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
  console.log("mdxSource", mdxSource?.compiledSource);
  console.log("frontMatter", frontMatter);

  return (
    <>
      <Head>
        <title> Blogs by {frontMatter?.author}</title>
        <meta
          name="description"
          content="Explore the latest blog posts by Ashutosh Anand Tiwari, covering topics like JavaScript, web development, and more."
        />
        <meta
          name="keywords"
          content="Blogs, JavaScript, Web Development, Ashutosh Anand Tiwari, Programming, Writing"
        />
        <meta
          property="og:title"
          content="Your Blogs Feed by Ashutosh Anand Tiwari"
        />
        <meta
          property="og:description"
          content="Stay updated with the latest articles and blogs by Ashutosh Anand Tiwari on topics ranging from JavaScript to web development."
        />
        <meta
          property="og:image"
          content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
        />
        <meta property="og:url" content="https://www.heyashu.com/blogs" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Your Blogs Feed by Ashutosh Anand Tiwari"
        />
        <meta
          name="twitter:description"
          content="Discover engaging blog posts by Ashutosh Anand Tiwari on various tech topics."
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
        {/* Blog Hero Image */}
        {/* {blogInfo?.heroImage && (
          <Image alt={blogInfo?.title} src={blogInfo?.heroImage} width='300' height={'300'} />
        )} */}

        {/* Blog Title */}
        {frontMatter?.title && (
          <h2 className="text-black lg:text-[42px] text-2xl font-bold  md:text-center text-justify  mb-2 mt-10 md:mt-0    ">
            {frontMatter?.title}
          </h2>
        )}

        {/* Blog Meta Info */}
        <div className="mb-4">
          <BlogMetaInfo
            data={{
              name: frontMatter?.author,
              publishedOn: frontMatter?.date,
              title: frontMatter.title,
              timeRead: estimateReadingTime(mdxSource?.compiledSource),
              profilePic:
                frontMatter.profilePic ||
                "https://avatars.githubusercontent.com/u/40313523?v=4",
              followLink:
                frontMatter?.followLink || "https://github.com/ashumsd7/",
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
          className={`prose container mx-auto p-0  ${
            large ? "max-w-screen-lg" : "max-w-screen-md"
          }`}
        >
          <MDXRemote {...mdxSource} />
        </div>
      </div>

      {/* <div>
        <h1>{frontMatter.title}</h1>
        <div
          className={`prose container mx-auto p-0  ${
            large ? "max-w-screen-lg" : "max-w-screen-md"
          }`}
        >
          <MDXRemote {...mdxSource} />
        </div>
      </div> */}
    </>
  );
}

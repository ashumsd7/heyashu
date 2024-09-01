import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

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
  console.log("mdxSource", mdxSource);
  console.log("frontMatter", frontMatter);
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <div
        className={`prose container mx-auto p-0  ${
          large ? "max-w-screen-lg" : "max-w-screen-md"
        }`}
      >
        <MDXRemote {...mdxSource} />
      </div>
    </div>
  );
}

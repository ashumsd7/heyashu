import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import BlogMetaInfo from "@/components/tech/notes-layout/BlogMetaInfo";
import { estimateReadingTime, removePublicFromPath } from "@/utils/functions";
import { DEFAULT_AVATAR, DEFAULT_FOLLOW_LINK } from "@/utils/constant";
import dayjs from "dayjs";
import Image from "next/image";
import MDXRenderer from "@/components/base/MDXRenderer";
import CommonSlugHeadTags from "@/components/seo/CommonSlugHeadTags";
import ContentFooter from "@/components/garden/ContentFooter";
import AIQuestionWrapper from "@/components/garden/AIQuestionWrapper";


// Function to fetch the content of the blog post
const contentFolders = [
  "src/content/blog",
  "src/content/experience", 
  "src/content/js-snippets",
  "src/content/node-js-procodrr",
  "src/content/notes-namaste-node-js",
  "src/content/stories",
  "src/content/front-end-design-system",
];

export async function getStaticProps({ params }) {
  // Loop over all content folders to find the file
  let filePath;
  for (const folder of contentFolders) {
    const possiblePath = path.join(process.cwd(), folder, `${params.slug}.md`);
    if (fs.existsSync(possiblePath)) {
      filePath = possiblePath;
      break; // Stop searching once the file is found
    }
  }

  if (!filePath) {
    // If the file is not found, return a 404 error
    return { notFound: true };
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter: data,
      mdxSource,
    },
  };
}

// Function to fetch all blog slugs from multiple folders
export async function getStaticPaths() {
  let paths = [];

  // Loop over all content folders and collect the paths
  contentFolders.forEach((folder) => {
   
    const files = fs.readdirSync(path.join(process.cwd(), folder));

    const folderPaths = files.map((fileName) => ({
      params: {
        slug: fileName.replace('.md', ''),
      },
    }));

    paths = [...paths, ...folderPaths];
  });

  return {
    paths,
    fallback: false, // You can change this to 'true' or 'blocking' if needed
  };
}

// Component to render the blog post
export default function BlogPost({ frontMatter, mdxSource, large = false }) {

  console.log("mdxSource",mdxSource);
 
  const formattedDate = dayjs(frontMatter?.date, "DD-MM-YYYY").format(
    "DD MMM, YYYY"
  );
  function changeFilePath(filePath) {
    const newFilePath = filePath.replace("/public", "");
    return newFilePath;
  }

 

  return (
    <>
      <CommonSlugHeadTags image={frontMatter?.thumbnail} frontMatter={frontMatter} url="https://www.heyashu.com/blog" />


     

      <div
        className={`flex flex-col gap-2 max-w-screen-[1000px] m-auto px-4 ${
          large ? "max-w-screen-lg" : "max-w-screen-md"
        }`}
      >
        {/* Blog Title */}
        {frontMatter?.title && (
          <h3 className="md:text-5xl text-3xl text-gray-900 dark:text-gray-100 font-extrabold  mb-6 md:my-8 mt-16 font-sans">
            {frontMatter?.name || frontMatter?.title}
          </h3>
        )}

        {/* Blog Meta Info */}
        <div className="mb-10">
          <BlogMetaInfo
            data={{
              name: frontMatter?.author,
              publishedOn: formattedDate,
              title: frontMatter?.title,
              timeRead: estimateReadingTime(mdxSource?.compiledSource),
              profilePic: frontMatter?.profilePic || DEFAULT_AVATAR,
              followLink: frontMatter?.followLink || DEFAULT_FOLLOW_LINK,
            }}
          />
        </div>

        {/* Blog Hero Image */}
        {frontMatter?.thumbnail && (
          <Image
            alt={frontMatter?.title}
            src={
              frontMatter?.thumbnail?.includes("https")
                ? frontMatter?.thumbnail
                : changeFilePath(frontMatter?.thumbnail)
            }
            width="1024"
            height={"300"}
            className="rounded-md shadow-lg dark:shadow-gray-800 mb-8"
          />
        )}

     



        {/* Main Blog Content */}
        <div
          className={`prose dark:prose-invert prose-emerald container mx-auto p-0 mb-28 ${
            large ? "max-w-screen-lg" : "max-w-screen-md"
          }`}
        >
          <MDXRenderer markdownContent={mdxSource} />
        </div>
        <ContentFooter/>
      </div>
    </>
  );
}

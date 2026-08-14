import React from "react";
import { useRouter } from "next/router";
import Button from "@/components/base/Button";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import AuthorSocialLinks from "@/components/base/AuthorSocialLinks";
import { ADMIN_LINK, GITHUB_REPO_LINK } from "@/utils/constant";
const JsSnippetsLandingPage = () => {
  const router = useRouter();

  const handleReadNotesClick = () => {
    router.push(
      "/digital-garden/notes/front-end-design-system/how-the-web-works"
    ); // Redirect to the notes page
  };

  return (
    <>
      <CommonHeadTags url="https://www.heyashu.in/digital-garden/notes/front-end-design-system" />
      <ClassicPageLayout
        noGrid
        heading=" 🌿  Frontend System Design 🚀"
        desc="🌱   Welcome to the  Frontend System Design Notes !"
        longDesc="  These notes are from the Frontend System Design series by Akshay Saini and Chirag Goel. I have studying all the episodes and compiled these notes to share what I’ve learned.

Generally, I write things in a notebook or my personal digital notebook, but now I’m sharing and learning by sharing. Let’s read together, and you can also contribute! Feel free to share this with your friends or star the open-source repository.

Thank you so much!
            🚀 Happy Learning! 🌿"
      >
        <div className="flex flex-col gap-2">
          <AuthorSocialLinks />
          <div className=" gap-4 flex ">
            <Button
              onClick={handleReadNotesClick}
              className="mt-4 px-6 py-3  text-white text-lg font-medium rounded-md hover:bg-green-700 transition duration-200"
            >
              Read Now
            </Button>
            <Button
              onClick={() => {
                window.open(ADMIN_LINK, "_blank");
              }}
              className="mt-4 px-6 py-3 bg-transparent  text-gray-900 border-b text-lg font-medium rounded-md hover:bg-green-700 hover:text-white transition duration-200"
            >
              + Add Notes
            </Button>
          </div>
          <div className=" mt-4 flex flex-col gap-2">
            <a
              href={GITHUB_REPO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ⭐ Give a star to the repo if you love it!
            </a>
            <a
              href={ADMIN_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              🌱 Contribute to the notes
            </a>
          </div>
          <div className=" mt-8">
            <p className="text-md text-gray-600">
              This is an open-source digital notes manager. Managed by a Git
              repository, anyone can edit and add new notes or make
              improvements.
            </p>
          </div>
        </div>
      </ClassicPageLayout>
    </>
  );
};

export default JsSnippetsLandingPage;

// Todo: Give list of recent notes

// export async function getStaticProps() {
//   // Define the directory containing your markdown files
//   const directory = path.join(process.cwd(), "src/content/notes-namaste-node-js");

//   // Get file names from the directory
//   const filenames = fs.readdirSync(directory);

//   // Loop through each file and read its content and metadata
//   const notes = filenames.map((filename) => {
//     // Read markdown file as string
//     const fileContent = fs.readFileSync(
//       path.join(directory, filename),
//       "utf-8"
//     );

//     // Parse the markdown content and extract front matter
//     const { data: frontMatter, content } = matter(fileContent);

//     return {
//       frontMatter,
//       content,
//       slug: filename.replace(".md", ""),
//     };
//   });

//   // Return the posts as props
//   return {
//     props: {
//       notes,
//     },
//   };
// }

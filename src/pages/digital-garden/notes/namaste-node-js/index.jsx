import React from "react";
import { useRouter } from "next/router";
import Button from "@/components/base/Button";
import { FaEarthAsia, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Head from "next/head";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";
const LandingPage = () => {
  const router = useRouter();

  const handleReadNotesClick = () => {
    router.push("/digital-garden/notes/namaste-node-js/prerequisite"); // Redirect to the notes page
  };

  return (
    <>
      <CommonHeadTags title="Digital notes: Namaste Node JS" />

      <ClassicPageLayout
        noGrid
        heading=" 🌿 Namaste Node JS"
        desc="   Welcome to the Namaste Node JS Open sourced digital notes!"
        longDesc="   Welcome to the digital garden! 🌱 This section is dedicated to
              reading notes about Node JS taught by our Front-end Boss, Akshay
              Saini. 🌍 These notes are open source, allowing anyone to
              contribute and update. 🌟 Started by Ashutosh Anand Tiwari as part
              of his web development learning journey, this is a space for
              growth and collaboration. Let's start learning together!"
        customBottomContent={<RepoComponent />}
      >
        <div className="flex flex-col gap-2">
          <div className="flex  space-x-4 ">
            <a
              href="https://www.youtube.com/c/akshaymarch7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800"
            >
              <FaYoutube />
            </a>
            <a
              href="https://twitter.com/akshaymarch7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.instagram.com/akshaymarch7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700"
            >
              <FaInstagram />
            </a>
            <a
              href="https://namastedev.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600"
            >
              <FaEarthAsia />
            </a>
          </div>
          <div className="text-center gap-2 flex flex-wrap  ">
           
            <Button
              onClick={handleReadNotesClick}
              className="mt-4 px-6 py-3  text-white text-lg font-medium rounded-md  transition duration-200"
            >
             Read Notes (S1 & S2)
            </Button>
            <Button
              onClick={() => {
                window.open(ADMIN_LINK, "_blank");
              }}
              className="mt-4 px-6 py-3 bg-transparent border   text-gray-900 border-b text-lg font-medium rounded-md   transition duration-200"
            >
              + Add notes
            </Button>
          </div>
          <div className="text-center gap-2 flex flex-wrap  "></div>
        </div>
      </ClassicPageLayout>
    </>
  );
};

const RepoComponent = () => {
  return (
    <div className=" mt-4 flex flex-col gap-2">
      <a
        href="https://github.com/ashumsd7/heyashu/"
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

      <BottomBar />
    </div>
  );
};

const BottomBar = () => {
  return (
    <div className=" mt-2">
      <p className="font-light">
        This is an open-source digital notes manager. Managed by a Git
        repository, anyone can edit and add new notes or make improvements.
      </p>
    </div>
  );
};

export default LandingPage;

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

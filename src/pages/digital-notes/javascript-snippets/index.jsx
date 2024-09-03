// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";

import React from "react";
import { useRouter } from "next/router";
import Button from "@/components/base/Button";
import { FaEarthAsia, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
const JsSnippetsLandingPage = () => {
  const router = useRouter();

  const handleReadNotesClick = () => {
    router.push("/digital-notes/namaste-node-js/prerequisite"); // Redirect to the notes page
  };

  return (
    <div className="  flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-6">
        {/* Course Image Placeholder */}
        <div className="flex justify-center">
          <img
            className="h-48 w-48 object-cover rounded-full"
            src="https://i.ibb.co/x7kYDW1/snippets.jpg" // Replace with the actual image path
            alt="JS Snippets"
          />
        </div>

        {/* Course Title and Description */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            JavaScript Snippets{" "}
          </h1>
          <p className="mt-2 text-lg md:text-xl leading-[50px] text-gray-800 font-serif ">
            🌱 Welcome to our digital garden! Are you preparing for a JavaScript
            interview or need a platform to revise all your JavaScript topics?
            🌐 We have over 100+ code snippets ready for you to explore! This
            space is designed to help you grow your coding knowledge. Feel free
            to add new snippets and contribute to our open-source community. 🌟
            Started with the idea of sharing and collaboration, this is a place
            where developers like you can learn, contribute, and excel together!
            🚀 Happy Coding! 🌿
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4">
          {/* <a href="https://www.youtube.com/c/akshaymarch7" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
          <FaYoutube/>
          </a> */}
          <a href="https://twitter.com/yourvuejs" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
         <FaXTwitter />
          </a>
          <a href="https://www.instagram.com/ashumsd7" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
            <FaInstagram />
          </a>
          <a href="https://heyashu.in/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
          <FaEarthAsia />
          </a>
        </div>

        {/* CTA Button */}
        <div className="text-center flex justify-center">
          <Button
            // onClick={handleReadNotesClick}
            className="mt-4 px-6 py-3  text-white text-lg font-medium rounded-md hover:bg-green-700 transition duration-200"
          >
            Coming Soon
          </Button>
        </div>

        {/* Open Source Info */}
        <div className="text-center mt-8">
          <p className="text-md text-gray-600">
            This is an open-source digital notes manager. Managed by a Git
            repository, anyone can edit and add new notes or make improvements.
          </p>
        </div>

        {/* Repository Links */}
        <div className="text-center mt-4 flex flex-col gap-2">
          <a
            href="https://github.com/ashumsd7/heyashu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ⭐ Give a star to the repo if you love it!
          </a>
          <a
            href="https://heyashu.in/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            🌱 Contribute to the notes
          </a>
        </div>
      </div>
    </div>
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

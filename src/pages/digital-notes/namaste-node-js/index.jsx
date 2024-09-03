import React from 'react'
import fs from "fs";
import path from "path";
import matter from "gray-matter";
function NamasteNodeJsHomePage({notes}) {

  console.log("notes",notes);
  return (
    <div>NamasteNodeJsHomePage</div>
  )
}

export default NamasteNodeJsHomePage


export async function getStaticProps() {
  // Define the directory containing your markdown files
  const directory = path.join(process.cwd(), "src/content/notes-namaste-node-js");

  // Get file names from the directory
  const filenames = fs.readdirSync(directory);

  // Loop through each file and read its content and metadata
  const notes = filenames.map((filename) => {
    // Read markdown file as string
    const fileContent = fs.readFileSync(
      path.join(directory, filename),
      "utf-8"
    );

    // Parse the markdown content and extract front matter
    const { data: frontMatter, content } = matter(fileContent);


    return {
      frontMatter,
      content,
      slug: filename.replace(".md", ""),
    };
  });

  // Return the posts as props
  return {
    props: {
      notes,
    },
  };
}

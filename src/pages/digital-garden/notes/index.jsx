import React, { useState } from "react";
import NoteCard from "@/components/note/NoteCard";
import NotesFilter from "@/components/note/NotesFilter";
import { GrNotes } from "react-icons/gr";
import { NOTES_CARD_DATA } from "@/data/note/allNotes";
import Head from "next/head";
import { NOTES_FILTERS } from "@/data/note/notesFilter";
import { FaExternalLinkAlt, FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import ClassicPageLayout from "@/components/base/ClassicNotesLayout";
import Button from "@/components/base/Button";
function AllNotesPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Digital Garden : Ashutosh Anand Tiwari</title>
        <meta
          name="description"
          content="Explore a collection of digital notes on various topics, including JavaScript, React, and more. Learn from curated content and insights by Ashutosh Anand Tiwari."
        />
        <meta
          name="keywords"
          content="JavaScript, Node.js, React, Digital Notes, Ashutosh Anand Tiwari, Programming, Web Development"
        />
        <meta
          property="og:title"
          content="Digital Notes by Ashutosh Anand Tiwari"
        />
        <meta
          property="og:description"
          content="Explore a rich collection of digital notes covering JavaScript, Node.js, React, and more."
        />
        <meta
          property="og:image"
          content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
        />
        <meta property="og:url" content="https://www.heyashu.com/tech/notes" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Digital Notes by Ashutosh Anand Tiwari"
        />
        <meta
          name="twitter:description"
          content="Explore a rich collection of digital notes covering JavaScript, Node.js, React, and more."
        />
        <meta
          name="twitter:image"
          content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
        />
        <link rel="icon" href="/digigarden.ico" />
      </Head>

      <ClassicPageLayout
        heading=" 🌿 Notes"
        desc="   Get tech notes, interview tips, experiences, snippets, blogs and more."
        rightCTA={
          <Button
            onClick={() => {
              window.open("https://heyashu.in/admin", "_blank");
            }}
            className="mt-4 px-6 py-3 bg-transparent   text-gray-900  md:text-xl text-base border-black  font-medium rounded-md   transition duration-200"
          >
            <FaPlus />
            <span className="hidden md:flex">Add Notes</span>
          </Button>
        }
      >
        {NOTES_CARD_DATA?.map((item) => {
          return <NoteCard data={item} />;
        })}
      </ClassicPageLayout>
    </>
  );
}

export default AllNotesPage;

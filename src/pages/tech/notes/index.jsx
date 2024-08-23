import React, { useState } from "react";
import NoteCard from "@/components/note/NoteCard";
import NotesFilter from "@/components/note/NotesFilter";
import { GrNotes } from "react-icons/gr";
import { NOTES_CARD_DATA } from "@/data/note/allNotes";
import Head from "next/head";
function AllNotesPage() {
  return (
    <>
      <Head>
        <title>Digital Notes by Ashutosh Anand Tiwari</title>
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
        <meta property="og:image" content="/path-to-your-image.png" />
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
        <meta name="twitter:image" content="/path-to-your-image.png" />
      </Head>
      <div className=" flex flex-col gap-4 flex-wrap">
        <h1 className="lg:text-5xl bg-gradient-to-r relative from-yellow-100 py-2 rounded-lg to-[#EFEFF1]  text-3xl font-extrabold text-center px-4 text-gray-800 md:text-left my-2 font-serif  flex gap-2">
          <GrNotes /> Digital Notes
        </h1>
        <NotesFilter />
      </div>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {NOTES_CARD_DATA?.map((item) => {
          return <NoteCard data={item} />;
        })}
      </div>
    </>
  );
}

export default AllNotesPage;

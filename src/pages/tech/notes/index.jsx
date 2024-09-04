import React, { useState } from "react";
import NoteCard from "@/components/note/NoteCard";
import NotesFilter from "@/components/note/NotesFilter";
import { GrNotes } from "react-icons/gr";
// import { NOTES_CARD_DATA } from "@/pages/digital-notes/notes/allNotes";
import Head from "next/head";
import { NOTES_FILTERS } from "@/data/note/notesFilter";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter } from "next/router";
function AllNotesPage() {
  const NOTES_CARD_DATA=[]
  const router = useRouter();
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
      </Head>
      <div className=" flex flex-col gap-2 flex-wrap   0">
        {/* <h1 className="lg:text-3xl font-Inter relative py-2 rounded-lg  text-2xl font-extrabold text-center px-4 lg:px-0 text-[#1A1A1A] font-serif  flex gap-2">
          Digital Notes
        </h1> */}

        <div className="bg-[#f6f5f1] text-[#353534] flex flex-col  ">
          <h1 className="md:text-[80px] text-[32px] font-bold mb-2 ">
          🌿 Notes
          </h1>
        </div>

        <div>
          <p className="md:text-[36px]  text-[22px]  text-[#353534] font-light md:pl-[120px] pl-[40px] ">
            Get tech notes, interview tips, experiences, snippets, blogs and
            more.
          </p>
        </div>
        {/* <NotesFilter /> */}
        <div className=" flex gap-2 justify-start mr-auto ">
          {NOTES_FILTERS?.map((item) => {
            return (
              <div className="flex items-center text-lg px-2 font-bold py-1 border-b-4 border-black ">
                <span> {item.label}</span>
              </div>
            );
          })}
          <div
            onClick={() => {
              router.push("/blog");
            }}
            className="flex items-center px-2 text-lg cursor-pointer py-1 gap-1 border-b-2 "
          >
            blogs <FaExternalLinkAlt className="text-sm" />
          </div>
          <div
            onClick={() => {
              window.open("https://topmate.io/aat/1148709/pay", "_blank");
            }}
            className="flex items-center px-2 text-lg cursor-pointer py-1 gap-1 border-b-2 "
          >
            + write notes
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 py-4 ">
        {NOTES_CARD_DATA?.map((item) => {
          return <NoteCard data={item} />;
        })}
      </div>
    </>
  );
}

export default AllNotesPage;

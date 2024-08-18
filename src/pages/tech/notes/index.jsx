import React, { useState } from "react";
import NoteCard from "@/components/note/NoteCard";
import BlogsFilter from "@/components/blog/BlogsFilter";
import NotesFilter from "@/components/note/NotesFilter";
import { GrNotes } from "react-icons/gr";
import { NOTES_CARD_DATA } from "@/data/note";
function AllNotesPage() {
  return (
    <>
      <div className=" lg:-mt-14 flex flex-col gap-4 flex-wrap">
        <h1 className="lg:text-5xl text-3xl font-extrabold text-center px-4 text-gray-800 md:text-left my-2 font-serif  flex gap-2">
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

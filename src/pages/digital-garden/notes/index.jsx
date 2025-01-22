import React from "react";
import { ImBooks } from "react-icons/im";
import { FaPlus, FaLeaf, FaBookOpen } from "react-icons/fa";
import { GiGardenFlower, GiBookshelf } from "react-icons/gi";
import { ADMIN_LINK } from "@/utils/constant";
import { NOTES_CARD_DATA } from "@/data/note/allNotes";
import Head from "next/head";
import { useRouter } from "next/router";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
 

// Note Card Component

function AllNotesPage() {
  const router = useRouter();
  return (
    <>
      <CommonHeadTags/>
      <Head>
        <title>Digital Garden - Knowledge Hub</title>
        <meta
          name="description"
          content="Curated technical notes, interview preparations, and coding wisdom"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30">
        <div className="container mx-auto px-4 py-12">
          {/* Minimal Top Bar */}
          <div className="flex flex-col mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-green-700 flex items-center gap-3">
                <FaLeaf className="text-2xl" />
                Digital Garden Notes
              </h1>
              <button
                onClick={() => window.open(ADMIN_LINK, "_blank")}
                className="group flex items-center gap-2 px-4 py-2 
                bg-green-600/10 hover:bg-green-600/20 text-green-700 rounded-full 
                transition-all duration-300"
              >
                <FaPlus className="text-sm group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-sm font-medium">New Note</span>
              </button>
            </div>
            <p className="text-gray-600 text-lg">
              Welcome to my digital garden! Here you'll find my growing collection of notes, thoughts, and learnings on various technical topics.
            </p>
          </div>

          {/* Elegant Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {NOTES_CARD_DATA?.filter((item) => !item.isComingSoon).map(
              (note, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl cursor-pointer 
                  transition-all duration-300 hover:-translate-y-1"
                  onClick={() => {
                    if (note.isComingSoon) return;
                    router.push(note.route);
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-xl"/>
                    <img
                      src={note.thumbnailUrl || "/images/default-note-cover.jpg"}
                      alt={note.title}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white">
                          {note.icon || <GiBookshelf className="text-lg" />}
                        </div>
                        <h3 className="text-lg font-medium text-white">
                          {note.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {note.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs text-white/90 bg-white/10 
                            backdrop-blur-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {note.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default AllNotesPage;

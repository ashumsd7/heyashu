import React from "react";
import { ImBooks } from "react-icons/im";
import { FaPlus, FaLeaf, FaBookOpen } from "react-icons/fa";
import { GiGardenFlower, GiBookshelf } from "react-icons/gi";
import { ADMIN_LINK } from "@/utils/constant";
import { NOTES_CARD_DATA } from "@/data/note/allNotes";
import Head from "next/head";
import { useRouter } from "next/router";
import CommonHeadTags from "@/components/seo/CommonHeadTags";

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
      <div className="min-h-screen     dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-12">
          {/* Centered Header Section */}
          <div className="flex flex-col items-center mb-12 text-center">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-700 dark:text-green-400 flex items-center gap-3 mb-4">
               <FaLeaf className="text-3xl md:text-4xl lg:text-5xl" />
              Digital Notes <span className="animate-pulse hover:animate-none">💚</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
              A curated collection of technical notes and learning resources for students and engineers. Join me in building core knowledge together!
            </p>
            <button
              onClick={() => window.open(ADMIN_LINK, "_blank")}
              className="mt-6 group flex items-center gap-2 px-4 py-2 bg-green-600/10 hover:bg-green-600/20 dark:bg-green-400/10 dark:hover:bg-green-400/20 text-green-700 dark:text-green-400 rounded-full transition-all duration-300"
            >
              <FaPlus className="text-sm group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-sm font-medium">New Note</span>
            </button>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NOTES_CARD_DATA?.filter((item) => !item.isComingSoon).map(
              (note, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                  onClick={() => {
                    if (note.isComingSoon) return;
                    router.push(note.route);
                  }}
                >
                  <div className="relative flex-1">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 rounded-xl"/>
                    <img
                      src={note.thumbnailUrl || "/images/default-note-cover.jpg"}
                      alt={note.title}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 rounded-lg bg-white/15 backdrop-blur-sm text-white">
                          {note.icon || <GiBookshelf className="text-xl" />}
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {note.title}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {note.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-sm text-white/95 bg-white/15 backdrop-blur-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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

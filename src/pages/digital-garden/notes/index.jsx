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

      <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100/30 to-white  ">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-green-100 p-3 rounded-lg">
                  <ImBooks className="text-3xl text-green-700" />
                  
                </div>
                <h1 className="text-3xl font-bold text-green-800">
                  Digital Notes
                </h1>
              </div>

              <button
                onClick={() => window.open(ADMIN_LINK, "_blank")}
                className="group flex items-center gap-2 px-6 py-3 
                  bg-green-700 hover:bg-green-800 text-white rounded-lg 
                  shadow-md hover:shadow-lg transition-all duration-300 
                  border border-green-600"
              >
                <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden md:inline">Plant New Note</span>
              </button>
            </div>

            <div className="mt-6">
              <p className="flex items-center gap-2 text-lg text-gray-700">
                <FaLeaf className="text-green-600" />
                Discover carefully cultivated technical notes, interview
                preparations, design systems, and practical code snippets to
                help you grow.
              </p>
            </div>
          </header>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NOTES_CARD_DATA?.filter((item) => !item.isComingSoon).map(
              (note, index) => {
                return (
                  <div
                    className="group relative bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer 
      transition-all duration-300 border border-green-100 hover:border-green-200 
      transform hover:-translate-y-1 overflow-hidden"
                    onClick={() => {
                      if (note.isComingSoon) return;
                      router.push(note.route);
                    }}
                  >
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={
                          note.thumbnailUrl || "/images/default-note-cover.jpg"
                        }
                        alt={note.title}
                        className="w-full h-full object-cover transition-transform duration-300 
            group-hover:scale-105"
                      />
                    </div>

                    <div className="p-2">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-100/50 text-green-700">
                            {note.icon || <GiBookshelf className="text-xl" />}
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-800">
                            {note.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {note.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {note.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-sm bg-green-50 text-green-700 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllNotesPage;

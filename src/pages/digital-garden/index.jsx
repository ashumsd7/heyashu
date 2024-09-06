import React from "react";
import { TbSeeding } from "react-icons/tb";
import { GiPlantSeed } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import ClassicPageLayout from "@/components/base/ClassicNotesLayout";
function index() {
  const router = useRouter();
  const GARDEN_CATEGORIES = [
    {
      name: "NOTES",
      desc: " Get detailed digital notes on various tech topics curated by multiple open-source enthusiasts.",
      route: "/digital-garden/notes",
      count: 2,
    },
    {
      name: "BLOGS",
      desc: "Read and write blogs on diverse topics, learn, share knowledge, and contribute here. ",
      route: "/digital-garden/blog",
      count: 4,
    },
    {
      name: "DAILY-UPDATE",
      desc: "Let’s update daily, staying focused and consistent and together, we’ll achieve our goals. ",
      route: "/digital-garden/daily-updates",
      count: 2,
    },
    {
      name: "Books",
      desc: "Discuss and share insights on the books that have inspired or educated you.",
      route: "/digital-garden/books",
      count: 0,
    },
    {
      name: "Journey",
      desc: "Document your personal journey, growth, and learning experiences along the way.",
      route: "/digital-garden/journey",
      count: 0,
    },
    {
      name: "Experience",
      desc: "Share your valuable experiences that shaped your personal and professional growth.",
      route: "/digital-garden/experience",
      count: 0,
    },
   
    {
      name: "Poems",
      desc: "Express your thoughts, feelings, and creativity through poetry in this collection.",
      route: "/digital-garden/poems",
      count: 0,
    },
    {
      name: "Ideas",
      desc: "Brainstorm and share innovative ideas to inspire others and spark creativity.",
      route: "/digital-garden/ideas",
      count: 0,
    },
    {
      name: "Films/Series",
      desc: "Discuss your favorite films ,tv series or web series, share reviews that resonate with you.",
      route: "/digital-garden/films",
      count: 0,
    },
    {
      name: "Stories",
      desc: "Share captivating stories that inspire, entertain, or teach valuable lessons.",
      route: "/digital-garden/stories",
      count: 0,
    },
    {
      name: "Testimonials",
      desc: "Leave your feedback or share your experience of using this platform with others.",
      route: "/digital-garden/testimonials",
      count: 0,
    },
  ];

  return (
    <>
      <ClassicPageLayout
        heading="🌱Digital Garden"
        desc="   Get tech notes, interview tips, experiences, snippets, blogs and more."
      >
        {GARDEN_CATEGORIES?.map((item) => {
          return (
            <div
              onClick={() => {
                router.push(item?.route);
              }}
              className="p-4 flex gap-2  hover:bg-[#f6f2e5]  rounded-lg cursor-pointer border lg:border-none  transform transition-all duration-200 ease-in hover:scale-105 hover:shadow-xl  "
            >
              <div className="mt-2">
                {/* image */}
                {/* 🌱  */}
                <FaSeedling className="text-3xl text-green-600 " />
              </div>

              <div className="flex flex-col gap-1">
                {/* .. Heading */}
                <div className="flex justify-between items-start">
                  <h2 className="font-light text-[32px] text-balance relative">
                    {item?.name}
                    <span className="text-[#ea580c] font-light -right-1 -top-2 text-lg absolute">
                      {item?.count}
                    </span>
                  </h2>
                  <div className="flex items-center px-2 text-lg cursor-pointer py-1 gap-1 border-b-2 ">
                    <FaExternalLinkAlt className="text-sm" />
                  </div>
                </div>

                <div>
                  {/* desc */}
                  <p className="text-left">{item?.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ClassicPageLayout>
    </>
  );
}

export default index;

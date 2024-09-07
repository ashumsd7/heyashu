import Button from "@/components/base/Button";
import { useRouter } from "next/router";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import { FaPlus } from "react-icons/fa";
import CommonHeadTags from "@/components/seo/CommonHeadTags";
import { ADMIN_LINK } from "@/utils/constant";
import { GiLoveLetter } from "react-icons/gi";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { generateSlug } from "@/utils/functions";
export async function getStaticProps() {
  const directory = path.join(process.cwd(), "src/content/testimonials");
  const filenames = fs.readdirSync(directory);
  const posts = filenames.map((filename) => {
    // Read markdown file as string
    const fileContent = fs.readFileSync(
      path.join(directory, filename),
      "utf-8"
    );

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
      posts,
    },
  };
}

function BlogsPage({ posts }) {
  const router= useRouter()
  return (
    <>
      <CommonHeadTags />

      <ClassicPageLayout
        rightCTA={
          <Button
            onClick={() => {
              window.open(ADMIN_LINK, "_blank");
            }}
            className="mt-4 px-6 py-3 bg-transparent   text-gray-900  md:text-xl text-base border-black  font-medium rounded-md   transition duration-200"
          >
            <FaPlus />
            <span className="hidden md:flex"> write one</span>
          </Button>
        }
        heading={
          <div className="flex gap-2 items-center ">
            <GiLoveLetter className="text-green-800" /> Testimonials
          </div>
        }
        desc="  Leave your feedback or share your experience of using this garden with others."
      >
        {posts.length > 0 ? (
          posts?.map((post) => {
            return (
              <div
                onClick={() => {
                  router.push(
                    "/digital-garden/" +
                      "testimonials" +
                      "/" +
                      generateSlug(post?.frontMatter?.title)
                  );
                }}
                className=" rounded-lg p-6 flex gap-2   lg:border-none bg-[#67c4645e]   transform transition-all cursor-pointer duration-200 ease-in hover:scale-105 shadow-xl "
              >
                <h2 className="font-light text-2xl md:text-xl lg:text-3xl mt-1  "></h2>
                <div className="flex flex-col gap-2 ">
                  <div className=" w-full md:w-auto ">
                    <h2 className="font-medium text-2xl md:text-xl  flex gap-2 relative items-center lg:text-3xl text-gray-900  ">
                      <div className="absolute text-red-500 mt-2  -top-16 rotate-[85deg]  -right-4 ">
                        <BsFillBalloonHeartFill className=" -top-7 relative -right-6 -rotate-45" />
                        <BsFillBalloonHeartFill className=" -top-10 relative -right-4 -rotate-[70deg]" />
                        <BsFillBalloonHeartFill className=" -top-16 relative -right-10 -rotate-45" />
                      </div>{" "}
                      {post?.frontMatter?.name ||  post?.frontMatter?.author} said ....
                    </h2>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div class="bg-[#f6f5f1] p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 class="text-xl font-semibold text-[#353534] mb-2">John Doe</h2>
            <p class="text-[#353534] text-base">
              "This platform has been incredibly helpful in keeping me
              consistent and focused on my goals!"
            </p>
          </div>
        )}
      </ClassicPageLayout>
    </>
  );
}

export default BlogsPage;

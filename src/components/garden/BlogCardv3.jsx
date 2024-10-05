import { DEFAULT_AVATAR, DEFAULT_FOLLOW_LINK } from "@/utils/constant";
import { formateDate, generateSlug } from "@/utils/functions";
import { useRouter } from "next/router";
import React from "react";

function BlogCardv3({ data, subPath = "/digital-garden/blog/" }) {
  const router = useRouter();
  const {
    author: author = "Anonyms User",
    date: writtenOn = "Today",
    name,
    title = "Dummy Plant",
    minRead = "",
    tags = "",
    profilePic = DEFAULT_AVATAR,
    thumbnail = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    followLink = DEFAULT_FOLLOW_LINK,
  } = data;


  const DUMMY_THUMBNAIL='https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  function changeFilePath(filePath) {
    const newFilePath = filePath.replace("/public", "");
    return newFilePath;
  }
  const formattedDate = formateDate(writtenOn);
  const firstTag = tags ? tags?.split(",")[0].trim() : "";

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        router.push(subPath + generateSlug(title));
      }}
    >
      <div className="max-w-xl mx-auto p-6 ">
        <div className="relative overflow-hidden">
          <img
            src={thumbnail ? changeFilePath(thumbnail) : DUMMY_THUMBNAIL}
            alt="Flipboard Blog Image"
            className="w-full min-h-[220px] max-h-[280px]  rounded-lg"
          />
        </div>

        <div className="mt-4">
          <p className="text-sm uppercase font-bold text-gray-500">
            #{firstTag}
          </p>
          <h1 className="text-2xl font-bold text-black mt-1">
            {name || title}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default BlogCardv3;

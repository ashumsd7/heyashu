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

  const DUMMY_THUMBNAIL =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  function changeFilePath(filePath) {
    const newFilePath = filePath.replace("/public", "");
    return newFilePath;
  }
  const formattedDate = formateDate(writtenOn);
  const firstTag = tags ? tags?.split(",")[0].trim() : "";

  return (
    <div
      className="cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => {
        router.push(`${subPath}${generateSlug(title)}`);
      }}
    >
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg p-6">
        <div className="relative">
          <img
            src={thumbnail ? changeFilePath(thumbnail) : DUMMY_THUMBNAIL}
            alt="Blog Image"
            className="w-full h-60 object-cover rounded-lg"
          />
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold text-blue-500 uppercase">
            #{firstTag}
          </p>
          <h1 className="text-xl font-semibold text-gray-800 mt-2">
            {name || title}
          </h1>
          {/* <p className="text-gray-600 text-sm mt-2">
            {description ? `${description.substring(0, 100)}...` : "Read more"}
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default BlogCardv3;

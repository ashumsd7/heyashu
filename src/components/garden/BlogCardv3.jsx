import { DEFAULT_AVATAR, DEFAULT_FOLLOW_LINK } from "@/utils/constant";
import { formateDate, generateSlug } from "@/utils/functions";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

function BlogCardv3({ data, subPath = "/digital-garden/blog/" }) {
  const router = useRouter();
  const {
    author = "Anonymous User",
    date: writtenOn = "Today",
    name,
    title = "Untitled Post",
    minRead = "",
    tags = "",
    profilePic = DEFAULT_AVATAR,
    thumbnail = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    followLink = DEFAULT_FOLLOW_LINK,
    updatedOn
  } = data;

  const formattedDate = formateDate(updatedOn);
  const tagList = tags ? tags.split(",").map(tag => tag.trim()) : [];
  const changeFilePath = (filePath) => filePath.replace("/public", "");

  return (
    <article 
      className="group relative overflow-hidden    cursor-pointer
          "
      onClick={() => router.push(`${subPath}${generateSlug(title)}`)}
    >
      {/* Thumbnail Section - Modified for full-bleed image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={thumbnail ? changeFilePath(thumbnail) : ""}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-102"
        />
      </div>

      {/* Content Section - Simplified */}
      <div className="relative p-4 space-y-2">
        {/* Tags - Moved to top */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{author}</span>
          <span>{formattedDate}</span>
        </div>
        {/* Title - More minimal styling */}
        <h2 className=" font-semibold text-lg text-gray-900 leading-snug">
          {name || title}
        </h2>

        {/* Author and Date - Simplified */}
 

        <div className="flex gap-2 text-xs text-gray-600">
          {tagList.map((tag, index) => (
            <span key={index} className="border rounded-xl border-black text-black px-2 py-1">
              {tag}
            </span>
          ))}
        </div>

      </div>
    </article>
  );
}

export default BlogCardv3;
import React, { useState } from "react";
import Button from "../base/Button";
import { BLOG_FILTERS } from "@/data/blog";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter } from "next/router";

function BlogsFilter() {
  const router = useRouter();
  const [selected, setSelected] = useState(BLOG_FILTERS[0]);
  return (
    <div className="flex lg:gap-6 gap-2">
      {BLOG_FILTERS?.map((item) => {
        return (
          <Button
            onClick={() => {
              setSelected(item);
            }}
            className={` py-1 px-2 ${
              item.value == selected.value
                ? ""
                : "bg-transparent border border-gray-600  text-gray-900"
            }`}
          >
            {item.label}
          </Button>
        );
      })}
      <Button
        className="bg-orange-600 flex items-center"
        onClick={() => {
          router.push("/tech/notes");
        }}
      >
     
         Notes     {" "}<FaExternalLinkAlt />{" "}
      </Button>
     
      <Button   onClick={() => {
          router.push("/blogs/how-to-write-blog");
        }} className='bg-transparent text-gray-800 text-base border border-orange-400'>+ Write blog</Button>
    </div>
  );
}

export default BlogsFilter;

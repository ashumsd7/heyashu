import React, { useState } from "react";
import Button from "../base/Button";
import { BLOG_FILTERS } from "@/data/blog";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter } from "next/router";

function BlogsFilter() {
  const router = useRouter();
  const [selected, setSelected] = useState(BLOG_FILTERS[0]);
  return (
    <div className="flex gap-2">
      {BLOG_FILTERS?.map((item) => {
        return (
          <Button
            onClick={() => {
              setSelected(item);
            }}
            className={`${
              item.value == selected.value
                ? ""
                : "bg-transparent border border-gray-600 text-gray-900"
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
        {" "}
        Digital Notes <FaExternalLinkAlt />{" "}
      </Button>
    </div>
  );
}

export default BlogsFilter;

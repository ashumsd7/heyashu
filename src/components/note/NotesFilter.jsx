import React, { useState } from "react";
import Button from "../base/Button";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { NOTES_FILTERS } from "@/data/note";

function NotesFilter() {
  const router = useRouter();
  const [selected, setSelected] = useState(NOTES_FILTERS[0]);
  return (
    <div className="flex gap-2 flex-wrap px-4">
      {NOTES_FILTERS?.map((item) => {
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
          router.push("/blogs");
        }}
      >
        {" "}
         Blogs <FaExternalLinkAlt />{" "}
      </Button>

      <Button
        onClick={() => {
        window.open('https://topmate.io/aat/1148709/pay', '_blank')
        }}
        className="bg-transparent text-gray-800 text-base border border-orange-400"
      >
        + Write Notes
      </Button>
    </div>
  );
}

export default NotesFilter;

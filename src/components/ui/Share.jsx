"use client";

import { RWebShare } from "react-web-share";
import { FiShare2 } from "react-icons/fi";
import React from "react";

function Share({ title }) {
  return (
    <div className="">
      <RWebShare
        data={{
          text: `Read ${title}`,
          url: window?.location.href,
          title: title,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <div className="flex gap-2 justify-center items-center">
          <FiShare2
            className="text-xl  text-white  dark:text-white font-extrabold cursor-pointer hover:opacity-80 transition-opacity"
            title="Share this article"
          />
        </div>
      </RWebShare>
    </div>
  );
}

export default Share;

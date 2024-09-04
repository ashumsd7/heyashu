"use client";

import { RWebShare } from "react-web-share";
import { FiShare2 } from "react-icons/fi";
import React from "react";

function Share({ title }) {
  return (
    <div className="  ">
      <RWebShare
        data={{
          text: `Read ${title}`,
          url: window?.location.href,
          title: title,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <div className="flex gap-[2px]  justify-center items-center">
        <span className="text-xs cursor-pointer">Share</span>
        <FiShare2
          className="text-xl text-gray-600 font-extrabold cursor-pointer"
          title="Share this document"
        />
        </div>
      </RWebShare>
    </div>
  );
}

export default Share;

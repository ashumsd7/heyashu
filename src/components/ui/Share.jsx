'use client'

import { RWebShare } from "react-web-share";
import { FiShare2 } from "react-icons/fi";
import React from "react";

function Share({title}) {
  return (
    <RWebShare
      data={{
        text: `Read ${title}`,
        url: window?.location.href,
        title: title,
      }}
      onClick={() => console.log("shared successfully!")}
    >
      <FiShare2
        className="text-xl text-gray-600 font-extrabold cursor-pointer"
        title="Share this document"
      />
    </RWebShare>
  );
}

export default Share;
"use client";

import { RWebShare } from "react-web-share";
import { FiShare2 } from "react-icons/fi";
import React, { useEffect, useState } from "react";

function Share({ title }) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window?.location?.href);
  }, []);

  return (
    <div className="">
      <RWebShare
        data={{
          text: `Read ${title}`,
          url: currentUrl,
          title: title,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <div className="flex gap-2 justify-center items-center">
          <FiShare2
            className="text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-extrabold cursor-pointer transition-colors"
            title="Share this article"
          />
        </div>
      </RWebShare>
    </div>
  );
}

export default Share;

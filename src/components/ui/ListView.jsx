import { useRouter } from "next/router";
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

function ListView({ data, labelKey='name' }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      {data?.map((item,idx) => {
        return (
          <div key={idx} className="w-full justify-start gap-10 flex  items-center">
            {/* //left content */}
            <div className="flex gap-2 max-w-[300px] min-w-[300px]  text-xl font-light hover:opacity-60 border-b ">
              <p className="truncate max-w-40 ">{item.stage}</p>
              <p
                onClick={() => {
                  router.push(item?.route);
                }}
                className="border- cursor-pointer"
              >
                {item[labelKey] }
              </p>
            </div>
            {/* right content */}
            <div> <FaExternalLinkAlt className="text-xs cursor-pointer" /></div>
          </div>
        );
      })}
    </div>
  );
}

export default ListView;

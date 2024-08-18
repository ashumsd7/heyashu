

import React from "react";
import { FaDownload, FaFilePdf } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import Switch from "@/components/base/Switch";
function NotesContentTopBar({
  isSidebarVisible,
  setIsSidebarVisible,
  isQuickReadModeOn,
  setIsQuickReadModeOn,
  title,
}) {
  return (
    <div className="bg-[#faea9e] h-10 flex items-center rounded-lg justify-between px-4 py-1 ">
      <div className="flex gap-2 items-center">
        <div className=" gap-2 justify-between items-center lg:flex hidden">
          {isSidebarVisible ? (
            <GoSidebarExpand
              onClick={() => {
                setIsSidebarVisible(!isSidebarVisible);
              }}
              className="text-2xl text-gray-800 cursor-pointer"
              title="Toggle Sidebar"
            />
          ) : (
            <GoSidebarCollapse
              title="Toggle Sidebar"
              onClick={() => {
                setIsSidebarVisible(!isSidebarVisible);
              }}
              className="text-2xl text-gray-800"
            />
          )}
        </div>
        <h1 className="lg:text-base text-sm font-extrabold text-center lg:mt-0 mt-4 text-gray-800 md:text-left font-serif mb-4 md:mb-0 ">
          {title}
        </h1>
      </div>
      {/* <div className="lg:flex hidden gap-6 items-center bg-[#f2f2f2] ">
        <MdFullscreen className="text-gray-800 text-2xl cursor-pointer font-extrabold" />
        <FaDownload
          title="Download Digital notes"
          className="text-gray-800 cursor-pointer font-extrabold"
        />
        <FaFilePdf
          title="Download Hand written notes"
          className="text-gray-800 cursor-pointer font-extrabold"
        />
        <div className="flex gap-2 items-center">
          <Switch
            isOn={isQuickReadModeOn}
            handleToggle={() => {
              setIsQuickReadModeOn(!isQuickReadModeOn);
            }}
          />
          <h3 className="text-gray-800 font-semibold">Quick Read</h3>
        </div>
      </div> */}
    </div>
  );
}

export default NotesContentTopBar;

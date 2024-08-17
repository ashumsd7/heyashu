

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
    <div className="bg-orange-600 h-10 flex items-center justify-between px-4 py-1 ">
      <div className="flex gap-2 items-center">
        <div className=" gap-2 justify-between items-center lg:flex hidden">
          {isSidebarVisible ? (
            <GoSidebarExpand
              onClick={() => {
                setIsSidebarVisible(!isSidebarVisible);
              }}
              className="text-2xl text-white cursor-pointer"
              title="Toggle Sidebar"
            />
          ) : (
            <GoSidebarCollapse
              title="Toggle Sidebar"
              onClick={() => {
                setIsSidebarVisible(!isSidebarVisible);
              }}
              className="text-2xl text-white"
            />
          )}
        </div>
        <h1 className="lg:text-xl text-sm font-extrabold text-center text-white md:text-left font-serif mb-4 md:mb-0 ">
          {title}
        </h1>
      </div>
      <div className="lg:flex hidden gap-6 items-center bg-orange-600 ">
        <MdFullscreen className="text-white text-2xl cursor-pointer font-extrabold" />
        <FaDownload
          title="Download Digital notes"
          className="text-white cursor-pointer font-extrabold"
        />
        <FaFilePdf
          title="Download Hand written notes"
          className="text-white cursor-pointer font-extrabold"
        />
        <div className="flex gap-2 items-center">
          <Switch
            isOn={isQuickReadModeOn}
            handleToggle={() => {
              setIsQuickReadModeOn(!isQuickReadModeOn);
            }}
          />
          <h3 className="text-white font-semibold">Quick Read</h3>
        </div>
      </div>
    </div>
  );
}

export default NotesContentTopBar;

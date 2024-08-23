import React from "react";
import { FaDownload, FaFilePdf, FaGithub } from "react-icons/fa";
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
  const NAMASTE_NODE_JS_CONTRIBUTION_LINK =
    "https://github.com/ashumsd7/ashu-new-portfolio-website/tree/main/src/data";
  return (
    <div className="bg-gradient-to-r relative from-gray-300 to-[#efeff1] px-4 lg:px-4   flex items-center rounded rounded-b-none justify-between  py-1 ">
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
        <h2 className="md:text-xl  text-sm font-extrabold text-center lg:mt-0 mt-4 text-gray-800 md:text-left font-serif mb-4 md:mb-0 ">
          {title}
        </h2>
      </div>

      <FaGithub
        onClick={() => {
          window.open(NAMASTE_NODE_JS_CONTRIBUTION_LINK, "_blank");
        }}
        className="absolute right-4 cursor-pointer "
        title="Contribute to the repo"
      />
      {/* <div className="lg:flex hidden gap-6 items-center bg-[#f2f2f2] ">
        <MdFullscreen className="text-gray-800 text-2xl cursor-pointer font-extrabold" />
      
       
        
      </div> */}
      {/* <div className="flex gap-2 items-center">
        <Switch
          isOn={isQuickReadModeOn}
          handleToggle={() => {
            setIsQuickReadModeOn(!isQuickReadModeOn);
          }}
        />
        <h3 className="text-gray-800 font-semibold">Quick Read</h3>
      </div> */}
    </div>
  );
}

export default NotesContentTopBar;

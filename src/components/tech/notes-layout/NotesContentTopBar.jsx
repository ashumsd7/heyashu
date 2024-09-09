import React from "react";
import { FaDownload, FaFilePdf, FaGithub } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import Switch from "@/components/base/Switch";

function NotesContentTopBar({
  isSidebarVisible,
  setIsSidebarVisible,
  title
}) {
  return (
    <>
      <div className="  px-2    flex items-center rounded rounded-b-none justify-between  py-1 relative  ">
        <div className="flex gap-2 items-center">
          <div className=" gap-2 justify-between items-center lg:flex hidden absolute top-0 -left-10">
            {!isSidebarVisible ? (
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
       
          <h3 className="md:text-4xl text-2xl text-[#08142c] font-extrabold ">{title}</h3>
        </div>

       
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

     
    </>
  );
}

export default NotesContentTopBar;

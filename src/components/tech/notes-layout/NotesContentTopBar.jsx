import React from "react";
import { FaDownload, FaFilePdf, FaGithub, FaPagelines } from "react-icons/fa";
import { MdEdit, MdFullscreen } from "react-icons/md";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import Switch from "@/components/base/Switch";
import { ADMIN_LINK, GITHUB_REPO_LINK } from "@/utils/constant";
import { DiOpensource } from "react-icons/di";
import { ImNewTab } from "react-icons/im";

function NotesContentTopBar({ isSidebarVisible, setIsSidebarVisible, title }) {
  return (
    <>
      <div className="  px-2    flex items-center rounded rounded-b-none justify-between  py-1 gap-4 relative flex-wrap-reverse ">
        <div className="flex gap-2 items-center flex-wrap">
          <div className=" gap-2 justify-between items-center lg:flex hidden absolute top-0 -left-10 flex-wrap">
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
                className="text-2xl text-gray-800  cursor-pointer"
              />
            )}
          </div>

          <h3 className="md:text-4xl text-2xl text-[#08142c] font-extrabold ">
            {title}
          </h3>
        </div>

        {/* <div className="lg:flex hidden gap-6 items-center bg-[#f2f2f2] ">
        <MdFullscreen className="text-gray-800 text-2xl cursor-pointer font-extrabold" />
      
       
        
      </div> */}
        <div
          onClick={() => {
            window.open(GITHUB_REPO_LINK, "_blank");
          }}
          className="flex items-center justify-center animate-pulse border-b border-green-500  md:font-extrabold font-light text-green-600 cursor-pointer gap-[2px]  "
        >
          <DiOpensource className="md:text-2xl text-sm " title="Edit this page" />
          <span className=" cursor-pointer text-lg">Opensource</span>
          <ImNewTab className='text-xs text-black' />
        </div>
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

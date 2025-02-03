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
    <div className="flex items-center justify-between px-4 py-3 gap-4 border-b dark:border-gray-700 flex-wrap">
      <div className="flex items-center gap-4 ml-[-45px]">
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          className="hidden lg:block text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          title="Toggle Sidebar"
        >
          {!isSidebarVisible ? (
            <GoSidebarExpand className="text-xl" />
          ) : (
            <GoSidebarCollapse className="text-xl" />
          )}
        </button>

        <h1 className="text-2xl md:text-3xl mb-6 md:my-8 mt-12  font-bold text-gray-900 dark:text-gray-100 ml-[45px]">
          {title}
        </h1>
      </div>

      <a
        href={GITHUB_REPO_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors font-medium"
      >
        <DiOpensource className="text-xl" />
        <span>Open Source</span>
        <ImNewTab className="text-xs" />
      </a>
    </div>
    </>
  );
}

export default NotesContentTopBar;

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
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          className="hidden lg:block text-gray-600 hover:text-gray-800 transition-colors"
          title="Toggle Sidebar"
        >
          {!isSidebarVisible ? (
            <GoSidebarExpand className="text-xl" />
          ) : (
            <GoSidebarCollapse className="text-xl" />
          )}
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h1>
      </div>

      <a
        href={GITHUB_REPO_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors font-medium"
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

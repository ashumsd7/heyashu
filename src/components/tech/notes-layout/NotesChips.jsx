
import { useEffect, useState } from "react";
import NotesSidebar from "./NotesSidebar";
import { STORAGE_KEY } from "@/data/note/namaste-node-js-s1/constant";
import ls from "local-storage";
import {  GoSidebarExpand } from "react-icons/go";
import { IoMdCloseCircleOutline } from "react-icons/io";
const NotesChips = ({
  handleChipClick,
  data,
  progress = "20",
  currentPageFrontMatter,
  contentListTitle = "Namaste Noe JS",
  eachCardPrefix,
}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    if (isSidebarVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarVisible]);
  return (
    <>
      <div className="lg:hidden block mb-4 ">
        {!isSidebarVisible ? (
          <div
            className="flex gap-1 items-center"
            onClick={() => {
              setIsSidebarVisible(!isSidebarVisible);
            }}
          >
            <GoSidebarExpand
              className="text-2xl text-gray-800 cursor-pointer -mx-4"
              title="Toggle Sidebar"
            />

            <div className="text-base ml-6">Select Episode</div>
          </div>
        ) : (
          <div className="flex gap-1 items-center -ml-4">
            <IoMdCloseCircleOutline
              title="Toggle Sidebar"
              onClick={() => {
                setIsSidebarVisible(!isSidebarVisible);
              }}
              className="text-2xl text-gray-800"
            />
          </div>
        )}
      </div>
      {isSidebarVisible && (
        <div className="w-[300px]  block bg-white -mx-4  pb-[300px] h-full shadow-xl border-t-4 rounded-lg   z-[99]  fixed ">
          <NotesSidebar
            data={data}
            onSectionClick={(item) => {
              setIsSidebarVisible(false);
              handleChipClick(item);
            }}
            progress={progress}
            selectedSection={currentPageFrontMatter}
            storedValues={ls.get(STORAGE_KEY)}
            eachCardPrefix={eachCardPrefix}
            contentListTitle={contentListTitle}
          />
        </div>
      )}
    </>
  );
};

export default NotesChips;

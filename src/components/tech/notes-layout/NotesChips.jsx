import { useEffect, useState } from "react";
import NotesSidebar from "./NotesSidebar";
import { STORAGE_KEY } from "@/data/note/namaste-node-js-s1/constant";
import ls from "local-storage";
import { GoSidebarExpand } from "react-icons/go";
import { IoMdCloseCircleOutline } from "react-icons/io";

const NotesChips = ({
  handleChipClick,
  data,
  progress = "20",
  currentPageFrontMatter,
  contentListTitle = "Namaste Noe JS",
  eachCardPrefix,
  show2ndSection,
  season2Data=[]
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
      <div className="lg:hidden fixed bottom-1/2 left-0 z-[100] transform -translate-y-1/2">
        {!isSidebarVisible ? (
          <div
            className="flex items-center bg-gray-600 dark:bg-gray-700 text-white px-2 py-4 rounded-r-lg shadow-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <GoSidebarExpand className="text-xl" />
          </div>
        ) : (
          <div className="flex items-center">
            <IoMdCloseCircleOutline
              title="Close Sidebar"
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              className="text-2xl text-gray-800 dark:text-gray-200 cursor-pointer hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            />
          </div>
        )}
      </div>

      {isSidebarVisible && (
        <div className="w-[300px] block -mx-4 pb-[300px] h-full shadow-xl border-t-4 rounded-lg z-[99] fixed bg-white dark:bg-gray-900">
          <NotesSidebar
            data={data}
            onSectionClick={(item) => {
              setIsSidebarVisible(false);
              handleChipClick(item);
            }}
            season2Data={season2Data}
            progress={progress}
            selectedSection={currentPageFrontMatter}
            storedValues={ls.get(STORAGE_KEY)}
            eachCardPrefix={eachCardPrefix}
            contentListTitle={contentListTitle}
            show2ndSection={show2ndSection}
          />
        </div>
      )}
    </>
  );
};

export default NotesChips;

import React, { useEffect, useMemo, useState } from "react";
import NotesSidebar from "@/components/tech/notes-layout/NotesSidebar";
import NotesChips from "@/components/tech/notes-layout/NotesChips";
import NotesContentTopBar from "@/components/tech/notes-layout/NotesContentTopBar";
import NotesContent from "@/components/tech/notes-layout/NotesContent";
import { season1EpisodesNodeJsAkshaySaini } from "@/components/tech/data";
import { scrollToTop } from "@/utils/functions";
import ls from "local-storage";
import NotesContentFooter from "@/components/tech/notes-layout/NotesContentFooter";
const NamasteNodeJS = () => {
  const s1Episodes = useMemo(() => season1EpisodesNodeJsAkshaySaini);
  const [selectedSection, setSelectedSection] = useState(
    season1EpisodesNodeJsAkshaySaini[0]
  );
  const [markdownContent, setMarkdownContent] = useState("sasda");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isQuickReadModeOn, setIsQuickReadModeOn] = useState(false);
  const [progress, setProgress] = useState(0);

  const STORAGE_KEY = "NAMASTE-NODE_JS_S1";
  const handleSectionClick = (section) => {
    const storageValue = ls.get(STORAGE_KEY);
    const updatedStorage = {
      ...storageValue,
      [section.name]: true,
    };
    ls.set(STORAGE_KEY, updatedStorage);
    scrollToTop();
    setSelectedSection(section);

    // Replace with actual content based on section
  };

  function countTrueValues() {
    const storageValue = ls.get(STORAGE_KEY);
    return storageValue
      ? Object.values(storageValue).filter((value) => value === true).length
      : 0;
  }

  useEffect(() => {
    const totalCount = season1EpisodesNodeJsAkshaySaini?.length;
    const trueCount = countTrueValues();
    const percentage = Math.round((trueCount / totalCount) * 100);
    const res = percentage.toFixed(2);
    document.body.style.overflow = "hidden";
    setProgress(res);
  }, [selectedSection]);
  
  const savedStorage = ls.get(STORAGE_KEY);
  return (
    <div className="lg:-mt-8">
      <NotesChips
        data={s1Episodes}
        handleChipClick={handleSectionClick}
        progress={progress}
        storedValues={savedStorage}
      />

      <div className="flex h-[93vh] gap-10">
        {isSidebarVisible && (
          <NotesSidebar
            data={s1Episodes}
            onSectionClick={handleSectionClick}
            progress={progress}
            selectedSection={selectedSection}
            storedValues={ls.get(STORAGE_KEY)}
          />
        )}
        <div
          className={`lg:w-3/4 w-full  flex flex-col bg-white lg:h-[96.5vh] h-[75vh] lg:-mt-12  ml-auto ${
            isSidebarVisible ? "w-3/4" : "w-full"
          }`}
        >
          <NotesContentTopBar
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
            isQuickReadModeOn={isQuickReadModeOn}
            setIsQuickReadModeOn={setIsQuickReadModeOn}
            title={`Episode ${selectedSection.id} - ${selectedSection?.name}`}
          />

          <div className="flex-1 overflow-y-auto">
            <NotesContent markdownContent={markdownContent} />
          </div>

          {/* <NotesContentFooter data={s1Episodes} selectedSection={selectedSection} onSectionClick={handleSectionClick} /> */}
        </div>
      </div>
    </div>
  );
};
export default NamasteNodeJS;

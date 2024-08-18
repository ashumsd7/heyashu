import React, { useEffect, useMemo, useState } from "react";
import NotesSidebar from "@/components/tech/notes-layout/NotesSidebar";
import NotesChips from "@/components/tech/notes-layout/NotesChips";
import NotesContentTopBar from "@/components/tech/notes-layout/NotesContentTopBar";
import NotesContent from "@/components/tech/notes-layout/NotesContent";
import {  season1EpisodesNodeJsAkshaySaini } from "@/components/tech/data";
import { scrollToTop } from "@/utils/functions";
import ls from "local-storage";
import NotesContentFooter from "@/components/tech/notes-layout/NotesContentFooter";
import { e0 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e0";
import { e1 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e1";
import { e2 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e2";
import { e3 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e3";
import { e4 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e4";
import { e5 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e5";
import { e6 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e6";
import { e7 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e7";
import { e8 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e8";
import { e9 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e9";
import { e10 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e10";
import { e11 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e11";
import { e12 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e12";
import { e13 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e13";


const matchingMDX = {
  e0: e0,
  e1: e1,
  e2: e2,
  e3: e3,
  e4: e4,
  e5: e5,
  e6: e6,
  e7: e7,
  e8: e8,
  e9: e9,
  e10: e10,
  e11: e11,
  e12: e12,
  e13: e13,
};
const NamasteNodeJS = () => {
  const s1Episodes = useMemo(() => season1EpisodesNodeJsAkshaySaini);
  const [selectedSection, setSelectedSection] = useState(
    season1EpisodesNodeJsAkshaySaini[0]
  );
  3;
  const [markdownContent, setMarkdownContent] = useState(`# hello`);
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

  function fetchMarkdown(fileName) {
    console.log("fileName",fileName);
    console.log("matchingMDX[fileName]",matchingMDX[fileName]);
    setMarkdownContent(matchingMDX[fileName]);
  }

  useEffect(() => {
    console.log("selectedSection",selectedSection);
    const totalCount = season1EpisodesNodeJsAkshaySaini?.length;
    const trueCount = countTrueValues();
    const percentage = Math.round((trueCount / totalCount) * 100);
    const res = percentage.toFixed(2);
    document.body.style.overflow = "hidden";
    setProgress(res);
    fetchMarkdown("e" + selectedSection?.episode);
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
          className={`lg:w-3/4 w-full lg:ml-[340px] ml-0   flex flex-col bg-white lg:h-[96.5vh] h-[75vh] lg:-mt-12   rounded-lg border ${
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

          <div className="flex-1 overflow-y-auto p-4">
            <NotesContent markdownContent={markdownContent} />
          </div>

          {/* <NotesContentFooter data={s1Episodes} selectedSection={selectedSection} onSectionClick={handleSectionClick} /> */}
        </div>
      </div>
    </div>
  );
};
export default NamasteNodeJS;

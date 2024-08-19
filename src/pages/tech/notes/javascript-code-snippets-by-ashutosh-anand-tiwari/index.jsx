import React, { useEffect, useMemo, useState } from "react";
import NotesSidebar from "@/components/tech/notes-layout/NotesSidebar";
import NotesChips from "@/components/tech/notes-layout/NotesChips";
import NotesContentTopBar from "@/components/tech/notes-layout/NotesContentTopBar";
import NotesContent from "@/components/tech/notes-layout/NotesContent";
import { estimateReadingTime, scrollToTop } from "@/utils/functions";
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
import { e100 } from "@/data/tech/notes/markdown/namaste_node_js_by_as_s1/e100";
import BlogMetaInfo from "@/components/tech/notes-layout/BlogMetaInfo";
import { JS_SNIPPETS_BY_ASHUTOSH } from "@/data/tech/notes/markdown/js-snippets-by-ashutotsh/sidebarContent";

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
  e100: e100,
};
const JSSnippets = () => {
  const episodes = useMemo(() => JS_SNIPPETS_BY_ASHUTOSH);
  const [selectedSection, setSelectedSection] = useState(
    JS_SNIPPETS_BY_ASHUTOSH[0]
  );
  3;
  const [markdownContent, setMarkdownContent] = useState(`# hello`);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isQuickReadModeOn, setIsQuickReadModeOn] = useState(false);
  const [progress, setProgress] = useState(0);

  const STORAGE_KEY = "JsSnippetsByAshutosh";
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
    console.log("fileName", fileName);
    console.log("matchingMDX[fileName]", matchingMDX[fileName]);
    setMarkdownContent(matchingMDX[fileName]);
  }

  useEffect(() => {
    console.log("selectedSection", selectedSection);
    const totalCount = JS_SNIPPETS_BY_ASHUTOSH?.length;
    const trueCount = countTrueValues();
    const percentage = Math.round((trueCount / totalCount) * 100);
    const res = percentage.toFixed(2);
    document.body.style.overflow = "hidden";
    setProgress(res);
    fetchMarkdown("e" + selectedSection?.episode);
  }, [selectedSection]);

  const savedStorage = ls.get(STORAGE_KEY);
  return (
    <div className="lg:-mt-4">
      <NotesChips
        data={episodes}
        handleChipClick={handleSectionClick}
        progress={progress}
        storedValues={savedStorage}
        value={episodes[0]}
      />

      <div className="flex h-[93vh] gap-10">
        {isSidebarVisible && (
          <NotesSidebar
            data={episodes}
            onSectionClick={handleSectionClick}
            progress={progress}
            selectedSection={selectedSection}
            storedValues={ls.get(STORAGE_KEY)}
            noEpisodes={true}
            SidebarTitle="JS Quick Snippets"
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
            title={`${selectedSection?.name}`}
          />

          <div className="flex-1 overflow-y-auto p-4">
            <BlogMetaInfo
              data={{
                timeRead: estimateReadingTime(markdownContent),
                publishedOn: selectedSection?.publishedOn,
                name: "Ashutosh Anand Tiwari",
              }}
            />
            <NotesContent markdownContent={markdownContent} />
          </div>

          {/* <NotesContentFooter data={episodes} selectedSection={selectedSection} onSectionClick={handleSectionClick} /> */}
        </div>
      </div>
    </div>
  );
};
export default JSSnippets;

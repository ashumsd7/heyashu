import React, { useEffect, useMemo, useState } from "react";
import NotesSidebar from "@/components/tech/notes-layout/NotesSidebar";
import NotesChips from "@/components/tech/notes-layout/NotesChips";
import NotesContentTopBar from "@/components/tech/notes-layout/NotesContentTopBar";
import NotesContent from "@/components/tech/notes-layout/NotesContent";
import { estimateReadingTime, scrollToTop } from "@/utils/functions";
import ls from "local-storage";
import NotesContentFooter from "@/components/tech/notes-layout/NotesContentFooter";
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
import { e1 } from "@/data/tech/notes/markdown/js-snippets-by-ashutotsh/e1";
import { useRouter } from "next/router";
import Head from "next/head";

const matchingMDX = {
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
  const router = useRouter();
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
    router.push("#" + section?.name);
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
    setMarkdownContent(matchingMDX[fileName]);
  }

  useEffect(() => {
    const totalCount = JS_SNIPPETS_BY_ASHUTOSH?.length;
    const trueCount = countTrueValues();
    const percentage = Math.round((trueCount / totalCount) * 100);
    const res = percentage.toFixed(2);
    document.body.style.overflow = "hidden";
    setProgress(res);
    fetchMarkdown("e" + selectedSection?.episode);
  }, [selectedSection]);

  useEffect(() => {
    if (window.location.hash) {
      const hash = decodeURIComponent(window.location.hash);
      const section = JS_SNIPPETS_BY_ASHUTOSH.find(
        (item) => item.name === hash.split("#")[1]
      );
      setSelectedSection(section || JS_SNIPPETS_BY_ASHUTOSH[0]);
    }
  }, []);

  const savedStorage = ls.get(STORAGE_KEY);
  return (
    <>
      <Head>
        <title>JS Quick Snippets: By Ashutosh Anand Tiwari</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Explore quick and practical JavaScript code snippets curated by Ashutosh Anand Tiwari. Enhance your coding skills with these essential JavaScript tips and tricks."
        />
        <meta
          name="keywords"
          content="JavaScript, code snippets, Ashutosh Anand Tiwari, web development, programming tips"
        />
        <meta name="author" content="Ashutosh Anand Tiwari" />
        <meta
          property="og:title"
          content="JS Quick Snippets: By Ashutosh Anand Tiwari"
        />
        <meta
          property="og:description"
          content="Discover essential JavaScript snippets to boost your web development skills, curated by Ashutosh Anand Tiwari."
        />
        <meta property="og:image" content="/path_to_image.jpg" />
        <meta
          property="og:url"
          content="https://heyashu.in/tech/notes/javascript-code-snippets-by-ashutosh-anand-tiwari"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="JS Quick Snippets: By Ashutosh Anand Tiwari"
        />
        <meta
          name="twitter:description"
          content="Quick JavaScript snippets curated by Ashutosh Anand Tiwari to enhance your coding skills."
        />
        <meta name="twitter:image" content="/path_to_image.jpg" />
      </Head>

      <div className="lg:-mt-4">
        <NotesChips
          data={episodes}
          handleChipClick={handleSectionClick}
          progress={progress}
          storedValues={savedStorage}
          value={episodes[0]}
          SidebarTitle="JS Quick Snippets"
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
    </>
  );
};
export default JSSnippets;

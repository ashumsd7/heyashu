import React, { useEffect, useMemo, useState } from "react";
import NotesSidebar from "@/components/tech/notes-layout/NotesSidebar";
import NotesChips from "@/components/tech/notes-layout/NotesChips";
import NotesContentTopBar from "@/components/tech/notes-layout/NotesContentTopBar";
import NotesContent from "@/components/tech/notes-layout/NotesContent";
import { estimateReadingTime, scrollToTop } from "@/utils/functions";
import ls from "local-storage";
import BlogMetaInfo from "@/components/tech/notes-layout/BlogMetaInfo";
import { useRouter } from "next/router";
import Head from "next/head";

const NotesMainPage = ({
  matchingMDXConfig,
  contentList,
  storageKey,
  metaInfo,
  contentListTitle,
  pageTitle,
}) => {
  const router = useRouter();
  const episodes = useMemo(() => contentList);
  const [selectedSection, setSelectedSection] = useState(contentList[0]);
  3;
  const [markdownContent, setMarkdownContent] = useState(`# hello`);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isQuickReadModeOn, setIsQuickReadModeOn] = useState(false);
  const [progress, setProgress] = useState(0);

  const STORAGE_KEY = storageKey;
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
    setMarkdownContent(matchingMDXConfig[fileName]);
  }

  useEffect(() => {
    const totalCount = contentList?.length;
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
      const section = contentList.find(
        (item) => item.name === hash.split("#")[1]
      );
      setSelectedSection(section || contentList[0]);
    }
  }, []);

  const savedStorage = ls.get(STORAGE_KEY);
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        {metaInfo?.map((info) => {
          return <meta name={info.name} content={info.content} />;
        })}
      </Head>

      <div className="lg:-mt-4">
        <NotesChips
          data={episodes}
          handleChipClick={handleSectionClick}
          progress={progress}
          storedValues={savedStorage}
          value={episodes[0]}
          contentListTitle={contentListTitle}
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
              contentListTitle={contentListTitle}
            />
          )}
          <div
            className={`lg:w-3/4 w-full lg:ml-[340px] ml-0   flex flex-col bg-white lg:h-[96.5vh] h-[75vh] lg:-mt-6   rounded-lg border ${
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

            <div className="flex-1 overflow-y-auto ">
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
export default NotesMainPage;

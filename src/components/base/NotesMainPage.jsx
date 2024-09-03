import React, { useEffect, useMemo, useState } from "react";
import NotesSidebar from "@/components/tech/notes-layout/NotesSidebar";
import NotesChips from "@/components/tech/notes-layout/NotesChips";
import NotesContentTopBar from "@/components/tech/notes-layout/NotesContentTopBar";
import NotesContent from "@/components/tech/notes-layout/NotesContent";
import { estimateReadingTime, generateSlug, scrollToTop } from "@/utils/functions";
import ls from "local-storage";
import BlogMetaInfo from "@/components/tech/notes-layout/BlogMetaInfo";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "./Button";

const NotesMainPage = ({
  matchingMDXConfig,
  contentList,
  storageKey,
  metaInfo,
  contentListTitle,
  pageTitle,
  eachCardPrefix,
  msxSource
}) => {
  const router = useRouter();
  const episodes = useMemo(() => contentList);
  const [selectedSection, setSelectedSection] = useState(contentList[0]);
  3;
  const [markdownContent, setMarkdownContent] = useState(`### Please Wait...`);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isQuickReadModeOn, setIsQuickReadModeOn] = useState(false);
  const [progress, setProgress] = useState(0);

  const STORAGE_KEY = storageKey;
  const handleSectionClick = (section) => {
   const slug= generateSlug(section?.title)
   console.log('slug',slug);
    // router.push("#" + section?.name);
      router.push("/digital-notes/namaste-node-js/" + slug);

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

  function fetchMarkdown() {
    return msxSource
  }

  useEffect(() => {
    const totalCount = contentList?.length;
    const trueCount = countTrueValues();
    const percentage = Math.round((trueCount / totalCount) * 100);
    const res = percentage.toFixed(2);
    setProgress(res);
    fetchMarkdown();
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
        <title>
          {selectedSection?.name} : {pageTitle}{" "}
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        {metaInfo?.map((info) => {
          return (
            <meta key={info.name} name={info.name} content={info.content} />
          );
        })}
      </Head>

      <div className="max-w-screen-xl">
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
              eachCardPrefix={eachCardPrefix}
              contentListTitle={contentListTitle}
            />
          )}
          <div
            className={`lg:w-3/4 w-full lg:ml-[340px] ml-0   flex flex-col bg-white  h-full     rounded-lg   ${
              isSidebarVisible ? "w-3/4" : "w-full"
            }`}
          >
            <NotesContentTopBar
              isSidebarVisible={isSidebarVisible}
              setIsSidebarVisible={setIsSidebarVisible}
              isQuickReadModeOn={isQuickReadModeOn}
              setIsQuickReadModeOn={setIsQuickReadModeOn}
              title={selectedSection?.title || selectedSection?.name}
            />

            <div className="flex-1 bg-white  ">
              <div className="px-2">
                <BlogMetaInfo
                  large
                  data={{
                    timeRead: estimateReadingTime(markdownContent),
                    publishedOn: selectedSection?.publishedOn,
                    name: "Ashutosh Anand Tiwari",
                    title: selectedSection?.title || selectedSection?.title,
                    isQuickReadModeOn: isQuickReadModeOn,
                    setIsQuickReadModeOn: setIsQuickReadModeOn,
                  }}
                />
              </div>
              {isQuickReadModeOn ? (
                <div className="flex flex-col gap-4 justify-center items-center mt-10  font-semibold">
                  <h2 className="text-2xl">I am writing this feature !!!</h2>
                  <Button
                    onClick={() => {
                      window.open(
                        "https://topmate.io/aat/1148709/pay",
                        "_blank"
                      );
                    }}
                    className=""
                  >
                    Let's write together
                  </Button>
                </div>
              ) : (
                <NotesContent markdownContent={msxSource} large />
              )}
            </div>

            {/* <NotesContentFooter data={episodes} selectedSection={selectedSection} onSectionClick={handleSectionClick} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default NotesMainPage;

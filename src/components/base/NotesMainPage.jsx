import React, { useEffect, useState } from "react";
import NotesSidebar from "@/components/tech/notes-layout/NotesSidebar";
import NotesChips from "@/components/tech/notes-layout/NotesChips";
import NotesContentTopBar from "@/components/tech/notes-layout/NotesContentTopBar";
import NotesContent from "@/components/tech/notes-layout/NotesContent";
import {
  estimateReadingTime,
  formateDate,
  generateSlug,
  reverseSlug,
  scrollToTop,
} from "@/utils/functions";
import ls from "local-storage";
import BlogMetaInfo from "@/components/tech/notes-layout/BlogMetaInfo";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "./Button";
import { CONNECT_LINK_TOPMATE } from "@/utils/constant";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ContentFooter from "../garden/ContentFooter";
import CommonSlugHeadTags from "../seo/CommonSlugHeadTags";
dayjs.extend(customParseFormat);

const NotesMainPage = ({
  contentList = [],
  storageKey,
  metaInfo,
  contentListTitle,
  pageTitle,
  eachCardPrefix,
  msxSource,
  currentPageFrontMatter,
  contentListLength,
  subDomain = "namaste-node-js",
  isAnalysisPageOn,
  show2ndSection,
  season2Data=[],
  shareImageEmbed
}) => {
  const router = useRouter();
  const [episodes, _setEpisodes] = useState(contentList);
  const [_selectedSection, setSelectedSection] = useState(
    currentPageFrontMatter
  );
  const [markdownContent, _setMarkdownContent] = useState(`### Please Wait...`);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isQuickReadModeOn, setIsQuickReadModeOn] = useState(false);
  const [progress, setProgress] = useState(0);

  const STORAGE_KEY = storageKey;
  const handleSectionClick = (section) => {
    const slug = generateSlug(section?.title);
    router.push(`/digital-garden/notes/${subDomain}/` + slug);
    const storageValue = ls.get(STORAGE_KEY);
    const updatedStorage = {
      ...storageValue,
      [section.name]: true,
    };
    ls.set(STORAGE_KEY, updatedStorage);
    scrollToTop();
  };

  function countTrueValues() {
    const storageValue = ls.get(STORAGE_KEY);
    return storageValue
      ? Object.values(storageValue).filter((value) => value === true).length
      : 0;
  }

  // for changing file path just removing public , because its not required
  function changeFilePath(filePath) {
    const newFilePath = filePath.replace("/public", "");
    return newFilePath;
  }

  useEffect(() => {
    const totalCount = contentListLength;
    const trueCount = countTrueValues();
    const percentage = Math.round((trueCount / totalCount) * 100);
    const res = percentage == 100 ? 100 : percentage.toFixed(2);
    setProgress(res);
  }, [currentPageFrontMatter]);

  // Todo: Not working needs to be fixed
  useEffect(() => {
    const { slug } = router.query;
    const matchedEpisode = contentList?.findIndex((episode) => {
      return episode?.title?.toLowerCase() == reverseSlug(slug);
    });
    setSelectedSection(matchedEpisode || contentList[1]);
  }, []);

  const savedStorage = ls.get(STORAGE_KEY);

  // format publish date
  const formattedDate = formateDate(currentPageFrontMatter?.publishedOn);

  return (
    <>
  
      <CommonSlugHeadTags frontMatter={currentPageFrontMatter} image={shareImageEmbed} />

      <div className="max-w-screen-xl relative ">
        <NotesChips
          data={contentList}
          handleChipClick={handleSectionClick}
          progress={progress}
          storedValues={savedStorage}
          value={episodes[0]}
          season2Data={season2Data}
          contentListTitle={contentListTitle}
          selectedSection={currentPageFrontMatter}
          eachCardPrefix={eachCardPrefix}
          show2ndSection={show2ndSection}
        />

        <div className="flex h-[93vh] gap-20">
          {isSidebarVisible && (
            <>
              <div className="w-[1/4]  lg:block hidden  pb-[300px] h-full shadow-xl border-t-4 rounded-lg   fixed ">
                <NotesSidebar
                  data={contentList}
                  season2Data={season2Data}
                  onSectionClick={handleSectionClick}
                  progress={progress}
                  selectedSection={currentPageFrontMatter}
                  storedValues={ls.get(STORAGE_KEY)}
                  eachCardPrefix={eachCardPrefix}
                  contentListTitle={contentListTitle}
                  show2ndSection={show2ndSection}
                />
              </div>
            </>
          )}
          <div
            className={`lg:w-[60%] w-full lg:ml-[380px] ml-0    flex flex-col   h-full     rounded-lg   ${
              isSidebarVisible ? "w-3/4" : "w-full"
            }`}
          >
       
            <NotesContentTopBar
              isSidebarVisible={isSidebarVisible}
              setIsSidebarVisible={setIsSidebarVisible}
              isQuickReadModeOn={isQuickReadModeOn}
              setIsQuickReadModeOn={setIsQuickReadModeOn}
              title={
                currentPageFrontMatter?.name || currentPageFrontMatter?.title
              }
            />

            <div className="flex-1   ">
              <div className="">
                <BlogMetaInfo
                  large
                  data={{
                    // timeRead: estimateReadingTime(mdxSource?.compiledSource),
                    timeRead: estimateReadingTime(msxSource?.compiledSource),
                    publishedOn: formattedDate,
                    name: currentPageFrontMatter?.author || "Anonymous user",
                    title:
                      currentPageFrontMatter?.name ||
                      currentPageFrontMatter?.title,
                    isQuickReadModeOn: isQuickReadModeOn,
                    setIsQuickReadModeOn: setIsQuickReadModeOn,
                    isAnalysisPageOn:{isAnalysisPageOn}
                  }}
                />
              </div>

              {currentPageFrontMatter?.thumbnail && (
                <img
                  className="mb-6 mt-4 rounded-md shadow-lg"
                  alt={currentPageFrontMatter?.title}
                  src={
                    currentPageFrontMatter?.thumbnail?.includes("https")
                      ? currentPageFrontMatter?.thumbnail
                      : changeFilePath(currentPageFrontMatter?.thumbnail)
                  }
                  width="1024"
                  height={"300"}
                />
              )}

              {isQuickReadModeOn ? (
                <div className="flex flex-col gap-4 justify-center items-center mt-10 ml-10  font-semibold">
                  <h2 className="text-2xl">I am writing this feature !!!</h2>
                  <Button
                    onClick={() => {
                      window.open(CONNECT_LINK_TOPMATE, "_blank");
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

            <ContentFooter />

            {/* <NotesContentFooter data={episodes} selectedSection={selectedSection} onSectionClick={handleSectionClick} /> */}
          </div>
        </div>
      
      </div>
    </>
  );
};
export default NotesMainPage;

import React from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import {  matchingMDXForProcodrrNode} from "@/data/note/procoderr-nodejs/markdown-config";
import { contentListForProcoderrNodeJs } from "@/data/note/procoderr-nodejs/content-list";
import { metaTagsForProcodrrNodeJS } from "@/data/note/procoderr-nodejs/meta-tags";
import { CONTENT_LIST_TITLE, PAGE_TITLE, STORAGE_KEY } from "@/data/note/procoderr-nodejs/constant";
const ProcodrrNodeJS = () => {

  return (
    <NotesMainPage
      matchingMDXConfig={matchingMDXForProcodrrNode}
      metaInfo={metaTagsForProcodrrNodeJS}
      pageTitle={PAGE_TITLE}
      contentList={contentListForProcoderrNodeJs}
      contentListTitle={CONTENT_LIST_TITLE}
      storageKey={STORAGE_KEY}

    />
  );

};
export default ProcodrrNodeJS;

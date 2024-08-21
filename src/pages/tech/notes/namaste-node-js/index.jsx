import React from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import { matchingMDXForNamasteNodeJsS1 } from "@/data/note/namaste-node-js-s1/markdown-config";
import { contentListForNamasteNodeJsS1 } from "@/data/note/namaste-node-js-s1/content-list";
import { metaTagsForNamasteNodeJsS1 } from "@/data/note/namaste-node-js-s1/meta-tags";
import { CONTENT_LIST_TITLE, PAGE_TITLE, STORAGE_KEY } from "@/data/note/namaste-node-js-s1/constant";
const NamasteNodeJS = () => {

  return (
    <NotesMainPage
      matchingMDXConfig={matchingMDXForNamasteNodeJsS1}
      metaInfo={metaTagsForNamasteNodeJsS1}
      pageTitle={PAGE_TITLE}
      contentList={contentListForNamasteNodeJsS1}
      contentListTitle={CONTENT_LIST_TITLE}
      storageKey={STORAGE_KEY}
    />
  );

};
export default NamasteNodeJS;

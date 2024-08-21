import React from "react";
import NotesMainPage from "@/components/base/NotesMainPage";

import { CONTENT_LIST_TITLE, PAGE_TITLE, STORAGE_KEY } from "@/data/note/js-snippets/constant";
import { metaTagsForJsSnippets } from "@/data/note/js-snippets/meta-tags";
import { matchingMDXForJsSnippets } from "@/data/note/js-snippets/markdown-config";
import { contentListForJsSnippets } from "@/data/note/js-snippets/content-list";

const JSSnippets = () => {


  return (
    <NotesMainPage
      matchingMDXConfig={matchingMDXForJsSnippets}
      metaInfo={metaTagsForJsSnippets}
      pageTitle={PAGE_TITLE}
      contentList={contentListForJsSnippets}
      contentListTitle={CONTENT_LIST_TITLE}
      storageKey={STORAGE_KEY}
    />
  );
};
export default JSSnippets;

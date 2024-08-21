import React from "react";
import NotesMainPage from "@/components/base/NotesMainPage";
import { metaTags } from "@/data/note/js-snippets/meta-tags";
import {  matchingMDXForJsSnippets } from "@/data/note/js-snippets/markdown-config";
import { contentListForJsSnippets } from "@/data/note/js-snippets/content-list";

const JSSnippets = () => {
  return (
    <NotesMainPage
      matchingMDXConfig={matchingMDXForJsSnippets}
      metaInfo={metaTags}
      pageTitle="JS Snippets By Ashutosh Anand Tiwari"
      contentList={contentListForJsSnippets}
      sidebarTitle={"JavaScript Snippets"}
      storageKey={"JsSnippetsByAshutosh"}
    />
  );
};
export default JSSnippets;

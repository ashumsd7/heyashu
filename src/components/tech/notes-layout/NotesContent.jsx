import Markdown from "@/components/base/Markdown";
import { redirect } from "next/dist/server/api-utils";
import React from "react";
import ReactMarkdown from "react-markdown";
function NotesContent({ markdownContent }) {
  return (
    <div className="p-4 pb-20">
      <Markdown content={markdownContent} />
    </div>
  );
}

export default NotesContent;

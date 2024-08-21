import Markdown from "@/components/base/Markdown";
import React from "react";
function NotesContent({ markdownContent }) {
  return (
    <div className="p-4 pb-20">
      <Markdown content={markdownContent} />
    </div>
  );
}

export default NotesContent;

import Markdown from "@/components/base/Markdown";
import React from "react";
function NotesContent({ markdownContent , large}) {
  return (
    <div className="px-1 md:px-10 py-4 pb-20">
      <Markdown content={markdownContent} large={large} />
    </div>
  );
}

export default NotesContent;

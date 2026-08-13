import MDXRenderer from "@/components/base/MDXRenderer";
import React from "react";

function NotesContent({ markdownContent, large, garden = false }) {
  return (
    <div
      className={`prose mx-auto mb-28 w-full p-0 ${
        garden ? "max-w-none" : large ? "max-w-screen-lg" : "max-w-screen-md"
      }`}
    >
      <MDXRenderer
        markdownContent={markdownContent}
        variant={garden ? "garden" : "default"}
      />
    </div>
  );
}

export default NotesContent;

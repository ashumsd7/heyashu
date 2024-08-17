import React from 'react'
import ReactMarkdown from 'react-markdown';
function NotesContent({markdownContent}) {
  return (
    <>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>dsf
    </>
  )
}

export default NotesContent
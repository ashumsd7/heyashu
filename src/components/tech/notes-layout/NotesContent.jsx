import React from 'react'
import ReactMarkdown from 'react-markdown';
function NotesContent({markdownContent}) {
  return (
    <>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </>
  )
}

export default NotesContent
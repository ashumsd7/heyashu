import React from 'react'
import ReactMarkdown from 'react-markdown';
function NotesContent({markdownContent}) {
  console.log("markdownContent",markdownContent);
  return (
    <div className='p-4'>
        <ReactMarkdown className="prose">{markdownContent}</ReactMarkdown>
    </div>
  )
}

export default NotesContent
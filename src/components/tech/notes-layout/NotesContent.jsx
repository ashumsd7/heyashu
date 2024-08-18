import React from 'react'
import ReactMarkdown from 'react-markdown';
function NotesContent({markdownContent}) {
  return (
    <div className='p-4'>
        <ReactMarkdown className="prose prose-xl lg:prose-lg md:prose-md sm:prose-sm">{markdownContent}</ReactMarkdown>
    </div>
  )
}

export default NotesContent
import React from 'react'
import { FaPencilAlt } from "react-icons/fa";
function ComingSoon({text='Writing Soon..'}) {
  return (
    <div className='flex gap-2 items-center'><FaPencilAlt className='text-gray-500'/><h2 className='text-base text-gray-500 font-semibold font-serif'>{text}.</h2></div>
  )
}

export default ComingSoon
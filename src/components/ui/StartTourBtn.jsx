import React from 'react'
import { MdOutlineTour } from "react-icons/md";
function StartTour({children='',onClick}) {
  return (
    <button  id='start-tour'  title='Start the Website Tour again' onClick={onClick} className="border-b-32 hidden border-dotted font-serif lg:flex items-center gap-1 font-semibold cursor-pointer bg-gray-800  text-gray-100 px-2 py-1 rounded-full h-10 w-10  bottom-2 justify-center"><MdOutlineTour />{children}</button>
  )
}

export default StartTour
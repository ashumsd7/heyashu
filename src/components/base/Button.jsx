import React from 'react'

function Button({children, icon}) {
  return (
    <button className="border-b-32 border-dotted font-serif flex items-center gap-1 font-semibold cursor-pointer bg-gray-700 text-gray-100 px-2 py-1 rounded-sm">{icon}{children}</button>
  )
}

export default Button
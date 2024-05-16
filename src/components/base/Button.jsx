import React from 'react'

function Button({children, icon, onClick}) {
  return (
    <button onClick={onClick} className="border-b-32 border-dotted font-serif flex items-center gap-1 font-semibold cursor-pointer bg-gray-700 text-gray-100 px-3 py-2 rounded-sm">{icon}{children}</button>
  )
}

export default Button
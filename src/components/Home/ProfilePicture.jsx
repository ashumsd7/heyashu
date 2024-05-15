import Image from 'next/image'
import React, { useState } from 'react'

function ProfilePicture() {
  const imgPath1='/images/profile1.jpg'
  const imgPath2='/images/profile.jpg'

  const [currPath, setCurrPath] = useState(imgPath1);

  function onEnter(){
    setCurrPath(imgPath1)
  }

  
  function onLeave(){
    setCurrPath(imgPath1)
  }

  
  return (
    <Image src={currPath} onMouseEnter={onEnter} onMouseLeave={onLeave} className="hover:shadow-lg   ml-auto ease-in-out duration-100  cursor-pointer" width={'400'} height='400'/>
  )
}

export default ProfilePicture
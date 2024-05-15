
import Image from "next/image";
import React from "react";
import ProfilePicture from "./ProfilePicture";



function MainPage() {
  return (
    <div className="md:mt-20 mt-2 w-full">
      <div className="grid md:grid-cols-2  mx-auto grid-cols-1 m-auto justify-between ">
       <div className="flex flex-col gap-2">
       <h>Hey, I'm </h>
       <h1 className="text-5xl font-extrabold font-serif">
          Ashutosh Anand Tiwari
        </h1> 
        <div className="ml-auto  ">
       <span className="font-thin"> aka Ashu</span>

        </div>
       </div>
        
      <ProfilePicture/>
      </div>
  
    </div>
  );
}

export default MainPage;

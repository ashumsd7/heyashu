import Image from "next/image";
import React from "react";
import ProfilePicture from "./ProfilePicture";


function MainPage() {
  return (
    <div className="md:mt-20 mt-2 w-full">
      <div className="grid md:grid-cols-2  mx-auto grid-cols-1 m-auto justify-between px-4 md:px-2 ">
        <div className="flex flex-col gap-2">
          <h>Hey, I'm </h>
          <h1 className="text-5xl font-extrabold text-center md:text-left font-serif">
            Ashutosh Anand Tiwari
          </h1>
          <div className="ml-auto  ">
            <span className="font-thin"> aka Ashu</span>
          </div>

          <p className="font-serif text-justify text-lg mt-10 tracking-wider">
            A <HighLightedSpan>Software Engineer</HighLightedSpan> from the holy city of{" "}
           Ayodhya, Uttar Pradesh, the
            birthplace of Lord Rama. I'm passionate about coding,Traveling (now
            exploring India and Nepal), and capturing moments through
            photography (over 1 million photos so far!). In my downtime, I enjoy
            arcade games, cricket (big fan of Kohli and Dhoni), and spreading
            joy wherever I go. Let's connect  and share our experiences! 
          </p>
        </div>

        <ProfilePicture />
      </div>
    </div>
  );
}

export default MainPage;

function HighLightedSpan({ children }) {
  return (
    <span className="text-white   italic text-2xl bg-gray-700 px-2">
      {children}
    </span>
  );
}

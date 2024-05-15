import Image from "next/image";
import React from "react";
import ProfilePicture from "./ProfilePicture";
import { FaLaptop, FaUmbrellaBeach, FaHome, FaPencilAlt } from "react-icons/fa";

function MainPage() {
  return (
    <div className="md:mt-20 mt-2 w-full flex flex-col gap-6">
      <div className="grid md:grid-cols-2  mx-auto grid-cols-1 m-auto justify-between  ">
        <div className="flex flex-col gap-2">
          <h>Hey, I'm </h>
          <h1 className="text-5xl font-extrabold text-center md:text-left font-serif">
            Ashutosh Anand Tiwari
          </h1>
          <div className="ml-auto  ">
            <span className="font-thin"> aka Ashu</span>
          </div>

          <p className="font-serif text-justify text-lg mt-10 tracking-wider">
            A <HighLightedSpan>Software Engineer</HighLightedSpan> from the holy
            city of Ayodhya, Uttar Pradesh, the birthplace of Lord Rama. I'm
            passionate about coding,Traveling (now exploring India and Nepal),
            and capturing moments through photography (over 1 million photos so
            far!). In my downtime, I enjoy arcade games, cricket (big fan of
            Kohli and Dhoni), and spreading joy wherever I go. Let's connect and
            share our experiences!
          </p>
        </div>

        <ProfilePicture />
      </div>

      <div className="text-left">
        <h2 className="text-3xl font-serif  font-extrabold ">
          Which <HighLightedSpan>version</HighLightedSpan> you want to explore?
        </h2>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 justify-center m-auto mt-5 w-full  ">
       
        <Category icon={  <FaLaptop />} text='Tech'/>
        <Category icon={<FaUmbrellaBeach />} text='Travel'/>
        <Category icon={ <FaHome />} text='Town'/>
        <Category icon={ <FaPencilAlt />} text='Poet'/>
     
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

function Category({ icon, text }) {
  return (
    <div className="bg-gray-300 text-2xl border hover:shadow-2xl hover:text-white hover:bg-gray-700 ease-in-out cursor-pointer  border-black w-24 h-24 flex flex-col gap-2 justify-center items-center  rounded-full">
      <div className="flex items-center justify-center">{icon}</div>
      <span className="text-base font-mono">{text}</span>
    </div>
  );
}

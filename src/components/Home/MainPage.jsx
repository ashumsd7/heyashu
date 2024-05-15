import Image from "next/image";
import React from "react";
import ProfilePicture from "./ProfilePicture";
import { FaLaptop, FaUmbrellaBeach, FaHome, FaQuestion } from "react-icons/fa";
import { TbCurlyLoop } from "react-icons/tb";

function MainPage() {
  return (
    <div className="md:mt-20 mt-2 w-full flex flex-col gap-6 relative ">
      <div className="grid md:grid-cols-2  mx-auto grid-cols-1 m-auto justify-between  ">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold ">Hey, I'm </h1>
          <h1 className="text-5xl font-extrabold text-center md:text-left font-serif">
            Ashutosh Anand Tiwari
          </h1>
          <div className="ml-auto  ">
            <span className="font-thin"> aka Ashu</span>
          </div>
         

          <p className="font-serif text-justify text-lg mt-10 tracking-wider mb-4 hidden lg:grid">
           <HighLightedSpan> A Software Engineer</HighLightedSpan> from the holy
            city of Ayodhya, Uttar Pradesh, the birthplace of Lord Rama. I'm
            passionate about coding,Traveling (now exploring India and Nepal),
            and capturing moments through photography (over 1 million photos so
            far!). In my downtime, I enjoy arcade games, cricket (big fan of
            Kohli and Dhoni), and spreading joy wherever I go. Let's connect and
            share our experiences!
          </p>
        </div>

        <ProfilePicture />

        <p className="font-serif text-justify text-lg mt-10 tracking-wider mb-4 lg:hidden grid">
            <HighLightedSpan> A  Software Engineer</HighLightedSpan> from the holy
            city of Ayodhya, Uttar Pradesh, the birthplace of Lord Rama. I'm
            passionate about coding,Traveling (now exploring India and Nepal),
            and capturing moments through photography (over 1 million photos so
            far!). In my downtime, I enjoy arcade games, cricket (big fan of
            Kohli and Dhoni), and spreading joy wherever I go. Let's connect and
            share our experiences!
          </p>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-serif  font-extrabold ">
          Which <HighLightedSpan>version</HighLightedSpan> you want to explore?
        </h2>
      </div>
      <div className="flex flex-wrap items-center gap-4 justify-around m-auto mt-5 w-full  ">
       
        <Category icon={  <FaLaptop />} text='Tech'/>
        <Category icon={<FaUmbrellaBeach />} text='Travel'/>
        <Category icon={ <FaHome />} text='Town'/>
        <Category icon={ <TbCurlyLoop  className=""/>} text='...'/>
     
      </div>

      <Image className="absolute z-[-20] top-[-90px] left-[-150px]" src='/images/Leaves.JPG' width={'200'} height={'200'}/>
      {/* <Image className="absolute z-[-20] top-[-90px] right-[-150px]" src='/images/leaves2.JPG' width={'200'} height={'200'}/> */}
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

import Image from "next/image";
import React from "react";
import ProfilePicture from "./ProfilePicture";
import { FaLaptop, FaUmbrellaBeach, FaHome, FaQuestion } from "react-icons/fa";
import { TbCurlyLoop } from "react-icons/tb";
import Link from "next/link";

function MainPage() {
  return (
    <div className=" mt-2 w-full flex flex-col gap-6 relative ">
      <div className="grid md:grid-cols-2  mx-auto grid-cols-1 m-auto justify-between  ">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold ">Hey, I'm </h1>
          <h1 className="text-5xl font-extrabold text-center md:text-left font-serif text-orange-600">
            Ashutosh Anand Tiwari
          </h1>
          <div className="ml-auto  ">
            <span className="font-thin text-orange-600"> aka Ashu</span>
          </div>

          <p className="font-serif text-justify text-lg mt-10 tracking-wider mb-4 lg:grid hidden">
            <HighLightedSpan> Ashu </HighLightedSpan> He is someone who wants to
            experience every kind of life. He forgets things easily and trusts
            people quickly. Many people consider him immature and careless, but
            he is happy with who he is. He believes in living life to the
            fullest because you only live once and you never know what might
            happen next. Following the concept of "Zindagi Na Milegi Dobara," he
            continues his journey through life. He earns some money by writing
            code, but his life revolves around eating, traveling, reading, and
            sleeping.So, what are you waiting for? Let's connect and explore the world together!
          </p>
        </div>
        <div className="m-auto md:m-0">
          <ProfilePicture />
        </div>

        <p className="font-serif text-justify text-lg mt-10 tracking-wider mb-4 lg:hidden grid">
          <HighLightedSpan> Ashu </HighLightedSpan> He is someone who wants to
          experience every kind of life. He forgets things easily and trusts
          people quickly. Many people consider him immature and careless, but he
          is happy with who he is. He believes in living life to the fullest
          because you only live once and you never know what might happen next.
          Following the concept of "Zindagi Na Milegi Dobara," he continues his
          journey through life. He earns some money by writing code, but his
          life revolves around eating, traveling, reading, and sleeping. So, what are you waiting for? Let's connect and explore the world together!
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-serif  font-extrabold ">
          Which <HighLightedSpan>version</HighLightedSpan> you want to explore?
        </h2>
      </div>
      <div className="flex flex-wrap items-center gap-4 justify-around m-auto mt-5 w-full  ">
        <Link href="/tech">
          <Category icon={<FaLaptop />} text="Tech" />
        </Link>
        <Link href="/travel">
          <Category icon={<FaUmbrellaBeach />} text="Travel" />
        </Link>
        <Link href="/town">
          <Category icon={<FaHome />} text="Town" />
        </Link>
        <Link href="/misc">
          <Category icon={<TbCurlyLoop className="" />} text="more" />
        </Link>
      </div>

      <Image
        className="absolute z-[-20] top-[-14%] left-[-12%]"
        src="/images/Leaves.JPG"
        width={"200"}
        height={"200"}
      />
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
    <div className="bg-gray-300 text-2xl border hover:shadow-2xl hover:text-white hover:bg-gray-700 ease-in-out cursor-pointer  border-black w-20 h-20 flex flex-col gap-2 justify-center items-center  rounded-full">
      <div className="flex items-center justify-center">{icon}</div>
      <span className="text-base font-mono">{text}</span>
    </div>
  );
}

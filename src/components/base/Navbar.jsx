import Link from "next/link";
import React, { act, useEffect, useState } from "react";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { FaQuora } from "react-icons/fa";
import { SiWakatime } from "react-icons/si";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/router";
import { LuMousePointerClick } from "react-icons/lu";
function Navbar() {
  const [activePath, setActivePath] = useState("/");
  const router = useRouter();
  useEffect(() => {
    console.log("router", router);
    const pathName = router.pathname;
    console.log("pathName", router.pathname);
    if (pathName) {
      const firstPath = pathName.split("/")[1];
      console.log("firstPath", firstPath);
      setActivePath(firstPath);
    }

    return () => {};
  }, [router]);


  const goBack = () => {
    router.back();
  };
  return (
    <>
      <div className=" h-[2px] flex items-center bg-orange-600 md:mb-12 mb-20 ">
        <div className="flex justify-between gap-24 w-full items-center">
       
          <div>
            {router?.pathname?.split("/").length > 2 && (
              <div className="flex cursor-pointer justify-left font-semibold items-center mt-10 ml-4" onClick={()=>{
                goBack()
              }}>
                <IoArrowBackSharp />
                 back
              </div>
            )}
          </div>
          <div className="flex gap-8 mt-10">
            <Link
              href="/"
              className="text-xl font-extrabold flex items-center font-mono relative "
            >
              <FaHome />
              {activePath == "" && (
                <LuMousePointerClick className="absolute   top-[20px] left-[20px] text-2xl text-orange-600" />
              )}
            </Link>

            <Link
              href="/tech"
              className="text-xl font-extrabold font-mono relative"
            >
              /tech{" "}
              {activePath == "tech" && (
                <LuMousePointerClick className="absolute  top-[20px] left-[20px] text-2xl text-orange-600" />
              )}
            </Link>
            <Link
              href="/travel"
              className="text-xl font-extrabold font-mono  relative"
            >
              /travel
              {activePath == "travel" && (
                <LuMousePointerClick className="absolute  top-[20px] left-[20px] text-2xl text-orange-600" />
              )}
            </Link>
            <Link
              href="/misc"
              className="text-xl  font-extrabold font-mono mr-5 relative"
            >
              {" "}
              /more{" "}
              {activePath == "misc" && (
                <LuMousePointerClick className="absolute top-[20px] left-[20px] text-2xl text-orange-600" />
              )}
            </Link>
          </div>
          {/* links */}
          {/* <div className="lg:flex  hidden gap-8 text-white">
            <AiFillGithub  className="text-xl cursor-pointer" />
            <AiOutlineTwitter onClick={()=>{
                window.open('https://twitter.com/YourVueJS', '_blank')
            }} className="text-xl cursor-pointer" />
            <FaQuora onClick={()=>{
                window.open('https://twitter.com/YourVueJS', '_blank')
            }}  className="text-xl cursor-pointer" />
            <AiFillLinkedin onClick={()=>{
                window.open('https://twitter.com/YourVueJS', '_blank')
            }}  className="text-xl cursor-pointer" />
            <SiWakatime onClick={()=>{
                window.open('https://twitter.com/YourVueJS', '_blank')
            }}  className="text-xl cursor-pointer" />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Navbar;

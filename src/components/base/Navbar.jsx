import Link from "next/link";
import React from "react";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { FaQuora } from "react-icons/fa";
import { SiWakatime } from "react-icons/si";
import { FaHome } from "react-icons/fa";
function Navbar() {
  return (
    <>
      <div className=" h-[8px] flex items-center bg-[#166534] md:mb-12 mb-20 ">
        <div className="flex justify-between gap-24 w-full items-center">
          {/* logo */}
          {/* <h3 className="text-3xl text-white font-serif">Namaste :)</h3> */}
          {/* routes */}
          <div></div>
          <div className="flex gap-8 mt-10">
            <Link
              href="/"
              className="text-xl font-extrabold flex items-center font-mono "
            >
              {" "}
              <FaHome />{" "}
            </Link>

            <Link href="/tech" className="text-xl font-extrabold font-mono ">
              {" "}
              /tech{" "}
            </Link>
            <Link href="/travel" className="text-xl font-extrabold font-mono ">
              {" "}
              /travel{" "}
            </Link>
            <Link
              href="/misc"
              className="text-xl  font-extrabold font-mono mr-5"
            >
              {" "}
              /more{" "}
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

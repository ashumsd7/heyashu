import React from "react";
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { FaQuora } from "react-icons/fa";
import { SiWakatime } from "react-icons/si";
function Navbar() {
  return (
    <>
      <div className=" h-[40px] flex items-center px-10 bg-gray-900  ">
        <div className="flex justify-between gap-24 w-full items-center">
          {/* logo */}
          <h3 className="text-3xl text-white font-serif">Namaste :)</h3>
          {/* routes */}
          {/* <div className="flex gap-8">
            <a href="" className="text-xl ">
              {" "}
              Service{" "}
            </a>
            <a href="" className="text-xl ">
              {" "}
              Portfolio{" "}
            </a>
            <a href="" className="text-xl ">
              {" "}
              Client{" "}
            </a>
            <a href="" className="text-xl ">
              {" "}
              Blog{" "}
            </a>
          </div> */}

          {/* links */}
          <div className="lg:flex  hidden gap-8 text-white">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

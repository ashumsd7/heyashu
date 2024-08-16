import React, { useEffect, useState } from "react";
import Button from "../base/Button";
import { useRouter } from "next/router";
import { IoMdDownload } from "react-icons/io";

const Sidebar = () => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const router= useRouter()
  useEffect(() => {
    document.body.style.overflow = isNotesOpen ? "hidden" : "auto";
  }, [isNotesOpen]);
  return (
    <>
      <div className="">
        <Button  className='bg-orange-600 text-gray-200'
          onClick={() => {
            setIsNotesOpen(!isNotesOpen);
          }}
        >
           <IoMdDownload/>  View Digital Notes
        </Button>
      </div>
      {isNotesOpen && (
        <div className={`fixed right-0 top-0 h-screen w-64 bg-orange-600 p-4 overflow-y-auto transition-transform duration-300 ease-in-out ${
        isNotesOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}>
          {/* Close Button */}
          <div className="flex  justify-between items-center">
            <h2 className="text-white text-xl font-bold   mr-14">
            📚  Digital Notes
            </h2>
            <button
              onClick={() => {
                setIsNotesOpen(false);
              }}
              className="absolute top-3 right-4 text-white font-extrabold p-2 rounded-full"
            >
              ✕
            </button>

            {/* Heading */}
          </div>
          <div className="my-2 -mr-3">
            {" "}
            <hr />
          </div>

          {/* Description */}
          <p className="text-white font-sans mt-2 mb-4 text-sm rounded">
            Download PDF or read online. Best notes for deep understanding and
            effective revision. Get a list of curious questions after each
            chapter.
          </p>

          {/* Cards */}
          <div className="bg-gray-700 text-white relative p-4 mb-4 rounded cursor-pointer hover:bg-gray-600" onClick={()=>{
            router.push('/tech/notes/namaste-node-js')
          }}>
            <h3 className="font-bold text-lg">Namaste Node JS</h3>
            <span className="text-xs  font-bold animate-pulse text-green-400">Live Now</span>
            <span className="text-xs  font-sans text-white italic  text-right absolute right-2 bottom-1 ">By Akshay Saini</span>

          </div>
          {/* absolute right-2 top-1 */}
          <div className="bg-gray-400 text-white p-4 mb-4 rounded relative ">
            <h3 className="font-bold text-lg">Namaste React</h3>
            <span className="text-xs">Coming soon</span>
            <span className="text-xs  font-sans text-white italic  text-right absolute right-2 bottom-1 ">By Akshay Saini</span>
          </div>
          <div className="bg-gray-400 text-white p-4 mb-4 rounded relative">
            <h3 className="font-bold text-lg">Namaste JS</h3>
            <span className="text-xs ">Coming soon</span>
            <span className="text-xs  font-sans text-white italic  text-right absolute right-2 bottom-1 ">By Akshay Saini</span>
          </div>
          <div className="bg-gray-400 text-white p-4 mb-4 rounded relative">
            <h3 className="font-bold text-lg">Namaste FDS</h3>
            <span className="text-xs">Coming soon</span>
            <span className="text-xs  font-sans text-white italic  text-right absolute right-2 bottom-1 ">By Akshay Saini</span>
          </div>
        </div>
      )}
    </>
  );
};
export default Sidebar;

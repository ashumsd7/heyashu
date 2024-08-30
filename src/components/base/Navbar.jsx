import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/router";
import { LuMousePointerClick } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Support from "@/service/Support.";
function Navbar() {
  const [activePath, setActivePath] = useState("/");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [isSupportBtnActive, setIsSupportBtnActive] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsOpen(false);

    const pathName = router.pathname;
    if (pathName) {
      const firstPath = pathName.split("/")[1];
      document.body.style.overflow = "auto";
      setActivePath(firstPath);
    }

    return () => {};
  }, [router]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolledUp(true);
      } else {
        setIsScrolledUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {/* bg-[#efeff1] */}
      <nav className=" h-[2px] flex  fixed items-center bg-orange-600 md:mb-12 mb-20 w-full  ">
        <div
          style={{
            backgroundColor: isScrolledUp ? "black" : "#efeff1",
            color: isScrolledUp ? "white" : "black",
          }}
          className="md:flex justify-center  hidden  gap-6  w-full items-center relative  bg-[#efeff1] py-1 px-10  border-b border-gray-300  font-mono "
        >
          {/* <div>
            {router?.pathname?.split("/").length > 2 && (
              <div
                className="flex cursor-pointer justify-left font-semibold items-center mt-10 ml-4"
                onClick={() => {
                  document.body.style.overflow = "auto";
                  goBack();
                }}
              >
                <IoArrowBackSharp />
            Ashutosh
              </div>
            )}
          </div> */}

          {/* <h2 className="font-extrabold   font-mono flex cursor-pointer justify-left text-2xl items-center mt-12 ml-4">
            Ashutosh Anand Tiwari
          </h2> */}

          <div className="flex lg:gap-8 gap-10 space-x-6 mt-10 items-center ">
            <Link
              href="/"
              className="md:text-xl  text-base font-extrabold flex items-center font-mono relative "
            >
              <FaHome />
              {activePath == "" && (
                <LuMousePointerClick className="absolute   top-[20px] left-[20px] text-2xl text-gray-600" />
              )}
            </Link>

            <Link
              href="/tech"
              id="tech-link"
              className="md:text-xl text-base font-light font-mono relative "
            >
              tech{" "}
              {activePath == "tech" && (
                <LuMousePointerClick className="absolute  top-[20px] left-[20px] text-2xl text-gray-600" />
              )}
            </Link>

            <Link
              id="notes-link"
              href="/tech/notes"
              className="md:text-xl text-base font-light font-mono relative"
            >
              tech/notes{" "}
              {activePath == "notes" && (
                <LuMousePointerClick className="absolute  top-[20px] left-[20px] text-2xl text-gray-600" />
              )}
            </Link>
            <Link
              href="/blogs"
              id="blogs-link"
              className="md:text-xl text-base font-light font-mono relative"
            >
              blogs{" "}
              {activePath == "blogs" && (
                <LuMousePointerClick className="absolute  top-[20px] left-[20px] text-2xl text-gray-600" />
              )}
            </Link>

            <Link
              id="travel-link"
              href="/travel"
              className="md:text-xl text-base font-light font-mono  relative"
            >
              travel
              {activePath == "travel" && (
                <LuMousePointerClick className="absolute  top-[20px] left-[20px] text-2xl text-gray-600" />
              )}
            </Link>
            <Link
              href="/misc"
              id="misc-link"
              className="md:text-xl text-base  font-light font-mono pr-5 relative"
            >
              {" "}
              more{" "}
              {["misc", "town"].includes(activePath) && (
                <LuMousePointerClick className="absolute top-[20px] left-[20px] text-2xl text-gray-600" />
              )}
            </Link>

            <div
              onClick={() => {
                console.log("isSupportBtnActive");
                setIsSupportBtnActive(true);
              }}
              className="md:text-xl text-base   font-mono relative bg-orange-500 px-4 cursor-pointer  font-extrabold rounded-2xl text-wrap text-white"
            >
              SUPPORT
            </div>
          </div>
        </div>
        <hr />

        <div className="flex md:hidden justify-between  bg-gradient-to-l relative from-[#f3d581] to-[#efeff1] text-black text-2xl w-full   h-12 items-center mt-10 pr-4 px-1">
          <h2 className="italic font-extrabold px-2"></h2>
          <GiHamburgerMenu
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </div>

        <MobileNaveBar
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          activePath={activePath}
        />
        {isSupportBtnActive && <Support active={isSupportBtnActive} setIsSupportBtnActive={setIsSupportBtnActive}/>}
      </nav>
    </>
  );
}

export default Navbar;

const MobileNaveBar = ({ isOpen, setIsOpen, activePath }) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav
      className={`fixed top-0 left-0 w-[55%] h-full bg-[#efeff1] z-40 transform  ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:hidden`}
    >
      <div className="flex justify-end text-black border">
        <IoMdClose
          onClick={toggleMenu}
          className=" text-black absolute top-2 right-5"
        />
      </div>
      <div className="flex flex-col p-4 gap-6 ">
        <Link
          href="/"
          onClick={toggleMenu}
          className="text-2xl py-2 font-semibold border-b-2"
        >
          Home
          {activePath == "" && (
            <LuMousePointerClick className="inline text-orange-600 ml-2" />
          )}
        </Link>
        <Link
          href="/tech"
          onClick={toggleMenu}
          className="text-2xl py-2 font-semibold border-b-2"
        >
          Tech
          {activePath == "tech" && (
            <LuMousePointerClick className="inline text-orange-600 ml-2" />
          )}
        </Link>
        <Link
          href="/blogs"
          onClick={toggleMenu}
          className="text-2xl py-2 font-semibold border-b-2"
        >
          Blogs
          {activePath == "blogs" && (
            <LuMousePointerClick className="inline text-orange-600 ml-2" />
          )}
        </Link>

        <Link
          href="/tech/notes"
          className="text-2xl py-2 font-semibold border-b-2"
        >
          tech/notes{" "}
          {activePath == "notes" && (
            <LuMousePointerClick className="absolute  top-[20px] left-[20px] text-2xl text-orange-600" />
          )}
        </Link>

        <Link
          href="/travel"
          onClick={toggleMenu}
          className="text-2xl py-2 font-semibold border-b-2"
        >
          Travel
          {activePath == "travel" && (
            <LuMousePointerClick className="inline text-orange-600 ml-2" />
          )}
        </Link>
        <Link
          href="/misc"
          onClick={toggleMenu}
          className="text-2xl py-2 font-semibold border-b-2"
        >
          More
          {["misc", "town"].includes(activePath) && (
            <LuMousePointerClick className="inline text-orange-600 ml-2" />
          )}
        </Link>
      </div>
    </nav>
  );
};

// <Image
//             className="font-extrabold   font-mono flex cursor-pointer justify-left text-2xl items-center h-17 mt-10 ml-4 top-6 s"
//             src={"https://i.ibb.co/59hJ4PV/logo2.jpg"}
//             height={"50"}
//             width={"200"}
//             alt="Ashutosh-logo"
//           />

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
      <nav className="   ">
        <nav
          style={{
            backgroundColor: isScrolledUp ? "black" : "#f6f5f1",
            color: isScrolledUp ? "white" : "black",
          }}
          className="md:flex justify-between  hidden  gap-6  w-full items-center relative   py-1 px-10      font-mono "
        >
          <Link href="/">
            {" "}
            <Image
              className="font-extrabold   font-mono flex cursor-pointer justify-left text-2xl items-center  ml-4 "
              src={"https://i.ibb.co/59hJ4PV/logo2.jpg"}
              height={"36"}
              width={"200"}
            />
          </Link>
          <div className="flex lg:gap-8 gap-10 space-x-6  items-center ">
            {/* <Link
              href="/"
              className="md:text-xl  text-base font-extrabold flex items-center font-mono relative "
            >
              <FaHome />
              {activePath == "" && (
                <LuMousePointerClick className="absolute   top-[20px] left-[20px] text-2xl text-gray-600" />
              )}
            </Link> */}

            <Link
              href="/tech"
              id="tech-link"
              className="md:text-xl text-base font-light font-mono relative "
            >
              Tech{" "}
              {activePath == "tech" && (
                <LuMousePointerClick className="absolute  top-[20px] left-[20px] text-2xl text-gray-600" />
              )}
            </Link>

            <Link
              id="notes-link"
              href="/digital-garden"
              className="md:text-xl text-base flex items-center font-light font-mono relative text-green-600"
            >
              <img
                width="40"
                height="40"
                className="-mt-2"
                src="https://media3.giphy.com/media/fkoLF0dzaiNL6a1f2s/giphy.gif?cid=6c09b9529bocknrq68ifba6hwawfagtyld7j518t8lqfp7g4&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
              />
              Digital Garden{" "}
              {/* {activePath == "digital-garden" && (
                <LuMousePointerClick className="absolute  top-[20px] left-[20px] text-2xl text-gray-600" />
              )} */}
            </Link>
            {/* <Link
              href="/blog"
              id="blogs-link"
              className="md:text-xl text-base font-light font-mono relative"
            >
              blogs{" "}
              {activePath == "blog" && (
                <LuMousePointerClick className="absolute  top-[20px] left-[20px] text-2xl text-gray-600" />
              )}
            </Link> */}

            <Link
              id="travel-link"
              href="/travel"
              className="md:text-xl text-base font-light font-mono  relative"
            >
              Travel
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
              More{" "}
              {["misc", "town"].includes(activePath) && (
                <LuMousePointerClick className="absolute top-[20px] left-[20px] text-2xl text-gray-600" />
              )}
            </Link>

            {/* <div
              onClick={() => {
                console.log("isSupportBtnActive");
                setIsSupportBtnActive(true);
              }}
              className="md:text-xl text-base   font-mono relative bg-orange-500 px-4 cursor-pointer  font-extrabold rounded-2xl text-wrap text-white"
            >
              SUPPORT
            </div> */}
          </div>
        </nav>
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
        {isSupportBtnActive && (
          <Support
            active={isSupportBtnActive}
            setIsSupportBtnActive={setIsSupportBtnActive}
          />
        )}
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
      className={`fixed top-0 left-0 w-[55%] h-full bg-white  z-40 transform  ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:hidden`}
    >
      <div className="flex justify-end text-black ">
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
          href="/digital-garden"
          className="text-2xl py-2 font-semibold border-b-2"
        >
          /🌱 digital garden{" "}
          {activePath == "digital-garden" && (
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

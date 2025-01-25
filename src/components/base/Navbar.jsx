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
      <nav className="max-w-7xl mx-auto border-none">
        <nav
          style={{
            backgroundColor: isScrolledUp
              ? "rgba(0, 0, 0, 0.95)"
              : "rgba(241, 253, 245, 0.98)",
            color: isScrolledUp ? "white" : "black",
          }}
          className="hidden md:flex max-w-7xl justify-between max-w-8xl mx-auto border-none 
            backdrop-blur-sm transition-all duration-300 ease-in-out
            sticky top-0 z-50 py-3 px-8  "
        >
          <Link href="/" className="relative group">
            <Image
              alt="logo-image"
              className="font-extrabold transition-transform duration-300 group-hover:scale-105"
              src="https://i.ibb.co/rsdxbfD/looooooogo.jpg"
              height={36}
              width={130}
            />
          </Link>

          <div className="flex items-center gap-8">
            {[
              { href: "/blog", label: "blog" },
              { href: "/tech", label: "tech" },
              { 
                href: "/tech/products",
                label: (
                  <span className="flex items-center text-purple-600 font-medium">
                    <span className="animate-pulse mr-1">🚀</span>
                    products
                  </span>
                )
              },
              {
                href: "/digital-garden",
                label: (
                  <span className="flex items-center text-green-600">
                    <img
                      width="40"
                      height="40"
                      alt="digital-garden"
                      className="-mt-2"
                      src="https://media3.giphy.com/media/fkoLF0dzaiNL6a1f2s/giphy.gif?cid=6c09b9529bocknrq68ifba6hwawfagtyld7j518t8lqfp7g4&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                    />
                    Digital Garden
                  </span>
                ),
              },
              { href: "/travel", label: "travel" },
              { href: "/misc", label: "&more" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative group text-lg font-light transition-colors duration-300
                  hover:text-green-600 ${
                    (activePath === item.href.split("/")[1] || router.asPath === item.href)
                      ? "text-green-600"
                      : ""
                  }`}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 
                  group-hover:scale-x-100 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        </nav>

        <hr />

        <div className="flex md:hidden justify-between  bg-gradient-to-l relative  text-black text-2xl w-full   h-12 items-center  pr-4 px-1">
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
  const router = useRouter();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-30 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Navigation Menu */}
      <nav
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[90%] max-w-[400px] rounded-2xl bg-white/95 backdrop-blur-md
          shadow-2xl z-40 transform transition-all duration-500 ease-out
          ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0 pointer-events-none"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full 
            flex items-center justify-center shadow-lg hover:bg-red-600 
            transition-colors duration-300"
        >
          <IoMdClose className="text-white text-xl" /> X
        </button>

        {/* Menu Items */}
        <div className="flex flex-col p-6 gap-4">
          {[
            { href: "/", label: "home", path: "" },
            { href: "/blog", label: "blog", path: "blog" },
            { href: "/tech", label: "tech", path: "tech" },
            { 
              href: "/tech/products", 
              label: "🚀 products",
              path: "tech/products",
              highlight: true
            },
            {
              href: "/digital-garden",
              label: "🌱 Digital Garden",
              path: "digital-garden",
            },
            { href: "/travel", label: "travel", path: "travel" },
            { href: "/misc", label: "&more", path: ["misc", "town"] },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={toggleMenu}
              className={`relative overflow-hidden group p-3 rounded-lg
                transition-all duration-300 ease-out
                ${
                  router.asPath === item.href
                    ? "bg-green-50 text-green-800"
                    : item.highlight
                    ? "bg-purple-50 text-purple-800 animate-pulse"
                    : "hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{item.label}</span>
                {(router.asPath === item.href) && (
                  <LuMousePointerClick className="text-green-600 text-xl" />
                )}
              </div>
              <div
                className={`absolute bottom-0 left-0 w-full h-0.5 
                ${item.highlight ? 'bg-purple-500' : 'bg-green-500'}
                transform scale-x-0 group-hover:scale-x-100 
                transition-transform duration-300`}
              />
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

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
      if (window.scrollY > 100) {
        setIsScrolledUp(true);
      } else {
        setIsScrolledUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="w-full fixed top-0 z-50">
        {/* Desktop Navigation */}
        <div className={`hidden md:block transition-all duration-500 ${
          isScrolledUp ? 'bg-white/90 backdrop-blur-md shadow-lg before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_100%_100%,rgba(0,0,255,0.15),transparent_50%)] before:z-[-1] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_0%_0%,rgba(238,174,202,0.1),transparent_50%)] after:z-[-1] bg-[url("/noise.png")] bg-repeat' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="relative group">
                <Image
                  alt="logo-image"
                  className="transition-transform duration-300 group-hover:scale-105"
                  src="https://i.ibb.co/rsdxbfD/looooooogo.jpg"
                  height={36}
                  width={130}
                />
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-8">
                {[
                  { href: "/blog", label: "Blog" },
                  { href: "/tech", label: "Tech" },
                  { 
                    href: "/tech/products",
                    label: (
                      <span className="flex items-center text-indigo-600 font-medium">
                        <span className="mr-1">🚀</span>
                        Products
                      </span>
                    )
                  },
                  {
                    href: "/digital-garden",
                    label: (
                      <span className="flex items-center text-emerald-600 font-medium">
                        <span className="mr-1">🌱</span>
                        Digital Garden
                      </span>
                    )
                  },
                  { href: "/travel", label: "Travel" },
                  { href: "/misc", label: "More" }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative group px-3 py-2 text-[15px] font-medium tracking-wide
                      ${(activePath === item.href.split("/")[1] || router.asPath === item.href)
                        ? 'text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600'
                      } transition-colors duration-200`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transform origin-left scale-x-0
                      transition-transform duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)] 
                      ${(activePath === item.href.split("/")[1] || router.asPath === item.href)
                        ? 'scale-x-100'
                        : 'group-hover:scale-x-100'
                      }`} 
                    />
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transform origin-left scale-x-0
                      transition-transform duration-500 ease-out delay-75 opacity-50 blur-sm
                      ${(activePath === item.href.split("/")[1] || router.asPath === item.href)
                        ? 'scale-x-100'
                        : 'group-hover:scale-x-100'
                      }`} 
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-between bg-white/90 backdrop-blur-md shadow-md px-4 py-3">
          <Link href="/" className="relative group">
            <Image
              alt="logo-image"
              className="transition-transform duration-300 group-hover:scale-105"
              src="https://i.ibb.co/rsdxbfD/looooooogo.jpg"
              height={36}
              width={130}
            />
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <GiHamburgerMenu className="text-2xl" />
          </button>
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
          ${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none"}`}
      >
        <button
          onClick={toggleMenu}
          className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full 
            flex items-center justify-center shadow-lg hover:bg-red-600 
            transition-colors duration-300"
        >
          <IoMdClose className="text-white text-xl" />
        </button>

        <div className="flex flex-col p-6 gap-4">
          {[
            { href: "/", label: "Home", path: "" },
            { href: "/blog", label: "Blog", path: "blog" },
            { href: "/tech", label: "Tech", path: "tech" },
            { 
              href: "/tech/products", 
              label: "🚀 Products",
              path: "tech/products",
              highlight: true
            },
            {
              href: "/digital-garden",
              label: "🌱 Digital Garden",
              path: "digital-garden",
            },
            { href: "/travel", label: "Travel", path: "travel" },
            { href: "/misc", label: "More", path: ["misc", "town"] },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={toggleMenu}
              className={`relative overflow-hidden group p-3 rounded-lg
                transition-all duration-300 ease-out
                ${router.asPath === item.href
                  ? "bg-indigo-50 text-indigo-800"
                  : item.highlight
                  ? "bg-purple-50 text-purple-800"
                  : "hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{item.label}</span>
                {router.asPath === item.href && (
                  <LuMousePointerClick className="text-indigo-600 text-xl" />
                )}
              </div>
              <div
                className={`absolute bottom-0 left-0 w-full h-0.5 
                ${item.highlight ? 'bg-purple-500' : 'bg-indigo-500'}
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

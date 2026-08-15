import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/router";
import ThemeToggle from "./ToogleDarkModeButton";


function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const [hireText, setHireText] = useState("Hire me for your work");

  useEffect(() => {
    // Check system preference initially
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const texts = [
      "Hire me for your work",
      "Review your resume", 
      "Practice Interviews",
      "Career guidance",
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setHireText(texts[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { href: "/blog", label: "Blogs" },
    { href: "/tech", label: "Tech" },
    { href: "/product", label: "Products" },
    { href: "/digital-garden", label: "Digital Garden ft. Notes", isSpecial: true },
    { href: "/travel", label: "Travel" },
    { href: "/misc", label: "More" }
  ];

  const isGardenNavActive =
    router.pathname === "/digital-garden" ||
    router.pathname.startsWith("/digital-garden/") ||
    router.pathname.startsWith("/blog");

  function renderNavLabel(item, mobile = false) {
    if (!item.isSpecial) return item.label;
    return (
      <span className={`nav-garden-chip ${mobile ? "nav-garden-chip-mobile" : ""}`}>
        <span className="nav-garden-chip-inner">
          <span className="nav-garden-chip-dot" aria-hidden="true" />
          <span className="nav-garden-chip-text">{item.label}</span>
        </span>
      </span>
    );
  }

  // Check if current route is shadi-invite
  const isShadiInvitePage = router.pathname?.includes('shadi-invite') || router.asPath?.includes('shadi-invite');

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
        : 'bg-transparent'
    } ${isShadiInvitePage ? 'opacity-0 pointer-events-none' : ''}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
             <div className="flex items-center gap-2">
              <div className="relative">
                <Image 
                  width={40}
                  height={40}
                  src="https://avatars.githubusercontent.com/u/40313523?v=4"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500 transition-transform duration-200 hover:scale-110"
                />
              </div>
              <div 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push("/product");
                }}
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-[160px] border-indigo-500 bg-transparent backdrop-blur-md transition-colors duration-150 hover:bg-accent-foreground hover:text-white cursor-pointer`}>
                <div className="mr-1 flex aspect-square h-[14px] w-[14px] animate-pulse rounded-full bg-green-500/50 dark:bg-green-400/50 sm:m-0 md:mr-1" aria-hidden="true">
                  <div className="m-auto h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"></div>
                </div>
                <div className="relative overflow-hidden h-[20px] flex items-center">
                  <span 
                    className="text-gray-800 dark:text-gray-200 whitespace-nowrap"
                  >
                    {hireText}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.isSpecial
                    ? "inline-flex transition-transform duration-200 hover:scale-[1.02]"
                    : `text-base font-medium transition-colors duration-200 ${
                        router.pathname === item.href ||
                        (item.href !== "/" && router.pathname.startsWith(item.href))
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                      }`
                }
                aria-current={item.isSpecial && isGardenNavActive ? "page" : undefined}
              >
                {renderNavLabel(item)}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <ThemeToggle/>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle/>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? (
                <IoMdClose className="w-7 h-7" />
              ) : (
                <HiMenuAlt3 className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 transition-all duration-500 ease-in-out transform ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="h-full flex flex-col">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-600 dark:text-gray-300"
          >
            <IoMdClose className="w-6 h-6" />
          </button>
          
          <div className="flex-1 flex flex-col justify-center items-center space-y-8 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.isSpecial
                    ? "inline-flex transition-transform duration-300 transform hover:scale-105"
                    : `text-center w-full py-4 text-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        router.pathname === item.href
                          ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg"
                          : "text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                      }`
                }
                onClick={() => setIsOpen(false)}
              >
                {renderNavLabel(item, true)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import Link from "next/link";
import React, {  useEffect, useState } from "react";
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
        <div className="flex justify-between  w-full items-center relative">
          <div>
            {router?.pathname?.split("/").length > 2 && (
              <div
                className="flex cursor-pointer justify-left font-semibold items-center mt-10 ml-4"
                onClick={() => {
                  goBack();
                }}
              >
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
              className="text-xl  font-extrabold font-mono pr-5 relative"
            >
              {" "}
              /more{" "}
              {activePath == "misc" ||
                (activePath == "town" && (
                  <LuMousePointerClick className="absolute top-[20px] left-[20px] text-2xl text-orange-600" />
                ))}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

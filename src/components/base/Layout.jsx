import React from "react";
import Breadcrumb from "../ui/Breadcrumb";

function Layout({ children }) {
  return (
    <div className="w-full absolute top-10 z-[-2] m-auto h-full left-0 right-0  bg-[#f1fdf5] max-w-screen-2xl p-2 lg:p-[60px] ">
      {/* <Breadcrumb/> */}
      <div className="container max-w-none mx-auto lg:p-0 px-4 h-full ">
        {children}
      </div>
    </div>
  );
}

export default Layout;

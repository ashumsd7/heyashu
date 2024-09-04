import React from "react";

function Layout({ children }) {
  return (
    <div className="w-full absolute top-10 z-[-2] m-auto h-full left-0 right-0  bg-[#f6f5f1] max-w-screen-2xl p-2 lg:p-[60px] ">
      <div className="container max-w-none mx-auto lg:p-0 px-4 h-full">{children}</div>
    </div>
  );
}

export default Layout;

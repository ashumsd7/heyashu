import React from "react";

function Layout({ children }) {
  return (
    <div className="w-full absolute top-10 z-[-2] m-auto max-w-screen-2xl p-2 lg:p-[60px] ">
      {children}
    </div>
  );
}

export default Layout;

import React from "react";

function Layout({ children }) {
  return (
    <div className="w-full absolute top-10 z-[-2] m-auto left-0 right-0  max-w-screen-2xl p-2 lg:p-[60px] ">
      <div className="container max-w-none mx-auto p-0">{children}</div>
    </div>
  );
}

export default Layout;

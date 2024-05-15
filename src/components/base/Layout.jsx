import React from "react";

function Layout({ children }) {
  return (
    <div className="px-4 md:px-2  w-full m-auto max-w-screen-xl relative">
      {children}
    </div>
  );
}

export default Layout;

import React from "react";

function Layout({ children }) {
  return (
    <div className="w-full absolute top-10 z-[-2] m-auto h-full left-0 right-0    max-w-screen-2xl p-2 lg:p-[60px]">
      {/* Glow Effect */}
      <div className="fixed inset-0 z-[-1] opacity-10 overflow-hidden pointer-events-none">
        <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-green-400 dark:bg-green-600 rounded-full blur-3xl -top-20 -left-20 animate-blob"></div>
        <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-blue-400 dark:bg-blue-600 rounded-full blur-3xl top-1/2 right-20 animate-blob animation-delay-2860"></div>
        <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-purple-400 dark:bg-purple-600 rounded-full blur-3xl bottom-20 left-1/2 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container max-w-none mx-auto lg:p-0 px-[4px] h-full">
        {children}
      </div>
    </div>
  );
}

export default Layout;

import React, { Children } from "react";

function ClassicPageLayout({
  heading,
  desc,
  longDesc,
  customTopContent,
  customBottomContent,
  children,
}) {
  return (
    <div className="mt-10 md:mt-20 mb-10">
      <div className="bg-[#f6f5f1] text-[#353534] flex flex-col  ">
        <h1 className="md:text-[80px] text-[40px] font-bold mb-2 ">
          {heading}
        </h1>
      </div>

      {desc && (
        <div>
          <p className="md:text-[36px]  text-[22px]  text-[#353534] font-light md:pl-[120px] pl-[40px] ">
            {desc}
          </p>
        </div>
      )}

      {longDesc && (
        <div>
          <p className="md:text-[36px]  text-[22px]  text-[#353534] font-light md:pl-[120px] pl-[40px] ">
            {longDesc}
          </p>
        </div>
      )}

      {customTopContent && <div>{customTopContent}</div>}

      {children && (
        <div className=" grid grid-cols-1  md:grid-cols-3 gap-6 my-10 md:pl-[120px]  justify-center">
          {children}
        </div>
      )}
      {customBottomContent && <div>{customBottomContent}</div>}
    </div>
  );
}

export default ClassicPageLayout;

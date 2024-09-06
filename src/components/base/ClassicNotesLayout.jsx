import React, { Children } from "react";

function ClassicPageLayout({
  heading,
  desc,
  longDesc,
  customTopContent,
  customBottomContent,
  children,
  noGrid = false,
  rightCTA
}) {
  return (
    <div className="mt-5 md:mt-10 ">
      <div className="bg-[#f6f5f1] text-[#353534] flex justify-between  items-center flex-wrap ">
        <h1 className="md:text-[80px] text-[40px]  font-bold  ">{heading}</h1>
        {rightCTA}
      </div>

      <div className="md:pl-[127px] mt-4 md:mt-0">
        {desc && (
          <div className="-mt-1">
            <p className="md:text-[36px]  text-[22px]  text-[#353534] font-light  ">
              {desc}
            </p>
          </div>
        )}

        {longDesc && (
          <div>
            <p className="md:text-[22px] mt-1  text-[18px]  text-[#353534] font-light  ">
              {longDesc}
            </p>
          </div>
        )}

        {customTopContent && <div>{customTopContent}</div>}

        {children && !noGrid && (
          <div className=" grid grid-cols-1  md:grid-cols-3 gap-6 my-10   justify-center">
            {children}
          </div>
        )}
        {children && noGrid && (
          <div className="  my-6  justify-center">
            {children}
          </div>
        )}
        {customBottomContent && <div>{customBottomContent}</div>}
      </div>
    </div>
  );
}

export default ClassicPageLayout;

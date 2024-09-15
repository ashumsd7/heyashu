import React, { useState } from "react";
import { MdOutlineGridView } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import ListView from "../ui/ListView";
function ClassicPageLayout({
  heading,
  desc,
  longDesc,
  customTopContent,
  customBottomContent,
  children,
  noGrid = false,
  rightCTA,
  data,
  labelKey,
  showSwitcher=false

}) {
  const [listView, setListView] = useState(false);
  return (
    <div className="mt-1 md:mt-10 ">
      <div className="bg-[#f6f5f1] text-[#353534] flex justify-between  items-center flex-wrap ">
        <h1 className="md:text-[80px] text-[40px]  font-bold  ">{heading}</h1>
        {rightCTA}
      </div>

      <div className="md:pl-[127px] mt-4 md:mt-0">
        {desc && (
          <div className="-mt-1 flex justify-between flex-wrap">
            <p className="md:text-[32px]  text-[22px]  text-[#353534] font-light  ">
              {desc}
            </p>

            {showSwitcher && <div className="text-2xl cursor-pointer" title="Switch View">
              {listView ? (
                <MdOutlineGridView
                  onClick={() => {
                    setListView(!listView);
                  }}
                />
              ) : (
                <CiViewList
                  onClick={() => {
                    setListView(!listView);
                  }}
                />
              )}
            </div>}
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

        {children && !noGrid && !listView ? (
          <div className=" grid grid-cols-1   lg:grid-cols-2 xl:grid-cols-3 gap-6 my-10   justify-center">
            {children}
          </div>
        ) : (
          <div className={listView && 'mt-10'}><ListView labelKey={labelKey} data={data} /></div>
        )}
        {children && noGrid && (
          <div className="  my-6  justify-center">{children}</div>
        )}
        {customBottomContent && <div>{customBottomContent}</div>}
      </div>
    </div>
  );
}

export default ClassicPageLayout;

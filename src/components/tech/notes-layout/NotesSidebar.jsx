import ProgressBar from "@/components/base/ProgressBar";
import ls from "local-storage";
import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const NotesSidebar = ({
  onSectionClick,
  contentListTitle = "Namaste Node JS (S1)",
  contentListTitle2 = "Namaste Node JS (S2)",
  data,
  data2 = [],
  eachCardPrefix,
  progress,
  showProgress = true,
  storedValues,
  selectedSection,
  show2ndSection,
}) => {
  const [isSec1Visible, setIsSec1Visible] = useState(true);
  const [isSec2Visible, setIsSec2Visible] = useState(show2ndSection);
  return (
    <>
      <SectionHeader
        isSec1Visible={isSec1Visible}
        setIsSec1Visible={setIsSec1Visible}
        contentListTitle={contentListTitle}
      />
      {isSec1Visible && (
        <div className="space-y-4  overflow-y-auto mb-[300px] min-h-[500px] h-full p-4">
          <>
            <div className="flex flex-col gap-2 justify-between items-center ">
              {/* <p className=" font-mono text-gray-600 ">{contentListTitle}</p> */}
              {showProgress && <ProgressBar percentage={progress} />}
            </div>

            {data?.map((item, idx) => {
              return (
                <ListContent
                  item={item}
                  idx={idx}
                  storedValues={storedValues}
                  onSectionClick={onSectionClick}
                  selectedSection={selectedSection}
                  eachCardPrefix={eachCardPrefix}
                />
              );
            })}
          </>
        </div>
      )}
      <hr />
      {JSON.stringify(show2ndSection)}
      {show2ndSection && <SectionHeader
        isSec1Visible={isSec2Visible}
        setIsSec1Visible={setIsSec2Visible}
        contentListTitle={contentListTitle2}
      />}
      {isSec2Visible && (
        <div className="space-y-4  overflow-y-auto mb-[200px] min-h-[500px] h-full p-4">
          <>
            {data2?.length == 0 && <span>Coming Soon</span>}
            <div className="flex flex-col gap-2 justify-between items-center ">
              {/* <p className=" font-mono text-gray-600 ">{contentListTitle}</p> */}
              {showProgress && <ProgressBar percentage={progress} />}
            </div>

            {data2?.map((item, idx) => {
              return (
                <ListContent
                  item={item}
                  idx={idx}
                  storedValues={storedValues}
                  onSectionClick={onSectionClick}
                  selectedSection={selectedSection}
                  eachCardPrefix={eachCardPrefix}
                />
              );
            })}
          </>
        </div>
      )}
    </>
  );
};

export default NotesSidebar;

const SectionHeader = ({
  isSec1Visible,
  setIsSec1Visible,
  contentListTitle,
}) => {
  return (
    <div
      className="flex justify-between  mb-4 items-center  rounded-xl px-4 cursor-pointer"
      onClick={() => {
        setIsSec1Visible(!isSec1Visible);
      }}
    >
      {" "}
      <h2 className="text-xl   w-[270px] font-extrabold font-sans mt-4 text-gray-800   truncate max-w-[300px] text-center  md:text-left ">
        {contentListTitle}
      </h2>
      {!isSec1Visible ? (
        <FaChevronDown className="mt-3 text-gray-800" />
      ) : (
        <FaChevronUp className="mt-3 text-gray-800" />
      )}
    </div>
  );
};

const ListContent = ({
  item,
  idx,
  storedValues,
  onSectionClick,
  selectedSection,
  eachCardPrefix,
}) => {
  return (
  <>
  {/* <div className="h-[100vh] w-[100vw] bg-gray-500 absolute top-[-200px] left- z-[19] opacity-5">ss</div> */}
      <div
      key={idx}
      className={`cursor-pointer border-b text-[14px] hover:bg-[#f1b565] border-b-gray-300 p-1 w-[270px] z-[20] bg-[#f6f5f1]    rounded-sm relative  ${
        storedValues && storedValues[item?.name]
          ? "border-0 border-l-8 border-green-500 bg-gradient-to-r from-gray-100 to-[#f6f5f1] "
          : "border-0 border-l-8 border-gray-500 "
      } ${
        selectedSection?.title == item?.title &&
        "  font-bold from-gray-300 to-[#f6f5f1] "
      } ${!item?.publishedOn && "cursor-none pointer-events-none  opacity-40"}`}
      onClick={() => onSectionClick(item)}
    >
      {item.episode == -1 ? (
        <h3 className=" -ml-0 flex items-center  gap-2 pl-3">Prerequisite</h3>
      ) : (
        <h3 className=" flex items-center gap-2 pl-3">
          {!eachCardPrefix ? (
            <>
              <p className=" pl-3 truncate font-medium">{item?.name} </p>
            </>
          ) : (
            <>
              {eachCardPrefix}
              {item.episode}
            </>
          )}
        </h3>
      )}
      {eachCardPrefix && (
        <p className=" pl-3 truncate  font-medium">{item?.name}</p>
      )}
    </div>
  </>
  );
};
// Tick mark code

// {storedValues && storedValues[item?.name] && (
//   <IoIosCheckmarkCircle className="text-green-500  absolute top-[22px] right-[6px]" />
// )}{" "}

import ProgressBar from "@/components/base/ProgressBar";
import ls from "local-storage";
import { Scrollbars } from "react-custom-scrollbars-2";
const NotesSidebar = ({
  onSectionClick,
  contentListTitle = "Namaste Node JS (S1)",
  data,
  eachCardPrefix,
  progress,
  showProgress = true,
  storedValues,
  selectedSection,
}) => {
  return (
    <>
      <div className="flex justify-center  mb-4  rounded-xl px-4">
        {" "}
        <h2 className="text-xl font-extrabold font-sans mt-4 text-gray-800   truncate max-w-[300px] text-center  md:text-left ">
          {contentListTitle}
        </h2>
      </div>
      <div className="flex  px-4 flex-col gap-2 justify-between items-center ">
        {/* <p className=" font-mono text-gray-600 ">{contentListTitle}</p> */}
        {showProgress && <ProgressBar percentage={progress} />}
      </div>

      <div className="space-y-4  overflow-y-auto mb-[200px]  h-full p-4">
        {data?.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`cursor-pointer border-b text-[14px] hover:bg-[#f1b565] border-b-gray-300 p-1 w-[270px] bg-[#f6f5f1] border   rounded-sm relative  ${
                storedValues && storedValues[item?.name]
                  ? "border-0 border-l-8 border-green-500 bg-gradient-to-r from-gray-100 to-[#f6f5f1] "
                  : "border-0 border-l-8 border-gray-500 "
              } ${
                selectedSection?.title == item?.title &&
                "  font-bold from-gray-300 to-[#f6f5f1] "
              } ${
                !item?.publishedOn &&
                "cursor-none pointer-events-none  opacity-40"
              }`}
              onClick={() => onSectionClick(item)}
            >
              {item.episode == -1 ? (
                <h3 className=" -ml-0 flex items-center  gap-2 pl-3">
                  Prerequisite
                </h3>
              ) : (
                <h3 className=" flex items-center gap-2 pl-3">
                  {!eachCardPrefix ? (
                    <>
                      <p className=" pl-3 truncate font-medium">
                        {item?.name}{" "}
                      </p>
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
          );
        })}
      </div>
    </>
  );
};

export default NotesSidebar;

// Tick mark code

// {storedValues && storedValues[item?.name] && (
//   <IoIosCheckmarkCircle className="text-green-500  absolute top-[22px] right-[6px]" />
// )}{" "}

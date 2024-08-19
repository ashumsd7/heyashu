import ProgressBar from "@/components/base/ProgressBar";
// import { IoIosCheckmarkCircle } from "react-icons/io";
import ls from "local-storage";
const NotesSidebar = ({
  onSectionClick,
  SidebarTitle = "Namaste Node JS (S1)",
  data,
  eachCardPrefix = "Episode-",
  progress,
  showProgress = true,
  storedValues,
  selectedSection,
  noEpisodes = false,
}) => {
  return (
    <div className="w-[1/4]  lg:block hidden  pb-[200px] h-full shadow-2xl  fixed -mt-12 ">
      <div className="flex justify-center bg-gradient-to-b from-yellow-100 to-[#efeff1] mb-4  rounded-3xl">
        {" "}
        <h1 className="text-2xl font-sans mt-2 font-extrabold text-center text-gray-800 md:text-left  mb-1 md:mb-0">
          {SidebarTitle}
        </h1>
      </div>
      <div className="flex  px-4 flex-col gap-2 justify-between items-center ">
        {/* <p className="text-sm font-mono text-gray-600 ">{SidebarTitle}</p> */}
        {showProgress && <ProgressBar percentage={progress} />}
      </div>

      <div className="space-y-4  overflow-y-auto mb-[200px]  h-full p-4">
        {data?.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`cursor-pointer p-2 w-[270px] bg-gray-300 border  hover:bg-gray-400 rounded-sm relative ${
                selectedSection?.id == item?.id &&
                "bg-gradient-to-r from-yellow-300 to-[#efeff1] text-black"
              } ${
                storedValues && storedValues[item?.name]
                  ? "border-0 border-l-8 border-green-500 bg-gradient-to-r from-yellow-300 to-[#efeff1] "
                  : "border-0 border-l-8 border-gray-500"
              }`}
              onClick={() => onSectionClick(item)}
            >
              {item.episode == 100 ? (
                <h3 className="font-semibold flex items-center gap-2 pl-3">
                  Prerequisite
                </h3>
              ) : (
                <h3 className="font-semibold flex items-center gap-2 pl-3">
                  {noEpisodes ? (
                    <>
                      <p className="text-sm pl-3 truncate">{item?.name}</p>
                    </>
                  ) : (
                    <>
                      {eachCardPrefix}
                      {item.episode}
                    </>
                  )}
                </h3>
              )}
              {!noEpisodes && <p className="text-sm pl-3 truncate">{item?.name}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesSidebar;

// Tick mark code

// {storedValues && storedValues[item?.name] && (
//   <IoIosCheckmarkCircle className="text-green-500  absolute top-[22px] right-[6px]" />
// )}{" "}

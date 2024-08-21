import ProgressBar from "@/components/base/ProgressBar";
import ls from "local-storage";
const NotesSidebar = ({
  onSectionClick,
  contentListTitle = "Namaste Node JS (S1)",
  data,
  eachCardPrefix = "Episode-",
  progress,
  showProgress = true,
  storedValues,
  selectedSection,
  noEpisodes = false,
}) => {
  return (
    <div className="w-[1/4]  lg:block hidden  pb-[200px] h-full shadow-2xl  fixed -mt-6 ">
      <div className="flex justify-center bg-gradient-to-b from-yellow-100 to-[#efeff1] mb-4  rounded-3xl px-4">
        {" "}
        <h1 className="text-2xl font-sans mt-2 font-extrabold truncate max-w-[300px] text-center text-gray-800 md:text-left  mb-1 md:mb-0">
          {contentListTitle}
        </h1>
      </div>
      <div className="flex  px-4 flex-col gap-2 justify-between items-center ">
        {/* <p className="text-sm font-mono text-gray-600 ">{contentListTitle}</p> */}
        {showProgress && <ProgressBar percentage={progress} />}
      </div>

      <div className="space-y-4  overflow-y-auto mb-[200px]  h-full p-4">
        {data?.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`cursor-pointer p-2 w-[270px] bg-gray-300 border  hover:bg-gray-400 rounded-sm relative  ${
                storedValues && storedValues[item?.name]
                  ? "border-0 border-l-8 border-green-500 bg-gradient-to-r from-yellow-300 to-[#efeff1] "
                  : "border-0 border-l-8 border-gray-500"
              } ${selectedSection?.id == item?.id && " bg-black font-bold"} ${
                !item?.publishedOn && "cursor-none pointer-events-none  opacity-40"
              }`}
              onClick={() => onSectionClick(item)}
            >
              {item.episode == 100 ? (
                <h3 className="font-medium ml-2 flex items-center gap-2 pl-3">
                  Prerequisite
                </h3>
              ) : (
                <h3 className=" flex items-center gap-2 pl-3">
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
              {!noEpisodes && (
                <p className="text-sm pl-3 truncate">{item?.name}</p>
              )}
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

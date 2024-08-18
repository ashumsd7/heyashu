
import ProgressBar from "@/components/base/ProgressBar";
import { IoIosCheckmarkCircle } from "react-icons/io";
import ls from "local-storage";
const NotesSidebar = ({
  onSectionClick,
  SidebarTitle = "Season 1",
  data,
  eachCardPrefix = "Episode-",
  progress,
  showProgress = true,
  storedValues,
  selectedSection
}) => {






  return (
    <div className="w-[1/4]  lg:block hidden bg-gray-200 pb-[200px] h-full  fixed -mt-12 rounded-md shadow-md">
      <div className="flex justify-center mb-4">
        {" "}
        <h1 className="text-2xl mt-2 font-extrabold text-center text-orange-600 md:text-left font-serif mb-1 md:mb-0">
          Namaste Node JS
        </h1>
      </div>
      <div className="flex  flex-col gap-2 justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-mono text-gray-600 ">{SidebarTitle}</h2>
        {showProgress && <ProgressBar percentage={progress} />}
      </div>

      <div className="space-y-4  overflow-y-auto mb-[200px]  h-full p-4">
        {data?.map((item, idx) => {
          return (
            <div key={idx}
              className={`cursor-pointer p-2 bg-gray-300 border hover:bg-gray-400 rounded relative ${selectedSection?.id==item?.id && 'bg-gray-800 hover:bg-green-800  text-white'}`}
              onClick={() => onSectionClick(item)}
            >
              <h3 className="font-semibold">
                {eachCardPrefix}
                {item.episode}
              </h3>
              <p className="text-sm truncate">{item?.name}</p>
              {storedValues && storedValues[item?.name] && (
                <IoIosCheckmarkCircle className="text-green-500 absolute top-[-8px] right-[-6px]" />
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesSidebar;


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
}) => {
  //   const storedValues = ls.get(STORAGE_KEY);
  console.log("storedValues", storedValues);


  const matchStorageValue= ()=>{

  }

  return (
    <div className="w-[1/4]  lg:block hidden bg-gray-200 h-full  fixed">
      <div className="flex justify-center mb-4">
        {" "}
        <h1 className="text-2xl  font-extrabold text-center text-orange-600 md:text-left font-serif mb-1 md:mb-0">
          Namaste Node JS
        </h1>
      </div>
      <div className="flex  flex-col gap-2 justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-mono text-gray-600 ">{SidebarTitle}</h2>
        {showProgress && <ProgressBar percentage={progress} />}
      </div>

      <div className="space-y-4  overflow-y-auto mb-[200px]  h-full p-4">
        {data?.map((item) => {
          return (
            <div
              className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded relative"
              onClick={() => onSectionClick(item)}
            >
              <h3 className="font-semibold">
                {eachCardPrefix}
                {item.id - 1}
              </h3>
              <p className="text-sm truncate">{item?.name}</p>
              {/* {storedValues && storedValues[item?.name] && (
                <IoIosCheckmarkCircle className="text-green-500 absolute top-[-8px] right-[-6px]" />
              )} */}
              <IoIosCheckmarkCircle className="text-green-500 absolute top-[-8px] right-[-6px]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesSidebar;

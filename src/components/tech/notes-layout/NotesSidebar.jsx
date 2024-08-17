import ProgressBar from "@/components/base/ProgressBar";
import { IoIosCheckmarkCircle } from "react-icons/io";
import ls from 'local-storage'
const NotesSidebar = ({
  onSectionClick,
  SidebarTitle = "Season 1",
  data,
  eachCardPrefix = "Episode-",
  progress,
  showProgress= true,
  storedValues
}) => {


//   const storedValues = ls.get(STORAGE_KEY);
console.log("storedValues",storedValues);

  return (
    <div className="w-[1/4]  lg:block hidden bg-gray-200 h-full p-4 overflow-y-auto fixed">
      <div className="flex  flex-col gap-2 justify-between items-center mb-4">
        <h2 className="text-orange-600 text-xl font-bold ">{SidebarTitle}</h2>
        {showProgress && <ProgressBar percentage={progress} />}
      </div>

      <div className="space-y-4 mb-20">
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
              {storedValues &&  storedValues[item?.name] && <IoIosCheckmarkCircle className="text-green-500 absolute top-[-8px] right-[-6px]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesSidebar;

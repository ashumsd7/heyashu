import { GiPartyPopper } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import ls from "local-storage";
import { IoIosCheckmarkCircle } from "react-icons/io";
const ProgressBar = ({ percentage = 0 }) => {
  return (
    <>
      {Math.ceil(percentage) == 100 ? (
        <div className="flex gap-2 justify-between w-full items-center font-bold px-2 text-green-700">
          <div className="flex gap-1 items-center">
            <GiPartyPopper className="font-extrabold text-red-500" />
            <IoIosCheckmarkCircle className="text-green-700 " />
            <span>All Read </span>
          </div>
      
          <span
            className="flex justify-center cursor-pointer text-xs underline text-red-400 items-center gap-2"
            onClick={() => {
              ls.clear();
              if(confirm(' ✔️ Storage Reset , Re-load to see changes. Do you want to reload ?')){
                window.location.reload();
              }
            }}
          >
            {" "}
            Reset
            <GrPowerReset />
          </span>
        </div>
      ) : (
        <div className="w-full flex gap-2 items-center">
          <div className="w-full  bg-gray-300 rounded-full h-2 overflow-hidden flex gap-2">
            <div
              className={`h-full text-center text-xs  text-orange-600 font-extrabold transition-all duration-300 ease-out rounded-full ${
                percentage >= 1 ? "bg-green-500 text-orange-600" : "bg-white"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="text-black font-extrabold ">
            {" "}
            {Math.ceil(percentage)}%
          </span>
        </div>
      )}
    </>
  );
};
export default ProgressBar;

import ProgressBar from "@/components/base/ProgressBar";
import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

const { default: Chip } = require("@/components/base/Chip");

const NotesChips = ({
  handleChipClick,
  data,
  value,
  showProgress = true,
  progress = "20",
  storedValues,
}) => {
  const [selectedChip, setSelectedChip] = useState(value);
console.log("storedValues",storedValues);
  return (
    <div className="w-full block lg:hidden overflow-x-auto whitespace-nowrap py-2">
      <div className="flex">
        {data?.map((item) => (
          <span className="relative">
            <Chip
              item={item}
              selectedChip={selectedChip}
              handleChipClick={handleChipClick}
            />
            { storedValues && storedValues[item?.name] && (
              <IoIosCheckmarkCircle className="text-green-500 absolute top-[0px]  left-[2px]" />
            )}
          </span>
        ))}
      </div>
      {showProgress && <ProgressBar percentage={progress} />}
    </div>
  );
};

export default NotesChips;

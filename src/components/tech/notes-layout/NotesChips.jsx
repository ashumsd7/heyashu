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
  SidebarTitle = "Namaste Noe JS",
}) => {
  const [selectedChip, setSelectedChip] = useState(value);
  return (
    <>
      <h1 className="text-2xl    block lg:hidden font-extrabold text-center text-orange-600 md:text-left font-serif mb-1 md:mb-0">
        {SidebarTitle}
      </h1>
      <div className="w-full block lg:hidden overflow-x-auto whitespace-nowrap py-2">
        <div className="flex">
          {data?.map((item, idx) => (
            <span
              className={`relative ${
                !item?.publishedOn &&
                "cursor-none pointer-events-none  opacity-40"
              }`}
              key={idx}
            >
              <Chip
                item={item}
                selectedChip={selectedChip}
                handleChipClick={(data) => {
                  setSelectedChip(data);
                  handleChipClick(data);
                }}
                value={selectedChip}
              />
              {storedValues && storedValues[item?.name] && (
                <IoIosCheckmarkCircle className="text-green-500 absolute top-[0px]  left-[2px]" />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="block lg:hidden mb-2">
        {showProgress && <ProgressBar percentage={progress} />}
      </div>
    </>
  );
};

export default NotesChips;

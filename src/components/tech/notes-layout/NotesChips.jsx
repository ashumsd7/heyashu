import ProgressBar from "@/components/base/ProgressBar";
import { useState } from "react";

const { default: Chip } = require("@/components/base/Chip");

const NotesChips = ({
  handleChipClick,
  data,
  value,
  showProgress = true,
  progress = "20",
  storedValues,
  contentListTitle = "Namaste Noe JS",
}) => {
  const [selectedChip, setSelectedChip] = useState(value);
  return (
    <>
      <h1 className="text-2xl    block lg:hidden font-extrabold text-center text-orange-600 md:text-left font-serif mb-1 md:mb-0">
        {contentListTitle}
      </h1>
      <div className="w-full block lg:hidden overflow-x-auto whitespace-nowrap py-2">
        <div className="flex">
          {data?.map((item, idx) => (
            <span
              className={`relative  ${
                !item?.publishedOn &&
                "cursor-none pointer-events-none  opacity-40"
              }`}
              key={idx}
            >
              <Chip
                className={`${
                  storedValues &&
                  storedValues[item?.name] &&
                  "border border-b-2 border-t-0 border-l-0 border-r-0 border-green-500 "
                }  ${
                  selectedChip?.id === item.id
                    ? "bg-gray-800 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
                item={item}
                selectedChip={selectedChip}
                handleChipClick={(data) => {
                  setSelectedChip(data);
                  handleChipClick(data);
                }}
                value={selectedChip}
              />
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

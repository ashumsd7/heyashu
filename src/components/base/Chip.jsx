import React from "react";

function Chip({item,selectedChip,handleChipClick}) {
  return (
    <div
      key={item.id}
      onClick={() => handleChipClick(item?.id)}
      className={`inline-block px-4 py-2 m-1 text-sm rounded-full cursor-pointer transition-colors ${
        selectedChip === item.id
          ? "bg-gray-800 text-white"
          : "bg-gray-300 text-gray-800"
      }`}
    >
      {item.id < 10 ? `0${item.id - 1}:` : `${item.id - 1}:`} {item.name}
    </div>
  );
}

export default Chip;

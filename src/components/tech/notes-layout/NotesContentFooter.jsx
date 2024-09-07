import React, { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

function NotesContentFooter({ data = [], selectedSection, onSectionClick }) {
  const [nextSection, setNextSection] = useState(undefined);
  const [prevSection, setPrevSection] = useState(undefined);

  useEffect(() => {

    const index = 0;
    data?.map((item, idx) => {
      if (item.id === selectedSection?.id) {
        return idx;
      }
    });

    // more than 0
    if (index > 0 && selectedSection.id !== data.length) {
      setPrevSection(data[index - 1]);
      setNextSection(data[index + 1]);
    }
    // last section
    if (index == data.length) {
      setPrevSection(data[index - 1]);
      setNextSection(undefined);
    }
    if (index == 0) {
      setPrevSection(undefined);
      setNextSection(data[index + 1]);
    }
  }, [selectedSection?.id]);
  return (
    <div className="bg-gray-800 text-white px-2 h-10 flex justify-between ">
      {prevSection ? (
        <div
          className="flex gap-2 items-center text-white cursor-pointer"
          onClick={() => {
            onSectionClick(prevSection);
          }}
        >
          <GrFormPrevious /> {prevSection?.name}
        </div>
      ) : (
        <div></div>
      )}
      {nextSection && (
        <div
          className="flex gap-2 items-center text- justify-end cursor-pointer"
          onClick={() => {
            onSectionClick(nextSection);
          }}
        >
          {nextSection?.name} <MdNavigateNext />
        </div>
      )}
    </div>
  );
}

export default NotesContentFooter;

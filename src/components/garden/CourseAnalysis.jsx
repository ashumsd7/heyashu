import { useState } from "react";
import { ImNewTab } from "react-icons/im";

const CourseAnalysis = ({
  CourseMetaData,
  courseName = "Course Analysis",
  totalEpisodes,
  textDuration,
}) => {
  return (
    <div className="pb-20">
      <h1 className="md:text-[80px] text-[40px]  font-bold  ">Analysis</h1>
      <h1 className="md:text-[40px] text-[28px]  font-bold  ">{courseName}</h1>
      <div className="text-base font-semibold mb-4">
        <p>Total Episodes :{totalEpisodes}</p>
        <p>Total Duration : {textDuration}</p>
      </div>
      <div className="space-y-4">
        {CourseMetaData.map((episode) => (
          <Episode key={episode.episode_num} episode={episode} />
        ))}
      </div>
    </div>
  );
};

// Episode Component
const Episode = ({ episode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timestamps, setTimestamps] = useState(episode.timestamp || []);

  // Handler to add a timestamp

  return (
    <div className="bg-white  rounded-l  py-2 text-[#353534] flex-wrap ">
      <div className="flex justify-between items-center flex-wrap gap-2 ">
        {/* Episode number and name */}
        <div>
          <h2 className="font-semibold  text-sm md:text-xl w-[80%]">
            Episode {episode.episode_num}: {episode.episode_name}{" "}
          </h2>
        </div>

        {/* Episode Duration */}
        <div className="text-right flex flex-col gap-2 ">
          <a
            onClick={() => {
              if (episode.noteslink) {
                window.open(episode.noteslink, "_blank");
              }
            }}
            className="text-green-600 cursor-pointer underline flex gap-1 items-center md:font-semibold font-bold text-xs md:text-base uppercase"
          >
            {episode?.noteslink ? " Read fan Notes" : "Notes: Writing soon"}{" "}
            <ImNewTab className="text-xs text-black" />
          </a>
          <p className=" text-xs md:text-sm font-bold  ">
            Episode Duration:{" "}
            <span className="font-semibold text-base text-green-600">
              {episode.duration}
            </span>
          </p>
        </div>
      </div>

      {/* Accordion for timestamps */}
      {timestamps?.length > 0 ? (
        <div className="">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-green-700   md:font-semibold font-light text-xs md:text-sm "
          >
            {isOpen ? "Hide Timestamps" : "Show Timestamps"}
          </button>
          {isOpen && (
            <div className="mt-2">
              <ul className="list-disc list-inside flex gap-1 flex-col text-[#353534]">
                {timestamps.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="font-light text-gray-600 underline hover:text-blue-500 cursor-pointer">
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <span className="font-mono opacity-65">Adding timestamp soon</span>
      )}
    </div>
  );
};

export default CourseAnalysis;

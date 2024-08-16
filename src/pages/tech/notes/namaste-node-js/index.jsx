import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { MdFullscreen } from "react-icons/md";
import { FaFilePdf, FaDownload } from "react-icons/fa";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
const mockMarkdownContent = `
# Welcome to Season 1
Here is some introductory content for Season 1.

## Section 1
Details about Section 1...

## Section 2
Details about Section 2...
`;

const Sidebar = ({ onSectionClick }) => {
  return (
    <div className="w-[1/4]  lg:block hidden bg-gray-200 h-full p-4 overflow-y-auto fixed">


      <div className="flex justify-between items-center mb-4">
        <h2 className="text-orange-600 text-xl font-bold ">Season 1</h2>
      </div>
      <div className="space-y-4 mb-20">
        {season1Episodes?.map((item) => {
          return (
            <div
              className="cursor-pointer p-2 bg-gray-300 hover:bg-gray-400 rounded"
              onClick={() => onSectionClick("Episode 05")}
            >
              <h3 className="font-semibold">Episode-{item.id - 1}</h3>
              <p className="text-sm truncate">{item?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EpisodeChips = () => {
  const [selectedChip, setSelectedChip] = useState(null);

  const handleChipClick = (id) => {
    setSelectedChip(id);
  };

  return (
    <div className="w-full block lg:hidden overflow-x-auto whitespace-nowrap py-2">
      {season1Episodes.map((episode) => (
        <div
          key={episode.id}
          onClick={() => handleChipClick(episode.id)}
          className={`inline-block px-4 py-2 m-1 text-sm rounded-full cursor-pointer transition-colors ${
            selectedChip === episode.id
              ? "bg-gray-800 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          {episode.id < 10 ? `0${episode.id - 1}:` : `${episode.id - 1}:`}{" "}
          {episode.name}
        </div>
      ))}
    </div>
  );
};

const NamasteNodeJS = () => {
  const [selectedSection, setSelectedSection] = useState("Season 1");
  const [markdownContent, setMarkdownContent] = useState(mockMarkdownContent);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    // Replace with actual content based on section
    setMarkdownContent(mockMarkdownContent);
  };

  // document.body.style.overflow = 'hidden';
  {
    /* <ReactMarkdown>{content}</ReactMarkdown>
      Notes */
  }

  return (
    <>
      <EpisodeChips />
      <div className="flex h-[93vh]">
        {isSidebarVisible && <Sidebar onSectionClick={handleSectionClick} />}
        <div className={`lg:w-3/4 w-full justify-center fle bg-white h-screen  overflow-y-auto ml-auto ${isSidebarVisible ? 'w-3/4' : 'w-full'}`}
   
        >
          <div className="bg-orange-600 h-10 flex items-center justify-between px-4 py-1">
            <div className="flex gap-2 items-center">
              {isSidebarVisible ? (
                <GoSidebarExpand  
                onClick={()=>{
                  setIsSidebarVisible(!isSidebarVisible)
                }}
                  className="text-2xl text-white cursor-pointer"
                 title="Toggle Sidebar"
                />
              ) : (
                <GoSidebarCollapse   title="Toggle Sidebar"  onClick={()=>{
                  setIsSidebarVisible(!isSidebarVisible)
                }} className="text-2xl text-white" />
              )}
              <h1 className="text-xl font-extrabold text-center text-white md:text-left font-serif mb-4 md:mb-0 ">
                Namaste Node JS
              </h1>
            </div>

            <div className="flex gap-6 items-center">
              <MdFullscreen className="text-white text-2xl cursor-pointer font-extrabold" />
              <FaDownload
                title="Download Digital notes"
                className="text-white cursor-pointer font-extrabold"
              />
              <FaFilePdf
                title="Download Hand written notes"
                className="text-white cursor-pointer font-extrabold"
              />
            </div>
          </div>
        
        
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
         
        </div>
      </div>
    </>
  );
};
export default NamasteNodeJS;

const season1Episodes = [
  { id: 1, name: "Welcome to NamasteNodeJS" },
  { id: 2, name: "Introduction to NodeJS" },
  { id: 3, name: "JS on Server" },
  { id: 4, name: "Let's write code" },
  { id: 5, name: "module.export & require" },
  { id: 6, name: "Diving into the NodeJS github repo" },
  { id: 7, name: "libuv & async IO" },
  { id: 8, name: "sync, async, setTimeoutZero - code" },
  { id: 9, name: "Deep dive into v8 JS Engine" },
  { id: 10, name: "libuv & Event Loop" },
  { id: 11, name: "Thread pool in libuv" },
  { id: 12, name: "Creating a Server" },
  { id: 13, name: "Databases - SQL & NoSQL" },
  { id: 14, name: "Creating a database & mongodb" },
];

import ProgressBar from "@/components/base/ProgressBar";
import ls from "local-storage";
import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosCheckmarkCircle } from "react-icons/io";

const NotesSidebar = ({
  onSectionClick,
  contentListTitle = "Namaste Node JS S1",
  contentListTitle2 = "Namaste Node JS S2",
  data,
  season2Data = [],
  eachCardPrefix,
  progress,
  showProgress = false,
  storedValues,
  selectedSection,
  show2ndSection,
}) => {
  const [isSec1Visible, setIsSec1Visible] = useState(true);
  const [isSec2Visible, setIsSec2Visible] = useState(show2ndSection);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#f8f9fa] w-[300px] rounded-lg shadow-sm border border-gray-200"
    >
      <SectionHeader
        isSec1Visible={isSec1Visible}
        setIsSec1Visible={setIsSec1Visible}
        contentListTitle={contentListTitle}
      />
      
      <AnimatePresence>
        {isSec1Visible && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Scrollbars style={{ height: "calc(100vh - 250px)" }}>
              <div className="space-y-1 p-2">
                {showProgress && (
                  <div className="mb-3 px-2">
                    <ProgressBar percentage={progress} />
                  </div>
                )}

                {data?.map((item, idx) => (
                  <ListContent
                    key={idx}
                    item={item}
                    storedValues={storedValues}
                    onSectionClick={onSectionClick}
                    selectedSection={selectedSection}
                    eachCardPrefix={eachCardPrefix}
                  />
                ))}
              </div>
            </Scrollbars>
          </motion.div>
        )}
      </AnimatePresence>

      {show2ndSection && (
        <>
          <hr className="border-gray-200" />
          <SectionHeader
            isSec1Visible={isSec2Visible}
            setIsSec1Visible={setIsSec2Visible}
            contentListTitle={contentListTitle2}
          />
          
          <AnimatePresence>
            {isSec2Visible && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <Scrollbars style={{ height: "calc(100vh - 250px)" }}>
                  <div className="space-y-1 p-2">
                    {season2Data?.length === 0 ? (
                      <div className="text-center text-gray-500 italic py-4">
                        Coming Soon
                      </div>
                    ) : (
                      <>
                        {showProgress && (
                          <div className="mb-3 px-2">
                            <ProgressBar percentage={progress} />
                          </div>
                        )}
                        {season2Data?.map((item, idx) => (
                          <ListContent
                            key={idx}
                            item={item}
                            storedValues={storedValues}
                            onSectionClick={onSectionClick}
                            selectedSection={selectedSection}
                            eachCardPrefix={eachCardPrefix}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </Scrollbars>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

const SectionHeader = ({ isSec1Visible, setIsSec1Visible, contentListTitle }) => (
  <motion.div
    whileTap={{ scale: 0.99 }}
    className="flex justify-between items-center p-3 cursor-pointer bg-white border-b border-gray-100"
    onClick={() => setIsSec1Visible(!isSec1Visible)}
  >
    <h2 className="text-lg font-bold text-gray-700 truncate">
      {contentListTitle}
    </h2>
    <motion.div
      animate={{ rotate: isSec1Visible ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <FaChevronDown className="text-gray-500 text-sm" />
    </motion.div>
  </motion.div>
);

const ListContent = ({
  item,
  storedValues,
  onSectionClick,
  selectedSection,
  eachCardPrefix,
}) => (
  <motion.div
    whileHover={{ x: 2 }}
    whileTap={{ scale: 0.99 }}
    className={`
      relative cursor-pointer p-2.5 rounded-md text-sm
      transition-all duration-150 ease-in-out
      ${
        storedValues && storedValues[item?.name]
          ? "bg-white border-l-2 border-blue-400"
          : "hover:bg-white border-l-2 border-transparent"
      }
      ${
        selectedSection?.title === item?.title &&
        "bg-blue-50 border-l-2 border-blue-500 font-medium"
      }
      ${!item?.publishedOn && "opacity-40 cursor-not-allowed"}
    `}
    onClick={() => item?.publishedOn && onSectionClick(item)}
  >
    <div className="flex items-center gap-2">
      {item.episode === -1 ? (
        <span className="font-medium">Prerequisite</span>
      ) : (
        <div className="flex items-center gap-2">
          {eachCardPrefix && (
            <span className="text-xs font-medium text-gray-600">
              {eachCardPrefix}
              {item.episode}
            </span>
          )}
          <span className="truncate font-medium text-gray-700">
            {!eachCardPrefix && item?.name}
          </span>
        </div>
      )}
    </div>
    
    {eachCardPrefix && (
      <p className="pl-3 truncate text-xs mt-1 text-gray-600">{item?.name}</p>
    )}

    {storedValues && storedValues[item?.name] && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-2 right-2"
      >
        <IoIosCheckmarkCircle className="text-blue-400 text-lg" />
      </motion.div>
    )}
  </motion.div>
);

export default NotesSidebar;
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
      className="  dark:bg-gray-800 w-[300px] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Scrollbars style={{ height: "calc(100vh - 250px)" }}>
              <div className="space-y-2 p-3">
                {showProgress && (
                  <div className="mb-4 px-2">
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
          <hr className="border-gray-200 dark:border-gray-700" />
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
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Scrollbars style={{ height: "calc(100vh - 250px)" }}>
                  <div className="space-y-2 p-3">
                    {season2Data?.length === 0 ? (
                      <div className="text-center text-gray-500 dark:text-gray-400 font-medium py-4">
                        Coming Soon
                      </div>
                    ) : (
                      <>
                        {showProgress && (
                          <div className="mb-4 px-2">
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
    whileTap={{ scale: 0.98 }}
    className="flex justify-between items-center p-4 cursor-pointer  dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    onClick={() => setIsSec1Visible(!isSec1Visible)}
  >
    <h2 className="text-xl font-extrabold text-gray-800 dark:text-gray-100 truncate">
      {contentListTitle}
    </h2>
    <motion.div
      animate={{ rotate: isSec1Visible ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <FaChevronDown className="text-gray-600 dark:text-gray-300 text-sm" />
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
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    className={`
      relative cursor-pointer p-3 rounded-lg text-sm
      transition-all duration-200 ease-in-out
      ${
        storedValues && storedValues[item?.name]
          ? "bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 border-transparent"
      }
      ${
        selectedSection?.title === item?.title &&
        "bg-blue-100 dark:bg-blue-900/50 border-l-4 border-blue-600 font-bold shadow-sm"
      }
      ${!item?.publishedOn && "opacity-50 cursor-not-allowed"}
    `}
    onClick={() => item?.publishedOn && onSectionClick(item)}
  >
    <div className="flex items-center gap-3">
      {item.episode === -1 ? (
        <span className="font-bold text-gray-900 dark:text-gray-100">Prerequisite</span>
      ) : (
        <div className="flex items-center gap-2">
          {eachCardPrefix && (
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {eachCardPrefix}
              {item.episode}
            </span>
          )}
          <span className="truncate font-bold text-gray-800 dark:text-gray-100">
            {!eachCardPrefix && item?.name}
          </span>
        </div>
      )}
    </div>
    
    {eachCardPrefix && (
      <p className="pl-4 truncate text-sm mt-1.5 text-gray-600 dark:text-gray-400 font-medium">{item?.name}</p>
    )}

    {storedValues && storedValues[item?.name] && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-3 right-3"
      >
        <IoIosCheckmarkCircle className="text-blue-500 dark:text-blue-400 text-xl" />
      </motion.div>
    )}
  </motion.div>
);

export default NotesSidebar;
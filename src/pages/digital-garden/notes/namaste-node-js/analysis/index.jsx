import Button from "@/components/base/Button";
import CourseAnalysis from "@/components/garden/CourseAnalysis";
import {
  NAMSTE_NODE_JS_S1_ALL_IN_ONE,
  NAMSTE_NODE_JS_S2_ALL_IN_ONE,
} from "@/data/note/namaste-node-js-s1/constant";
import { useRouter } from "next/router";
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { ImNewTab } from "react-icons/im";
const NamasteNodeJsAnalysis = () => {
  const router = useRouter();
  return (
    <>
     <div className="flex gap-2">
     <Button
        icon={<FaCloudDownloadAlt />}
        onClick={() => {
          router.push("/digital-garden/notes/namaste-node-js/data");
        }}
        className="px-6 py-2 bg-transparent  border border-gray-500  text-gray-900 border-b text-base font-medium rounded-md   transition duration-200"
      >
        Download Data S1
      </Button>
      <Button
        onClick={() => {
          router.push("/digital-garden/notes/namaste-node-js-season-2/analysis");
        }}
        className="px-6 py-2 bg-transparent  border border-gray-500  text-gray-900 border-b text-base font-medium rounded-md   transition duration-200"
      >
        Season 2 Analysis <ImNewTab className="text-green-600" />
      </Button>
     </div>
      <CourseAnalysis
        totalEpisodes="13"
        textDuration="694 minutes / 11hours 34 mins"
        CourseMetaData={NAMSTE_NODE_JS_S1_ALL_IN_ONE}
        courseName="Namaste Node JS  Season 1"
      />
    </>
  );
};

export default NamasteNodeJsAnalysis;

import Button from "@/components/base/Button";
import CourseAnalysis from "@/components/garden/CourseAnalysis";
import { NAMSTE_NODE_JS_S2_ALL_IN_ONE } from "@/data/note/namaste-node-js-s1/constant";
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
          router.push("/digital-garden/notes/namaste-node-js-season-2/data");
        }}
        className="px-6 py-2 bg-transparent  border border-gray-500  text-gray-900 border-b text-base font-medium rounded-md   transition duration-200"
      >
        Download Data S2
      </Button>
      <Button
        onClick={() => {
          router.push("/digital-garden/notes/namaste-node-js/analysis");
        }}
        className="px-6 py-2 bg-transparent  border border-gray-500  text-gray-900 border-b text-base font-medium rounded-md   transition duration-200"
      >
        Season 1 Anaysis <ImNewTab className="text-green-600" />
      </Button>
      </div>
      <CourseAnalysis
        textDuration={"1215 minutes / 20 hours 15 minutes "}
        totalEpisodes={15}
        CourseMetaData={NAMSTE_NODE_JS_S2_ALL_IN_ONE}
        courseName="Namaste Node JS  Season 2"
      />
    </>
  );
};

export default NamasteNodeJsAnalysis;

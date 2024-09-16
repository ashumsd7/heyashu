import Button from "@/components/base/Button";
import CourseAnalysis from "@/components/garden/CourseAnalysis";
import {
  NAMSTE_NODE_JS_S1_ALL_IN_ONE,
  NAMSTE_NODE_JS_S2_ALL_IN_ONE,
} from "@/data/note/namaste-node-js-s1/constant";
import { useRouter } from "next/router";
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
const NamasteNodeJsAnalysis = () => {
  const router = useRouter();
  return (
    <>
      <Button
        icon={<FaCloudDownloadAlt />}
        onClick={() => {
          router.push("/digital-garden/notes/namaste-node-js/data");
        }}
        className="px-6 py-2 bg-transparent  border border-gray-500  text-gray-900 border-b text-base font-medium rounded-md   transition duration-200"
      >
        Download Data
      </Button>
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

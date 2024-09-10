import Button from "@/components/base/Button";
import ClassicPageLayout from "@/components/garden/ClassicNotesLayout";
import React from "react";
import { GiPlantWatering } from "react-icons/gi";
const NotFound = () => {
  return (
    <>
      <ClassicPageLayout
        heading={
          <div className="flex items-center">
            <img
              width="120"
              height="120"
              src="https://media3.giphy.com/media/fkoLF0dzaiNL6a1f2s/giphy.gif?cid=6c09b9529bocknrq68ifba6hwawfagtyld7j518t8lqfp7g4&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
            />{" "}
            Seeding Soon{" "}
          </div>
        }
        desc={
          <div className="flex items-center">
            {" "}
            The plant you're looking for is not seeded yet.
            <a className="border-b text-green-700 font-semibold ml-2 cursor-pointer">
              seed now
            </a>
          </div>
        }
      >
        <div className="flex items-center justify-center "></div>
      </ClassicPageLayout>
    </>
  );
};

export default NotFound;

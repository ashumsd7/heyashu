import Image from "next/image";
import React from "react";

function ProjectCard() {
  return (
    <div className=" border rounded-md flex flex-col gap-2  max-w-[420px] hover:shadow-lg cursor-pointer">
      <div className="px-4 py-2 ">
        <h2 className="font-semibold text-xl font-serif">Make things float in air</h2>
        <p className="text-base font-serif">
          Make things float in air Make things float in airMake things float in
          air
        </p>
      </div>

      <Image
        className="mx-auto "
        width={"420"}
        height={"220"}
        src="https://plus.unsplash.com/premium_photo-1714229505201-072ef1c6edcd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
      />

      <div className="px-4 py-2">
        <p>
          Make things float in air Make things float in airMake things float in
          air
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;

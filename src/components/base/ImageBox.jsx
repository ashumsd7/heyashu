import Image from "next/image";
import React from "react";

function ImageBox({
  img = "/images/profile1.jpg",
  onClick,
  height = "400",
  width = "400",
}) {
  return (
    <Image
      alt="profile-img"
      src={img}
      onClick={onClick}
      className="hover:shadow-lg max-h-[400px] max-w-[400px] object-cover  rounded-lg ml-auto ease-in-out duration-100  cursor-pointer"
      width={width}
      height={height}
    />
  );
}

export default ImageBox;
// border-4 border-gray-600

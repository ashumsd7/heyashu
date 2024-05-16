import Image from "next/image";
import Link from "next/link";
import React from "react";

function TripCard({ idx, name, img, data }) {
  function getRoute() {
    if (!data.isTraveled)
      return (
        "/travel/pending/ashutosh-anand-tiwari-will-travel-" +
        name.toLowerCase()
      );
    return "/travel/ashutosh-anand-tiwari-travels-" + name.toLowerCase();
  }
  return (
    <>
      {idx % 2 == 0 ? (
        <Link href={getRoute()}>
          <div className="flex gap-2 flex-wrap md:flex-nowrap w-full  border rounded-md justify-start shadow-md bg-white cursor-pointer hover:shadow-2xl">
            <Image
              className="md:mx-0 mx-auto h-[220px] object-fill w-full md:max-w-[320px] "
              width={"320"}
              height={"200"}
              src={img}
            />
            <div className="flex-end flex justify-center items-center mx-auto py-4 relative">
              <h1 className="lg:text-9xl md:text-6xl text-4xl  font-extrabold text-gray-600  ">
                {name}
              </h1>
            </div>
          </div>
        </Link>
      ) : (
        <Link href={getRoute()}>
          {" "}
          <div className="flex gap-2 flex-wrap w-full   rounded-md justify-start shadow-md bg-white  cursor-pointer hover:shadow-2xl border-2  border-gray-200">
            <div className="flex justify-center items-center mx-auto py-4">
              <h1 className="lg:text-9xl md:text-6xl text-4xl  font-extrabold text-gray-600 ">
                {name}
              </h1>
            </div>
            <Image
              className="md:mx-0 mx-auto flex-end  h-[220px] object-fill w-full md:max-w-[320px]  "
              width={"320"}
              height={"200"}
              src={img}
            />
          </div>
        </Link>
      )}
    </>
  );
}

export default TripCard;

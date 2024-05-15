import Image from "next/image";
import Link from "next/link";
import React from "react";

function TripCard({idx, name, img}) {
  return (
    <>
      {idx % 2 == 0 ? (
        <Link href={'/travel/ashutosh-anad-tiwari-travels-'+name.toLowerCase()}>
          <div className="flex gap-2 flex-wrap w-full  border rounded-md justify-start shadow-md bg-white cursor-pointer hover:shadow-2xl">
            <Image
              className="md:mx-0 mx-auto h-[220px] object-fill "
              width={"320"}
              height={"200"}
              src={img}
            />
            <div className="flex-end flex justify-center items-center mx-auto py-4">
              <h1 className="lg:text-9xl md:text-6xl text-4xl  font-extrabold text-gray-600  ">
               {name}
              </h1>
            </div>
          </div>
        </Link>
      ) : (
        <Link href={'/travel/ashutosh-anad-tiwari-travels-'+name.toLowerCase()}>
          {" "}
          <div className="flex gap-2 flex-wrap w-full  border rounded-md justify-start shadow-md bg-white  cursor-pointer hover:shadow-2xl">
            <div className="flex justify-center items-center mx-auto py-4">
              <h1 className="lg:text-9xl md:text-6xl text-4xl  font-extrabold text-gray-600 ">
                {name}
              </h1>
            </div>
            <Image
              className="md:mx-0 mx-auto flex-end  h-[220px] object-fill  "
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

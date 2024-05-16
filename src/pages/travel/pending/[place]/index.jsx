import Button from "@/components/base/Button";
import { HighLightedSpan } from "@/components/base/HighlightedSpan";
import { pendingTravelPlaces } from "@/utils/data";
import Image from "next/image";
import React from "react";
import { GrFormSchedule } from "react-icons/gr";
function PlaceDetails(props) {
  if (!props.place) return "Loading..";
  const placeName = props.place.split("-")[props.place.split("-").length - 1];
  const path = "/images/travelpfp/" + placeName + ".jpeg";

  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2  mx-auto grid-cols-1 m-auto justify-between  ">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold "> Yet to visit, </h1>
          <h1 className="md:text-5xl text-3xl font-extrabold text-center md:text-left font-serif mb-4 md:mb-0">
            ...{placeName.toUpperCase()} ????
          </h1>

          {/* <div className="ml-auto  ">
            <span className="font-thin"> at Codemonk</span>
          </div> */}

          <p className="font-serif  text-justify text-lg mt-10 tracking-wider mb-4 hidden lg:grid">
            "Hey, I've chosen {placeName} for my next trip. I know it's one of
            the best places on Earth. I hope to visit soon and add it to my list
            of places I've been. Stay tuned! Do you want to join me on this trip
            to {placeName}?
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          <Image
            className="hover:shadow-lg  border-4 border-gray-600 rounded-lg ml-auto ease-in-out duration-100  cursor-pointer"
            width={"400"}
            height="400"
            src={path}
          />
        </div>

        <div className="flex gap-2 flex-wrap justify-center md:justify-start mt-4">
          <Button>
            <GrFormSchedule />
            Plan {placeName.toUpperCase()} trip with me
          </Button>
        </div>

        <p className="font-serif  text-justify text-lg mt-10 tracking-wider mb-4 grid lg:hidden">
          "Hey, I've chosen {placeName} for my next trip. I know it's one of the
          best places on Earth. I hope to visit soon and add it to my list of
          places I've been. Stay tuned! Do you want to join me on this trip to{" "}
          {placeName}?
        </p>
      </div>

      <div>
        <div className="flex-end flex flex-wrap justify-center items-center mx-auto py-4 md:mt-10 mt-5">
          <h1 className=" md:text-4xl text-2xl  font-extrabold text-gray-600 flex flex-wrap items-center gap-4  ">
            BTW, <HighLightedSpan>{placeName.toUpperCase()}</HighLightedSpan>{" "}
            abhi dooooor hai :(
          </h1>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;

export async function getStaticProps(context) {
  const { params } = context;
  const { place } = params;

  return {
    props: {
      place: place,
    },
    // reValidate: 10, //10 Seconds
    // redirect: {
    //   destination: "/",
    // },
    // notFound: true, // can do if no data is there
  };
}

export async function getStaticPaths() {
  const allPaths = pendingTravelPlaces?.map((place) => {
    return {
      params: {
        place: `/travel/pending/ashutosh-anand-tiwari-will-travel-${place?.name.toLowerCase()}`,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: true,
  };
}

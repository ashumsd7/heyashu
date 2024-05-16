import ComingSoon from "@/components/base/CommingSoon";
import { HighLightedSpan } from "@/components/base/HighlightedSpan";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import React from "react";
import { traveledPlaces } from "@/utils/data";
import { PHONE_CALL_THIRTY_MIN } from "@/utils/constant";

function PlaceDetails(props) {
  if (!props.place) return "Loading..";
  const placeName = props.place.split("-")[props.place.split("-").length - 1];
  const path = "/images/travelpfp/" + placeName + ".jpeg";

  return (
    <>
      <Head>
        <title>{placeName} visited by Ashutosh Anand Tiwari </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon_travel.ico" />
        <meta
          name="description"
          content=" Ashutosh Anand Tiwari's traveling journey began in 2013 when I started my diploma in
            Shravasti, UP, near the India-Nepal border. Later, I moved to Noida
            for my graduation, close to the Delhi border. Currently, I'm on my
            professional journey in Bangalore, known as the southern hub. Though
            there are many places left on my list to visit, I've already
            explored several destinations. Let's connect and plan a trip
            together!"
        />
      </Head>

      <div className="flex flex-col gap-4 ">
        <div className="grid md:grid-cols-2  mx-auto grid-cols-1 m-auto justify-between  ">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-orange-600 ">
              {" "}
              The story when,{" "}
            </h1>
            <h1 className="text-5xl font-extrabold text-center md:text-left leading-2 font-serif mb-4 md:mb-0">
              <span className="text-orange-600"> Ashutosh visited </span>
              {placeName.toUpperCase()}
            </h1>
            {/* <div className="ml-auto  ">
            <span className="font-thin"> at Codemonk</span>
          </div> */}

            <p className="font-serif  text-justify text-lg mt-6 tracking-wider mb-4 hidden lg:grid">
              My traveling journey began in 2013 when I started my diploma in
              Shravasti, UP, near the India-Nepal border. Later, I moved to
              Noida for my graduation, close to the Delhi border. Currently, I'm
              on my professional journey in Bangalore, known as the southern
              hub. Though there are many places left on my list to visit, I've
              already explored several destinations. Let's connect and plan a
              trip together!
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center m-auto md:m-0 relative overflow-hidden ">
            <Image
              className="hover:shadow-lg h-auto border-4 border-gray-400 rounded-lg ml-auto ease-in-out duration-100  cursor-pointer"
              width={"400"}
              height="500"
              src={path}
            />
          </div>

          <p className="font-serif text-justify text-lg mt-10 tracking-wider mb-4 lg:hidden grid">
            My traveling journey began in 2013 when I started my diploma in
            Shravasti, UP, near the India-Nepal border. Later, I moved to Noida
            for my graduation, close to the Delhi border. Currently, I'm on my
            professional journey in Bangalore, known as the southern hub. Though
            there are many places left on my list to visit, I've already
            explored several destinations. Let's connect and plan a trip
            together!
          </p>
        </div>

        <div>
          <div className="flex-end flex justify-start items-center mx-auto py-4">
            <h1 className=" text-4xl  font-extrabold text-gray-600 flex items-center gap-4  ">
              The Story of{" "}
              <HighLightedSpan>{placeName.toUpperCase()}</HighLightedSpan>
            </h1>
          </div>
          <ComingSoon />
        </div>

        <div>
          <div className="flex-end flex justify-start items-center mx-auto py-4">
            <h1 className=" text-4xl  font-extrabold text-gray-600 flex items-center gap-4  ">
              Lets visit the
              <HighLightedSpan>Gallery</HighLightedSpan>
            </h1>
          </div>
          <ComingSoon />
        </div>

        <div>
          <div className="flex-end flex justify-start items-center mx-auto py-4">
            <h1 className=" text-4xl  font-extrabold text-gray-600 flex items-center gap-4  ">
              Planning?
            </h1>
          </div>
          <div
            className="flex text-gray-800 font-serif cursor-pointer"
            onClick={() => {
              window.open(PHONE_CALL_THIRTY_MIN, "_blank");
            }}
          >
            {" "}
            Click to Connect !! if you have any questions?
            <FaLongArrowAltRight className="text-xl hover:scale-105" />
          </div>
        </div>
        <hr />
        <small className="text-red-700 font-medium underline my-3">
          NOTE: {placeName.toUpperCase()} specific details updating soon..
        </small>
      </div>
    </>
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
  const allPaths = traveledPlaces?.map((place) => {
    return {
      params: {
        place: `/travel/ashutosh-anand-tiwari-travels-${place?.name.toLowerCase()}`,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: true,
  };
}

import Image from "next/image";
import React from "react";
import { FaUmbrellaBeach } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { GrFormSchedule } from "react-icons/gr";
import Button from "@/components/base/Button";
import TripCard from "@/components/travel/DoneTripCard";
import { pendingTravelPlaces, traveledPlaces } from "@/utils/data";
import { PHONE_CALL_THIRTY_MIN } from "@/utils/constant";

function TravelPage() {
  return (
    <div className="md:mt-20 mt-2 w-full flex flex-col gap-6 relative ">
      <div className="grid md:grid-cols-2  mx-auto grid-cols-1 m-auto justify-between  ">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-orange-600 "> Meet, </h1>
          <h1 className="text-5xl font-extrabold text-center md:text-left font-serif mb-4 md:mb-0">
            Ashutosh the Traveler
          </h1>
          {/* <div className="ml-auto  ">
            <span className="font-thin"> at Codemonk</span>
          </div> */}

          <p className="font-serif  text-justify text-lg mt-10 tracking-wider mb-4 hidden lg:grid">
            My traveling journey began in 2013 when I started my diploma in
            Shravasti, UP, near the India-Nepal border. Later, I moved to Noida
            for my graduation, close to the Delhi border. Currently, I'm on my
            professional journey in Bangalore, known as the southern hub. Though
            there are many places left on my list to visit, I've already
            explored several destinations. Let's connect and plan a trip
            together!
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center relative m-auto md:m-0">
          <Image
            src="/images/ashu_travel.jpeg"
            className="hover:shadow-lg  border-4 border-gray-600 rounded-lg ml-auto ease-in-out duration-100  cursor-pointer"
            width={"400"}
            height="400"
          />
          <Image
            className="absolute z-[-20] top-[-100px] left-[80px] opacity-10"
            src="/images/travel_illu.png"
            width={"300"}
            height={"300"}
          />
        </div>

        <p className="font-serif text-justify text-lg mt-10 tracking-wider mb-4 lg:hidden grid">
          My traveling journey began in 2013 when I started my diploma in
          Shravasti, UP, near the India-Nepal border. Later, I moved to Noida
          for my graduation, close to the Delhi border. Currently, I'm on my
          professional journey in Bangalore, known as the southern hub. Though
          there are many places left on my list to visit, I've already explored
          several destinations. Let's connect and plan a trip together!
        </p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center md:justify-start">
        <Button
          onClick={() => {
            window.open(PHONE_CALL_THIRTY_MIN, "_blank");
          }}
        >
          <GrFormSchedule />
          Plan a trip with me
        </Button>
      </div>

      {/* ------------------------------------------k */}
      <div className="text-left mt-10">
        <div className="flex justify-between flex-wrap">
          <h2 className="text-2xl font-serif  font-extrabold ">
            <HighLightedSpan> </HighLightedSpan> &nbsp; Places I visited
          </h2>

          <div
            className="flex cursor-pointer"
            onClick={() => {
              window.open(PHONE_CALL_THIRTY_MIN, "_blank");
            }}
          >
            {" "}
            ask something{" "}
            <FaLongArrowAltRight className="text-xl hover:scale-105" />
          </div>
        </div>
      </div>
      <div className="grid   grid-cols-1 gap-14">
        {traveledPlaces.map((item, idx) => {
          return (
            <TripCard idx={idx} name={item.name} img={item?.img} data={item} />
          );
        })}
      </div>

      {/* ------------------------------------------ */}

      <div className="text-left mt-24 ">
        <div className="flex justify-between flex-wrap">
          <h2 className="text-2xl font-serif  font-extrabold ">
            <HighLightedSpan> </HighLightedSpan> &nbsp; Next Planned trip
          </h2>

          <div
          className="flex cursor-pointer"
            onClick={() => {
              window.open(PHONE_CALL_THIRTY_MIN, "_blank");
            }}
          >
            suggest a trip{" "}
            <FaLongArrowAltRight className="text-xl hover:scale-105" />
          </div>
        </div>
        <p className="font-serif text-justify text-lg  tracking-wider  ">
          Here we come..... stopped due to financial crisis :(
        </p>
      </div>

      <div className="grid   grid-cols-1 gap-4">
        {pendingTravelPlaces.map((item, idx) => {
          return (
            <TripCard idx={idx} name={item.name} img={item?.img} data={item} />
          );
        })}
      </div>

      {/* ------------------------------ */}

      <Image
        className="absolute z-[-20] top-[-150px] left-[-250px]"
        src="/images/travel_illu.png"
        width={"300"}
        height={"300"}
      />
    </div>
  );
}

export default TravelPage;

function HighLightedSpan({ children }) {
  return (
    <span className="text-white   italic text-2xl bg-gray-700 px-2">
      {children}
    </span>
  );
}

function TechChip({ icon, text }) {
  return (
    <div className="flex gap-2 border shadow-lg  cursor-pointer">
      <span className="bg-gray-300   flex items-center justify-center px-2 py-1">
        <div className="text-gray-600 hover:rotate-[360deg] hover:ease-in-out duration-100">
          {icon || <FaUmbrellaBeach />}
        </div>
      </span>
      <span className="px-2 py-1 font-mono">{text}</span>
    </div>
  );
}

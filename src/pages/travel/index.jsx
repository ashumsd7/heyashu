import Image from "next/image";
import React from "react";
// import ProfilePicture from "./ProfilePicture";
import { FaLaptop, FaUmbrellaBeach, FaHome, FaQuestion } from "react-icons/fa";
import { TbCurlyLoop } from "react-icons/tb";
import Link from "next/link";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { SiRedux } from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { FaVuejs } from "react-icons/fa6";
import ProjectCard from "@/components/tech/ProjectCard";
import { FaLongArrowAltRight } from "react-icons/fa";
import BlogCard from "@/components/tech/BlogCard";
import { IoMdDownload } from "react-icons/io";
import { GrFormSchedule } from "react-icons/gr";
import Button from "@/components/base/Button";
import TripCard from "@/components/travel/DoneTripCard";

function TravelPage() {
  const traveledPlaces = [
    {
      name: "NEPAL",
      img: "/images/travelpfp/nepal.jpeg",
    },
    {
      name: "GOA",
      img: "/images/travelpfp/goa.png",
    },
    {
      name: "HARIDWAR",
      img: "/images/travelpfp/haridwar.jpeg",
    },
    {
      name: "RISHIKESH",
      img: "/images/travelpfp/rishikesh.jpeg",
    },
    {
      name: "COORG",
      img: "/images/travelpfp/coorg.jpeg",
    },
    {
      name: "DELHI",
      img: "/images/travelpfp/delhi2.jpeg",
    },

    {
      name: "RAMANAGAR",
      img: "/images/travelpfp/ramnagar.jpeg",
    },
    {
      name: "MADHUGIRI",
      img: "/images/travelpfp/madhugiri.png",
    },
    {
      name: "AGRA",
      img: "/images/travelpfp/agra2.jpeg",
    },
    {
      name: "AYODHYA",
      img: "/images/travelpfp/ayodhya.jpeg",
    },
    {
      name: "MUSSOORIE",
      img: "/images/travelpfp/mussoorie.jpeg",
    },
    {
      name: "MANALI",
      img: "/images/travelpfp/manali.jpeg",
    },

    {
      name: "MATHURA",
      img: "/images/travelpfp/mathura.jpeg",
    },

    {
      name: "VRINDAVAN",
      img: "/images/travelpfp/vrindavan.jpeg",
    },
    {
      name: "VARANASI",
      img: "/images/travelpfp/varanasi.jpeg",
    },
    {
      name: "SANGAM",
      img: "/images/travelpfp/sangam.jpeg",
    },
  ];
  const pendingTravelPlaces = [
    {
      name: "DWARKA",
      img: "/images/travelpfp/dwarka.jpeg",
    },
    {
      name: "LEH",
      img: "/images/travelpfp/leh.jpeg",
    },
    {
      name: "SIKKIM",
      img: "/images/travelpfp/sikkim.png",
    },
    
   

    
  ];

  return (
    <div className="md:mt-20 mt-2 w-full flex flex-col gap-6 relative ">
      <div className="grid md:grid-cols-2  mx-auto grid-cols-1 m-auto justify-between  ">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold "> Meet, </h1>
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

        <div className="flex flex-col gap-4 items-center justify-center">
          <Image
            src="/images/ashu_travel.jpeg"
            className="hover:shadow-lg  border-4 border-gray-600 rounded-lg ml-auto ease-in-out duration-100  cursor-pointer"
            width={"400"}
            height="400"
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
        <Button>
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

          <div className="flex">
            <Link href={"/tech/projects"} className="flex gap-2 items-center">
              {" "}
              Ask something{" "}
              <FaLongArrowAltRight className="text-xl hover:scale-105" />
            </Link>
          </div>
        </div>
      </div>
      <div className="grid   grid-cols-1 gap-10">
        {traveledPlaces.map((item, idx) => {
          return <TripCard idx={idx} name={item.name} img={item?.img} />;
        })}
      </div>

      {/* ------------------------------------------ */}

      <div className="text-left mt-12 ">
        <div className="flex justify-between flex-wrap">
          <h2 className="text-2xl font-serif  font-extrabold ">
            <HighLightedSpan> </HighLightedSpan> &nbsp; Next Planned trip
          </h2>

          <div className="flex">
            <Link href={"/tech/projects"} className="flex gap-2 items-center">
              {" "}
              Suggest a trip{" "}
              <FaLongArrowAltRight className="text-xl hover:scale-105" />
            </Link>
          </div>
        </div>
        <p className="font-serif text-justify text-lg  tracking-wider  ">
         Here we come.....  stopped duw to financial crisis :(
        </p>
      </div>

      <div className="grid   grid-cols-1 gap-4">
        {pendingTravelPlaces.map((item,idx) => {
          return <TripCard idx={idx} name={item.name} img={item?.img} />;
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

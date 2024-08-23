import React from "react";

import Image from "next/image";
import Button from "@/components/base/Button";
import Head from "next/head";
import { BEST_PHOTOS_LINK } from "@/utils/constant";
function BestCapturedPage() {
  return (
    <div className="flex flex-col justify-start mt-[80px] items-center h-screen relative ">
      <Head>
        <title>Best ones of Ashutosh Anand Tiwari </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon_tech.ico" />
        <meta
          name="description"
          content="Here are some best photos of Ashutosh (Ashu). Thanks for visiitng the page. Keep Smiling"
        />
      </Head>

      <div className="flex flex-col  items-center relative z-[10]">
        <h2 className="font-semibold mb-2  "> Hey here are</h2>
        <h1 className="text-5xl font-extrabold text-center text-orange-600 md:text-left font-serif mb-4 md:mb-0">
          More information
        </h1>
      </div>
      <hr />

      <div className="flex flex-col ">
        <div className="flex flex-col  items-center mt-10">
          <p className="font-mono "> Name- </p>
          <p className=" font-mono"> Ashutosh Anand Tiwari </p>
        </div>
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-mono "> नाम- </h2>
          <h1 className=" font-mono"> आशुतोष आनंद तिवारी </h1>
        </div>
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-mono "> Nick name- </h2>
          <h1 className=" font-mono"> Ashu (आशु) </h1>
        </div>
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-mono "> DOB- </h2>
          <h1 className=" font-mono"> 27.02.1997 </h1>
        </div>
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-mono "> Height- </h2>
          <h1 className=" font-mono"> 5 ft 5 inch</h1>
        </div>
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-mono "> Color- </h2>
          <h1 className=" font-mono"> Wheatish</h1>
        </div>
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-mono "> Profession  - </h2>
          <h1 className=" font-mono"> Software Engineer 🤓 </h1>
        </div>
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-mono "> Currently working - </h2>
          <h1 className=" font-mono"> in Bengaluru ( Hybrid - WFH)</h1>
        </div>

        <div className="flex flex-col items-center mt-10">
          <h2 className="font-mono "> Education - </h2>
          <h1 className=" font-mono"> B.Tech ( Computer Science )</h1>
        </div>
        <div className="flex flex-col items-center mt-10">
          <h2 className="font-mono "> College - </h2>
          <h1 className=" font-mono"> JSS academy Noida ( 2019 )</h1>
        </div>
      </div>

      <p className="font-serif text-center text-lg  tracking-wider mb-4  relative z-[10] mt-10">
        Click the button below to see latest best clicked
      </p>
      <div className="flex flex-wrap justify-center md:justify-start mb-6">
        <Button
          className="relative mb-10 "
          onClick={() => {
            window.open(BEST_PHOTOS_LINK, "_blank");
          }}
        >
          Join the album
        </Button>
      </div>
      <div className="h-10">..............</div>

      <Image
        src="/images/profile1.jpg"
        width={"340"}
        height={"320"}
        className="absolute top-[250px] w-[200px] h-[200px] rounded-full  right-0 opacity-10 rotate-12 z-[-20]"
      />
      <Image
        src="/images/versions/trek.jpeg"
        width={"340"}
        height={"320"}
        className="absolute top-[-80px] w-[200px] h-[200px] rounded-full left-0 opacity-10 rotate-12 z-[-20]"
      />
      <Image
        src="/images/versions/family.jpeg"
        width={"340"}
        height={"320"}
        className="absolute top-[120px] w-[200px] h-[200px] rounded-full left-[30%] opacity-10 rotate-12 z-[-20]"
      />
      <Image
        src="/images/versions/family.jpeg"
        width={"340"}
        height={"320"}
        className="absolute top-[0px] w-[200px] h-[200px] rounded-full right-[10%] opacity-10 rotate-12 z-[-20]"
      />
    </div>
  );
}

export default BestCapturedPage;

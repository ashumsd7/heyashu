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
        <h1 className="font-semibold mb-2  "> Hey here are</h1>
        <h1 className="text-5xl font-extrabold text-center text-orange-600 md:text-left font-serif mb-4 md:mb-0">
          Best Photos of Me
        </h1>
      </div>

      <p className="font-serif text-center text-lg mt-2 tracking-wider mb-4  relative z-[10]">
        Click the button below to join the show
      </p>
      <div className="flex gap-2 flex-wrap justify-center md:justify-start">
        <Button
          className="relative "
          onClick={() => {
            window.open(BEST_PHOTOS_LINK, "_blank");
          }}
        >
          Join the album
        </Button>
      </div>

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

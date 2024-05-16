import React from "react";
import Image from "next/image";
import Head from "next/head";
import { HighLightedSpan } from "@/components/base/HighlightedSpan";
import ImageBox from "@/components/base/ImageBox";
import { MORE_VERSIONS } from "@/utils/data";

function MiscPage() {

 function getThumbnailPath(path){
  return  '/images/versions'+path

 }
  return (
    <div>
      <Head>
        <title>More Info: Ashutosh Anand Tiwari </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Let's Explore more about Ashutosh Anand Tiwari"
        />
      </Head>

      <div className="md:mt-20 mt-2 w-full flex flex-col gap-6 relative ">
        <div className="   mx-auto  m-auto   ">
          <div className="flex flex-col  items-center">
            <h1 className="font-semibold mb-2 "> Meet with, </h1>
            <h1 className="text-5xl font-extrabold text-center text-orange-600 md:text-left font-serif mb-4 md:mb-0">
              More Versions of Ashutosh
            </h1>
          </div>

          <p className="font-serif text-justify text-lg mt-10 tracking-wider mb-4 ">
          I am not only limited to tech and travel; there are multiple activities I engage in and contribute to in my village and elsewhere. Here are some of them:
          </p>
        </div>

        {/* ------------------------------------------k */}
        <div className="text-left mt-10">
          <div className="flex justify-between flex-wrap">
            <h2 className="text-2xl font-serif  font-extrabold ">
              <HighLightedSpan> </HighLightedSpan> &nbsp; Beyond your
              imagination
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          {MORE_VERSIONS?.map((item) => {
            return (
              <div className="flex gap-2 flex-col items-center justify-center m-auto md:m-0"> 
                <ImageBox  img={'/images/versions'+item.img}/>
                <h2 className="text-3xl italic text-orange-600 font-serif  font-extrabold ">
                {item.name}
                </h2>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------ */}

        {/* ------------------------------ */}

        <Image
          className="absolute z-[-20] top-[-150px] left-[-250px]"
          src="/images/travel_illu.png"
          width={"300"}
          height={"300"}
        />
      </div>
    </div>
  );
}

export default MiscPage;

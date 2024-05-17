import Button from "@/components/base/Button";
import ComingSoon from "@/components/base/CommingSoon";
import ImageBox from "@/components/base/ImageBox";
import Head from "next/head";
import Image from "next/image";
import React from "react";

function TownPage() {
  return (
    <>
      <Head>
        <title>Hometown : Ashutosh Anand Tiwari </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description "
          content="Meet Ashutosh Anand Tiwari who lives in Charawan Ayodhya UP, Explore more about him"
        />
      </Head>
      <div className="flex flex-col">
        <div className="flex flex-col  items-center">
          <h1 className="font-semibold mb-2 "> Meet my hometown, </h1>
          <h1 className="text-5xl font-extrabold text-center text-orange-600 md:text-left font-serif mb-4 md:mb-0">
            CHARAWAN, AYODHYA
          </h1>
        </div>

        <p className="font-serif text-justify text-lg mt-10 tracking-wider mb-4 ">
          I have created a website for my village in Hindi, which includes
          contact numbers for more than 150 shopkeepers from my village and
          nearby areas. People from Charawan can easily search for these numbers
          and dial them directly from their mobile phones. It functions like a
          platform where individuals earning outside the village can donate
          directly to support village development. I have contributed whatever I
          could from my side. In addition to this, people in our village
          celebrate multiple festivals with joy, such as Durga Puja, Diwali,
          Holi, and Krishna Janmashtami. Our village is close to Ayodhya Dham,
          which is why people are devoted to Lord Rama. Various cultural
          programs like Fagua and And are frequently organized in my village.
          You are most welcome to visit. Here is the link to explore more. Thank
          you.
        </p>
      </div>

    
      <div className="flex justify-center items-center flex-col gap-5">
      <Image width={'400'} height={'600'} src="/images/charawan.jpg" className="border rounded-sm "/>
        <Button
          onClick={() => {
            window.open("https://charawan.netlify.app", "_blank");
          }}
        >
          VISIT CHARAWAN
        </Button>
      </div>
    </>
  );
}

export default TownPage;

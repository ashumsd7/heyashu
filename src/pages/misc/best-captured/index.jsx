import React from "react";
import Image from "next/image";
import Button from "@/components/base/Button";
import Head from "next/head";
import { BEST_PHOTOS_LINK } from "@/utils/constant";

function BestCapturedPage() {
  const personalInfo = [
    { label: "Name", value: "Ashutosh Anand Tiwari", hindi: "आशुतोष आनंद तिवारी" },
    { label: "Nick name", value: "Ashu (आशु)" },
    { label: "DOB", value: "27.02.1997" },
    { label: "Height", value: "5 ft 6 inch" },
    { label: "Complexion", value: "Wheatish" },
    { label: "Profession", value: "Software Engineer 🤓" },
    { label: "Current Location", value: "Bengaluru (Hybrid - WFH)" },
    { label: "Education", value: "B.Tech (Computer Science)" },
    { label: "College", value: "JSS academy Noida (2019)" },
  ];

  const familyInfo = [
    { label: "Father", value: "Government Teacher" },
    { label: "Mother", value: "Homemaker" },
    { label: "Sister", value: "Younger Sister" },
    { label: "Family Location", value: "Ayodhya" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-20 ">
      <Head>
        <title>About Ashutosh Anand Tiwari</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon_tech.ico" />
        <meta
          name="description"
          content="Get to know Ashutosh (Ashu) better - Personal and professional information"
        />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 relative">
          <h1 className="text-5xl font-extrabold text-orange-600 font-serif mb-4">
            About Me
          </h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Personal Information Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Personal Information
            </h2>
            <div className="space-y-4">
              {personalInfo.map((info, index) => (
                <div key={index} className="hover:bg-orange-50 p-2 rounded-md transition-colors">
                  <p className="text-gray-600 font-medium">{info.label}</p>
                  <p className="text-gray-800 font-mono">{info.value}</p>
                  {info.hindi && (
                    <p className="text-gray-800 font-mono mt-1">{info.hindi}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Family Information Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Family Information
            </h2>
            <div className="space-y-4">
              {familyInfo.map((info, index) => (
                <div key={index} className="hover:bg-orange-50 p-2 rounded-md transition-colors">
                  <p className="text-gray-600 font-medium">{info.label}</p>
                  <p className="text-gray-800 font-mono">{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photos Section */}
        <div className="text-center flex justify-center flex-col items-center">
          <p className="font-serif text-lg tracking-wider mb-6">
            Want to see some of my best moments? Check out my photo collection!
          </p>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105"
            onClick={() => window.open(BEST_PHOTOS_LINK, "_blank")}
          >
            View Photo Album 📸
          </Button>
        </div>
      </div>

      {/* Background Images */}
      <div className="fixed inset-0 pointer-events-none">
        <Image
          src="/images/profile1.jpg"
          width={200}
          height={200}
          alt="Profile"
          className="absolute top-[20%] right-[5%] w-[200px] h-[200px] rounded-full opacity-5 rotate-12"
        />
        <Image
          src="/images/versions/trek.jpeg"
          width={200}
          height={200}
          alt="Trek"
          className="absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full opacity-5 -rotate-12"
        />
        <Image
          src="/images/versions/family.jpeg"
          width={200}
          height={200}
          alt="Family"
          className="absolute bottom-[20%] left-[50%] w-[200px] h-[200px] rounded-full opacity-5 rotate-45"
        />
      </div>
    </div>
  );
}

export default BestCapturedPage;
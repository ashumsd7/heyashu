import React, { useEffect } from "react";
import Image from "next/image";
import Button from "@/components/base/Button";
import Head from "next/head";
import { BEST_PHOTOS_LINK } from "@/utils/constant";

const photos = [
  "https://i.ibb.co/Fbsnrg9t/p-2.png",
  "https://i.ibb.co/Q7hvtWXQ/p-3.png",
  "https://i.ibb.co/bjYhBV59/p-4.png",
  "https://i.ibb.co/nqRysdQZ/p-5.png",
  "https://i.ibb.co/yBF7TD1b/p-6.png",
  "https://i.ibb.co/mMKyj6C/p-7.png",
  "https://i.ibb.co/n8VxDnbM/p1.png",
];

const backgroundImages = [
  { src: "/images/profile1.jpg", className: "absolute top-[20%] right-[5%] w-[200px] h-[200px] rounded-full opacity-5 rotate-12" },
  { src: "/images/versions/trek.jpeg", className: "absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full opacity-5 -rotate-12" },
  { src: "/images/versions/family.jpeg", className: "absolute bottom-[20%] left-[50%] w-[200px] h-[200px] rounded-full opacity-5 rotate-45" },
   
];

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
    { label: "Diet", value: "Vegetarian" },
    { label: "Annual Income", value: "_ _ _ _ _ _" },
    { label: "Community", value: "Brahmin" },
    { label: "Hobbies & Interest", value: "Travelling, Capturing, Cooking, Workout" },
  ];

  const familyInfo = [
    { label: "Father", value: "Government Teacher" },
    { label: "Mother", value: "Homemaker" },
    { label: "Sister", value: "Younger Sister" },
    { label: "Family Location", value: "Ayodhya, UP" },
    { label: "Family Members", value: "5" },
    { label: "Family Type", value: "Nuclear" },
  ];

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 dark:from-gray-900 dark:to-gray-800 py-20">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-orange-600 dark:text-orange-400 font-serif mb-4">
            👋 Hello Ji, Namaste 🙏 
          </h1>
          {/* <div className="w-32 h-1 bg-orange-400 dark:bg-orange-500 mx-auto"></div> */}
        </div>

         <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Personal Information Section */}
          <div className="dark:bg-gray-800 rounded-md shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-2">
              Personal Information
            </h2>
            <div className="space-y-4">
              {personalInfo.map((info, index) => (
                <div key={index} className="hover:bg-orange-50 dark:hover:bg-gray-700 p-3 rounded transition-colors">
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{info.label}</p>
                  <p className="text-gray-800 dark:text-gray-100">{info.value}</p>
                  {info.hindi && (
                    <p className="text-gray-800 dark:text-gray-100 mt-1">{info.hindi}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Family Information Section */}
          <div className="dark:bg-gray-800 rounded-md shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-2">
              Family Information
            </h2>
            <div className="space-y-4">
              {familyInfo.map((info, index) => (
                <div key={index} className="hover:bg-orange-50 dark:hover:bg-gray-700 p-3 rounded transition-colors">
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{info.label}</p>
                  <p className="text-gray-800 dark:text-gray-100">{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photos Section */}
        <div className="text-center mb-16">
          <p className="font-serif text-xl tracking-wider mb-8 text-gray-800 dark:text-gray-200">
            Want to see some of my best moments? Check out my photo collection!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8 justify-center">
            {photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                width={200}
                height={200}
                alt={`Photo ${index + 1}`}
                className="shadow-lg rounded-md border border-gray-300 w-[200px] h-[200px] object-cover mx-auto"
              />
            ))}
         
            <Button
              className="shadow-lg mx-auto  border border-gray-300 w-[200px] h-[200px] bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105"
              onClick={() => window.open(BEST_PHOTOS_LINK, "_blank")}
            >
              View More Photos
            </Button>
         
          </div>
            
        </div>

        {/* Contact Section */}
        <div className="text-center mb-16">
          <p className="font-serif text-xl tracking-wider mb-8 text-gray-800 dark:text-gray-200">
           Let's Talk and Get to Know Each Other
          </p>
          <div className="flex justify-center">
            <Button
              className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg"
              onClick={() => window.open("https://www.instagram.com/ashumsd7", "_blank")}
            >
              Message Now
            </Button>
          </div>
        </div>
      </div>

      {/* Background Images */}
      <div className="fixed inset-0 pointer-events-none">
        {backgroundImages.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            width={200}
            height={200}
            alt={`Background ${index + 1}`}
            className={image.className}
          />
        ))}
      </div>

     
    </div>
  );
}

export default BestCapturedPage;
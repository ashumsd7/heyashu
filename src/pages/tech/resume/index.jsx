"use client";
import { Document, Page } from "react-pdf";
import { IoMdDownload } from "react-icons/io";
import React from "react";
import { LuExternalLink } from "react-icons/lu";
import Button from "@/components/base/Button";
import { GrFormSchedule } from "react-icons/gr";
import Image from "next/image";
import { INTERVIEW_CALL_SIXTY_MIN } from "@/utils/constant";
import Head from "next/head";

function Resume() {
  function onClickDirectDownload() {
    // Replace 'public/pdfs/resume.pdf' with the actual path to your PDF file
    const pdfPath = "/pdfs/resume.pdf";
    // Create an anchor element
    const anchor = document.createElement("a");

    // Set the href attribute to the PDF file path
    anchor.href = pdfPath;

    // Set the download attribute to force download
    anchor.setAttribute("download", "");

    // Programmatically click the anchor element to trigger the download
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up after download
    document.body.removeChild(anchor);
  }
  return (
    <>
      <Head>
        <title>Resume : Ashutosh Anand Tiwari </title>

        <link rel="icon" href="/favicon_tech.ico" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Download Resume of Ashutosh anand tiwari, He has more than 4 years of exp. in web development."
        />
        <meta
          name="keywords"
          content="Ashutosh Anand Tiwari, Tech Blogs, Travel Blogs, Personal Blog, Web Development, Programming, JavaScript"
        />
        <meta
          property="og:title"
          content="Ashutosh Anand Tiwari - Personal Blog and Portfolio"
        />
        <meta
          property="og:description"
          content="Join Ashutosh Anand Tiwari as he shares insights on tech, travel, and his life journey. Explore engaging blogs and personal stories."
        />
        <meta
          property="og:image"
          content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
        />
        <meta property="og:url" content="https://www.heyashu.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ashutosh Anand Tiwari - Personal Blog and Portfolio"
        />
        <meta
          name="twitter:description"
          content="Explore the world of Ashutosh Anand Tiwari through his tech and travel blogs."
        />
        <meta
          name="twitter:image"
          content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
        />
      </Head>
      <div className=" mt-2 w-full flex flex-col gap-6 relative ">
        <div className="grid md:grid-cols-2  mx-auto grid-cols-1 m-auto justify-between  ">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold "> Ashutosh' </h1>
            <h1 className="text-5xl font-extrabold text-orange-600 text-center md:text-left font-serif mb-4 md:mb-0">
              Resume
            </h1>

            <p className="font-serif  text-justify text-lg mt-5 tracking-wider mb-4 hidden lg:grid">
              With over 5+ years as a software developer, I've specialized in
              creating web applications from scratch, mainly focusing on the
              front-end side. Throughout my career, I've collaborated with teams
              to deliver projects of varying scales, ranging from mid-sized to
              large-scale endeavors. I've had the opportunity to work with
              multiple startups, and currently, I'm employed at Codemonk.
            </p>
            <div className="flex gap-2 flex-wrap justify-center md:justify-start items-start">
              {/* <Button
                onClick={() => {
                  window.open(
                    "https://ashutosh-anand-tiwari.tiiny.site/",
                    "_blamk"
                  );
                }}
              >
                <LuExternalLink /> View and download
              </Button> */}

              <Button
                onClick={() => {
                  onClickDirectDownload();
                }}
              >
                <IoMdDownload /> Direct download
              </Button>
              <span
                className="flex justify-center border-b-2  border-dotted mb-10  items-center cursor-pointer font-serif font-semibold"
                onClick={() => {
                  window.open(INTERVIEW_CALL_SIXTY_MIN, "_blank");
                }}
              >
                <GrFormSchedule /> Schedule an Interview
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center m-auto md:m-0">
            <Image
              src="/images/resume_thumbnail.JPG"
              className="hover:shadow-lg  rounded-lg ml-auto ease-in-out duration-100  cursor-pointer"
              width={"400"}
              height="400"
            />
          </div>

          <p className="font-serif text-justify text-lg mt-8 tracking-wider mb-4 lg:hidden grid">
            With over 5+ years as a software developer, I've specialized in
            creating web applications from scratch, mainly focusing on the
            front-end side. Throughout my career, I've collaborated with teams
            to deliver projects of varying scales, ranging from mid-sized to
            large-scale endeavors. I've had the opportunity to work with
            multiple startups, and currently, I'm employed at Codemonk. If you
            need assistance with writing or any web development work for your
            website, feel free to contact me.
          </p>
        </div>

        {/* ------------------------------ */}

        <Image
          className="absolute z-[-20] top-[-90px] left-[-150px]"
          src="/images/Leaves.JPG"
          width={"200"}
          height={"200"}
        />
      </div>

      {/* <Document
          file="/pdfs/resume.pdf"
        ></Document> */}
    </>
  );
}

export default Resume;

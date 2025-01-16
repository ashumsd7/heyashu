import Image from "next/image";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { FaSass, FaUmbrellaBeach } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { FaHtml5, FaCss3Alt, FaReact, FaVuejs } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiTypescript, SiRedux } from "react-icons/si";
import Button from "@/components/base/Button";

function TechPage() {
  const technologies = [
    { name: "HTML", icon: <FaHtml5 /> },
    { name: "CSS", icon: <FaCss3Alt /> },
    { name: "Javascript", icon: <IoLogoJavascript /> },
    { name: "ReactJs", icon: <FaReact /> },
    { name: "TailwindCSS", icon: <FaSass/> },

    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Redux Toolkit", icon: <SiRedux /> },
    { name: "VueJS", icon: <FaVuejs /> },
    // Keep your existing technology list
  ];

  const gardenCards = [
    {
      title: "Digital Garden",
      description: "Access my collection of technical notes and learnings",
      link: "/digital-garden",
      icon: "📚"
    },
    {
      title: "Products ",
      description: "  Launching Soon:   Help kits for freshers to gain experience",
      link: "/tech/products",
      icon: "🛠️"
    },
    {
      title: "Tech Blogs",
      description: "Read my thoughts and tutorials on development",
      link: "/blog",
      icon: "✍️"
    },
    {
      title: "Interview Prep",
      description: "1:1 interview prep for early career devs",
      link: "https://topmate.io/aat/1148651",
      icon: "🎯"
    }
  ];

  return (
    <>
      <Head>
        <title>Developer : Ashutosh Anand Tiwari</title>
        {/* Keep your existing meta tags */}
      </Head>

      <div className="max-w-7xl mx-auto px-2 py-8 space-y-20">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center justify-between">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-medium text-gray-600">Meet,</h2>
              <h1 className="text-5xl font-bold text-orange-600 text-center md:text-left">
                Ashutosh the Developer
              </h1>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left">
              Well experienced as a software developer, I've specialized in creating web applications
              from scratch, mainly focusing on the front-end side. Throughout my
              career, I've collaborated with teams to deliver projects of
              varying scales, ranging from mid-sized to large-scale endeavors.
              I've had the opportunity to work with multiple startups, and
              currently, I'm employed at Codemonk.
            </p>

            <div className="flex gap-4 pt-4 flex-wrap  ">
              <Link href="/tech/resume" className="md:w-auto w-full flex justify-center">
                <Button className="bg-orange-600 hover:bg-orange-700 md:w-auto w-full text-center text-white px-6 py-3">
                  <IoMdDownload className="mr-2" /> View Resume
                </Button>
              </Link>
              <button
                onClick={() => window.open('https://topmate.io/aat/1148709/pay', '_blank')}
                className="md:w-auto w-full"
              >
                <Button className="bg-gray-800 hover:bg-gray-900 md:w-auto w-full text-white px-6 py-3">
                  Let's Build Something
                </Button>
              </button>
            </div>
          </div>

          <div className="relative flex justify-end">
            <Image
              src="/images/ashu_office.png"
              width={500}
              height={500}
              alt="Ashutosh Tiwari"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -z-10 -top-10 -right-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30" />
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Technologies I Work With</h2>
          <div className="flex flex-wrap gap-4">
            {technologies.map((tech, index) => (
              <TechChip key={index} icon={tech.icon} text={tech.name} />
            ))}
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Resources & Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gardenCards.map((card, index) => (
              <Link href={card.link} key={index}>
                <div className="group p-6 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white hover:border-orange-200">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto space-y-6 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold">Let's Build Something Amazing</h2>
            <p className="text-lg opacity-90">
              Transform your ideas into reality with modern web development solutions.
            </p>
            <div className="flex justify-center">
              <button  onClick={() => window.open('https://topmate.io/aat/1148709/pay', '_blank')}>
                <Button className="bg-white text-orange-600 hover:bg-gray-50 px-8 py-3 text-lg font-medium">
                  Get Started
                </Button>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function TechChip({ icon, text }) {
  return (
    <div className="flex items-center gap-2 border rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer bg-white group hover:border-orange-200">
      <span className="bg-gray-50 p-2 rounded-l-lg group-hover:bg-orange-50">
        <div className="text-gray-600 group-hover:text-orange-600 transition-all duration-300">
          {icon || <FaUmbrellaBeach />}
        </div>
      </span>
      <span className="px-3 py-2 font-medium">{text}</span>
    </div>
  );
}

export default TechPage;
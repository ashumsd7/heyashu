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
  ];

  const services = [
    {
      title: "Digital Garden",
      description: "Explore my curated collection of technical notes, learnings and insights",
      link: "/digital-garden",
      icon: "🌱"
    },
    {
      title: "Developer Products", 
      description: "Practical resources and starter kits for early-career developers",
      link: "/tech/products",
      icon: "⚡"
    },
    {
      title: "Technical Writing",
      description: "In-depth articles and tutorials on modern web development", 
      link: "/blog",
      icon: "✍️"
    },
    {
      title: "1:1 Mentoring",
      description: "Personalized interview preparation and career guidance",
      link: "https://topmate.io/aat/1148651",
      icon: "🎯"
    }
  ];

  return (
    <>
      <Head>
        <title>Ashutosh Anand Tiwari - Full Stack Developer</title>
        <meta name="description" content="Experienced full stack developer specializing in modern web applications" />
      </Head>

      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-12">
          
          {/* Hero Section */}
          <section className="flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-6 text-center md:text-left">
              <div className="space-y-2">
                <h2 className="text-lg font-medium text-emerald-600 dark:text-emerald-400 text-center md:text-left">Hi there! 👋</h2>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 text-center md:text-left">
                  I'm Ashutosh,<br/>
                  <span className="text-emerald-600 dark:text-emerald-400">Full Stack Developer</span>
                </h1>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center md:text-left">
                With extensive experience in web development, I specialize in building scalable applications 
                from the ground up. I've collaborated with multiple startups and currently work at Codemonk, 
                focusing on creating exceptional user experiences through clean, efficient code.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Link href="/tech/resume" className="w-full sm:w-auto">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2">
                    <IoMdDownload /> View Resume
                  </Button>
                </Link>
                <button
                  onClick={() => window.open('https://topmate.io/aat/1148709/pay', '_blank')}
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white px-8 py-3 rounded-lg flex items-center justify-center">
                  Hire me
                  </Button>
                </button>
              </div>
            </div>

            <div className="relative w-64 h-64 sm:w-full sm:h-auto sm:aspect-square max-w-md mx-auto">
              <div className="absolute -z-10 top-0 right-0 w-80 h-80 bg-emerald-200 dark:bg-emerald-800 rounded-full blur-3xl opacity-20" />
              <Image
                src="/images/ashu_office.png"
                alt="Ashutosh Tiwari"
                fill
                className="rounded-2xl object-cover shadow-xl"
                priority
              />
            </div>
          </section>

          {/* Technologies Section */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Technical Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <TechChip key={index} icon={tech.icon} text={tech.name} />
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Resources & Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Link href={service.link} key={index}>
                  <div className="group h-full p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 hover:shadow-lg transition-all duration-300">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform text-center">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-700 dark:to-emerald-600 rounded-2xl p-12">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-white text-center">Ready to Build Something Amazing?</h2>
              <p className="text-lg text-emerald-50 text-center">
                Let's collaborate to transform your ideas into exceptional web experiences.
              </p>
              <button 
                onClick={() => window.open('https://topmate.io/aat/1148709/pay', '_blank')}
                className="bg-white text-emerald-600 hover:bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Get Started
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function TechChip({ icon, text }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 hover:shadow-md transition-all duration-300">
      <span className="text-2xl text-emerald-600 dark:text-emerald-400">
        {icon || <FaUmbrellaBeach />}
      </span>
      <span className="font-medium text-gray-900 dark:text-gray-100 text-center">{text}</span>
    </div>
  );
}

export default TechPage;
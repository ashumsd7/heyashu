"use client";
import { motion } from "framer-motion";
import { IoMdDownload } from "react-icons/io";
import { GrFormSchedule } from "react-icons/gr";
import { PiPlantLight } from "react-icons/pi";
import Image from "next/image";
import Button from "@/components/base/Button";
import { INTERVIEW_CALL_SIXTY_MIN } from "@/utils/constant";
import Head from "next/head";
function Resume() {
 
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  function onClickDirectDownload() {
    const pdfPath = "/pdfs/Ashutosh_Resume_React.pdf";
    const anchor = document.createElement("a");
    anchor.href = pdfPath;
    anchor.setAttribute("download", "");
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
  return (
    <>
      <Head>
        <title>Resume : Ashutosh Anand Tiwari </title>

        <link rel="icon" href="/favicon_tech.ico" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
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
      <motion.div 
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-12 pt-6  sm:px-6 lg:px-8 relative overflow-hidden"
      >
    

        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-green-800 mb-4">
              Professional Resume
            </h1>
            <div className="w-24 h-1 bg-green-600 mx-auto"/>
          </motion.div>

          <div className="flex flex-col items-center gap-12">
          <motion.div variants={fadeInUp} className="space-y-6 text-center">
              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed">
                  With a strong foundation in software development, I focus on building front-end web applications that deliver exceptional user experiences. My journey encompasses diverse projects, team collaborations, and contributions to innovative startups.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto"
                >
                  <Button
                    onClick={onClickDirectDownload}
                    className="w-full bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <IoMdDownload className="text-xl" />
                    Download Resume
                  </Button>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(INTERVIEW_CALL_SIXTY_MIN, "_blank")}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-700 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <GrFormSchedule />
                  Schedule Interview
                </motion.button>
              </div>
            </motion.div>
             <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="relative w-full md:w-auto"
            >
              <div    onClick={onClickDirectDownload} className=" cursor-pointer relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/resume_thumbnail.JPG"
                  width={600}
                  height={800}
                  alt="Resume preview"
                  className="w-full object-cover"
                  onClick={onClickDirectDownload}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"/>
              </div>
            </motion.div>
          

          </div>
        </div>

        {/* Floating Plant Icons */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-10 text-green-600 text-4xl opacity-30"
        >
          <PiPlantLight />
        </motion.div>
      </motion.div>
    </>
  );
}

export default Resume;

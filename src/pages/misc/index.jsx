import React from "react";
import Image from "next/image";
import Head from "next/head";
import { HighLightedSpan } from "@/components/base/HighlightedSpan";
import { MORE_VERSIONS } from "@/utils/data";
import Button from "@/components/base/Button";
import Link from "next/link";
import { motion } from "framer-motion";

function MiscPage() {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-b overflow-x-hidden from-white via-orange-50/50 to-orange-100/30"
    >
      <Head>
        <title>Other Versions | Ashutosh Tripathi</title>
        <meta
          name="description"
          content="Discover the different facets of Ashutosh Tripathi's life beyond technology"
        />
      </Head>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block  px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
              Beyond Tech
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 font-serif">
              Different Versions of{" "}
              <span className="text-orange-600">Ashutosh</span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto font-serif"
          >
            Life is multifaceted, and so am I. Beyond the world of technology,
            I wear many hats and explore various dimensions of life.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {MORE_VERSIONS.map((version, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={`/images/versions${version.img}`}
                  alt={version.name}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="relative p-8">
                <h3 className="text-2xl font-bold text-orange-600 font-serif mb-3">
                  {version.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {version.description || "Exploring another dimension of life"}
                </p>
              </div>

              {/* <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                  Version {index + 1}
                </span>
              </div> */}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <Link href="/misc/best-captured">
            <Button className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span>Discover More About Me</span>
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </Link>
        </motion.div>

        {/* Background Decorations */}
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <Image
          className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 opacity-30 max-w-[400px]"
          src="/images/travel_illu.png"
          width={400}
          height={400}
          alt="Decorative illustration"
        />
        <Image
          className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 opacity-30 max-w-[400px]"
          src="/images/travel_illu.png"
          width={400}
          height={400}
          alt="Decorative illustration"
        />
      </motion.div>
      </div>
    </motion.div>
  );
}

export default MiscPage;
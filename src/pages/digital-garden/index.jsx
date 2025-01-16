import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  FaSeedling,
  FaExternalLinkAlt,
  FaGithub,
  FaUsers,
  FaLeaf,
} from "react-icons/fa";
import { ADMIN_LINK, DEFAULT_AVATAR } from "@/utils/constant";

// Sample categories data - move to constants file in production
const GARDEN_CATEGORIES = [
  {
    name: "Namaste Node.js",
    desc: "Read digital notes from Akshay Saini's Node.js Course",
    count: 14,
    route: "/digital-garden/notes/namaste-node-js/prerequisite",
  },
  {
    name: "Frontend System Design",
    desc: "Get access to Chirag Goel's & Akshay Saini's premium FSD course digital notes",
    count: 4,
    route: "/digital-garden/notes/front-end-design-system/how-the-web-works",
  },
  {
    name: "Procoder Node.js",
    desc: "Get notes from the course by Anurag Singh (Procoder)",
    count: 20,
    route:
      "/digital-garden/notes/backend-with-nodejs-by-procoderr-notes/e1-welcome",
  },
  {
    name: "JavaScript Quick Snippets",
    desc: "Get 100+ JS snippets that will help you in your next interview",
    count: 2,
    route: "/digital-garden/notes/javascript-snippets/data-types-in-javascript",
  },
  {
    name: "You Don't Know JS",
    desc: "Read digital notes from Kyle Simpson's book YDKJS",
    count: 2,
    route: "/digital-garden/notes/ydkjs/e1-into-programming",
  },
  {
    name: "Explore & Contribute",
    desc: "Read all premium notes curated by many engineers and contribute to help others",
    count: 1,
    route: "/digital-garden/notes",
  },
];

function DigitalGarden({ posts }) {
  const router = useRouter();
 

  const testimonials2 = posts.map((post) => {
   
    const newObj = {
      name:
        post.frontMatter?.name || post?.frontMatter?.title || "Anonyms User ",
      role: post.role || "Software Engineer",
      comment: post.content,
      avatar:
        post.frontMatter?.profilePic || post?.profilePic || DEFAULT_AVATAR,
      followLink: post.frontMatter?.followLink,
      link:'https://github.com/ashumsd7/heyashu/tree/main/src/content/testimonials'
    };
 
    return newObj;
  });

  testimonials2.push({
    name: "Malhamahmed",
    role: "Full Stack Engineer",
    comment: `Bro thank you so much for these notes , your contribution is appreciated 
I can literally revise while on a uber ride ect 
Gvanks`,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    link:'https://github.com/ashumsd7/heyashu/tree/main/src/content/testimonials'
  });
  console.log("testimonials2 >>>>>>>>> 123>", testimonials2);
   

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen  ">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-10 overflow-hidden">
        <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-green-400 rounded-full blur-3xl -top-20 -left-20 animate-blob"></div>
        <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-blue-400 rounded-full blur-3xl top-1/2 right-20 animate-blob animation-delay-2000"></div>
        <div className="absolute w-64 md:w-96 h-64 md:h-96 bg-purple-400 rounded-full blur-3xl bottom-20 left-1/2 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-16 md:py-32 px-2 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <FaSeedling className="text-5xl md:text-7xl text-green-600 mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold pb-4 md:pb-6 bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text"
          >
            Open-sourced Digital Garden
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl   text-gray-600 mb-8 px-4"
          >
            A collaborative space for open-source knowledge sharing. Learn,
            contribute, and grow together.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/digital-garden/notes")}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 text-sm md:text-base md:px-8 md:py-4 rounded-lg shadow-lg hover:shadow-green-500/30 transition-all w-full sm:w-auto"
            >
              Read Digital Notes
            </motion.button>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open("https://github.com/ashumsd7/heyashu", "_blank")
              }
              className="bg-white border-2 border-green-600 text-green-600 px-6 py-3 text-sm md:text-base md:px-8 md:py-4 rounded-lg shadow-lg hover:shadow-green-500/20 transition-all w-full sm:w-auto"
            >
              <FaGithub className="inline mr-2" />
              30+ Star the repo
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 md:py-16 px-2 max-w-6xl mx-auto relative"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
          Explore, read, write, share!
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-4 md:gap-6"
        >
          {GARDEN_CATEGORIES?.map((item) => {
            if (item?.isHidden) return null;
            return (
              <motion.div
                key={item.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => router.push(item?.route)}
                className="bg-white/80 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-green-100"
              >
                <div className="flex gap-3 md:gap-4">
                  <div className="text-2xl md:text-3xl text-green-600 animate-pulse">
                    <FaLeaf />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl md:text-2xl font-medium">
                        {item?.name}
                        <span className="ml-2 text-xs md:text-sm px-2  py-1 bg-green-100 text-green-700 rounded-full">
                          {item?.count}+ pages
                        </span>
                      </h3>
                      <FaExternalLinkAlt className="text-gray-400 text-sm md:text-base" />
                    </div>
                    <p className="text-sm md:text-base text-gray-600">
                      {item?.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 md:py-16 bg-gradient-to-b from-green-50/50 to-blue-50/50 backdrop-blur-lg"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
            What Others Say
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          >
            {testimonials2.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full mb-4 border-2 border-green-200"
                />
                <p className="text-sm md:text-base text-gray-600 mb-4 italic">
                  "
                  {testimonial.comment.length > 100
                    ? testimonial.comment.substring(0, 150) + "..."
                    : testimonial.comment}
                  "
                </p>
                <h4 
                  onClick={() => window.open(testimonial.link, "_blank")}
                  className="font-medium text-green-700 text-sm md:text-base cursor-pointer hover:underline"
                >
                  {testimonial.name}
                </h4>
                <p className="text-xs md:text-sm text-gray-500">
                  {testimonial.role}
                </p>
              </motion.div>
            ))}
            <motion.div
              
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                <button
                  onClick={() => window.open(ADMIN_LINK, "_blank")}
                  className="text-green-600 font-medium hover:underline text-lg"
                >
                 +  Drop Feedback
                </button>
              </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-green-500 text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Become an Open Source Developer!
          </h2>
          <p className="mb-8 text-green-50 text-base md:text-lg">
            What are you waiting for? Join 30+ developers who are already
            sharing their unfinished projects and growing together. Share
            anything you have - every contribution matters!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(ADMIN_LINK, "_blank")}
            className="bg-white text-green-600 px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm md:text-base cursor-pointer hover:cursor-pointer"
          >
            Start Your Open Source Journey
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-lg border-t py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 mb-4 md:mb-0"
            >
              <FaSeedling className="text-xl md:text-2xl text-green-600" />
              <span className="text-lg md:text-xl font-medium">
                Digital Garden
              </span>
            </motion.div>
            <div className="flex gap-6 md:gap-8 text-sm md:text-base">
              {/* {["GitHub", "Contribute", "About"].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  {item}
                </motion.a>
              ))} */}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 mt-4 md:mt-0"
            >
              <FaUsers className="text-green-600" />
              <span className="text-sm md:text-base text-gray-600 cursor-pointer">
                Join our heyashu community
              </span>
            </motion.div>
          </div>
          <div className="text-center mt-6 md:mt-8 text-xs md:text-sm text-gray-500">
            © {new Date().getFullYear()} Digital Garden. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DigitalGarden;

export async function getStaticProps() {
  const directory = path.join(process.cwd(), "src/content/testimonials");
  const filenames = fs.readdirSync(directory);
  const posts = filenames.map((filename) => {
    // Read markdown file as string
    const fileContent = fs.readFileSync(
      path.join(directory, filename),
      "utf-8"
    );

    const { data: frontMatter, content } = matter(fileContent);

    return {
      frontMatter,
      content,
      slug: filename.replace(".md", ""),
    };
  });

  // Return the posts as props
  return {
    props: {
      posts,
    },
  };
}

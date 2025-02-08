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
import { generateSlug, removePublicFromPath } from "@/utils/functions";
import DigiGardenFooter from "@/components/garden/DigiGardenFooter";

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
        removePublicFromPath(post.frontMatter?.profilePic) ||
        removePublicFromPath(post?.profilePic) ||
        DEFAULT_AVATAR,
      followLink: post.frontMatter?.followLink,
      link: post.frontMatter?.followLink || "https://github.com/ashumsd7/heyashu/tree/main/src/content/testimonials",
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
    link: "https://github.com/ashumsd7/heyashu/tree/main/src/content/testimonials",
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
  
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pb-16 pt-8 md:py-32 px-2 text-center"
      >
        <div className="max-w-4xl mx-auto mt-8 sm:mt-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <FaSeedling className="text-5xl md:text-7xl text-green-600 dark:text-green-400 mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold pb-4 md:pb-6 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 text-transparent bg-clip-text"
          >
            Open-sourced Digital Garden
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            A collaborative space for open-source knowledge sharing. Learn,
            contribute, and grow together.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/digital-garden/notes")}
              className="bg-gradient-to-r from-green-600 to-green-500 dark:from-green-500 dark:to-green-400 text-white px-6 py-3 text-sm md:text-base md:px-8 md:py-4 rounded-lg shadow-lg hover:shadow-green-500/30 dark:hover:shadow-green-400/30 transition-all w-full sm:w-auto"
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
              className="bg-white dark:bg-gray-800 border-2 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 px-6 py-3 text-sm md:text-base md:px-8 md:py-4 rounded-lg shadow-lg hover:shadow-green-500/20 dark:hover:shadow-green-400/20 transition-all w-full sm:w-auto"
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
        className="pb-12 pt-6 md:py-16 max-w-6xl mx-auto relative"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 text-transparent bg-clip-text">
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
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-green-200 dark:border-green-700"
              >
                <div className="flex gap-3 md:gap-4">
                  <div className="text-2xl md:text-3xl text-green-500 dark:text-green-400 animate-pulse">
                    <FaLeaf />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-50">
                        {item?.name}
                        <span className="ml-2 text-xs md:text-sm px-2 py-1 bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-200 rounded-full">
                          {item?.count}+ pages
                        </span>
                      </h3>
                      <FaExternalLinkAlt className="text-gray-500 dark:text-gray-400 text-sm md:text-base" />
                    </div>
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-200">
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
        className="pb-12 pt-6 md:py-16  "
      >
        <div className="max-w-6xl mx-auto overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 text-transparent bg-clip-text">
            What Others Say
          </h2>
          <motion.div
            className="flex gap-6 md:gap-8"
            animate={{
              x: [0, -3000],
            }}
            transition={{
              x: {
                duration: 120,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              },
            }}
            style={{
              width: "max-content",
              maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)"
            }}
          >
            {[...testimonials2, ...testimonials2, ...testimonials2].map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[300px] md:w-[350px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-lg transition-all"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-green-600 dark:border-green-400"
                  />
                  <div>
                    <h4
                      onClick={() => window.open(testimonial.link, "_blank")}
                      className="font-medium text-green-700 dark:text-green-300 text-sm md:text-base cursor-pointer hover:underline"
                    >
                      {testimonial.name}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 italic">
                    "{testimonial.comment.length > 286
                      ? testimonial.comment.substring(0, 286) + "..."
                      : testimonial.comment}"
                    {testimonial.comment.length > 286 && (
                      <span
                        onClick={() => {
                          router.push(
                            "/digital-garden/testimonials/" +
                              generateSlug(testimonial.name)
                          );
                        }}
                        className="text-green-600 dark:text-green-400 hover:underline cursor-pointer ml-1"
                      >
                        read more
                      </span>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(ADMIN_LINK, "_blank")}
              className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
            >
              + Drop Your Feedback
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
  <DigiGardenFooter/>
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

import React from "react";
import { motion } from "framer-motion";

const Products = () => {
  const products = [
    {
      title: "Ask/Request/Query anything!",
      description: "Let's connect and discuss your tech questions. I'll help guide you forward.",
      icon: "❓", 
      buttonText: "Ask a Question",
      buttonLink: "https://topmate.io/aat/1148709/pay",
    },
    {
      title: "Resume Review (0-3 Years)", 
      description: "Let's review your resume together and make it stand out to recruiters.",
      icon: "📝",
      buttonText: "Schedule a Call",
      buttonLink: "https://topmate.io/aat/1148672",
    },
    {
      title: "Frontend Fresher's Interview",
      description: "Practice frontend interviews with me to boost your confidence and skills.",
      icon: "🎙️",
      buttonText: "Schedule a Call", 
      buttonLink: "https://topmate.io/aat/1148651",
    },
    {
      title: "Career Guidance (0-3 Years)",
      description: "Let's map out your tech career path and create a growth strategy.",
      icon: "🎯",
      buttonText: "Schedule a Call",
      buttonLink: "https://topmate.io/aat/1148715",
    },
    {
      title: "Mock Frontend Interview (1-2 Years)",
      description: "Practice interviews to overcome hesitation and master frontend concepts.",
      icon: "💻",
      buttonText: "Schedule a Call",
      buttonLink: "https://topmate.io/aat/1148690",
    },
    {
      title: "Mock Interview (3 Years)",
      description: "Let's prepare you for senior roles with focused interview practice.",
      icon: "🚀",
      buttonText: "Schedule a Call",
      buttonLink: "https://topmate.io/aat/1148727",
    },
  ];

  return (
    <div className="min-h-screen     ">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-green-200/30 to-emerald-300/30 dark:from-green-400/20 dark:to-emerald-500/20 rounded-full blur-2xl"></div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-green-700 to-gray-900 dark:from-gray-100 dark:via-green-400 dark:to-gray-100 bg-clip-text text-transparent mb-6 relative">
            Level Up Your Tech Career
            <div className="absolute -top-6 right-1/2 translate-x-32 rotate-12">
              <span className="text-4xl">🚀</span>
            </div>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Leverage my industry experience to accelerate your growth as a
            developer. Whether you're a fresher or have up to 3 years of
            experience, I'll help you navigate the path to your dream tech role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/40 to-emerald-200/40 dark:from-green-400/20 dark:to-emerald-500/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:translate-x-12 transition-transform duration-500"></div>

              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {product.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                {product.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>

              <button onClick={() => window.open(product.buttonLink, "_blank")} className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg">
                {product.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

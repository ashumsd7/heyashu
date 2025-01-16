import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaYoutube, FaBlog, FaMapMarkedAlt, FaPlane } from 'react-icons/fa';
import { traveledPlaces, pendingTravelPlaces } from '@/utils/data';
import { redirect } from 'next/dist/server/api-utils';

// Splash Screen Component
const SplashScreen = ({ finishLoading }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-300"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      initial={{ scale: 0.5, rotate: 0 }}
      animate={{ 
        scale: [0.5, 1, 0.5],
        rotate: [0, 360],
      }}
      transition={{ 
        duration: 2,
        times: [0, 0.5, 1],
        onComplete: finishLoading
      }}
    >
      <FaPlane className="text-6xl text-white animate-pulse" />
    </motion.div>
  </motion.div>
);

// Enhanced Snowflake/Particle component
const Particle = ({ delay }) => (
  <motion.div
    className="fixed w-2 h-2 bg-emerald-400/30 rounded-full pointer-events-none"
    initial={{ 
      y: -10, 
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
    }}
    animate={{ 
      y: typeof window !== 'undefined' ? window.innerHeight : 1000,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay: delay,
      ease: "linear"
    }}
  />
);

const Travelling = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  };

  const socialLinks = [
    {
      icon: <FaInstagram className="text-3xl" />,
      title: "Instagram",
      description: "Travel moments captured",
      link: "https://instagram.com/ashumsd7",
      color: "bg-gradient-to-br from-purple-600 to-pink-500"
    },
    {
      icon: <FaYoutube className="text-3xl" />,
      title: "YouTube",
      description: "Travel vlogs & stories",
      link: "www.youtube.com/@ashutoshanandtiwari6606",
      color: "bg-gradient-to-br from-red-600 to-red-500",
      redirect:true,
    },
    {
      icon: <FaBlog className="text-3xl" />,
      title: "Blog",
      description: "Detailed travel guides",
      link: "https://heyashu.in/blog?search=travel",
      color: "bg-gradient-to-br from-emerald-600 to-emerald-500"
    },
    {
      icon: <FaMapMarkedAlt className="text-3xl" />,
      title: "Let's Plan a trip",
      description: "Connect to explore the world together",
      link: "https://topmate.io/aat/1148709/pay",
      color: "bg-gradient-to-br from-blue-600 to-blue-500"
    }
  ];

  return (
    <>
      <AnimatePresence>
        {loading && <SplashScreen finishLoading={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-50 text-emerald-900 relative overflow-hidden"
      >
        {/* Particles Effect */}
        {[...Array(30)].map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}

        {/* Hero Section with Background Image */}
        <div className="relative h-[60vh] w-full mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/0 via-emerald-50/30 to-emerald-100/70" />
          <Image
            src="/images/ashu_travel.jpeg"
            alt="Travel Hero"
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 group-hover:opacity-90 grayscale opacity-90 object-center"
            style={{
              filter: 'brightness(0.9) contrast(1.1)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0.2))'
            }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/0 via-emerald-100/20 to-emerald-900/70 group-hover:from-emerald-50/0 group-hover:via-emerald-100/40 group-hover:to-emerald-900/80 transition-colors duration-500" />
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              Explore <span className="text-emerald-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">The World</span>
            </h1>
            <p className="text-xl text-white max-w-2xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
              Join me on a journey across continents and cultures
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto px-4">
          {/* Social Links Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 mb-16 relative z-10"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`${social.color} rounded-xl p-6 text-white shadow-xl`}
              >
                {social.redirect ? (
                  <a href={social.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center">
                    {social.icon}
                    <h3 className="text-xl font-semibold mt-4">{social.title}</h3>
                    <p className="text-sm opacity-90 mt-2">{social.description}</p>
                  </a>
                ) : (
                  <Link href={social.link} className="flex flex-col items-center text-center">
                    {social.icon}
                    <h3 className="text-xl font-semibold mt-4">{social.title}</h3>
                    <p className="text-sm opacity-90 mt-2">{social.description}</p>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Places Visited Section */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-12 text-center text-emerald-600">
              Wanderlust Chronicles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {traveledPlaces.map((place) => (
                <motion.div
                  key={place.name}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                    z: 50
                  }}
                  className="group relative perspective"
                >
                  <div className="relative h-64 rounded-xl overflow-hidden transform-gpu transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-500/25">
                    <Image
                      src={place.img}
                      alt={place.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent" />
                    <div className="absolute bottom-0 p-4 w-full">
                      <h3 className="text-xl font-semibold text-white">{place.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Future Adventures Section */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-12 text-center text-emerald-600">
              Future Adventures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {pendingTravelPlaces.map((place) => (
                <motion.div
                onClick={()=>{
                  if(place.link){
                    window.open(place.link, '_blank');
                  }
                }}
                  key={place.name}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                    z: 50
                  }}
                  className={`group relative perspective ${place.link ? 'cursor-pointer' : ''}`}
                >
                  <div className="relative h-64 rounded-xl overflow-hidden transform-gpu transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-500/25">
                    <Image
                      src={place.img}
                      alt={place.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-110 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-transparent" />
                    <div className="absolute bottom-0 p-4 w-full">
                      <h3 className="text-xl font-semibold text-white">{place.name}</h3>
                      <p className="text-sm text-emerald-200">Coming soon...</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </>
  );
};

export default Travelling;
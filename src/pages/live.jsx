import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaYoutube, FaDonate, FaArrowRight, FaPrayingHands, FaOm } from "react-icons/fa";

export default function LivePage() {
  // YouTube video ID - replace with your actual video ID
  const youtubeVideoId = "uoajCivCS5U";
  
  // Animation variants
  const animations = {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    },
    scaleOnHover: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 }
    }
  };

  return (
    <>
      <Head>
        <title>श्री भागवत कथा | Shrimad Bhagvat Katha Live</title>
        <meta name="description" content="Join our live Shrimad Bhagvat Katha event and support with your donations" />
        <meta property="og:title" content="श्री भागवत कथा | Shrimad Bhagvat Katha Live" />
        <meta property="og:description" content="Watch our live Bhagvat Katha event and support with your donations" />
      </Head>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <motion.div 
          {...animations.fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-white">
            <span className="text-orange-600 dark:text-orange-400">श्री भागवत कथा</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-orange-700 dark:text-orange-300">
            Shrimad Bhagvat Katha
          </h2>
          <div className="flex justify-center mb-6">
            <FaOm className="w-12 h-12 text-orange-500 dark:text-orange-400" />
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            <span className="font-semibold">आप सभी भक्तों का हमारे लाइव प्रसारण में स्वागत है</span>
            <br />
            Welcome to our divine live broadcast of Shrimad Bhagvat Katha
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* YouTube Live Stream */}
          <motion.div
            {...animations.fadeIn}
            transition={{ delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-xl dark:bg-slate-800 bg-white border-2 border-orange-300 dark:border-orange-700"
          >
            <div className="p-6 border-b border-orange-200 dark:border-orange-700 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-orange-800">
              <div className="flex items-center gap-3 mb-2">
                <FaPrayingHands className="text-orange-600 dark:text-orange-400 w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">कथा सुनें | Watch Live</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                लाइव प्रसारण यूट्यूब पर | Streaming live on YouTube
              </p>
            </div>
            <div className="aspect-video relative">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
                title="Bhagvat Katha Live Stream"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6 py-8 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-orange-800">
              <a 
                href={`https://www.youtube.com/live/${youtubeVideoId}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <motion.button
                  {...animations.scaleOnHover}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <FaYoutube className="w-5 h-5" />
                  यूट्यूब पर देखें | Watch on YouTube
                  <FaArrowRight className="ml-1" />
                </motion.button>
              </a>
            </div>
          </motion.div>

          {/* Donation QR Code */}
          <motion.div
            {...animations.fadeIn}
            transition={{ delay: 0.4 }}
            className="rounded-xl overflow-hidden shadow-xl dark:bg-slate-800 bg-white border-2 border-orange-300 dark:border-orange-700"
          >
            <div className="p-6 border-b border-orange-200 dark:border-orange-700 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-orange-800">
              <div className="flex items-center gap-3 mb-2">
                <FaDonate className="text-orange-600 dark:text-orange-400 w-6 h-6" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">दान | Donations</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                आपका दान इस पवित्र कार्य को आगे बढ़ाने में मदद करेगा
                <br />
                Your contribution helps us continue this sacred work
              </p>
            </div>
            <div className="p-6 flex flex-col items-center bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-slate-900 dark:to-slate-800">
              <div className="relative w-64 h-64 mb-6 bg-white p-4 rounded-lg border border-orange-200">
                <Image
                  src="/images/donation-qr.png"
                  alt="Donation QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
                इस QR कोड को स्कैन करें या नीचे दिए गए बटन पर क्लिक करें
                <br />
                Scan this QR code or click the button below
              </p>
            </div>
          </motion.div>
        </div>

        {/* Blessings message */}
        <motion.div
          {...animations.fadeIn}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-orange-700 dark:text-orange-300 mb-2 text-xl font-semibold">
            || हरे कृष्णा हरे राम ||
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            इस पवित्र कार्यक्रम में सम्मिलित होने के लिए आपका धन्यवाद
            <br />
            Thank you for joining us in this divine event
          </p>
          <a href="/" className="text-orange-600 dark:text-orange-400 hover:underline">
            ← होम पेज पर वापस जाएं | Return to Home
          </a>
        </motion.div>
      </div>
    </>
  );
} 

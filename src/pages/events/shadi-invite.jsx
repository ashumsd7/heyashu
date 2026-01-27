import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaMapMarkerAlt, FaHeart, FaHome, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PHONE_CALL_THIRTY_MIN } from '@/utils/constant';

export default function ShadiInvite() {
  const router = useRouter();
  const { name } = router.query;
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const guestName = name || '';
  const baseUrl = 'https://heyashu.in';
  const pageUrl = `${baseUrl}/events/shadi-invite${name ? `?name=${encodeURIComponent(name)}` : ''}`;

  // Images array
  const images = [
    '/marriagev0.png',
    '/marriagev1.png',
    '/marriagev2.png',
    '/marriagev3.png'
  ];

  // Google Maps direction link
  const mapsLink = 'https://www.google.com/maps?s=web&lqi=ChNoZWVyYSBtYXJyaWFnZSBsYXduSMm37erytICACForEAAQARACGAAYARgCIhNoZWVyYSBtYXJyaWFnZSBsYXduKggIAhAAEAEQApIBEm1hcnJpYWdlX2NlbGVicmFudA&vet=12ahUKEwj1guvWsI2RAxWkyDgGHRcuHOkQ1YkKegQILxAB..i&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KfmEFZC3CZo5MWgniTJ0OriK&daddr=Gate+No+3,+Masodha+Motinagar,+opposite+KMSM+Sugar+Mill,+Uttar+Pradesh+224201';
  
  // Barat destination link
  const baratLink = mapsLink;
  
  // Home direction link
  const homeDirectionLink = 'https://maps.app.goo.gl/MTQyDfjyGXg79TGV7';

  // Initialize audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const musicNumber = Math.floor(Math.random() * 3) + 1;
      const audio = new Audio(`/music_${musicNumber}.mp3`);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;

      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log('Audio autoplay prevented:', error);
        }
      };
      playAudio();

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []); 

  // Carousel navigation
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  // Auto carousel (optional - can be enabled)
  useEffect(() => {
    // Uncomment below to enable auto carousel
    // const interval = setInterval(() => {
    //   nextImage();
    // }, 5000);
    // return () => clearInterval(interval);
  }, []);

  const handleViewBaratDestination = () => {
    window.open(baratLink, '_blank');
  };

  const handleViewHomeDirection = () => {
    window.open(homeDirectionLink, '_blank');
  };

  const handleSendWish = () => {
    window.open(PHONE_CALL_THIRTY_MIN, '_blank');
  };

  return (
    <>
      <Head>
        <title>💒 Wedding Invitation - {guestName} | Priya 💒 Ashu</title>
        <meta name="description" content={`You are cordially invited to our wedding ceremony, ${guestName}. Join us in celebrating this special moment!`} />
        <meta name="keywords" content="wedding, invitation, marriage, celebration, shadi" />
        <link rel="icon" href="/marry.png" />
        <link rel="apple-touch-icon" href="/marry.png" />

        <meta property="og:title" content={`💒 Wedding Invitation - ${guestName} | Please come`} />
        <meta property="og:description" content={`You are cordially invited to our wedding ceremony, ${guestName}. Join us in celebrating this special moment!`} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Heyashu" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`💒 Wedding Invitation - ${guestName} | Priya 💒 Ashu`} />
        <meta name="twitter:description" content={`You are cordially invited to our wedding ceremony, ${guestName}. Join us in celebrating this special moment!`} />
        <link rel="canonical" href={pageUrl} />
      </Head>

      <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4 md:p-8">
        <div className="max-w-4xl w-full">
          {/* Top Section - Name and Invitation */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-8"
          >
            {guestName && (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-red-700 mb-3">
                Dear <span className="text-orange-600">{guestName}</span>,
              </h1>
            )}
            <p className="text-xl md:text-2xl font-serif text-gray-700">
              You are cordially invited
            </p>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full rounded-2xl overflow-hidden s mb-6 md:mb-8"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative w-full" style={{ aspectRatio: '3/4', minHeight: '500px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`Wedding Invitation ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority={currentIndex === 0}
                    quality={95}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-2xl text-orange-600" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg transition-all hover:scale-110 z-10"
                aria-label="Next image"
              >
                <FaChevronRight className="text-2xl text-orange-600" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-orange-500 w-8'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewBaratDestination}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-serif font-bold text-base px-6 py-3 rounded-full shadow-lg flex items-center justify-center gap-2"
            >
              <FaMapMarkerAlt className="text-lg" />
              <span>View Barat Destination</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewHomeDirection}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-serif font-bold text-base px-6 py-3 rounded-full shadow-lg flex items-center justify-center gap-2"
            >
              <FaHome className="text-lg" />
              <span>Home Direction</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendWish}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-serif font-bold text-base px-6 py-3 rounded-full shadow-lg flex items-center justify-center gap-2"
            >
              <FaHeart className="text-lg" />
              <span>Send a Wish Online</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

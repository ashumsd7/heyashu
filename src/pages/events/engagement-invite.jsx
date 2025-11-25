import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { PHONE_CALL_THIRTY_MIN } from '@/utils/constant';

export default function EngagementInvite() {
  const router = useRouter();
  const { name } = router.query;
  const [showImage, setShowImage] = useState(false);
  const audioRef = useRef(null);

  const guestName = name || '';
  const baseUrl = 'https://heyashu.in';
  const imageUrl = `${baseUrl}/engagement_card.jpg`;
  const pageUrl = `${baseUrl}/events/engagement-invite${name ? `?name=${encodeURIComponent(name)}` : ''}`;

  // Google Maps direction link
  const mapsLink = 'https://www.google.com/maps?s=web&lqi=ChNoZWVyYSBtYXJyaWFnZSBsYXduSMm37erytICACForEAAQARACGAAYARgCIhNoZWVyYSBtYXJyaWFnZSBsYXduKggIAhAAEAEQApIBEm1hcnJpYWdlX2NlbGVicmFudA&vet=12ahUKEwj1guvWsI2RAxWkyDgGHRcuHOkQ1YkKegQILxAB..i&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KfmEFZC3CZo5MWgniTJ0OriK&daddr=Gate+No+3,+Masodha+Motinagar,+opposite+KMSM+Sugar+Mill,+Uttar+Pradesh+224201';

  // Initialize audio on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Randomly select one of the three music files
      const musicNumber = Math.floor(Math.random() * 3) + 1;
      const audio = new Audio(`/music_${musicNumber}.mp3`);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;

      // Play audio
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log('Audio autoplay prevented:', error);
        }
      };
      playAudio();

      // Cleanup on unmount
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, []);

  // Pause audio when component unmounts or page is exited
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

  const handleSeeInvitation = () => {
    setShowImage(true);
  };

  const handleViewDirection = () => {
    window.open(mapsLink, '_blank');
  };

  const handleSendWish = () => {
    window.open(PHONE_CALL_THIRTY_MIN, '_blank');
  };

  return (
    <>
      <Head>
        <title>Engagement Invitation - {guestName} | Heyashu</title>
        <meta name="description" content={`You are cordially invited to our engagement ceremony, ${guestName}. Join us in celebrating this special moment!`} />
        <meta name="keywords" content="engagement, invitation, wedding, celebration" />
        
        {/* Favicon */}
        <link rel="icon" href="/engagement_cardv2.jpg" />
        <link rel="apple-touch-icon" href="/engagement_cardv2.jpg" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`Engagement Invitation - ${guestName} | Please come`} />
        <meta property="og:description" content={`You are cordially invited to our engagement ceremony, ${guestName}. Join us in celebrating this special moment!`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Heyashu" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Engagement Invitation - ${guestName} | Heyashu`} />
        <meta name="twitter:description" content={`You are cordially invited to our engagement ceremony, ${guestName}. Join us in celebrating this special moment!`} />
        <meta name="twitter:image" content={imageUrl} />
        
        <link rel="canonical" href={pageUrl} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {!showImage ? (
            <div
              key="invitation"
              className="max-w-2xl w-full text-center space-y-8 relative z-10"
            >
              {/* Decorative elements */}
              <div className="relative">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-6xl animate-pulse">
                  💕
                </div>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-rose-600 dark:text-rose-400 mt-16 mb-4">
                  Engagement Invitation
                </h1>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
                <p className="text-2xl md:text-3xl font-serif text-gray-800 dark:text-gray-200">
                  Dear <span className="font-bold text-rose-600 dark:text-rose-400">{guestName}</span>,
                </p>
                
                <div className="space-y-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 font-serif leading-relaxed">
                  <p>
                    You are cordially invited to celebrate our engagement ceremony!
                  </p>
                  <p>
                    Your presence would make our special day even more memorable.
                  </p>
                  <p className="text-rose-600 dark:text-rose-400 font-semibold">
                    Join us as we take this beautiful step together.
                  </p>
                </div>

                <button
                  onClick={handleSeeInvitation}
                  className="mt-8 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-serif font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  See Invitation
                </button>
              </div>
            </div>
          ) : (
            <div
              key="image"
              className="relative w-full h-screen flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/engagement_card.jpg"
                  alt="Engagement Invitation Card"
                  fill
                  className="object-contain"
                  priority
                  quality={95}
                />
              </div>

              {/* Dear {Name} overlay on top of image - plain text */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
                <p className="text-2xl md:text-3xl font-serif font-bold text-rose-600 dark:text-rose-400">
                  Dear <span className="text-pink-800 dark:text-pink-700">{guestName}</span>
                </p>
              </div>

              {/* Floating Buttons - Left Bottom, stacked vertically */}
              <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
                {/* View Direction Button */}
                <button
                  onClick={handleViewDirection}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors border-b-2 border-dotted border-gray-300 dark:border-gray-600 hover:scale-105 active:scale-95"
                >
                  <FaMapMarkerAlt className="text-xl text-rose-600 dark:text-rose-400" />
                  <span className="font-serif font-semibold">View Direction</span>
                </button>

                {/* Send a Wish Online Button */}
                <button
                  onClick={handleSendWish}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 hover:from-rose-600 hover:to-pink-600 transition-all border-b-2 border-dotted border-rose-300 hover:scale-105 active:scale-95"
                >
                  <FaHeart className="text-xl" />
                  <span className="font-serif font-semibold">Send a Wish Online</span>
                </button>
              </div>

              {/* Back button */}
              <button
                onClick={() => setShowImage(false)}
                className="fixed top-6 left-6 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg rounded-full p-3 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>
          )}
      </div>
    </>
  );
}

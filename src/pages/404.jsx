import React from "react";
import Link from "next/link";
import { GiPlantWatering, GiPlantRoots } from "react-icons/gi";
import { BiArrowBack } from "react-icons/bi";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Symbol */}
          <div className="relative">
            <GiPlantRoots className="text-[180px] mx-auto text-green-800/10" />
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         text-7xl font-bold text-green-800">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold text-green-700">
              Looks Like This Plant Hasn't Grown Yet
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              The page you're searching for might be dormant or has been relocated to a different part of the garden.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3
                       bg-green-700 text-white rounded-lg hover:bg-green-800
                       transition-colors duration-200 shadow-sm"
            >
              <BiArrowBack className="text-xl" />
              Back to Home
            </Link>
            <Link 
              href="/digital-garden"
              className="inline-flex items-center justify-center gap-2 px-6 py-3
                       border-2 border-green-700 text-green-700 rounded-lg
                       hover:bg-green-50 transition-colors duration-200"
            >
              <GiPlantWatering className="text-xl" />
              Visit Garden
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
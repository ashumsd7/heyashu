import React, { useEffect, useState } from "react";
import Button from "./Button";

const PromotionTechDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      toggleDialog();
    }, 2000);

    return () => {};
  }, []);

  return (
    <>
      {isOpen && (
        <div className="flex items-center justify-center min-h-screen bg-transparent">
          {/* Button to open the dialog */}

          {/* Dialog */}
          <div
            className={`fixed inset-0 flex items-center justify-center bg-gray-200 600 bg-opacity-80 transition-opacity duration-300 ease-in-out ${
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            <div className="relative bg-orange-600 text-gray-700 rounded-lg shadow-lg max-w-md w-full p-6 transform transition-transform duration-300 ease-in-out">
              {/* Close Button */}
              <button
                onClick={toggleDialog}
                className="absolute top-4 right-4 text-white font-extrabold"
              >
                ✕
              </button>
              {/* Heading */}
              <h2 className="text-xl font-bold text-white mb-4">
                Ace Your Next Interview - Free Mock Session 🚀
              </h2>
              {/* Description */}
              <p className="mb-6 text-white">
                Ready to boost your confidence and perfect your interview
                skills? Whether you're a fresher or looking to refine your
                resume, I'm here to guide you every step of the way. Let's
                connect and schedule a free session to get you prepared for
                success. Drop me a message now to get started!
              </p>
              {/* Actions */}
              <div className="flex justify-between">
                <Button
                  onClick={toggleDialog}
                  className="bg-transparent border"
                >
                  Not Now
                </Button>
                <Button
                  onClick={() => {
                    toggleDialog();
                    window.open(PHONE_CALL_THIRTY_MIN, "_blank");
                  }}
                >
                  Schedule Free Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionTechDialog;

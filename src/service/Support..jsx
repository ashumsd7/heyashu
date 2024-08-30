import useScreenSize from "@/hooks/useScreenSize";
import { HOME_PAGE_TOUR_KEY } from "@/utils/constant";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { CardinalOrientation, Walktour } from "walktour";
function Support({ setIsSupportBtnActive, active }) {
  const screenSize = useScreenSize();

  const [isTourOn, setIsTourOn] = useState(true);
  const mySteps = [
    {
      description: ` I'm saving up for a personal laptop by my birthday in February 2025. Any contribution would help me reach my goal. Thank you for your support!`,
      title: "But me a Laptop 💻 ",
      isFirst: true,
      img: "https://i.ibb.co/TvnZm4K/qr.png",
    },
  ];

  const handleNextStep = (tourLogic) => {
    document.body.style.overflow = "auto";
    setIsSupportBtnActive(false);
    setIsTourOn(false);
  };

  useEffect(() => {

    if (screenSize?.width < 770) {
      return;
    }


    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [active]);
  return (
    <div className="lg:block hidden">
      {isTourOn && (
        <Walktour
          isOpen={isTourOn}
          steps={mySteps}
          identifier="ASHUTOSH_ANAND_TIWARI_WEBSITE_TOUR"
          disableCloseOnClick
          customNextFunc={handleNextStep}
          disableMaskInteraction={true}
          customTooltipRenderer={({ stepContent, next, prev, close }) => {
            return (
              <div
                id="spotlight-card"
                className="bg-white p-4 rounded-lg shadow-lg "
                style={{
                  width: stepContent?.isFirst ? "520px" : "470px",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <div
                  className=""
                  style={{
                    height: "100%",
                  }}
                >
                  {/* <div class="w-full bg-gray-200 rounded-full h-4">
                    <div
                      class="bg-green-500 h-4 rounded-full"
                      style="width: 50%;"
                    ></div>
                  </div> */}
                  <div className="w-1/3  rounded-md flex flex-col gap-2">
               
                    <div className=" text-white text-center rounded">
                      <img
                        style={{
                          background: "white",
                        }}
                        width={"200"}
                        height={"200"}
                        src={stepContent?.img}
                        alt="ashumsd7@ybl"
                        className=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "-15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {" "}
                    <h2
                      className="text-xl font-bold mt-8 text-center"
                      style={{
                        color: "#ea580c",
                        textAlign: "center",
                      }}
                    >
                      {stepContent?.title}  
                    </h2>
                  </div>
                  <span className="text-xs font-semibold ">Collected  ₹1200 / ₹45000</span> 
                  <div>
                    <p className="text-gray-800 font-semibold  leading-relaxed mt-2">
                      {stepContent?.description}🙏 
                    </p>
                  </div>
                  <div className="flex justify-center gap-2 mt-4 w-full">
                    <button
                      onClick={() => {
                        next();
                      }}
                      style={{
                        background: "#ff725e",
                        padding: "4px 15px",
                        fontWeight: "bold",
                        borderRadius: "4px",
                        color: "white",
                        width: "70%",
                      }}
                    >
                      Ohk, I got it.
                    </button>
                  </div>
                </div>
              </div>
            );
          }}
        />
      )}
    </div>
  );
}

export default Support;

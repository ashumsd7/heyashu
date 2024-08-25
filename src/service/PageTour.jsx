import useScreenSize from "@/hooks/useScreenSize";
import { HOME_PAGE_TOUR_KEY } from "@/utils/constant";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { CardinalOrientation, Walktour } from "walktour";
function PageTour() {
  const screenSize = useScreenSize();
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      if (screenSize?.width < 999) {
        return;
      }

      const { showTourAgain } = router.query;

      if (showTourAgain) {
        localStorage.setItem(HOME_PAGE_TOUR_KEY, "false");
      }

      const isShowedOnce = localStorage.getItem(HOME_PAGE_TOUR_KEY);
      if (isShowedOnce !== "true") {
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", function (event) {
          if (
            event.ctrlKey &&
            (event.key === "+" || event.key === "-" || event.key === "=")
          ) {
            event.preventDefault();
          }
        });
        setIsTourOn(true);
      } else {
        document.body.style.overflow = "auto";
        setIsTourOn(false);
      }
    }, 1000);
  }, [router]);
  const [isTourOn, setIsTourOn] = useState(false);
  const mySteps = [
    {
      description: ` Hi there! I’m Ashutosh Anand Tiwari. Let me guide you through my website where I share my journey, experiences, and knowledge. Let’s explore together!`,
      title: "Welcome to My Digital Space! 🎉",
      isFirst: true,
      img: "https://i.ibb.co/ZYztpgb/welcome.png",
    },
    {
      selector: "#tech-link",
      description: `Dive into my skills, experiences, and the projects I've worked on. Download my resume and explore my digital notes on various technologies`,
      orientationPreferences: [CardinalOrientation.SOUTH],
      title: "Explore My Tech Journey 🚀",
      img: "https://i.ibb.co/jh7212n/tech.png",
    },
    {
      selector: "#blogs-link",
      description: `Read my thoughts on tech and non-tech topics. You can also contribute by writing your own blogs and sharing insights with the community!`,
      orientationPreferences: [CardinalOrientation.SOUTH],
      title: "Discover Blogs 📝",
      img: "https://i.ibb.co/9NFsjvz/blogs.png",
    },
    {
      selector: "#notes-link",
      description: ` Find in-depth notes on JavaScript, interview prep, and other tech subjects. A perfect resource to boost your knowledge and skills!`,
      orientationPreferences: [CardinalOrientation.SOUTH],
      title: "Digital Notes Hub 📚",
      img: "https://i.ibb.co/pwCSSc4/notes.png",
    },
    {
      selector: "#travel-link",
      description: `Journey with me through my travel experiences! Discover exciting stories and tips from my adventures around the world.`,
      orientationPreferences: [CardinalOrientation.WESTNORTH],
      title: "Travel Diaries 🌍",
      img: "https://i.ibb.co/yBvJV17/travel.png",
    },
    {
      selector: "#social-links",
      description: ` Follow and connect with me on various social media platforms. Let’s build a strong and engaging network together!`,
      orientationPreferences: [CardinalOrientation.NORTH],
      title: "Connect with Me 🌐",
      img: "https://i.ibb.co/mRxYxGJ/connect.png",
    },
    {
      selector: "#quick-message",
      description: `Have a question or need advice? Send me a quick message, and I'll get back to you within seconds. Let's chat!`,
      // orientationPreferences: [CardinalOrientation.WESTNORTH],
      title: "Quick Message 💬",
      img: "https://i.ibb.co/6N6xH4f/chat.png",
    },
    {
      selector: "#start-tour",
      description: `Thank you for visiting! its time  explore my digital space. Feel free to restart the tour from here!`,
      title: "Restart the Tour Anytime 🔄",
      isLast: true,
      img: "https://i.ibb.co/ynQHvd2/tour.png",
    },
  ];

  const handleNextStep = (tourLogic) => {
    const selector = document.querySelector(tourLogic?.stepContent?.selector);
    selector?.classList.add("no-click");
    if (tourLogic?.stepIndex == 7) {
      setIsTourOn(false);
      document.body.style.overflow = "auto";
      const elements = document.querySelectorAll(".no-click");

      // Loop through each element and remove the class 'no-click'
      elements.forEach((element) => {
        element?.classList.remove("no-click");
      });
      localStorage.setItem(HOME_PAGE_TOUR_KEY, "true");
      return;
    }
    tourLogic?.next();
  };
  return (
    <div className="lg:block hidden">
      <Walktour
        className="lg:block hidden"
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
                <div className="w-1/3  rounded-md">
                  <div className=" text-white text-center rounded">
                    {/* <p className="text-sm">Some</p>
            <p className="text-sm">Illustration</p> */}
                    <img
                      style={{
                        background: "white",
                      }}
                      width={"200"}
                      height={"200"}
                      src={stepContent?.img}
                      alt="Illustration"
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
                  {/* <MdOutlineClose
            style={{
              fontWeight: "bolder",
            }}
            className="text-gray-800 cursor-pointer font-extrabold absolute right-2 top-2  text-xl "
          /> */}
                </div>
                <div>
                  <p className="text-gray-800 font-semibold  leading-relaxed mt-2">
                    {stepContent?.description}
                  </p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => {
                      if (stepContent?.isFirst) {
                        localStorage.setItem(HOME_PAGE_TOUR_KEY, "true");
                        close();
                        setIsTourOn(false);
                      }
                      prev();
                    }}
                    className="text-gray-800 border px-4 py-1 rounded-md font-semibold"
                  >
                    {stepContent?.isFirst ? "Not now" : "Prev"}
                  </button>

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
                    }}
                  >
                    {stepContent?.isFirst
                      ? "Start the tour"
                      : stepContent?.isLast
                      ? "Got it"
                      : "Okay, Next"}
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

export default PageTour;

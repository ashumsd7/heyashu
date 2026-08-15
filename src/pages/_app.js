import React, { useEffect } from "react";
import Layout from "@/components/base/Layout";
import Navbar from "@/components/base/Navbar";
import QuickMsgBtn from "@/components/ui/QuickMsgBtn";
import "@/styles/globals.css";
import "@fontsource/source-serif-pro";
import { HOME_PAGE_TOUR_KEY, PHONE_CALL_THIRTY_MIN } from "@/utils/constant";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import StartTour from "@/components/ui/StartTourBtn";
import TransitionPage from "@/components/base/Transition";
import PlausibleProvider from "next-plausible";
import Script from "next/script";
import GoogleAnalytics from "@/components/ui/GoogleAnalytics";
import { ThemeProvider } from "next-themes";
import {
  isNotesChapterPage,
  shouldUseDigitalGardenLayout,
  withBareLayout,
  withDigitalGardenLayout,
  withSiteLayout,
} from "@/layouts";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const canonicalUrl = `https://www.heyashu.in${router?.asPath?.split("?")[0] || ""}`;

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        if (registration.active?.scriptURL?.includes("/sw.js")) {
          registration.unregister();
        }
      });
    });
  }, []);

  // 1) Page can opt in explicitly via Component.getLayout
  // 2) Notes chapter /digital-garden/notes/:series/:slug → bare full page
  // 3) Else /blog + /product + /contributing-guide + /digital-garden/* → Digital Garden navbar
  // 4) Else → main site Navbar + Layout
  const getLayout =
    Component.getLayout ||
    (isNotesChapterPage(router.pathname)
      ? withBareLayout
      : shouldUseDigitalGardenLayout(router.pathname)
        ? withDigitalGardenLayout
        : withSiteLayout);

  return (
    <>
      <Head>
     
        {/* strategy="afterInteractive" */}
        <Script
          id="adsbygoogle-init"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6990943232540646"
          crossorigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ashutosh Anand Tiwari — Digital Garden",
              url: "https://www.heyashu.in",
              description:
                "Free digital notes, blogs, and engineering notes by Ashutosh Anand Tiwari.",
              author: {
                "@type": "Person",
                name: "Ashutosh Anand Tiwari",
                url: "https://www.heyashu.in",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.heyashu.in/blog?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <PlausibleProvider domain="heyashu.in">
        <GoogleAnalytics/>
        <TransitionPage>
          <ThemeProvider attribute="class">
            <main className="relative">
              {getLayout(<Component {...pageProps} />)}
              <div className="fixed right-3 bottom-[50px] flex flex-col gap-6  items-end">
                {/* <StartTour
                  onClick={() => {
                    router.push({
                      pathname: "/",
                      query: { ...router.query, showTourAgain: "true" },
                    });
                    // setTimeout(()=>{
                    //   localStorage.setItem(HOME_PAGE_TOUR_KEY, "false");
                    //   window.location.reload()
                    // },1000)
                  }}
                /> */}
                <QuickMsgBtn
                  onClick={() => {
                    window.open(PHONE_CALL_THIRTY_MIN, "_blank");
                  }}
                />
                {/* <a href="https://www.buymeacoffee.com/ashumsd7" style={{
            fontSize:'20px'
          }}>
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a laptop&emoji=💻️&slug=ashumsd7&button_colour=FF5F5F&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" />
          </a> */}
              </div>
            </main>
          </ThemeProvider>
        </TransitionPage>
      </PlausibleProvider>
    </>
  );
}

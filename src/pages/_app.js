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
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const canonicalUrl = `https://www.heyashu.in${router?.asPath}`;

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        ></link>
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
              "@type": "Blog",
              name: "Ashutosh Anand Tiwari ",
              url: "https://www.heyashu.com",
              description:
                "A blog and notes collection about tech and JavaScript journey by Ashutosh Anand Tiwari .",
              author: {
                "@type": "Person",
                name: "Ashutosh Anand Tiwari",
              },
              blogPost: [
                {
                  "@type": "BlogPosting",
                  headline: "Tech Journey by Ashutosh Anand Tiwari ",
                  url: "https://www.heyashu.com/tech/",
                  datePublished: "2024-08-21",
                  author: {
                    "@type": "Person",
                    name: "Ashutosh Anand Tiwari",
                  },
                },
                {
                  "@type": "BlogPosting",
                  headline:
                    "What are Syntax and Expressions in JS by Ashutosh Anand Tiwari ",
                  url: "https://www.heyashu.com/blogs/what-are-syntax-and-expressions-in-js",
                  datePublished: "2024-08-21",
                  author: {
                    "@type": "Person",
                    name: "Ashutosh Anand Tiwari",
                  },
                },
                {
                  "@type": "BlogPosting",
                  headline: "Namaste Node JS Notes by Ashutosh Anand Tiwari ",
                  url: "https://www.heyashu.com/tech/notes/namaste-node-js",
                  datePublished: "2024-08-21",
                  author: {
                    "@type": "Person",
                    name: "Ashutosh Anand Tiwari",
                  },
                },
                {
                  "@type": "BlogPosting",
                  headline: "JavaScript Code Snippets by Ashutosh Anand Tiwari",
                  url: "https://www.heyashu.com/tech/notes/javascript-code-snippets-by-ashutosh-anand-tiwari",
                  datePublished: "2024-08-21",
                  author: {
                    "@type": "Person",
                    name: "Ashutosh Anand Tiwari",
                  },
                },
              ],
            }),
          }}
        />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <PlausibleProvider domain="heyashu.in">
        <GoogleAnalytics />
        <TransitionPage>
          <ThemeProvider attribute="class">
            <main className="relative">
              <Navbar />
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <div className="fixed right-5 bottom-5 flex flex-col gap-6  items-end">
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

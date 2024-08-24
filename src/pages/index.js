import Head from "next/head";
import MainPage from "@/components/Home/MainPage";
import dynamic from "next/dynamic";
const PageTour = dynamic(() => import("@/service/PageTour"), {ssr: false});
export default function Home() {
  return (
    <>
      <Head>
        <title>Ashutosh Anand Tiwari - Personal Portfolio and Blog </title>

        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Explore the journey of Ashutosh Anand Tiwari, a passionate coder and traveler. Dive into his blogs on tech, travel, and more."
        />
        <meta
          name="keywords"
          content="Ashutosh Anand Tiwari, Tech Blogs, Travel Blogs, Personal Blog, Web Development, Programming, JavaScript"
        />
        <meta
          property="og:title"
          content="Ashutosh Anand Tiwari - Personal Blog and Portfolio"
        />
        <meta
          property="og:description"
          content="Join Ashutosh Anand Tiwari as he shares insights on tech, travel, and his life journey. Explore engaging blogs and personal stories."
        />
        <meta
          property="og:image"
          content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
        />
        <meta property="og:url" content="https://www.heyashu.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ashutosh Anand Tiwari - Personal Blog and Portfolio"
        />
        <meta
          name="twitter:description"
          content="Explore the world of Ashutosh Anand Tiwari through his tech and travel blogs."
        />
        <meta
          name="twitter:image"
          content="https://heyashu.in/_next/image?url=%2Fimages%2Fprofile.jpg&w=640&q=75"
        />
      </Head>


      <main className="">
        <MainPage />
      </main>

      <PageTour/>
    </>
  );
}

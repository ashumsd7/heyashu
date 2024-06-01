import Head from "next/head";
import MainPage from "@/components/Home/MainPage";

export default function Home() {
  return (
    <>
      <Head>
        <title> Ashutosh Anand Tiwari </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        He is someone who wants to experience every kind of life. Following the
        concept of "Zindagi Na Milegi Dobara," he continues his journey through
        life. Let's connect and explore the world together!
      </Head>
      <main className="">
        <MainPage />
      </main>
    </>
  );
}

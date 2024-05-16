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
        <meta
          name="description"
          content="My name is Ashutosh Anand Tiwari. I'm a Software Engineer from the holy city of Ayodhya, Uttar Pradesh, the birthplace of Lord Rama. I'm passionate about coding, traveling (now exploring India and Nepal), and capturing moments through photography. In my downtime, I enjoy arcade games, cricket (big fan of Kohli and Dhoni), and spreading joy wherever I go. Let's connect and share our experiences!"
        />
      </Head>
      <main className="">
        <MainPage />
      </main>
    </>
  );
}

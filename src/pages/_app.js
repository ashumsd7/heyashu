import Layout from "@/components/base/Layout";
import Navbar from "@/components/base/Navbar";
import QuickMsgBtn from "@/components/ui/QuickMsgBtn";
import "@/styles/globals.css";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <main className="relative">
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Link href='/misc/quick-message' className="fixed right-0 bottom-0" >
        <QuickMsgBtn onClick={null} />
      </Link>
    </main>
  );
}

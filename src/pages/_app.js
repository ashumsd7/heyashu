import Layout from "@/components/base/Layout";
import Navbar from "@/components/base/Navbar";
import QuickMsgBtn from "@/components/ui/QuickMsgBtn";
import "@/styles/globals.css";
import '@fontsource/source-serif-pro';
import { PHONE_CALL_THIRTY_MIN } from "@/utils/constant";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <main className="relative">
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div
        className="fixed right-0 bottom-2"
        onClick={() => {
          window.open(PHONE_CALL_THIRTY_MIN, "_blank");
        }}
      >
        <QuickMsgBtn onClick={null} />
      </div>
    </main>
  );
}

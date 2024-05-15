import Layout from "@/components/base/Layout";
import Navbar from "@/components/base/Navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <main className="">
      <Navbar />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}

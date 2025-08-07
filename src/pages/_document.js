import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/app.png"></link>
        <meta name="theme-color" content="#000" />
        <meta name="google-adsense-account" content="ca-pub-6990943232540646" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6990943232540646" crossorigin="anonymous"></script>
        <style>
          {`@import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css');`}
        </style>
      </Head>

      <body>
        <Main />
        <NextScript />
        <Script
          id="netlify-identity"
          strategy="afterInteractive"
        >
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", (user) => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </Html>
  );
}

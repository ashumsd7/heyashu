import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/app.png"></link>
        <meta name="theme-color" content="#000" />
      </Head>

      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", (user) => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            });
          }
          `,
          }}
        />
      </body>
    </Html>
  );
}

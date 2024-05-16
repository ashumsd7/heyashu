import ComingSoon from "@/components/base/CommingSoon";
import React from "react";

function TownPage() {
  return (
    <>
      <Head>
        <title>Hometown : Ashutosh Anand Tiwari </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Ashutosh Anand Tiwari lives in Charawan Ayodhya UP"
        />
      </Head>
      <div>
        <ComingSoon />
      </div>
    </>
  );
}

export default TownPage;

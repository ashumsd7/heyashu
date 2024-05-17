import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY_FASTSMS, PHONE_CALL_THIRTY_MIN } from "@/utils/constant";
import Image from "next/image";
import Button from "@/components/base/Button";
import Head from "next/head";
function SendQuickMessage() {
  const [msg, setMsg] = useState("");
  const [isMessageSent, setIsMessageSent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("aat_msg") &&
      localStorage.getItem("aat_msg").trim().length > 0
    ) {
      setIsMessageSent(true);
    }
  }, []);
  const onSendMessage = () => {
    if (isLoading) return;

    if (msg.trim() == "") {
      alert("Hey don't send empty envelop :)");
      return;
    }
    setIsLoading(true);

    const apiUrl = "https://www.fast2sms.com/dev/bulkV2";
    const apiKey = API_KEY_FASTSMS;
    const message = msg;
    const language = "english";
    const route = "q";
    const numbers = "7800818001";

    axios
      .get(apiUrl, {
        params: {
          authorization: apiKey,
          message: message,
          language: language,
          route: route,
          numbers: numbers,
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("aat_msg", message);
        setIsMessageSent(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col justify-start mt-[80px] items-center h-screen relative ">
      <Head>
        <title>Quick Message for Ashutosh Anand Tiwari </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/envelop.ico" />
        <meta
          name="description"
          content="No, Ashutosh Anand Tiwari is just message away, if you have any feedback suggestion otr anything just send a message and notify Ashutosh."
        />
      </Head>

      {!isMessageSent ? (
        <div className="flex flex-col  items-center relative z-[10]">
          <h1 className="font-semibold mb-2  "> Share anything by a, </h1>
          <h1 className="text-5xl font-extrabold text-center text-orange-600 md:text-left font-serif mb-4 md:mb-0">
            Quick Message
          </h1>
        </div>
      ) : (
        <div className="flex flex-col  items-center relative z-[10]">
          <h1 className="text-5xl font-extrabold text-center text-orange-600 md:text-left font-serif mb-4 md:mb-0">
            Message is already sent
          </h1>
        </div>
      )}

      <p className="font-serif text-center text-lg mt-2 tracking-wider mb-4  relative z-[10]">
        {!isMessageSent ? (
          "I will be notified instantly when you click send button."
        ) : (
          <span className="text-justify italic">
            {localStorage.getItem("aat_msg")}
          </span>
        )}
      </p>

      {!isMessageSent ? (
        <div className="flex flex-col items-center lg:w-1/3 md:w-1/2 w-[90%] mx-auto relative z-[10] ">
          <textarea
            class="border-2 border-orange-600 relative z-[10] outline-none border-none text-orange-600 rounded-lg p-2 mb-4 w-full h-40 resize-none"
            placeholder="Type your message (max 160 characters)"
            onInput={(e) => {
              setMsg(e.target.value);
            }}
            maxlength="160"
          ></textarea>
          <button
            onClick={onSendMessage}
            class="bg-orange-600 text-white rounded-lg py-2 px-4 w-full"
          >
            Send
          </button>
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap justify-center md:justify-start">
          <Button
            onClick={() => {
              window.open(PHONE_CALL_THIRTY_MIN, "_blank");
            }}
          >
            Let's discuss more
          </Button>
        </div>
      )}
      <Image
        src="/images/envelop.png"
        width={"340"}
        height={"320"}
        className="absolute top-[-80px] left-0 opacity-90 "
      />
      <Image
        src="/images/envelop.png"
        width={"340"}
        height={"320"}
        className="absolute top-[100px] right-0 opacity-90 rotate-3 "
      />
    </div>
  );
}

export default SendQuickMessage;

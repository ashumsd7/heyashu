import React, { useState } from "react";
import Head from "next/head";
import { FiCopy, FiCheck, FiMapPin, FiPhone, FiLock } from "react-icons/fi";
import { withBareLayout } from "@/layouts";

const addresses = [
  {
    id: "ayodhya",
    tag: "Address 1",
    label: "Ayodhya",
    recipient: "Ashu Tiwari",
    lines: [
      "66, Charawan , Post Kodaila",
      "Distt Ayodhya UP",
      "PIN 224203",
      "Landmark: Near Sarkari Godam",
    ],
    pin: "224203",
    landmark: "Near Sarkari Godam",
    phone: "7800818001",
    rawCopyText: `Ashu Tiwari
66, Charawan , Post Kodaila
Distt Ayodhya UP
PIN 224203
Landmark Near Sarkari Godam
Phone no: 7800818001`,
  },
  {
    id: "noida",
    tag: "Address 2",
    label: "Noida",
    recipient: "Ashu Tiwari",
    lines: [
      "A 53 Pocket 4 Block 92 3rd floor",
      "Kendriye Vihar 2, Sector 82",
      "Noida",
      "PIN 201304",
    ],
    pin: "201304",
    phone: "7800818001",
    rawCopyText: `Ashu Tiwari
A 53 Pocket 4 Block 92 3rd floor
Kendriye Vihar 2, Sector 82 
Noida
PIN 201304
Phone no: 7800818001`,
  },
];

export default function PrivateAddressPage() {
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleCopy = async (id, text, label) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedId(id);
      setToastMessage(`${label} copied!`);

      setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 2500);

      setTimeout(() => {
        setToastMessage("");
      }, 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <Head>
        <title>Private Address | heyashu</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-zinc-200 dark:selection:bg-zinc-800">
        <div className="w-full max-w-3xl flex flex-col items-center">
          {/* Minimal Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-zinc-200/70 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 mb-3">
              <FiLock className="w-3.5 h-3.5" />
              <span>Private Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Addresses
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Tap copy button to copy formatted address to clipboard
            </p>
          </div>

          {/* Address Cards Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {addresses.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/90 p-6 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200"
                >
                  {/* Top Bar with Tag and Quick Icon */}
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800/60 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          {item.tag}
                        </span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {item.label}
                        </span>
                      </div>

                      {/* Header Copy Icon Button */}
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(item.id, item.rawCopyText, item.tag)
                        }
                        title={`Copy ${item.tag}`}
                        aria-label={`Copy ${item.tag}`}
                        className={`p-2 rounded-lg transition-all duration-150 ${
                          isCopied
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                            : "text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {isCopied ? (
                          <FiCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <FiCopy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Address Content */}
                    <div className="space-y-3 mb-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                      <div className="font-semibold text-base text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                        <FiMapPin className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                        <span>{item.recipient}</span>
                      </div>

                      <div className="pl-6 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {item.lines.map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>

                      <div className="pl-6 pt-1 flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        <FiPhone className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Phone: {item.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Copy Button */}
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(item.id, item.rawCopyText, item.tag)
                    }
                    className={`mt-2 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.98] ${
                      isCopied
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                        : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 shadow-sm"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <FiCheck className="w-4 h-4" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-4 h-4" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Minimal Toast Notification */}
          <div
            className={`fixed bottom-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium transition-all duration-300 pointer-events-none ${
              toastMessage
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <FiCheck className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{toastMessage || "Address copied"}</span>
          </div>
        </div>
      </main>
    </>
  );
}

PrivateAddressPage.getLayout = withBareLayout;

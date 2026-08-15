import React from "react";
import { GARDEN_SUPPORT_URL } from "@/data/garden/constants";

const HINDI =
  "Dekho Bai, ye jyada request ke liye paisa lgta hai, free model use kr rha hu jo ki out of limit chale jate hai — so help-welp kro, donate-sonate kro, taaki isko permanent laaya jaye. Thank u.";

const ENGLISH =
  "Look bhai, extra requests cost money. I'm running a free model that hits its limit — help-welp, donate-sonate so we can make this AI permanent. Thank you.";

const LOOP = `${HINDI}   ·   ${ENGLISH}   ·   `;

export default function AiErrorMarquee() {
  return (
    <a
      href={GARDEN_SUPPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block shrink-0 overflow-hidden border-b border-[#c9b896] no-underline"
      style={{ background: "#e8dcc6" }}
      title="Donate / support"
    >
      <div className="ai-err-marquee flex whitespace-nowrap py-2">
        <span className="px-4 font-ibm-sans text-[12px] font-medium tracking-[0.01em] text-[#1c1c1c]">
          {LOOP}
        </span>
        <span
          className="px-4 font-ibm-sans text-[12px] font-medium tracking-[0.01em] text-[#1c1c1c]"
          aria-hidden
        >
          {LOOP}
        </span>
      </div>
      <style jsx>{`
        .ai-err-marquee {
          width: max-content;
          animation: ai-err-scroll 28s linear infinite;
        }
        @keyframes ai-err-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </a>
  );
}

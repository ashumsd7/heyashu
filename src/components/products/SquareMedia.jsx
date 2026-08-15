import React from "react";
import { HiOutlineCubeTransparent } from "react-icons/hi2";

function hasSrc(src) {
  return Boolean(src && String(src).trim());
}

export default function SquareMedia({
  src,
  alt = "",
  className = "",
  sizeClass = "h-[112px] w-[112px] sm:h-[128px] sm:w-[128px]",
  rounded = "rounded-xl",
  fallback = null,
}) {
  const ready = hasSrc(src);

  return (
    <div
      className={`relative shrink-0 overflow-hidden border border-[#e8e2d7] bg-[#f3eee5] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:border-[#1e3328] dark:bg-[#172a20] ${rounded} ${sizeClass} ${className}`}
    >
      {ready ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-[#8a8276] dark:text-[#6d7f74]">
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(20,56,37,0.06) 25%, transparent 25%, transparent 75%, rgba(20,56,37,0.06) 75%), linear-gradient(45deg, rgba(20,56,37,0.06) 25%, transparent 25%, transparent 75%, rgba(20,56,37,0.06) 75%)",
              backgroundSize: "16px 16px",
              backgroundPosition: "0 0, 8px 8px",
            }}
          />
          {fallback ? (
            <span className="relative z-[1] text-3xl leading-none">{fallback}</span>
          ) : (
            <>
              <HiOutlineCubeTransparent className="relative z-[1] h-8 w-8" />
              <span className="relative z-[1] font-ibm-mono text-[9px] font-semibold uppercase tracking-[0.14em]">
                Image
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function ThumbnailMedia({ src, alt = "", className = "" }) {
  const ready = hasSrc(src);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#e8e2d7] bg-[#f3eee5] shadow-[0_12px_40px_rgba(20,56,37,0.08)] dark:border-[#1e3328] dark:bg-[#172a20] ${className}`}
    >
      {ready ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
          <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center gap-2 py-16 text-[#8a8276] dark:text-[#6d7f74]">
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.4]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(20,56,37,0.07) 25%, transparent 25%, transparent 75%, rgba(20,56,37,0.07) 75%), linear-gradient(45deg, rgba(20,56,37,0.07) 25%, transparent 25%, transparent 75%, rgba(20,56,37,0.07) 75%)",
              backgroundSize: "22px 22px",
              backgroundPosition: "0 0, 11px 11px",
            }}
          />
          <HiOutlineCubeTransparent className="relative z-[1] h-12 w-12" />
          <span className="relative z-[1] font-ibm-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
            Thumbnail
          </span>
        </div>
      )}
    </div>
  );
}

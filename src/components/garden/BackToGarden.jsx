import Link from "next/link";

export default function BackToGarden({ className = "" }) {
  return (
    <Link
      href="/digital-garden"
      className={`mb-5 inline-block text-[13px] font-medium text-[#6b6458] no-underline hover:text-[#143825] dark:text-[#92a59a] dark:hover:text-[#22c55e] ${className}`}
    >
      ← Back to Garden
    </Link>
  );
}

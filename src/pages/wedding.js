// LoaderRedirect.jsx
import { useEffect } from "react";

export default function LoaderRedirect() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href =
        "https://ashu-aur-priya-ki-shadi-hai.netlify.app/";
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <div className="mb-6 text-xl font-semibold animate-pulse">
          Hey, welcome 👋  
          <br />
          Let me bring you where you came for…
        </div>

        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>

        <div className="mt-4 text-sm text-gray-400">
          Redirecting in 5 seconds
        </div>
      </div>
    </div>
  );
}

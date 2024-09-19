// pages/index.js
import { useRouter } from "next/router";
import { SiHomeadvisor } from "react-icons/si";
import { GiFruitTree } from "react-icons/gi";
import ls from "local-storage";
export default function FirstRouteSelection() {
  const router = useRouter();

  const handleNavigate = (destination) => {
    router.push(destination);
  };

  return (
    <div className="flex flex-col  items-center justify-center h-screen bg-gray-100 overflow-hidden">
      <h1 className="text-6xl font-bold text-center font-serif">Namaste 🙏</h1>
      <p className="mt-8 text-center text-gray-600 mb-6 font-semibold ">
        Where would you like to visit?
      </p>

      <div className="flex space-x-6">
        {/* Home Button */}
        <div
          onClick={() => {
            ls.set("aat-visited", "true");
            handleNavigate("/")
          }}
          className="flex flex-col items-center cursor-pointer"
        >
          <span className="text-9xl text-gray-800 animate-pulse">
            <SiHomeadvisor className="" />
          </span>
          <p className="text-lg mt-2 font-bold">Home</p>
        </div>

        {/* Garden Button */}
        <div
          onClick={() => {
            ls.set("aat-visited", "true");
            handleNavigate("/digital-garden");
          }}
          className="flex flex-col items-center cursor-pointer"
        >
          <span className="text-9xl text-green-700 animate-pulse">
            <GiFruitTree />
          </span>
          <p className="text-lg mt-2 text-green-700 font-bold">Garden</p>
        </div>
      </div>

      <p className="mt-8 text-center text-gray-600 font-semibold">
        You can visit the Garden after visiting Home, or Home after visiting the
        Garden.
      </p>
    </div>
  );
}

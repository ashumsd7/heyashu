// components/Breadcrumb.js
import { capitalizeWords, reverseSlug } from "@/utils/functions";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaChevronRight } from "react-icons/fa"; // Importing a right arrow icon from react-icons
import { GiPalmTree } from "react-icons/gi";
const Breadcrumb = () => {
  const router = useRouter();
  const { pathname } = router;

  // Split the current path into parts
  const pathParts = pathname.split("/").filter((part) => part);
  console.log("pathParts", pathParts);
  if (pathParts.length <= 1) return;
  if (["resume", "[place]", "[slug]"].includes(pathParts[1])) return;

  let link3 = reverseSlug(pathParts[2]);
  link3 = capitalizeWords(link3);
  pathParts.splice(2, 1, link3);

  return (
    <nav
      aria-label="breadcrumb"
      className={`mb-8 md:pl-[100px] ${
        pathParts.length == 4 ? "md:pl-[337px]" : ""
      }`}
    >
      <ol className="flex items-center space-x-2 flex-wrap gap-4 md:gap-0 text-gray-600">
        <li key="home">
          <Link href="/" className="items-center text-[18px]">
            Home
          </Link>
        </li>
        {pathParts.map((part, index) => {
          // Construct the path for the current breadcrumb
          const href = "/" + pathParts.slice(0, index + 1).join("/");

          // Capitalize the first letter of each breadcrumb part
          const label = part.charAt(0).toUpperCase() + part.slice(1);
          if (label == "[slug]") return;

          return (
            <li key={index} className="flex items-center text-[16px]">
              <FaChevronRight className="mx-2 text-gray-400" />{" "}
              {/* Icon between links */}
              <Link
                href={href}
                className="hover:opacity-60 text-[14px] transition-colors"
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

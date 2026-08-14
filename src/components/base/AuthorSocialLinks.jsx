import React from "react";
import { FaEarthAsia, FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { NOTES_LANDING_SOCIAL_KEYS, getSocialHref } from "@/data/social";

const ICON_BY_KEY = {
  twitter: FaXTwitter,
  instagram: FaInstagram,
  website: FaEarthAsia,
};

const CLASS_BY_KEY = {
  twitter: "text-blue-500 hover:text-blue-700",
  instagram: "text-pink-500 hover:text-pink-700",
  website: "text-gray-800 hover:text-gray-600",
};

/** Ashutosh social row for notes collection landing pages */
export default function AuthorSocialLinks({ keys = NOTES_LANDING_SOCIAL_KEYS }) {
  return (
    <div className="flex space-x-4">
      {keys.map((key) => {
        const Icon = ICON_BY_KEY[key];
        if (!Icon) return null;
        return (
          <a
            key={key}
            href={getSocialHref(key)}
            target="_blank"
            rel="noopener noreferrer"
            className={CLASS_BY_KEY[key] || ""}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";

export default function NewsMarquee({ data }) {
  const { topics } = data;
  const { title, details } = topics[0];

  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setShowMarquee(true);
      } else {
        setShowMarquee(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`transition-all duration-500 fixed bottom-0 w-full z-50 ${
        showMarquee ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
      }`}
    >
      <div className="flex items-center overflow-hidden bg-cardDefault cursor-pointer">
        <span className="text-red-600 font-bold whitespace-nowrap bg-white md:py-3 md:px-4 rounded-r-full p-2 xs:text-size-15">
          {title}
        </span>

        <div className="relative w-full overflow-hidden xs:text-size-17">
          <div className="relative overflow-hidden w-full">
            <div className="marquee animate-marquee whitespace-nowrap py-1">
              <span className="mr-16">{details}</span>
              <span className="mr-16">{details}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const RelatedTopic = ({ data, locale }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full lg:container-default xl:container-default  px-4 pb-16 lg:pb-24 xl:pb-24 ">
      {/* Scrollable Links */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar space-x-3 "
      >
        {data.map((link, idx) => (
          <Link
            key={idx}
            href={`/news?category=${link.id}&lang=${locale}` || "#"}
            prefetch={false}
            className={`min-w-max px-4 py-4 rounded-lg bg-gray-200 whitespace-nowrap font-bold text-size-15 xl:text-size-19 lg:text-size-19 ${
              link.active ? "bg-blue-500 text-white" : "hover:bg-gray-300"
            }`}
          >
            <span dangerouslySetInnerHTML={{ __html: link.title }} />
          </Link>
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 gap-4">
        <button
          onClick={() => scroll("left")}
          className=" bg-white p-2 rounded-full shadow z-10"
        >
          <BiChevronLeft size={20} />
        </button>
        {/* Arrows */}
        <button
          onClick={() => scroll("right")}
          className="bg-white p-2 rounded-full shadow z-10"
        >
          <BiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default RelatedTopic;

"use client";

import Link from "next/link";
import { useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const RelatedTopic = ({ data }) => {
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
    <div className="px-4 relative w-full lg:container-default xl:container-default lg:pb-28 xl:pb-28 ">
      {/* Scrollable Links */}
      <div
        ref={scrollRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-auto no-scrollbar md:justify-between gap-4 "
      >
        {data
          //   .filter(
          //     (link) =>
          //       link.label !== "&laquo; Previous" && link.label !== "Next &raquo;"
          //   )
          .map((link, idx) => (
            <Link
              key={idx}
              href={link.href || "#"}
              prefetch={false}
              className={`min-w-max px-2 text-center py-4 rounded-lg bg-gray-200 whitespace-nowrap font-bold text-size-15 xl:text-size-21 lg:text-size-17 ${
                link.active ? "bg-blue-500 text-white" : "hover:bg-gray-300"
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: link.title }} />
            </Link>
          ))}
      </div>

      {/* Arrows */}
      {/* <div className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 gap-4">
        <button
          onClick={() => scroll("left")}
          className=" bg-white p-2 rounded-full shadow z-10"
        >
          <BiChevronLeft size={20} />
        </button>
       
        <button
          onClick={() => scroll("right")}
          className="bg-white p-2 rounded-full shadow z-10"
        >
          <BiChevronRight size={20} />
        </button>
      </div> */}
    </div>
  );
};

export default RelatedTopic;

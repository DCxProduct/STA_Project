"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

const RelatedTourist = ({ data }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.offsetWidth * 0.8; // 80% of width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative px-4 pb-16 mt-10">
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar gap-4 scroll-smooth"
      >
        {data.map((item, idx) => (
          <div
            key={idx}
            className="relative min-w-[150px] md:min-w-[250px] lg:min-w-[320px]  rounded-2xl overflow-hidden shadow-lg group"
          >
            {/* Image */}
            <Image
              src={item.photo_file}
              alt={item.title}
              width={400}
              height={300}
              className="w-[320px] xl:h-[420px] lg:h-[390px] md:h-[350px] h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay - Changes on Hover */}
            <div
              className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent
                          transition-all duration-300 group-hover:from-NavBar group-hover:via-default/60"
            ></div>

            {/* Title */}
            <div className="absolute bottom-4 left-4 text-white shadow-md lg:text-size-22 text-size-15 line-clamp-2 w-[80%]">
              {item.title}
            </div>

            {/* Circular Arrow Button */}
            <Link href={`${item.id}`}>
              <div
                className="absolute bottom-4 right-4 lg:w-10 lg:h-10 w-5 h-5 flex items-center justify-center rounded-full border border-white 
                          transition-all duration-300 group-hover:bg-white/30"
              >
                <IoIosArrowForward className="text-white group-hover:text-gray-900" />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Scroll Arrows */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4">
        <button
          onClick={() => scroll("left")}
          className="bg-white p-2 rounded-full shadow"
        >
          <BiChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="bg-white p-2 rounded-full shadow"
        >
          <BiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default RelatedTourist;

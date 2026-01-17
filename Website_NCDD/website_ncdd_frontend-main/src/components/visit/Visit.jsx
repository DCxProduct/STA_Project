"use client";
import React, { useState } from "react";
import { useRef } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import VisitCard from "./VisitCard";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Visit = ({ data }) => {
  // Get locale

  const t = useTranslations("HomePage");

  // Get data
  const { topics } = data;

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      if (direction === "left") {
        current.scrollBy({ left: -350, behavior: "smooth" });
      } else {
        current.scrollBy({ left: 350, behavior: "smooth" });
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = "grab"; // Reset cursor
  };

  return (
    <div className="container-fluid mx-auto">
      <div className="lg:container-default px-4 relative">
        <h2 className=" md:text-size-45 text-size-25 lg:text-size-50 font-bold text-left mb-11 mt-11">
          {/* តំបន់ទេសចរណ៍ */}
          {t("tourist")}
        </h2>
        <div className=" flex items-center">
          {/* Left Arrow */}
          <button
            className="absolute text-size-23 md:text-size-32 lg:text-size-40 top-6 lg:top-[45%] right-16  lg:right-[89%] z-10 p-2 opacity-60 bg-white shadow-md rounded-full text-gray-600 hover:opacity-100"
            onClick={() => scroll("left")}
          >
            <BiChevronLeft />
          </button>

          {/* Scrollable Cards with Drag */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-scroll no-scrollbar scroll-smooth w-full cursor-grab active:cursor-grabbing scrollbar-hide"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            {topics.map((place, idx) => (
              <VisitCard
                key={idx}
                photo_file={place.photo_file}
                title={place.title}
                link={place.href}
                id={idx}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            className="absolute text-size-23 md:text-size-32 lg:text-size-40 top-6 lg:top-[45%] right-4 lg:right-[8%] z-10 p-2 opacity-60 bg-white shadow-md rounded-full text-gray-600 hover:opacity-100"
            onClick={() => scroll("right")}
          >
            <BiChevronRight />
          </button>
        </div>

        {/* Button Below */}
        <div className="text-center mt-14 mb-14">
          <Link
            href={"tourist"}
            className="bg-default text-white px-4 md:px-8 md:py-4 py-2 rounded-lg shadow-md text-size-19 md:text-size-23 hover:rounded-3xl hover:bg-green-800"
          >
            {t("otherArea")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Visit;

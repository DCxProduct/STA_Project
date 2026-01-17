"use client";

import Image from "next/image";
import { useRef, React, useEffect, useState } from "react";
import HtmlContent from "@/libs/htmlContent";
import Division from "../ncdd_division/Division";
import ImportantInfo from "../ncdd_division/ImportantInfo";
import BarTitle from "../section_title/BarTitle";
import { Hanuman, Moul } from "next/font/google";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useLocale } from "next-intl";

const hanuman = Hanuman({
  weight: "400",
  subsets: ["khmer"],
  display: "swap",
});
const moul = Moul({
  weight: "400",
  subsets: ["khmer"],
  display: "swap",
});
const ManagementMessage = ({ data, cards }) => {
  const locale = useLocale();
  const { topics } = data;
  const topic = topics[0];
  const managementImage = topic.photo_file;
  const messageFromManagement = topic.title;
  const messageData = topic.details;
  const managementName = topic.fields[0].value;
  const managementPosition = topic.fields[1].value;

  const { cards_center, cards_bottom } = cards;
  //const divisions = cards_center.topics;
  const divisions = [...cards_center.topics].sort((a, b) => a.id - b.id);
  //const importnatInfo = cards_bottom.topics;
  const importnatInfo = [...cards_bottom.topics].sort((a, b) => a.id - b.id);
  const position = managementPosition.split("|");

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // You can also initialize AOS here if you haven't already
    // AOS.init();
  }, []);

  if (!isClient) return null;

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
    <section className="container-fluid mx-auto py-5 sm:px-0 mr-2 ml-2">
      <div className="md:container xs:px-0 mb-5">
        <div className="mb-3">
          <BarTitle
            title={topic.title}
            marginBottom={"mb-5"}
            textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
            textColor={"text-default"}
          />
        </div>
      </div>
    
      <div
        className="lg:flex md:px-12 px-4 md:container shadow-box-front py-6 lg:pt-10 xs:pt-10 rounded-2xl bg-white"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-anchor-placement="top-bottom"
      >

        <div className="md:flex md:justify-top md:flex-col md:items-center lg:mr-5">
          <Image
            src={managementImage}
            alt="managmenet_image"
            className="rounded-xl border-gray-100 border-5px shadow-box-front-info"
            width={425}
            height={524}
          />
          <h1
            className={`text-center text-size-21 lg:text-size-22 mt-5 khmer-text-moul:${locale} line-height-32`}
          >
            {managementName}
          </h1>
          <h1 className={`text-center text-size-17 lg:text-size-19 xs:text-size-18 mt-2 max-w-[350px] ml-2 khmer-text-odor:${locale} line-height-30`}>
            {position[0]}
          </h1>
          <h1 className={`text-center text-size-17 lg:text-size-19 xs:text-size-18 mt-1 max-w-[350px] ml-2 khmer-text-odor:${locale} line-height-30`}>
            {position[1]}
          </h1>
        </div>
        <div className=" basis-3/3 lg:ml-2 relative mt-5 lg:mt-0">
          {/* <h1 className="text-size-38 lg:text-size-34">
            <RiDoubleQuotesL className="text-whiteColor" />
          </h1> */}
          <h2
            className={`text-size-21  lg:text-size-28 text-default md:mb-10 xs:mb-7 line-height-32 khmer-text-moul:${locale}`}
          >
            {messageFromManagement}
          </h2>
          <div
            className={`max-w-4xl text-size-17 text-size-18 grid grid-rows-3-3 line-height-32 line-height-32`}
          >
            <HtmlContent content={messageData} />
          </div>
        </div>
      </div>
      <div className="md:container pt-2">
        {/* Left Arrow 
          <button
            className="absolute text-size-23 md:text-size-32 lg:text-size-40 top-6 lg:top-[45%] right-16  lg:right-[89%] z-10 p-2 opacity-60 bg-white shadow-md rounded-full text-gray-600 hover:opacity-100"
            onClick={() => scroll("left")}
          >
            <BiChevronLeft />
          </button>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">*/}
        <div
            ref={scrollRef}
            className="flex gap-5 xs:gap-3 overflow-x-scroll no-scrollbar scroll-smooth w-full cursor-grab active:cursor-grabbing scrollbar-hide lg:grid md:grid-cols-3 lg:grid-cols-5 lg:gap-3 py-2 px-1"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
          {divisions.map((item, idx) => (
            <Division
              key={idx}
              title={item.title}
              img={item.photo_file}
              link={item.fields}
            />
          ))}
        </div>
        {/* Right Arrow
        <button
          className="absolute text-size-23 md:text-size-32 lg:text-size-40 top-6 lg:top-[45%] right-4 lg:right-[8%] z-10 p-2 opacity-60 bg-white shadow-md rounded-full text-gray-600 hover:opacity-100"
          onClick={() => scroll("right")}
        >
          <BiChevronRight />
        </button>*/}
      </div>
      <div className="md:container 4xl:px-2">
        <div className="flex gap-3 xs:gap-3 overflow-x-scroll no-scrollbar scroll-smooth w-full cursor-grab active:cursor-grabbing scrollbar-hide lg:grid md:grid-cols-3 lg:grid-cols-5 lg:gap-3 py-2 px-1 w-full">          
          {importnatInfo.map((item, idx) => (
            <ImportantInfo
              key={idx}
              title={item.title}
              img={item.photo_file}
              link={item.fields}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManagementMessage;

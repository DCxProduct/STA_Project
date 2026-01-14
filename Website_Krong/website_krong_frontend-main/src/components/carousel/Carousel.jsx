"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useState, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import img from "@/assets/sample/place.png";
import img1 from "@/assets/sample/place1.png";

const slides = [
  {
    id: 1,
    image: "",
    title: "ក្រុង បានលុង",
    description: "ក្រុងបានលុង ជាក្រុងដែលមានទេសភាពស្អាត...",
  },
  {
    id: 2,
    image: img1,
    title: "ប្រទេសកម្ពុជា",
    description: "កម្ពុជា មានបេតិកភណ្ឌវប្បធម៌...",
  },
  {
    id: 3,
    image: img,
    title: "ធម្មជាតិ និង ភ្នំ",
    description: "ធម្មជាតិស្រស់ស្អាតនៅកម្ពុជា...",
  },
];
const Carousel = () => {
  const [swiperInstance, setSwiperInstance] = useState(null); // Store Swiper instance

  return (
    <div className="relative w-full h-[500px]">
      {/* Swiper Component */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        onSwiper={setSwiperInstance} // Store Swiper instance when ready
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[500px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
              {/* Text Content */}
              <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-3xl font-bold">{slide.title}</h2>
                <p className="text-lg max-w-lg">{slide.description}</p>
                <button className="mt-4 bg-brown-700 text-white px-5 py-2 rounded-md">
                  ស្វែងយល់បន្ថែម
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
        onClick={() => swiperInstance && swiperInstance.slidePrev()} // Check if Swiper exists before calling
      >
        <MdOutlineNavigateNext />
      </button>
      <button
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 cursor-pointer"
        onClick={() => swiperInstance && swiperInstance.slideNext()} // Check if Swiper exists before calling
      >
        <MdOutlineNavigateBefore />
      </button>
    </div>
  );
};

export default Carousel;

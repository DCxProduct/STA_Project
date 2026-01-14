"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { useLocale, useTranslations } from "next-intl";
import NumToKhmer from "@/libs/numToKhmer";
import Link from "next/link";
import SlideLoading from "./SlideLoading";

export default function Slideshow({ data }) {
  const [images, setImages] = useState(data.banners || []); // ✅ Store fetched images
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const startAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
  }, [images.length]);

  useEffect(() => {
    if (images.length > 0) {
      startAutoPlay();
    }
    return () => clearInterval(intervalRef.current);
  }, [images, startAutoPlay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    startAutoPlay();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    startAutoPlay();
  };

  if (loading) return <SlideLoading />;
  // if (loading) return <PreloaderPrimary />;
  // if (loading) return <h1>Loading...</h1>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (images.length === 0)
    return <p className="text-center text-white">No images found.</p>;

  return (
    <div className=" relative w-full h-[500px] lg:h-[765px] flex items-center justify-center overflow-hidden bg-black">
      <div
        className="flex w-full h-full transition-transform duration-1000 transform"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 1s ease-in-out",
          width: `${images.length * 100}%`,
          display: "flex",
        }}
      >
        {images.map((item, index) => (
          // if (Math.abs(currentIndex - index) > 1) return null;
          <div key={index} className="w-full flex-shrink-0 relative ">
            <Image
              src={item.file}
              alt={`Slide ${index + 1}`}
              fill
              className="rounded-lg object-cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 1024px) 100vw, 100vw"
            />
            <h1 className=" absolute left-10 lg:left-32 text-white text-size-25 lg:text-size-58 bottom-96 truncate max-w-[40%] ">
              {item.title}
            </h1>
            <div className="w-1/2 absolute left-10 lg:left-32 bottom-44 lg:bottom-56">
              <p className=" text-white text-size-15 lg:text-size-19 bottom-64">
                {item.details}
              </p>
            </div>
            <div className="absolute bg-default left-10 lg:left-32 bottom-28 px-4 py-2 lg:px-6 lg:py-4 rounded-xl hover:bg-green-800 hover:rounded-3xl transition-all duration-300">
              <button className="text-size-13 lg:text-size-23 text-white">
                <Link href={item.link_url ?? ""}> {t("more")}</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute right-10 lg:right-64 text-size-23 lg:text-size-42 text-white opacity-85 flex bottom-10 lg:bottom-16 py-3 gap-2">
        <p>{NumToKhmer(currentIndex + 1, locale)}</p>
        <p>/</p>
        <p>{NumToKhmer(images.length, locale)}</p>
      </div>

      <button
        className="absolute right-16 lg:right-48 bottom-20 text-white rounded-full text-size-45 lg:text-size-55 opacity-50 hover:opacity-100"
        onClick={handlePrev}
      >
        <IoIosArrowDropleft />
      </button>
      <button
        className="absolute right-4 lg:right-32 bottom-20 text-white rounded-full text-size-45 lg:text-size-55 opacity-50 hover:opacity-100"
        onClick={handleNext}
      >
        <IoIosArrowDropright />
      </button>
    </div>
  );
}

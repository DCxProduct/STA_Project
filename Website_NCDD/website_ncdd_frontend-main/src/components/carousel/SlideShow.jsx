"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

export default function Slideshow({ data }) {
  const [images, setImages] = useState(data?.banners || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);

  const extendedImages =
    images.length > 0 ? [...images, images[0]] : [];

  const startAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 5000);
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      startAutoPlay();
    }
    return () => clearInterval(intervalRef.current);
  }, [images, startAutoPlay]);

  useEffect(() => {
    if (currentIndex === images.length && images.length > 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setIsTransitioning(true);
    startAutoPlay();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsTransitioning(true);
    startAutoPlay();
  };

  if (images.length === 0) {
    return <p className="text-center text-white">No images found.</p>;
  }

  return (
    <section className="container-fluid mx-auto sm:px-0">
      <div className="relative w-full h-[300px] lg:h-[670px] flex items-center justify-center bg-black overflow-hidden">
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? "transform 1s ease-in-out" : "none",
            width: `${extendedImages.length * 100}%`,
          }}
        >
          {extendedImages.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              {item?.file && (
                <Image
                  src={item.file}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 1024px) 100vw, 100vw"
                />
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          type="button"
          className="absolute right-24 lg:right-40 lg:bottom-3 bottom-12 text-white rounded-full text-size-45 lg:text-size-55 opacity-50 hover:opacity-100"
          onClick={handlePrev}
        >
          <IoIosArrowDropleft />
        </button>
        <button
          type="button"
          className="absolute right-10 lg:right-24 lg:bottom-3 bottom-12 text-white rounded-full text-size-45 lg:text-size-55 opacity-50 hover:opacity-100"
          onClick={handleNext}
        >
          <IoIosArrowDropright />
        </button>
      </div>
    </section>
  );
}

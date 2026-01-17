import Image from "next/image";
import Link from "next/link";
import React from "react";

import { IoIosArrowForward } from "react-icons/io";

const VisitCard = ({ id, photo_file, title, link }) => {
  return (
    <div
      key={id}
      className="relative min-w-[190px] md:min-w-[320px] h-[220px] md:h-[280px] lg:h-[390px] xl:h-[420px] lg:min-w-[350px] xl:min-w-[456px]  rounded-2xl overflow-hidden shadow-lg group"
    >
      {/* Image */}
      <Image
        src={photo_file}
        alt={title}
        fill
        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay - Changes on Hover */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent
                      transition-all duration-300 group-hover:from-NavBar group-hover:via-default/60"
      ></div>

      {/* Title */}
      <div className="absolute bottom-4 left-4 text-white shadow-md text-size-15 md:text-size-19 lg:text-size-22 line-clamp-2 w-[80%]">
        {title}
      </div>

      {/* Circular Arrow Button */}
      <Link href={link}>
        <div
          className="absolute bottom-4 right-2 lg:right-4 lg:w-10 lg:h-10 w-6 h-6 flex items-center justify-center rounded-full border border-white 
                      transition-all duration-300 group-hover:bg-white/30"
        >
          <IoIosArrowForward className="text-white group-hover:text-gray-900" />
        </div>
      </Link>
    </div>
  );
};

export default VisitCard;

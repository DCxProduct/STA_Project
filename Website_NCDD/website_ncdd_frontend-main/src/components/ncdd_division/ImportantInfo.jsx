"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const ImportantInfo = ({ title, img, link }) => {
  const locale = useLocale();
  return (    
    <motion.div
      whileHover={{
        scale: 1.1,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      whileTap={{ scale: 1 }}
      className="bg-cardDefault flex rounded-lg py-3 px-5 lg:py-2 lg:px-2 text-[#105090] shadow-box-front-info min-w-[220px] md:min-w-[240px] h-[90px] md:h-[80px] xl:h-[90px] lg:h-[110px] lg:min-w-[180px] xl:min-w-[220px]"
    >
      
      <Link
        href={link[0].value}
        className="flex items-center gap-3 xl:gap-2 lg:gap-1 "
        target={`${
          link[0].value == "https://library.ncdd.gov.kh" ||
          "https://db.ncdd.gov.kh" ||
          "https://bid.ncdd.gov.kh"
            ? "_blank"
            : ""
        }`}
      >
        <div className="relative w-[30px] h-[30px] md:w-[40px] md:h-[40px] overflow-hidden  shrink-0">
          <Image
            src={img}
            alt={img}
            className="object-center"
            fill
            sizes="100vw"
          />
        </div>
        <div className={`text-center xl:text-size-16 line-height-32 text-size-16 khmer-text-odor:${locale}`}>
          {title}
        </div>
      </Link>
    </motion.div>
  );
};

export default ImportantInfo;

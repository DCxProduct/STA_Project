"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
const Division = ({ title, img, link }) => {
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const name = title.split("-");  
  return (    
    <div className="relative min-w-[220px] md:min-w-[240px] h-[220px] md:h-[230px] lg:h-[240px] xl:h-[240px] lg:min-w-[180px] xl:min-w-[220px]  rounded-2xl overflow-hidden shadow-box-front group bg-white hover:bg-cardDefault">
      {/*className="shadow-box-front rounded-lg py-7 px-3 bg-white hover:bg-cardDefault hover:text-default text-[#444444] cursor-pointer transition-colors duration-300 ease-in-out"*/}    
      <Link href={link[0].value} className="w-full">
        <div className="flex justify-center ">
          <Image src={img} alt={img} width={130} height={100} />
        </div>
        <div className="lg:flex flex-col align-stretch justify-center">          
          <div className={`text-center text-default lg:text-size-16 md:text-size-15 mt-0 khmer-text-odor:${locale} line-height-32`}>
            {name[0]}
          </div>
          <div className={`text-center text-default lg:text-size-16 md:text-size-15 mt-0 khmer-text-odor:${locale} line-height-32`}>
            {name[1]}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Division;

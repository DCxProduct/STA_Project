import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { IoCalendarOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa";

const NewsAndEventCard = (props) => {
  const t = useTranslations("HomePage");
  const { id, img, type, view, title, description, date, link, route, lang } =
    props;

  const [year, month, day] = date.split("-");
  return (
    <div
      className="border rounded-xl mb-1 bg-white overflow-hidden "
      data-aos="fade-up"
    >
      <div>
        <Image
          className="object-cover transition-transform duration-500 hover:scale-110 cursor-pointer w-full lg:h-[250px] md:h-[250px] h-[240px]"
          src={img}
          width={350}
          height={250}
          alt={img}
        />
      </div>
      <div className="px-4 py-4 min-h-[200px]">
        
        <div className="line-clamp-2 ">


          <div className="">
            <div>
                <h2 className={`md:line-clamp-2 line-clamp-3 text-size-18 khmer-text-odor:${lang} min-h-14 max-h-16 text-default line-height-32`}>
                  {title}
                </h2>
              
            </div>
          </div>

          <div className={`flex items-center justify-end mt-3 text-gray-400 border-b-1px pb-2 lg:text-size-16 text-size-15 line-height-22`}>
            <IoCalendarOutline size={17} />
            <p className="mt-1 ml-2">
              {NumToKhmer(day, lang)}&nbsp;
              {MonthInKhmer(month, lang)}&nbsp;
              {NumToKhmer(year, lang)}
            </p>
          </div>

        </div>
        {/*<div className="w-full min-h-0.5  bg-[#E7EEF4] mt-2 mb-2"></div>*/}
        <div className="flex justify-between mb-3 mt-5 text-size-13 lg:text-size-15 xl:text-size-17">
          <Link href={`${lang}/${link}`} className="cursor-pointer">
            <button className="flex items-center text-[#4270A5] bg-[#E7EEF4] px-5 py-2 rounded-3xl  cursor-pointer lg:text-size-15 text-size-15 ">
              {t("readMore")}
              <FaAngleRight className="" />
            </button>
          </Link>
          {/* {view > 0 ? (
            <p className="flex items-center gap-1 lg:text-size-12 xl:text-size-17 font-hanuman">
              <HiOutlineEye size={19} />
              {NumToKhmer(view, lang)}
            </p>
          ) : (
            "--"
          )} */}
        </div>
      </div>
    </div>
  );
};

export default NewsAndEventCard;

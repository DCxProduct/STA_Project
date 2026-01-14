import HtmlContent from "@/libs/htmlContent";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi2";

const ScholarshipCard = (props) => {
  const t = useTranslations("Scholarship");
  const { id, img, type, view, title, description, date, link, route, lang } =
    props;
  const [year, month, day] = date.split("-");

  return (
    <div className="border rounded-lg mb-1 bg-white overflow-hidden">
      <div className="relative w-full h-[200px] md:h-[260f0px] lg:h-[300px]">
        <Image
          className="object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
          src={img}
          alt="images"
          fill
        />
      </div>
      <div className="px-4 py-4">
        <div className="flex justify-between text-default font-bold">
          <div className="flex items-center space-x-1 mb-2">
            <div className="w-1 h-4 bg-default"></div>
            <p className="text-size-12 lg:text-size-12 xl:text-size-17">
              {type}
            </p>
          </div>

          <p className="flex items-center gap-1 lg:text-size-12 xl:text-size-17">
            <HiOutlineEye size={19} />
            {NumToKhmer(view, lang)}
          </p>
        </div>
        <div className="line-clamp-2 ">
          <h3 className="font-semibold text-size-17 lg:text-size-17 xl:text-size-23 line-clamp-2 text-default mb-2">
            {title}
          </h3>
          <HtmlContent
            content={description}
            className="line-clamp-2 text-size-13 lg:text-size-17 xl:text-size-19"
          />
          {/* <p className="line-clamp-2">{description}</p> */}
        </div>
        <div className="w-full min-h-0.5 opacity-10 bg-default mt-5 mb-5"></div>
        <div className="flex justify-between mb-3 text-size-11 lg:text-size-13 xl:text-size-15 ">
          <p>
            {t("deadline")}: {NumToKhmer(day, lang)}&nbsp;
            {MonthInKhmer(month, lang)}&nbsp;{NumToKhmer(year, lang)}
          </p>
          <Link href={`/${link}`} className="cursor-pointer">
            <button className="flex items-center text-white bg-default px-3 py-1 rounded-3xl  cursor-pointer">
              {/* អានបន្ថែម */}
              {t("readMore")}
              <FaAngleRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;

import HtmlContent from "@/libs/htmlContent";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import { useTranslations } from "next-intl";
import { Hanuman } from "next/font/google";
import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
const hanuman = Hanuman({
  weight: "400",
  subsets: ["khmer"],
  display: "swap",
});


const ProjectCard = ({ title, detail, date, href, lang, description }) => {
  const detailStripped = detail?.split('---')[0]?.replace(/<[^>]*>/g, '') || '';

  const t = useTranslations("HomePage");
  const [year, month, day] = date.split("-");
  return (
    <div
      className="py-4 px-4 rounded-xl mt-3 mr-2 ml-2 mb-5 shadow-box-front  max-h-lvh"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="pt-2">
        <Link href={href}>
          <p className={`text-size-18 md:line-clamp-2 line-clamp-3  text-default min-h-17 max-h-17 text-default khmer-text-odor:${lang} line-height-32`}>
            {title}
          </p>
        </Link>
      </div>
      <div className={`py-2  text-size-17 lg:text-size-18 min-h-\[200px\]`}>
        <div className="xs:line-clamp-4 md:line-clamp-5">          
          {description?.replace('---', '') || ''}
        </div>
        <div className="flex items-center justify-end mt-3 text-gray-400 border-b border-gray-300 pb-2 lg:text-size-15 text-size-14">
          <IoCalendarOutline size={20} />
          <p className="ml-2">
            {NumToKhmer(day, lang)}&nbsp;
            {MonthInKhmer(month, lang)}&nbsp;
            {NumToKhmer(year, lang)}
          </p>
        </div>
      </div>
      <div className="flex justify-start">
        <Link href={href}>
          <button className="bg-[#E7EEF4] rounded-3xl flex items-center px-5 text-[#4270A5] py-2">
            {t("readMore")}
            <FaAngleRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;

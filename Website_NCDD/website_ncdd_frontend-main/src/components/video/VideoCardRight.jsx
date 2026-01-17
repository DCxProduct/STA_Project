import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import Link from "next/link";
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { useLocale } from "next-intl";

const VideoCard = (props) => {
  const locale = useLocale();
  const { img, title, date, visits, href, lang, video } = props;

  const [year, month, day] = date.split("-");
  return (
    <div className="mt-5 ml-0 px-0 text-sm sm:text-base rounded-xl max-h-lvh h-[420px] border-1px border-gray-200 mb-2 overflow-hidden">
      <div className="">
        <iframe src={video} allowFullScreen className="w-full h-[250px]"></iframe>
      </div>
      <div className="flex items-top mr-5 ml-5 justify-start mt-3 text-gray-400 border-b-1px border-gray-100 pb-2 khmer-font-batr lg:text-size-13 text-size-13">
        <IoCalendarOutline size={20} className="" />
        <p className="">&nbsp;
          {NumToKhmer(day, locale)}&nbsp;
          {MonthInKhmer(month, locale)}&nbsp;
          {NumToKhmer(year, locale)}
        </p>
      </div>
      <div className="">
        <h2 className={`line-clamp-2 px-5 sm:line-clamp-3 mt-2 text-default khmer-text-odor:${locale} lg:text-size-18 text-size-17 line-height-32`}>
          {title}
        </h2>
      </div>
    </div>
  );
};

export default VideoCard;

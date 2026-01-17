import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import Link from "next/link";
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";

const VideoCard = (props) => {
  const { img, title, date, visits, href, lang, video } = props;

  const [year, month, day] = date.split("-");
  return (
    <div className="md:mr-1 xs:md-0 md:ml-3 xs:ml-0 px-0 text-sm sm:text-base rounded-md max-h-lvh h-[400px] shadow-box-front mb-4 overflow-hidden">
      <div className="">
        <iframe src={video} allowFullScreen className="w-full h-[250px]"></iframe>
      </div>
      <div className={`flex items-top mr-5 ml-5 justify-start mt-3 text-gray-400 border-b-1px pb-2 khmer-font-batr:${lang} lg:text-size-15 text-size-13`}>
        <IoCalendarOutline size={20} className="" />
        <p className="">&nbsp;
          {NumToKhmer(day.split(' ')[0], lang)}&nbsp;
          {MonthInKhmer(month, lang)}&nbsp;
          {NumToKhmer(year, lang)}
        </p>
      </div>
      <div className="">
        <h2 className={`line-clamp-2 px-5 sm:line-clamp-3 mt-2 text-default khmer-text-odor:${lang} lg:text-size-18 text-size-17 line-height-32`}>
          {title}
        </h2>
      </div>
    </div>
  );
};

export default VideoCard;

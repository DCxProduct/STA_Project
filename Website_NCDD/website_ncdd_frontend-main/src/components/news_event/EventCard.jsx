"use client";
import HtmlContent from "@/libs/htmlContent";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import { Battambang, Hanuman } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import sanitizeHtml from 'sanitize-html';

const hanuman = Hanuman({
  weight: "400",
  subsets: ["khmer"],
  display: "swap",
});
const EventCard = ({ title, img, details, date, href, lang }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`${href}`);
  };
  const [year, month, day] = date.split("-");
  const rawHTML = details?.split('---')[0] || '';
  const cleanedHTML = sanitizeHtml(rawHTML, {
    allowedTags: false,
    allowedAttributes: false,
    allowVulnerableTags: true,
  });

  return (
    <div
      onClick={handleClick}
      className="border-[#C7DAED] border-b-1px py-4 pxb-0 cursor-pointer"
    >
      <div className="flex justify-between">
        <div className="relative basis-1/3 w-full lg:h-[180px] h-[120px]">
          <Image src={img} alt={img} fill className="object-cover rounded" />
        </div>
        <div className="basis-2/3 ml-5 mt-0">
          <h1 className={`line-clamp-2 hover:text-default lg:text-size-18 text-size-16 black khmer-text-odor:${lang} line-height-32`}>{title}</h1>          
          <div
            className={`flex gap-1 text-gray-400 lg:text-size-15 text-size-13 py-2`}
          >
            <IoCalendarOutline size={17} />
            <p>
              {NumToKhmer(day, lang)}&nbsp;
              {MonthInKhmer(month, lang)}&nbsp;
              {NumToKhmer(year, lang)}
            </p>
          </div>
          <div className={`line-clamp-2 lg:text-size-17 mt-2 hidden md:block`}>
            <HtmlContent content={cleanedHTML} fontMoulSize={"text-size-15"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

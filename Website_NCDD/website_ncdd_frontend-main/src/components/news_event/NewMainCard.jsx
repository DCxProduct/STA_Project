"use client";
import HtmlContent from "@/libs/htmlContent";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import { Hanuman } from "next/font/google";
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

const NewMainCard = ({ newsMainCard, locale }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`${newsMainCard.href}`);
  };

  const [myear, mmonth, mday] = newsMainCard.date.split("-");
  const rawHTML = newsMainCard.details?.split('---')[0] || '';
  const cleanedHTML = sanitizeHtml(rawHTML, {
    allowedTags: false,
    allowedAttributes: false,
    allowVulnerableTags: true,
  });

  return (
    <div
      onClick={handleClick}
      className="block border-[#D6E1EB] px-1 border-1px py-1 rounded-lg cursor-pointer mt-6"
    >
      <div className="relative w-full lg:h-[450px] h-[350px]">
        <Image
          src={newsMainCard.photo_file}
          alt="image"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="py-5 px-5">       
        <div>
          <span className={`line-clamp-2 lg:text-size-18 hover:text-default text-size-16 khmer-text-odor:${locale} line-height-32`}>
            {newsMainCard.title}
          </span>
           <div className="flex gap-1 text-gray-400 khmer-text-batr lg:text-size-15 text-size-14 py-2">
              <IoCalendarOutline size={17} />
              <p>
                {NumToKhmer(mday, locale)}&nbsp;
                {MonthInKhmer(mmonth, locale)}&nbsp;
                {NumToKhmer(myear, locale)}
              </p>
            </div>
          <span
            className={`line-clamp-2 lg:text-size-18 text-size-13 mt-3 hidden md:block`}
          >
            <HtmlContent content={cleanedHTML} fontMoulSize={"text-size-15"} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewMainCard;

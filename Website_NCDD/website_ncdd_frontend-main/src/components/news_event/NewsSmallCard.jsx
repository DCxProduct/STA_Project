import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";

const NewsSmallCard = ({ title, date, href, photo_file, locale }) => {
  const [year, month, day] = date.split("-");
  return (
    <Link href={href} className="flex gap-3 border-b-1px border-gray-200 pb-5 pt-2">
      <div className="basis-2/5 relative">
        <Image src={photo_file} alt={title} fill className="object-cover rounded" />
      </div>
      <div className="basis-3/5">
        <div className=" text-black">
          <p className={`line-clamp-3 text-size-14 hover:text-default khmer-text-odor:${locale} line-height-24`}>
            {title}
          </p>
          <div className="text-gray-400 flex gap-1 mt-2 khmer-text-batr">
            <IoCalendarOutline />
            <span className="text-size-13 ">
              {NumToKhmer(day, locale)}&nbsp;{MonthInKhmer(month, locale)}
              &nbsp;{NumToKhmer(year, locale)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsSmallCard;

"use client";
import HtmlContent from "@/libs/htmlContent";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import { LayoutGroup } from "framer-motion";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegCalendarAlt, FaRegClock, FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const JobsCard = ({ title, content, route, fields, expire_date }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${route}`);
  };
  const [year, month, day] = expire_date.split("-");
  const locale = useLocale();

  return (
    <div className="lg:py-10 py-4">
      <h1
        className="lg:text-size-44 text-default cursor-pointer text-size-26"
        onClick={handleClick}
      >
        {title}
      </h1>
      <div className="line-clamp-3">
        <HtmlContent content={content} />
      </div>
      <div className="flex gap-4 py-10 flex-col justify-start text-default lg:text-size-21 text-size-15">
        <div className="flex items-center gap-2">
          <FaRegClock />
          <p>{fields[0].value}</p>
          <span>|</span>
          <FaRegUser />
          <p>ចំនួន {NumToKhmer(fields[1].value, locale)} នាក់</p>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCalendarAlt />
          <p>ថ្ងៃផុតកំណត់</p>
          <span>
            {NumToKhmer(day, locale)}&nbsp;{MonthInKhmer(month, locale)}
            &nbsp;{NumToKhmer(year, locale)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <IoLocationOutline />
          <p>ទីតាំង៖ {fields[2].value}</p>
        </div>
      </div>
      <hr className="h-1 bg-black lg:mt-16" />
    </div>
  );
};

export default JobsCard;

import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import { useTranslations } from "next-intl";

import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";

const PrakasCard = ({ title, date, href, visits, lang, expire_date, type }) => {
  const t = useTranslations("HomePage");
  const [year, month, day] = date.split("-");
  const [exp_year, exp_month, exp_day] = expire_date.split("-");
  const today = new Date();
  const expireDate = new Date(`${exp_year}-${exp_month}-${exp_day}`);

  // Hide card if expired
  //if (expireDate < today) {
  //  return null;
  //}

  return (
    <Link
      href={href}
      className="bg-white shadow-box-front rounded-lg py-5 px-5 transform transition-transform duration-300 hover:scale-105 mt-1"
    >
      <div className="">
        <div>
          <h2
            className={`md:line-clamp-2 line-clamp-3 lg:text-size-18 khmer-text-odor:${lang} min-h-14 max-h-16`}
          >
            {title}
          </h2>
        </div>
      </div>
      <div className="flex items-center mt-5 text-gray-400 border-b-1px pb-2 lg:text-size-15 text-size-13">
        <IoCalendarOutline size={20} className="" />
        <p className="ml-2 lg:text-size-15 text-size-13 ">
          {NumToKhmer(day, lang)}&nbsp;
          {MonthInKhmer(month, lang)}&nbsp;
          {NumToKhmer(year, lang)}
        </p>
        <span className="ml-2">|</span>
        <p
          className={`ml-2 lg:text-size-15 text-size-13 ${
            expireDate < today ? "text-red-500" : "text-default"
          }`}
        >
          {t("expire")} {NumToKhmer(exp_day, lang)}&nbsp;
          {MonthInKhmer(exp_month, lang)}&nbsp;
          {NumToKhmer(exp_year, lang)}
        </p>
      </div>
      {type == "small" ? (
        ""
      ) : (
        <div className="mt-4 flex items-center justify-between">
          <button className="bg-[#E7EEF4] rounded-3xl lg:text-size-15 flex items-center px-5 text-[#4270A5] py-2 xs:text-size-13">
            {t("readMore")}
            <FaAngleRight />
          </button>
          {/* {visits > 0 ? (
            <p className="flex items-center gap-1 lg:text-size-12 xl:text-size-17">
              <HiOutlineEye size={19} />
              {NumToKhmer(visits, lang)}
            </p>
          ) : (
            "--"
          )} */}
        </div>
      )}
    </Link>
  );
};

export default PrakasCard;

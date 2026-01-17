import HtmlContent from "@/libs/htmlContent";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import Link from "next/link";
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { useLocale } from "next-intl";

const ProjectListCard = ({ title, date, details, lang, href }) => {
  const locale = useLocale();
  const detailStripped = details?.split('---')[0]?.replace(/<[^>]*>/g, '') || '';
  const [year, month, day] = date.split("-");
  return (
    <Link href={href ?? "#"} className="group ">
      <div className="py-7 border-b-1px">
        <div>
          <h1 className={`lg:text-size-19 text-size-18 group-hover:text-default transition-all khmer-text-odor:${locale} line-height-32`}>
            {title}
          </h1>
        </div>
        <div className="flex items-center justify-start mt-2 text-gray-400 lg:text-size-14 text-size-13">
          <IoCalendarOutline size={20} />
          <p className="ml-2">
            {NumToKhmer(day, locale)}&nbsp;
            {MonthInKhmer(month, locale)}&nbsp;
            {NumToKhmer(year, locale)}
          </p>
        </div>

        <div class="min-h-\[150px\] mt-2">
          <div className="text-size-17 lg:text-size-18 line-height-32">
            <HtmlContent
              content={detailStripped}
            />
          </div>
        </div>
        {/* </div> */}
      </div>
    </Link>
  );
};

export default ProjectListCard;

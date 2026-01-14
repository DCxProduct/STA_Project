import HtmlContent from "@/libs/htmlContent";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import { fetchData } from "@/services/getApiService";
import React from "react";
import { FaRegCalendarAlt, FaRegClock, FaRegUser } from "react-icons/fa";
const page = async ({ params }) => {
  const { id, locale } = params;
  const { results } = await fetchData(
    `/jobs/page/${id}/${locale}`,
    {},
    "no-store"
  );
  const data = results.topic[0];
  const { title, details, expire_date, fields, attach_files } = data;
  const [year, month, day] = expire_date.split("-");
  const attach_file = attach_files[0];
  const handleDownload = async () => {
    const fileUrl = attach_file.url;
    const fileName = attach_file.title + ".pdf";

    const res = await fetch(fileUrl);
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  };
  return (
    <section>
      <div className="lg:container-default lg:py-24 md:py-16 py-10 px-4">
        <div className="text-center">
          <h1 className="xl:text-size-65 lg:text-size-58 md:text-size-45 text-size-34 font-bold mb-2">
            {title}
          </h1>
          <div className="flex justify-center lg:gap-8 lg:mt-8 text-size-17 md:text-size-19 lg:text-size-21">
            <div className="flex items-center gap-2 ">
              <FaRegClock />
              <h1>{fields[0].value}</h1>
            </div>
            <span>|</span>
            <div className="flex items-center gap-2 ">
              <FaRegUser />
              <p>ចំនួន</p>
              <h1>{fields[1].value}</h1>
              <p>នាក់</p>
            </div>
            <span>|</span>
            <div className="flex items-center gap-2 ">
              <FaRegCalendarAlt />
              <p>ថ្ងៃផុតកំណត់</p>
              <span>
                {NumToKhmer(day, locale)}&nbsp;{MonthInKhmer(month, locale)}
                &nbsp;{NumToKhmer(year, locale)}
              </span>
            </div>
          </div>
        </div>
        <div className="lg:py-24 py-10">
          <HtmlContent content={details} />
        </div>
        <div>
          <h3 className="lg:text-size-32 text-size-26 mb-3">ឯកសារពាក់ព័ន្ធ</h3>

          {attach_files.map((value, idx) => (
            <a
              key={idx}
              href={value.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="text-default lg:text-size-23 text-size-17">
                {value.title}
              </button>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;

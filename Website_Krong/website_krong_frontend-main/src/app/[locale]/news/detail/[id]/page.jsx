// export const dynamic = "force-dynamic";
import Image from "next/image";
import React from "react";
import { FaEye, FaRegCalendarAlt } from "react-icons/fa";
import NumToKhmer from "@/libs/numToKhmer";
import ShareButtons from "@/components/button/ShareButtons";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import RelatedTopic from "@/components/news_event/RelatedTopic";
import { fetchData } from "@/services/getApiService";
import { getLocale } from "next-intl/server";
import HtmlContent from "@/libs/htmlContent";

const page = async ({ params }) => {
  const { id, locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; // put this in your .env file
  const url = `${baseUrl}/news/detail/${id}`;
  // const datas = {
  //   id: "1",
  //   title:
  //     "ពិធីជួបសំណេះសំណាល សួរសុខទុក្ខ និងចែកអំណោយមនុស្សធម៌ជូនដល់ ប្រជាជន ងាយរងគ្រោះបំផុតចំនួន ១.៤០៩គ្រួសារ រស់នៅក្រុងរុនតា ឯកតេជោសែន",
  //   type: "ព័ត៌មានថ្នាក់ខេត្ត",
  //   date: "13-01-2024",
  //   view: "1,982",
  //   img: news_detail,
  //   text: ".....",
  //   files: [
  //     new_detail1,
  //     new_detail2,
  //     new_detail4,
  //     new_detail3,
  //     new_detail1,
  //     new_detail2,
  //   ],
  //   relatedTopic: [
  //     { id: 1, text: "ព័ត៌មានកីឡា", url: "aaa" },
  //     { id: 2, text: "ព័ត៌មានសុខភាព", url: "" },
  //     { id: 3, text: "ព័ត៌មានកម្សាន្ត", url: "" },
  //     { id: 4, text: "ព័ត៌មានបច្ចេកវិទ្យា", url: "" },
  //     { id: 5, text: "ព័ត៌មានចំណេះដឹង", url: "" },
  //     { id: 6, text: "ព័ត៌មានបច្ចេកវិទ្យា", url: "" },
  //     { id: 6, text: "ព័ត៌មានបច្ចេកវិទ្យា", url: "" },
  //     { id: 6, text: "ព័ត៌មានបច្ចេកវិទ្យា", url: "" },
  //     { id: 6, text: "ព័ត៌មានបច្ចេកវិទ្យា", url: "" },
  //     { id: 6, text: "ព័ត៌មានបច្ចេកវិទ្យា", url: "" },
  //     { id: 6, text: "ព័ត៌មានបច្ចេកវិទ្យា", url: "" },
  //     { id: 6, text: "ព័ត៌មានបច្ចេកវិទ្យា", url: "" },
  //     { id: 6, text: "ព័ត៌មានបច្ចេកវិទ្យា", url: "" },
  //     { id: 6, text: "ព័ត៌មានបច្ចេកវិទ្យា", url: "" },
  //   ],
  // };

  // const locale = await getLocale();
  const data = await fetchData(`/news/page/${id}/${locale}`, {}, "revalidate");
  const { results } = data;
  const topic = results.topic[0];
  const {
    title,
    details,
    date,
    photo_file,
    photos,
    related_topics,
    Joined_categories,
    visits,
  } = topic;
  const category = Joined_categories[0].title;
  const [year, month, day] = date.split("-");

  const { relatedTopic } = data;

  return (
    <section>
      <div className="container mx-auto">
        <div className="py-14 px-0">
          <h1 className="text-size-32 lg:text-size-44 md:text-size-40 text-center font-bold mb-5">
            {/* ពិធីជួបសំណេះសំណាល សួរសុខទុក្ខ និងចែកអំណោយមនុស្សធម៌ជូនដល់ ប្រជាជន
            ងាយរងគ្រោះបំផុតចំនួន ១.៤០៩គ្រួសារ រស់នៅក្រុងរុនតា ឯកតេជោសែន */}
            {title}
          </h1>
          <div className="flex items-center gap-6 justify-center text-size-15 md:text-size-21">
            <div className="bg-default text-whiteColor px-3 py-2 rounded-2xl">
              {category}
            </div>
            <div className="flex items-center gap-2">
              <FaRegCalendarAlt />
              {MonthInKhmer(month, locale)} {NumToKhmer(day, locale)}{" "}
              {NumToKhmer(year, locale)}
            </div>
            <div className="flex items-center gap-2">
              <FaEye /> {NumToKhmer(visits, locale)}
            </div>
          </div>
        </div>
        <div className="relative py-10 w-full px-2 lg:px-0 rounded-2xl xl:h-[750px] lg:h-[600px] md:h-[500px] h-[300px]">
          <Image
            src={photo_file}
            alt={[photo_file]}
            className="object-cover rounded-2xl"
            fill
          />
        </div>
        <div className="py-6 text-size-17 md:text-size-19 lg:text-size-23 px-4 lg:px-0">
          <HtmlContent content={details} />
        </div>
        <div className=" px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 rounded-2xl py-4 mb-10">
          {photos.map((file, indx) => (
            <div key={indx} className="relative w-full h-[310px] ">
              <Image
                src={file.url}
                alt="photo file"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center py-4 gap-6 px-4 md:px-0">
          <p className="text-size-17 md:text-size-23 mb-2">ចែករំលែកបន្ត ៖ </p>
          <ShareButtons url={url} title={title} />
        </div>
      </div>
      <div className="container-fluid bg-borderColor">
        <div className="md:container-default px-0  md:mb-0">
          <div className="px-4 lg:container-default py-14 ">
            <h1 className="text-size-23 lg:text-size-38 font-bold ">
              ព័ត៌មានផ្សេងទៀត
            </h1>
          </div>
          <RelatedTopic data={relatedTopic.categories} locale={locale} />
        </div>
      </div>
    </section>
  );
};

export default page;

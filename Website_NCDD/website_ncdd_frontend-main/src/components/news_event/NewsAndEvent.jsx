import React from "react";
import NewsAndEventCard from "./NewsAndEventCard";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SectionTitle from "../section_title/SectionTitle";
import BarTitle from "../section_title/BarTitle";

const NewsAndEvent = ({ data, lang }) => {
  const t = useTranslations("HomePage");
  const { topics } = data;

  // const locale = getLocale();
  // const datas = [
  //   {
  //     id: 1,
  //     img: img,
  //     type: "ព័ត៌មានថ្នាក់ខេត្ត",
  //     view: "1989",
  //     title: "ពិធីជួបសំណេះសំណាល សួរសុខទុក្ខ និងចែកអំណោយមនុស្សធម៌ជូនដល់ ប្រជា",
  //     description:
  //       "នាថ្ងៃទី២៥ ខែធ្នូ ឆ្នាំ២០២៤នេះ នៅផ្សារធម្មជាតិរុនតាឯក ភូមិតានី សង្កាត់រុនតាឯក​ សម្តេចកិត្តិព្រឹទ្ធបណ្ឌិត ប៊ុន រ៉ានី",
  //     date: "ខែធ្នូ ១៣, ២០២៤",
  //   },
  // ];
  return (
    <section className=" md:container lg:py-5 mx-2 ">
      <div className="flex justify-between items-center mt-3 mb-3">
        <BarTitle
          title={t("news")}
          marginBottom={"mb-6"}
          textSize={`lg:text-size-26 text-size-23 khmer-text-odor:${lang}`}
          textColor={"text-default"}
          color={"default"}
        />

        <div className="">
          <Link
            href={"/news"}
            className={`khmer-text-odor:${lang} text-size-14 md:text-size-15 lg:text-size-15 bg-[#E7EEF4] lg:px-4 px-3 lg:py-2 py-2 rounded-3xl text-[#4270A5] cursor-pointer hover:bg-cardDefault hover:rounded-3xl hover:text-default`}
          >
            {/* ស្វែងយល់បន្ថែម */}
            {t("findMore")}
          </Link>
        </div>
      </div>
      <div className="mx-auto px-0 shadow-box-front bg-whiteColor rounded-2xl py-7">
        <div>        
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 md:px-6 xs:px-3">
            {topics.map((item, idx) => (
              <NewsAndEventCard
                key={idx}
                img={item.photo_file}
                title={item.title}
                type={item.Joined_categories[0].title}
                view={item.visits}
                description={item.details}
                date={item.date}
                link={item.href}
                id={item.id}
                lang={lang}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsAndEvent;

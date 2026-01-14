import React from "react";
import NewsAndEventCard from "./NewsAndEventCard";
import { useTranslations } from "next-intl";
import Link from "next/link";

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
    <section className="container-fluid bg-backGroundDefault py-6 lg:py-10">
      <div className="mx-auto lg:container-default px-4">
        <div>
          <h2 className="md:text-size-45 text-size-25 lg:text-size-50 font-bold font-Koh_Santepheap lg:py-10 py-4 mb-3 ">
            {t("news")}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
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

        <div className="grid place-items-center mt-10 lg:mt-14 mb-5 ">
          <Link
            href={"/news"}
            className=" text-size-17 md:text-size-19 lg:text-size-23 bg-default lg:px-8 px-4 lg:py-4 py-2 rounded-xl text-white cursor-pointer hover:bg-green-700 hover:rounded-3xl"
          >
            {/* ស្វែងយល់បន្ថែម */}
            {t("findMore")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsAndEvent;

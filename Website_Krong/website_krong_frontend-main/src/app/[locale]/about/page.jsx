import VisitCardList from "@/components/visit/VisitCardList";
import HtmlContent from "@/libs/htmlContent";
import { fetchData } from "@/services/getApiService";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const locale = await getLocale();
  const t = await getTranslations("HomePage");
  const { results, relatedTopic } = await fetchData(`/about/${locale}`);
  const data = results.topic[0];
  const { photo_file, title, details, related_topics } = data;
  const { topics } = relatedTopic;
  return (
    <section className="container-fluid mx-auto">
      <div className="">
        <div className="relative lg:container-fluid h-[300px] md:h-[570px] lg:h-[700px] px-4">
          <Image
            src={photo_file}
            className="object-center"
            alt={photo_file}
            fill
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 px-4 bg-gradient-to-t from-default via-transparent to-transparen">
            {/* "ព័ត៌មានទូទៅ" */}
            <div className="bg-opacity-80 px-6 py-2 rounded-lg">
              <h2 className="text-white text-size-25 lg:text-size-55 md:text-size-42 font-semibold drop-shadow-md">
                {title}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:container-default lg:py-20 py-10 px-4">
        <div>
          <HtmlContent content={details} />
        </div>
      </div>
      <div className="lg:container-default px-4 grid xl:grid-cols-5 gap-4 py-10 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:pb-30">
        {topics.map((item, idx) => (
          <VisitCardList
            key={idx}
            id={item.id}
            photo_file={item.photo_file}
            title={item.title}
            link={item.href}
          />
        ))}
      </div>
      <div className="container-default text-center mb-14 ">
        <Link
          href={"tourist"}
          className="bg-default text-white px-4 md:px-8 md:py-4 py-2 rounded-lg shadow-md text-size-19 md:text-size-23 hover:rounded-3xl hover:bg-green-800"
        >
          {t("otherArea")}
        </Link>
      </div>
      <div className="container-fluid bg-borderColor py-5">
        <div className="px-4 lg:container-default py-14 ">
          <h1 className="text-size-23 lg:text-size-38 font-bold ">
            តំណរភ្ជាប់ពាក់ព័ន្ធផ្សេងៗ
          </h1>
        </div>

        <div className="lg:container-default xl:container-default  px-4 pb-16 lg:pb-24 xl:pb-24 ">
          {/* Scrollable Links */}
          <div className=" grid grid-cols-3 lg:flex w-full gap-2">
            {related_topics.map((link, idx) => (
              <Link
                key={idx}
                href={`${link.href}` || "#"}
                prefetch={false}
                className={`flex-1 text-center px-4 py-4 rounded-lg bg-gray-200  font-bold text-size-15 xl:text-size-19 lg:text-size-19 ${
                  link.active ? "bg-blue-500 text-white" : "hover:bg-gray-300"
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: link.title }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

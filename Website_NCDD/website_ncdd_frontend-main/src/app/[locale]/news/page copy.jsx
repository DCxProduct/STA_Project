export const dynamic = "force-dynamic";

import Image from "next/image";
import React from "react";
import NewsAndEventCard from "@/components/news_event/NewsAndEventCard";
import Pagination from "@/components/pagination/Pagination";
import RelatedTopic from "@/components/news_event/RelatedTopic";
import { fetchData } from "@/services/getApiService";

const page = async ({ searchParams, params }) => {
  const { page } = searchParams;
  const { locale } = params;
  const hasCategory = "category" in searchParams;
  const cateId = hasCategory ? searchParams.category : 0;
  const data =
    cateId > 0
      ? await fetchData(
          `/news/category/${cateId}?lang=${locale}&page=${page}`,
          {},
          "revalidate"
        )
      : await fetchData(`/news?lang=${locale}&page=${page}`, {}, "revalidate");
  const { cover_page, route, results, relatedTopic } = data;
  const { photo_file, title } = data.cover_page ? cover_page.topic[0] : [];

  return (
    <section className="mx-auto">
      {data.cover_page ? (
        <div className="">
          <div className="relative xl:h-[750px] lg:h-[600px] md:h-[500px] h-[300px]">
            <Image
              src={photo_file}
              alt="background"
              className="object-cover"
              fill
            />
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 px-4 bg-gradient-to-t from-default via-transparent to-transparen">
              <div className="bg-opacity-80 px-6 py-2 rounded-lg">
                <h2 className="text-white text-size-25 lg:text-size-55 md:text-size-42 font-semibold drop-shadow-md">
                  {title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span></span>
      )}
      <div className="lg:container-default py-20 px-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {data.results.topics ? (
            results.topics.map((item, idx) => (
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
                route={route}
                lang={locale}
              />
            ))
          ) : (
            <h1 className="text-default text-size-42 font-bold text-center">
              មិនមានទិន្នន័យ
            </h1>
          )}
        </div>
        {data.results.topics ? (
          <Pagination pagination={results} category={cateId} />
        ) : (
          ""
        )}
      </div>
      <div className="container-fluid bg-borderColor py-5">
        <div className="px-4 lg:container-default py-14 ">
          <h1 className="text-size-23 lg:text-size-38 font-bold ">
            ព័ត៌មានផ្សេងទៀត
          </h1>
        </div>
        <RelatedTopic data={relatedTopic.categories} locale={locale} />
      </div>
    </section>
  );
};

export default page;

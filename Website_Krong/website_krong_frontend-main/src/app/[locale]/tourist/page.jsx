export const dynamic = "force-dynamic";
import React from "react";
import Image from "next/image";
import VisitCardList from "@/components/visit/VisitCardList";
import Pagination from "@/components/pagination/Pagination";
import RelatedPlace from "@/components/visit/RelatedPlace";
import { fetchData } from "@/services/getApiService";
import { getLocale } from "next-intl/server";

const page = async ({ params, searchParams }) => {
  const { page } = searchParams;
  const locale = await getLocale();
  const data = await fetchData(`/tourism-areas?lang=${locale}&page=${page}`);
  const { cover_page, route, results } = data;
  const cover = cover_page.topic[0];
  const { related_topics } = cover_page.topic[0];

  return (
    <section className="container-fluid mx-auto">
      <div className="relative mb-10 xl:h-[700px] lg:h-[600px] md:h-[500px] h-[300px]">
        <Image
          src={cover.photo_file}
          alt="background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 px-4 bg-gradient-to-t from-default via-transparent to-transparen">
          <div className="bg-opacity-80 px-6 py-2 rounded-lg">
            <h2 className="text-white text-size-25 lg:text-size-55 md:text-size-42 font-semibold drop-shadow-md">
              {cover.title}
              {/* <HtmlContent content={cover.details} /> */}
            </h2>
          </div>
        </div>
      </div>
      <div className="lg:container-default px-4 grid xl:grid-cols-5 gap-4 py-10 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {results.topics.map((item, idx) => (
          <VisitCardList
            key={idx}
            id={item.id}
            photo_file={item.photo_file}
            title={item.title}
            link={item.href}
          />
        ))}
      </div>
      <div className="py-6 mb-8">
        <Pagination pagination={results} />
      </div>
      <div className="container-fluid bg-borderColor">
        <div className="px-4 lg:container-default py-14 ">
          <h1 className="text-size-23 lg:text-size-38 font-bold ">
            សក្តានុពុលក្រុងផ្សេងទៀត
          </h1>
        </div>
        <RelatedPlace data={related_topics} />
      </div>
    </section>
  );
};

export default page;

export const dynamic = "force-dynamic";
import Image from "next/image";
import React from "react";
import Pagination from "@/components/pagination/Pagination";
import ScholarshipCard from "@/components/scholarship/ScholarshipCard";
import { getLocale } from "next-intl/server";
import { fetchData } from "@/services/getApiService";

const page = async ({ searchParams }) => {
  const { page } = searchParams;
  const locale = await getLocale();
  const { cover_page, route, results } = await fetchData(
    `/scholarships?lang=${locale}&page=${page}`,
    {},
    "revalidate"
  );

  const cover = cover_page.topic[0];
  const data = results.topics;
  return (
    <section className="mx-auto">
      <div className="">
        <div className="relative xl:h-[750px] lg:h-[600px] md:h-[500px] h-[300px]">
          <Image
            src={cover.photo_file}
            alt="background"
            className="object-cover"
            fill
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 px-4 bg-gradient-to-t from-default via-transparent to-transparen">
            {/* "ព័ត៌មានទូទៅ" */}
            <div className="bg-opacity-80 px-6 py-2 rounded-lg">
              <h2 className="text-white text-size-25 lg:text-size-55 md:text-size-42 font-semibold drop-shadow-md">
                {cover.title}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:container-default py-20 px-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item, idx) => (
            <ScholarshipCard
              key={idx}
              img={item.photo_file}
              title={item.title}
              type={item.Joined_categories[0].title}
              view={item.visits}
              description={item.details}
              date={item.expire_date}
              link={item.href}
              id={item.id}
              route={route}
              lang={locale}
            />
          ))}
        </div>
        <Pagination pagination={results} />
      </div>
      {/* <div className="container-fluid bg-borderColor pt-10">
        <RelatedTopic data={relatedTopic.categories} />
      </div> */}
    </section>
  );
};

export default page;

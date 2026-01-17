import BarTitle from "@/components/section_title/BarTitle";
import { fetchData } from "@/services/getApiService";
import Image from "next/image";
import React from "react";
import no_data from "@/assets/images/img/noData.png";
import PrakasCard from "@/components/prakas/PrakasCard";
import Pagination from "@/components/pagination/Pagination";
import SelectFilterButton from "@/components/button/SelectFilterButton";

const page = async ({ params, searchParams }) => {
  const { locale, id } = params;
  const { page } = searchParams;

  const { results, relatedTopic } = await fetchData(
    `/opportunities/category/${id}?lang=${locale}&page=${page}`,
    {},
    "no-store"
  );

  // Sort topics by ID DESC
  const sortedTopics = Array.isArray(results?.topics)
    ? [...results.topics].sort((a, b) => b.id - a.id)
    : [];

  return (
    <section key={id} className="container py-10">
      <div className="px-0 lg:basis-4/6 basis-full md:px-5  xs:px-3 md:py-10 xs:py-5">
        {sortedTopics.length > 0 ? (
          <div>
            <BarTitle
              title={results.cat_title}
              marginBottom={"mb-10"}
              textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
              textColor={"text-default"}
              color={"default"}
            />

            <div className="flex justify-between">
              <div></div>
              <div className="flex md:justify-end xs:justify-center xs:w-full">
                <SelectFilterButton data={relatedTopic} id={id} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4 items-center">
              {sortedTopics.map((item, idx) => (
                <PrakasCard
                  key={idx}
                  title={item.title}
                  date={item.date}
                  href={item.href}
                  visits={item.visits}
                  lang={locale}
                  expire_date={item.expire_date}
                  type={""}
                />
              ))}
            </div>

            {/* Pass original pagination object to keep working navigation */}
            <Pagination pagination={results} category={id} />
          </div>
        ) : (
          <div>
            <h1 className="text-size-25 text-gray-400 mb-4 text-center">
              មិនមានទិន្នន័យ
            </h1>
            <Image
              src={no_data}
              alt="no data"
              width={400}
              height={400}
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default page;

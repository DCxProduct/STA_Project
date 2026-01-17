export const dynamic = "force-dynamic";
import React from "react";
import { fetchData } from "@/services/getApiService";
import BarTitle from "@/components/section_title/BarTitle";
import EventCard from "@/components/news_event/EventCard";
import Pagination from "@/components/pagination/Pagination";
import NewMainCard from "@/components/news_event/NewMainCard";
import RelatedTopic from "@/components/news_event/RelatedTopic";
import RightSide from "@/components/right_side/RightSide";

const page = async ({ searchParams, params }) => {
  const { page } = searchParams;
  const { locale, id } = params;
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
  const { relatednva, route, results, relatedTopic } = data;
  const newsMainCard = results.topics[0];
  const { news, videos, prakas } = relatednva;

  return (
    <section key={id} className="container md:py-10 xs:py-5 ">
      <div className="flex justify-between gap-2">
        <div className="lg:basis-4/6 basis-full shadow-box-front md:px-5  xs:px-3 md:py-10 xs:py-5 mr-2  ml-2 rounded-xl bg-white">
          <div>
            <BarTitle
              title={results.section_title}
              marginBottom={"mb-10"}
              textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
              textColor={"text-default"}
              color={"default"}
            />
          </div>
          <div>
            <NewMainCard newsMainCard={newsMainCard} locale={locale} />
          </div>

          <div className="grid grid-cols-1 gap-2 mt-2">
            {results.topics.slice(1).map((item, idx) => (
              <EventCard
                key={idx}
                title={item.title}
                details={item.details}
                date={item.date}
                img={item.photo_file}
                href={item.href}
                lang={locale}
              />
            ))}
          </div>
          <div>
            {data.results.topics ? (
              <Pagination pagination={results} category={cateId} />
            ) : (
              ""
            )}
          </div>
        </div>
        {/* right side */}

        <RightSide
          locale={locale}
          news={news}
          videos={videos}
          prakas={prakas}
        />
        {/* End right side */}
      </div>      
    </section>
  );
};

export default page;

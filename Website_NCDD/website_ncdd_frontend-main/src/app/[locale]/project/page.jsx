export const dynamic = "force-dynamic";
import React from "react";
import { fetchData } from "@/services/getApiService";
import BarTitle from "@/components/section_title/BarTitle";
import Pagination from "@/components/pagination/Pagination";
import RightSide from "@/components/right_side/RightSide";
import ProjectListCard from "@/components/project/ProjectListCard";

const page = async ({ searchParams, params }) => {
  const { page } = searchParams;
  const { locale, id } = params;

  const data = await fetchData(
    //`/project?lang=${locale}&page=${page}`,
    `/projects/category/79?lang=${locale}&page=${page}`,
    {},
    "revalidate"
  );
  const { relatednva, results } = data;
  const { news, videos, prakas } = relatednva;

  return (
    <section key={id} className="container md:py-10 xs:py-5 ">
      {data ? (
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
              {results.topics.map((item, idx) => (
                <ProjectListCard
                  title={item.title}
                  date={item.date}
                  details={item.details}
                  key={idx}
                  href={item.href}
                  description={item.description}
                />
              ))}
            </div>

            <div>
              {data.results.topics ? (
                <Pagination pagination={results} lang={locale} />
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
      ) : (
        <div>no data</div>
      )}
    </section>
  );
};

export default page;

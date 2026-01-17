"use client";
import DocumentCard from "@/components/documentfile/DocumentCard";
import Pagination from "@/components/pagination/Pagination";
import PreloaderPrimary from "@/components/shared/others/PreloaderPrimary";
import HtmlContent from "@/libs/htmlContent";
import axios from "axios";
import no_data from "@/assets/images/img/noData.png";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BarTitle from "@/components/section_title/BarTitle";
import RightSide from "@/components/right_side/RightSide";
import LoadingDocument from "@/components/documentfile/LoadingDocument";
import RightSideSkeleton from "@/components/right_side/RightSideSkeleton";
import NewMainCard from "@/components/news_event/NewMainCard";
import EventCard from "@/components/news_event/EventCard";


const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Page = ({ params, searchParams }) => {
  const { id, locale } = params;
  const { page } = searchParams;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${API_URL}/news/category/${id}?lang=${locale}&page=${page}`,
          {
            headers: {
              Authorization: API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        const res = await response.data;
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [locale, page]);

  const { relatednva, results, relatedTopic } = data || {};
  const { news, videos, prakas } = relatednva || {};
  const newsMainCard =
    Array.isArray(results?.topics) && results.topics.length > 0
      ? results.topics[0]
      : {};

  return (
    <section key={id} className="container py-10">
      <div className="flex justify-between gap-2">
        <div className="lg:basis-4/6 basis-full shadow-box-front md:px-5 xs:px-3 md:py-10 xs:py-5 mr-2 ml-2 rounded-xl bg-white">
          {isLoading ? (
            <LoadingDocument />
          ) : Array.isArray(data?.results?.topics) &&
            data.results.topics.length > 0 ? (
            <div>
              <BarTitle
                title={data.results.section_title ?? "ព្រឹត្តិការណ៍ថ្មីៗ"}
                marginBottom={"mb-10"}
                textSize={"lg:text-size-28 text-size-23"}
                textColor={"text-default"}
                color={"default"}
              />
              <NewMainCard newsMainCard={newsMainCard} locale={locale} />
              <div className="grid grid-cols-1 gap-2 mt-2">
                {results?.topics.slice(1).map((item, idx) => (
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
              <Pagination pagination={results} category={id} />
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-size-25 text-gray-400 mb-4">
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

        {/* right side */}
        {data ? (
          <RightSide
            locale={locale}
            news={news}
            videos={videos}
            prakas={prakas}
          />
        ) : (
          <RightSideSkeleton />
        )}
        {/* End right side */}
      </div>

      
    </section>
  );
};

export default Page;

"use client";
import DocumentCard from "@/components/documentfile/DocumentCard";
import Pagination from "@/components/pagination/Pagination";
import PreloaderPrimary from "@/components/shared/others/PreloaderPrimary";
import HtmlContent from "@/libs/htmlContent";
import axios from "axios";
import no_data from "@/assets/images/img/no_data.png";

import React, { useEffect, useState } from "react";
import Image from "next/image";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const Page = ({ params, searchParams }) => {
  const { id, locale } = params;
  const { page } = searchParams;
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(id);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/legal-documents/category/${activeTab}?lang=${locale}&page=${page}`,
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
      }
    };

    getData();
  }, [activeTab, locale, page]);

  const tabs = data
    ? data.sub_link.categories[0].sub_categories
    : [{ id: 64, title: "" }];

  return (
    <section>
      {data ? (
        <div className="lg:container-default px-4 mx-auto">
          <div className="text-center py-10 text-size-34 mt-10">
            <h1 className="lg:text-size-55 text-size-35 mb-3 font-bold py-5">
              <HtmlContent content={data.cover_page.topic[0].title} />
            </h1>
            <div className="inline-flex rounded-full border border-default overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 lg:text-size-25 text-size-19 font-bold transition-transform duration-300  rounded-full ${
                    activeTab == tab.id
                      ? "bg-default text-white"
                      : "bg-white text-blue-700"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
          {data.results.topics ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 py-10">
              {data.results.topics.map((value, idx) => (
                <DocumentCard
                  key={idx}
                  photo_file={value.photo_file ?? ""}
                  title={value.title}
                  href={value.href}
                />
              ))}
            </div>
          ) : (
            <div className="container-default">
              <h1 className="text-center text-size-19 md:text-size-32 lg:text-size-44">
                មិនមានទិន្នន័យ
              </h1>
              <Image src={no_data} className="mx-auto" alt="No Data..." />
            </div>
          )}
          {data.results.topics ? (
            <div className="pb-10 mb-10">
              <Pagination pagination={data.results} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <PreloaderPrimary />
      )}
    </section>
  );
};

export default Page;

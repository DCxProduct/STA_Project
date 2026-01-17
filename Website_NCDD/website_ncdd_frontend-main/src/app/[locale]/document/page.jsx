"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";
import RightSide from "@/components/right_side/RightSide";
import RightSideSkeleton from "@/components/right_side/RightSideSkeleton";
import BarTitle from "@/components/section_title/BarTitle";
import RelatedDocument from "@/components/documentfile/RelatedDocument";
import DocumentFileCard from "@/components/documentfile/DocumentFileCard";
import LoadingDocument from "@/components/documentfile/LoadingDocument";
import DocumentCard from "@/components/documentfile/DocumentCard";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id;
  const locale = params?.locale;
  const page = searchParams.get("page") || 1;
  const cateId = searchParams.has("category")
    ? searchParams.get("category")
    : 0;

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(false); // false = list, true = grid

  // Read activeTab from localStorage on first mount
  useEffect(() => {
    const storedValue = localStorage.getItem("activeTab");
    if (storedValue !== null) {
      setActiveTab(storedValue === "true");
    }
  }, []);

  // Handle layout tab click and persist to localStorage
  const handleTabChange = (value) => {
    setActiveTab(value);
    localStorage.setItem("activeTab", value.toString());
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response =
          cateId <= 0
            ? await axios.get(
                `${API_URL}/legal-documents?lang=${locale}&page=${page}`,
                {
                  headers: {
                    Authorization: API_KEY,
                    "Content-Type": "application/json",
                  },
                }
              )
            : await axios.get(
                `${API_URL}/legal-documents/category/${cateId}?lang=${locale}&page=${page}`,
                {
                  headers: {
                    Authorization: API_KEY,
                    "Content-Type": "application/json",
                  },
                }
              );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [locale, page, cateId]);

  const { relatednva, results, relatedTopic } = data || {};
  const { news, videos, prakas } = relatednva || {};

  return (
    <section key={id} className="container py-10">
      <div className="flex justify-between gap-2">
        {/* Left content */}
        <div className="lg:basis-4/6 basis-full shadow-box-front md:px-5 xs:px-3 md:py-10 xs:py-5 mr-2 ml-2 rounded-xl bg-white">
          {data?.results?.topics ? (
            <>
              <div className="flex justify-between items-center mb-5">
                <BarTitle
                  title={data.results.section_title}
                  marginBottom={""}
                  textSize={"lg:text-size-28 text-size-23"}
                  textColor={"text-default"}
                  color={"default"}
                />
                <div className="lg:flex items-center text-size-26 xs:hidden ">
                  <div
                    className={`border-1px px-1 py-1 cursor-pointer ${
                      !activeTab ? "bg-buttonBlue text-white" : ""
                    }`}
                    onClick={() => handleTabChange(false)}
                  >
                    <CiGrid2H />
                  </div>
                  <div
                    className={`border-1px px-1 py-1 cursor-pointer ${
                      activeTab ? "bg-buttonBlue text-white" : ""
                    }`}
                    onClick={() => handleTabChange(true)}
                  >
                    <CiGrid41 />
                  </div>
                </div>
              </div>

              <div className="pb-5">
                <RelatedDocument data={relatedTopic?.categories} />
              </div>

              <div className="lg:block hidden">
                {activeTab ? (
                  <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
                    {data.results.topics.map((item, idx) => (
                      <DocumentCard
                        key={idx}
                        title={item.title}
                        href={item.href}
                        photo_file={item.photo_file}
                      />
                    ))}
                  </div>
                ) : (
                  <DocumentFileCard data={data.results.topics} />
                )}
              </div>
              <div className="block lg:hidden">
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
                  {data.results.topics.map((item, idx) => (
                    <DocumentCard
                      key={idx}
                      title={item.title}
                      href={item.href}
                      photo_file={item.photo_file}
                    />
                  ))}
                </div>
              </div>

              <Pagination pagination={results} category={cateId} />
            </>
          ) : (
            <LoadingDocument />
          )}
        </div>

        {/* Right sidebar */}
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
      </div>
    </section>
  );
};

export default Page;

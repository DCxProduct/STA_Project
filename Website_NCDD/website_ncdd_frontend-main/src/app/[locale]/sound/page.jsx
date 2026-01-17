"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/Pagination";
import RightSide from "@/components/right_side/RightSide";
import RightSideSkeleton from "@/components/right_side/RightSideSkeleton";
import LoadingDocument from "@/components/documentfile/LoadingDocument";
import BarTitle from "@/components/section_title/BarTitle";
import SoundCard from "@/components/sounds/SoundCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params?.id;
  const locale = params?.locale;
  const page = searchParams.get("page") || 1;
  const [data, setData] = useState(null);
  useEffect(() => {
    const handlePauseOthers = (e) => {
      const currentAudio = e.detail;
      const allAudios = document.querySelectorAll("audio");
      allAudios.forEach((audio) => {
        if (audio !== currentAudio) {
          audio.pause();
        }
      });
    };

    window.addEventListener("pauseOthers", handlePauseOthers);
    return () => {
      window.removeEventListener("pauseOthers", handlePauseOthers);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/sounds?lang=${locale}&page=${page}`,
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
  }, [locale, page]);

  const { relatednva, results } = data || {};
  const { news, videos, prakas } = relatednva || {};

  return (
    <section key={id} className="container py-10">
      <div className="flex justify-between gap-2">
        {/* Left content */}
        <div className="lg:basis-4/6 basis-full shadow-box-front md:px-5  xs:px-3 md:py-10 xs:py-5 mr-2  ml-2 rounded-xl bg-white">
          {data?.results?.topics ? (
            <div>
              <div>
                <BarTitle
                  title={data.results.section_title}
                  marginBottom={""}
                  textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
                  textColor={"text-default"}
                  color={"default"}
                />
              </div>
              <div className="flex-col ">
                {results.topics.map((item, idx) => (
                  <div className="py-3" key={idx}>
                    <SoundCard
                      key={idx}
                      title={item.title}
                      href={item.href}
                      lang={locale}
                      audio_file={item.audio_file}
                      date={item.date}
                    />
                  </div>
                ))}
              </div>
              <div>
                <Pagination pagination={results} />
              </div>
            </div>
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

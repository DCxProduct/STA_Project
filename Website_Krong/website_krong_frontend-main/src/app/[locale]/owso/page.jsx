"use client";

import StepButton from "@/components/button/StepButton";
import PreloaderPrimary from "@/components/shared/others/PreloaderPrimary";
import HtmlContent from "@/libs/htmlContent";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Page = ({ params }) => {
  const [topics, setTopics] = useState([]);
  const [cover, setCover] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const { locale } = params;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/one-window-services?lang=${locale}`,
          {
            headers: {
              Authorization: API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        const res = response.data;
        const topicList = res?.results?.topics || [];

        setTopics(topicList);
        setCover(res.cover_page.topic);
        if (topicList.length > 0) {
          setActiveId(topicList[0].id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [locale]);

  useEffect(() => {
    const topic = topics.find((t) => t.id === activeId);
    setActiveTopic(topic || null);
  }, [activeId, topics, locale]);
  const coverTopic = cover[0]; // first topic for banner
  return (
    <section>
      <div className="container-fluid">
        {topics.length > 0 ? (
          <div>
            {/* Banner */}
            <div className="relative xl:h-[750px] lg:h-[600px] md:h-[500px] h-[300px]">
              <Image
                src={coverTopic?.photo_file ?? ""}
                alt="background"
                className="object-cover"
                fill
              />
              <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 px-4 bg-gradient-to-t from-default via-transparent to-transparent">
                <div className="bg-opacity-80 px-6 py-2 rounded-lg">
                  <h2 className="text-white text-size-25 lg:text-size-55 md:text-size-42 font-semibold drop-shadow-md">
                    {coverTopic?.title ?? ""}
                  </h2>
                </div>
              </div>
            </div>

            {/* Tabs + Content */}
            <div className="lg:container-default py-10 px-4">
              <div className="flex flex-wrap gap-1 ml-3">
                {topics.map((value, idx) => (
                  <button
                    key={idx}
                    className={`relative px-8 py-4 text-white mb-1 ml-[-15px] lg:text-size-23 md:text-size-19 text-size-15 ${
                      value.id === activeId
                        ? "bg-default border border-white"
                        : "bg-gray-400"
                    }`}
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)",
                    }}
                    onClick={() => setActiveId(value.id)}
                  >
                    {value.title}
                  </button>
                ))}
              </div>

              {/* Content */}
              {activeTopic && (
                <div className="mt-6">
                  {activeTopic.details && (
                    // <Image
                    //   src={activeTopic.photo_file}
                    //   alt={activeTopic.title}
                    //   className="w-full h-64 object-cover rounded mb-4"
                    //   width={1200}
                    //   height={400}
                    // />
                    <HtmlContent content={activeTopic.details} />
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <PreloaderPrimary />
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;

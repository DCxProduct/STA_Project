import HtmlContent from "@/libs/htmlContent";
import { fetchData } from "@/services/getApiService";
import Image from "next/image";
import React from "react";

const page = async ({ params }) => {
  // const id = params.id;
  const { locale, id } = params;
  const { results } = await fetchData(`/page/${id}/${locale}`, {}, "no-store");
  const data = results.topic[0];
  const { photo_file, title, details } = data;

  return (
    <section key={id}>
      <div className="container-fluid">
        <div className="relative xl:h-[750px] lg:h-[600px] md:h-[500px] h-[300px]">
          <Image
            src={photo_file}
            alt="background"
            className="object-cover"
            fill
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center pb-8 px-4 bg-gradient-to-t from-default via-transparent to-transparen">
            {/* "ព័ត៌មានទូទៅ" */}
            <div className="bg-opacity-80 px-6 py-2 rounded-lg">
              <h2 className="text-white text-size-25 lg:text-size-55 md:text-size-42 font-semibold drop-shadow-md">
                {title}
                {/* <HtmlContent content={details} /> */}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:container-default overflow-hidden py-10 px-4">
        <div>
          <HtmlContent content={details} />
        </div>
      </div>
    </section>
  );
};

export default page;

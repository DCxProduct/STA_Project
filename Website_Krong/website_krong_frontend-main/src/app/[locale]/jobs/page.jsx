import JobsCard from "@/components/jobs/JobsCard";
import { fetchData } from "@/services/getApiService";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";

const page = async ({ params }) => {
  const { locale } = params;
  const { cover_page, results } = await fetchData(
    `/jobs?lang=${locale}`,
    {},
    "revalidate"
  );
  const cover = cover_page.topic[0];
  const result = results.topics;

  return (
    <section>
      <div className="relative lg:container-fluid h-[300px] md:h-[570px] lg:h-[700px] px-4">
        <Image
          src={cover.photo_file}
          className="object-center"
          alt={cover.photo_file}
          fill
        />
      </div>
      <div className="lg:container-default mx-auto px-4">
        {result.map((value, idx) => (
          <JobsCard
            key={idx}
            title={value.title}
            content={value.details}
            route={value.href}
            fields={value.fields}
            expire_date={value.expire_date}
          />
        ))}
      </div>
    </section>
  );
};

export default page;

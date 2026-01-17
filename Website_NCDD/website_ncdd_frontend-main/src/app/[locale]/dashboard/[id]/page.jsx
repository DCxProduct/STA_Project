import { fetchData } from "@/services/getApiService";
import React from "react";

const page = async ({ params }) => {
  const { locale, id } = params;
  const { results } = await fetchData(
    `/dashboard/${id}/${locale}`,
    {},
    "no-store"
  );
  const data = results.topic[0] ?? [];
  const url = data.fields[0].value;
  const title = data.title;
  return (
    <section key={id} className="container py-0 ">
      <div className="container py-7 mr-2 ml-2">
        <h1 className={`py-5 text-size-23 khmer-text-odor:${locale} text-default`}>{title}</h1>
        <iframe
          src={url}
          width="100%"
          height="800"
          loading="lazy"
          style={{ border: "none" }}
        />
      </div>
    </section>
  );
};

export default page;

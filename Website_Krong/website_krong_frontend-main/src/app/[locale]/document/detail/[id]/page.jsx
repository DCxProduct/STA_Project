import { fetchData } from "@/services/getApiService";
import React from "react";
import PDFViewer from "../../PDFViewer";
import DocumentCard from "@/components/documentfile/DocumentCard";

const page = async ({ params }) => {
  const { id, locale } = params;
  const { results, relatedTopic } = await fetchData(
    `/legal-documents/page/${id}/${locale}`,
    {},
    "revalidate"
  );
  const { title, attach_file, related_topics } = results.topic[0];

  return (
    <section className="container-fluid mx-auto">
      <div className="lg:container-default py-14 px-4">
        <h1 className="lg:text-center text-left lg:text-size-34 text-size-21 font-bold">
          {title}
        </h1>
        <div className="py-10">
          <PDFViewer pdfUrl={attach_file} />
        </div>
        <div>
          <div className="py-10">
            <h1 className="text-size-23 lg:text-size-38 font-bold md:text-size-25">
              ឯកសារផ្សេងៗទៀត
            </h1>
            <div className="gap-3 grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 py-10">
              {related_topics.map((value, idx) => (
                <DocumentCard
                  key={idx}
                  photo_file={value.photo_file ?? ""}
                  title={value.title}
                  href={value.href}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

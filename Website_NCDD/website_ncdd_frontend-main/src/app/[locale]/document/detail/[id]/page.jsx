import { fetchData } from "@/services/getApiService";
import React from "react";
import PDFViewer from "../../PDFViewer";

import BarTitle from "@/components/section_title/BarTitle";
import RightSide from "@/components/right_side/RightSide";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import NumToKhmer from "@/libs/numToKhmer";
import Image from "next/image";
import downloadIcon from "@/assets/images/icons/download.png";
import pdf from "@/assets/images/icons/pdf.png";
import documentIcon from "@/assets/images/icons/related_topic.png";
import DocumentCard from "@/components/documentfile/DocumentCard";
import DocumentDetail from "@/components/documentfile/DocumentDetail";

const page = async ({ params, searchParams }) => {
  const { id, locale } = params;
  const hasCategory = "category" in searchParams;
  const cateId = hasCategory ? searchParams.category : 0;
  const { results, relatednva } = await fetchData(
    `/legal-documents/page/${id}/${locale}`,
    {},
    "revalidate"
  );
  const { title, attach_file, related_topics, date, photo_file, fields } =
    results.topic[0];
  const { news, videos, prakas } = relatednva;
  const [year, month, day] = date.split("-");

  return (
    <section key={id} className="container md:py-10 xs:py-5 ">
      <div className="flex justify-between gap-2">
        <div className="lg:basis-4/6 basis-full shadow-box-front md:px-5 xs:px-3 md:py-10 xs:py-5 mr-2 ml-2 rounded-xl bg-white">
          <div>
            <BarTitle
              title={results.section_title}
              marginBottom={"mb-5"}
              textSize={"lg:text-size-28 text-size-23"}
              textColor={"text-default"}
              color={"default"}
            />
          </div>
          <div className="flex items-center gap-2 text-gray-500 border-b-1px pb-2">
            <FaRegCalendarAlt className="" />
            <div className="mt-1 lg:text-size-15">
              {MonthInKhmer(month, locale)} {NumToKhmer(day, locale)}{" "}
              {NumToKhmer(year, locale)}
            </div>
          </div>

          <div>
            <DocumentDetail
              photo_file={photo_file}
              title={title}
              attach_file={attach_file}
              downloadIcon={downloadIcon}
              fields={fields}
            />
          </div>
          <div>
            <div className="flex gap-2 items-center border-b-2 pb-2 lg:mt-12 mt-10">
              <Image src={pdf} width={30} height={30} alt="icon" />
              <div>
                <h1 className="text-size-22 mt-3"> ឯកសារ</h1>
              </div>
            </div>
          </div>
          <div className="py-10">
            <PDFViewer pdfUrl={attach_file} />
          </div>
          <div>
            <div className="flex gap-2 items-center border-b-2 pb-2 mt-16 mb-5">
              <Image src={documentIcon} width={30} height={30} alt="icon" />
              <div>
                <h1 className={`text-size-28 mt-3 khmer-text-odor:${locale}`}> ឯកសារពាក់ព័ន្ធ៖</h1>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mt-10">
              {related_topics.map((item, idx) => (
                <DocumentCard
                  key={idx}
                  photo_file={item.photo_file}
                  title={item.title}
                  href={item.href}
                />
              ))}
            </div>
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
    </section>
  );
};

export default page;

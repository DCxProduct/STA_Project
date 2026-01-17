import BarTitle from "@/components/section_title/BarTitle";
import HtmlContent from "@/libs/htmlContent";
import { fetchData } from "@/services/getApiService";
import Image from "next/image";
import React from "react";
import imagesIcon from "@/assets/images/icons/image.png";
import documentIcon from "@/assets/images/icons/document.png";
import relatedTopicIcon from "@/assets/images/icons/related_topic.png";
import DocumentTable from "../../document/DocumentTable";
import Link from "next/link";
import PhotoAlbum from "@/components/photo_alblum/PhotoAlbum";
import RightSide from "@/components/right_side/RightSide";
import NumToKhmer from "@/libs/numToKhmer";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import { IoCalendarOutline } from "react-icons/io5";
import Social from "@/components/social/Social";
import { getTranslations } from "next-intl/server";

const page = async ({ params }) => {
  // const id = params.id;
  const t = await getTranslations("DetailPage");
  const domain = process.env.WEBSITE_DOMAIN;
  const { locale, id } = params;
  const { results, relatednva } = await fetchData(
    `/page/${id}/${locale}`,
    {},
    "no-store"
  );
  const data = results.topic[0] ?? [];
  const {
    photo_file,
    title,
    details,
    photos,
    attach_files,
    related_topics,
    header_title,
    date,
  } = data;
  const { news, videos, prakas } = relatednva;
  const [year, month, day] = date.split("-");
  return (
    <section key={id} className="container md:py-10 xs:py-5 ">
      <div className="flex justify-between gap-2">
        <div className="lg:basis-4/6 basis-full shadow-box-front md:px-5  xs:px-3 md:py-10 xs:py-5 mr-2  ml-2 rounded-xl bg-white">
          {header_title ? (
            <div>
              <BarTitle
                title={header_title}
                marginBottom={"mb-10"}
                textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
                textColor={"text-default"}
                color={"default"}
              />
            </div>
          ) : (
            ""
          )}
          {title ? (
            <div>
              <h1 className={`lg:text-size-26 text-size-22 pb-1:${locale} mt-5 line-height-32`}>{title}</h1>
              <div className="flex items-center mt-2 text-gray-400 border-b-1px border-dashed pb-2 lg:text-size-15 text-size-13">
                <IoCalendarOutline size={20} className="" />
                <p className="ml-2 text-size-14 mt-2">
                  {NumToKhmer(day, locale)}&nbsp;
                  {MonthInKhmer(month, locale)}&nbsp;
                  {NumToKhmer(year, locale)}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
          {photo_file ? (
            <div className="relative w-full lg:h-[360px] xl:min-h-[500px] mt-5 px-4 py-4">
              <Image
                src={photo_file}
                alt="Banner"
                layout="intrinsic" // if using older Next.js
                width={800}
                height={500}
                className="object-cover w-full h-auto"
                sizes="100vw"
              />
            </div>
          ) : (
            ""
          )}
          {details ? (
            <div className="md:px-4 xs:px-0 md:py-10 mt-2 line-height-32 lg:text-size-18 text-size-17">              
              <HtmlContent content={details} />
              {/* Social Share Buttons */}
              <Social link={`${domain}news/${id}`} title={title} />            
            </div>
          ) : (
            ""
          )}
          {photos && photos.length > 0 ? (
            <PhotoAlbum imagesIcon={imagesIcon} photos={photos} />
          ) : (
            ""
          )}
          {attach_files && attach_files.length > 0 ? (
            <div>
              <div className="flex gap-2 items-center border-b-2 pb-2 mt-16 mb-5">
                <Image src={documentIcon} width={30} height={30} alt="icon" />
                <div>
                  <h1 className={`text-size-28 mt-3 khmer-text-odor:${locale}`}>{t("relateDoc")}</h1>
                </div>
              </div>
              <div>
                <DocumentTable rows={attach_files} />
              </div>
            </div>
          ) : (
            ""
          )}
          {related_topics && related_topics.length > 0 ? (
            <div>
              <div className="flex gap-2 items-center border-b-2 pb-2 mt-16">
                <Image
                  src={relatedTopicIcon}
                  width={30}
                  height={30}
                  alt="icon"
                />
                <div>
                  <h1 className={`text-size-28 mt-3 khmer-text-odor:${locale}`}>{t("relateCon")}</h1>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 mt-5">
                {related_topics.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="cursor-pointer hover:text-default lg:text-size-19 hover:ml-2 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* Right side */}
        <RightSide
          news={news}
          locale={locale}
          videos={videos}
          prakas={prakas}
        />
        {/* End right side */}
      </div>
    </section>
  );
};

export default page;

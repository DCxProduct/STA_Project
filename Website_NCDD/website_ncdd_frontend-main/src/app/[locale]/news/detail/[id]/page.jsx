// export const dynamic = "force-dynamic";
import Image from "next/image";
import React from "react";
import { fetchData } from "@/services/getApiService";
import HtmlContent from "@/libs/htmlContent";
import BarTitle from "@/components/section_title/BarTitle";
import RightSide from "@/components/right_side/RightSide";
import PhotoAlbum from "@/components/photo_alblum/PhotoAlbum";
import imagesIcon from "@/assets/images/icons/image.png";
import relatedTopicIcon from "@/assets/images/icons/related_topic.png";
import { IoCalendarOutline, IoEye } from "react-icons/io5";
import NumToKhmer from "@/libs/numToKhmer";
import { MonthInKhmer } from "@/libs/monthInKhmer";
import EventCard from "@/components/news_event/EventCard";
import { getTranslations } from "next-intl/server";
import { Hanuman } from "next/font/google";
import RelatedTopic from "@/components/news_event/RelatedTopic";
import Visit from "@/components/visit/Visit";
import Social from "@/components/social/Social";


const hanuman = Hanuman({
  weight: "400",
  subsets: ["khmer"],
  display: "swap",
});

const page = async ({ params }) => {
  const domain = process.env.WEBSITE_DOMAIN;
  const { id, locale } = params;
  const data = await fetchData(`/news/page/${id}/${locale}`, {}, "no-store");
  const { results, relatednva } = data;
  const topic = results.topic[0];
  const { title, details, date, photo_file, photos, related_topics, visits } = topic;
  const [year, month, day] = date.split("-");
  const { news, videos, prakas } = relatednva;
  const t = getTranslations("News");
  const { relatedTopic } = data || {};
  
  const { Joined_categories } = topic;
  const category = Joined_categories[0];
  
  return (
    <section key={id} className="container md:py-10 xs:py-5 ">
      <div className="flex justify-between gap-2">
        {/* left side */}
        <div className="lg:basis-4/6 basis-full shadow-box-front md:px-5  xs:px-3 md:py-10 xs:py-5 mr-2  ml-2 rounded-xl bg-white">
          {title ? (
            <div>
              {/*<BarTitle
                title={results.section_title}
                marginBottom={"mb-10"}
                textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
                textColor={"text-default"}
                color={"default"}
              /> */}
              <div className="mt-3 py-0 border-b-1px border-dashed">
                <div>
                  <span className={`lg:text-size-21 text-size-19 khmer-text-odor:${locale} line-height-36`}>
                    {title}
                  </span>                  
                </div>                
                <div
                  className={`flex gap-1 text-gray-400 items-center lg:text-size-16 text-size-14 py-2 khmer-text-batr`}
                >
                  <IoCalendarOutline size={17} />
                  <p>
                    {NumToKhmer(day, locale)}&nbsp;
                    {MonthInKhmer(month, locale)}&nbsp;
                    {NumToKhmer(year, locale)}
                  </p>, &nbsp;
                  <IoEye size={17} />
                  <p>
                    {visits}
                  </p>                  
                </div>                
              </div>                         
            </div>
          ) : (
            ""
          )}
          {photo_file ? (
            <div className="relative w-full mt-5 px-0 py-3">
              <Image
                src={photo_file}
                alt="Banner"
                layout="intrinsic" // if using older Next.js
                width={800}
                height={500}
                className="object-cover w-full h-auto rounded"
                sizes="100vw"
              />
            </div>

          ) : (
            ""
          )}
          

          <div className={`md:px-4 py-5 mt-2 line-height-32 text-size-18`}>
            <HtmlContent content={details?.replace('---', '') || ''} fontMoulSize={"text-size-16"} />            
            {/* Social Share Buttons */}
            <Social link={`${domain}news/${id}`} title={title} />            
          </div>

          {photos && photos.length > 0 ? (
            <PhotoAlbum imagesIcon={imagesIcon} photos={photos} />
          ) : (
            ""
          )}

          {related_topics && related_topics.length > 0 ? (
            <div>
              <div className="flex gap-2 items-center border-b-2 pb-2 mt-16  mb-5">
                <Image
                  src={relatedTopicIcon}
                  width={30}
                  height={30}
                  alt="icon"
                />
                <div>
                  <h1 className="text-size-28 mt-3"> {t("relatedTopic")}</h1>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 mt-5">
                {related_topics.map((item, idx) => (
                  <EventCard
                    key={idx}
                    title={item.title}
                    img={item.photo_file}
                    details={item.details}
                    href={item.href}
                    date={item.date}
                    lang={locale}
                  />
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          {relatedTopic ? (
            <div className="px-4 mt-10">
              <BarTitle
                title={"ព័ត៌មានដទៃទៀត"}
                marginBottom={"mb-10"}
                textSize={"lg:text-size-28 text-size-23"}
                textColor={"text-default"}
                color={"default"}
              />
              <RelatedTopic
                data={relatedTopic?.categories ?? {}}
                catId={id}
                locale={locale}
              />
            </div>
          ) : null}
        </div>
        {/* End left side */}

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

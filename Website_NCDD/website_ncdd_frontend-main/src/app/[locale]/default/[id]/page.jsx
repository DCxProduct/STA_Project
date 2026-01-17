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
import no_data from "@/assets/images/img/noData.png";
import { IoMdArrowDropright } from "react-icons/io";
import Social from "@/components/social/Social";
import { getTranslations } from "next-intl/server";
import DownloadLogoButton from "@/components/button/DownloadLogoButton";

const page = async ({ params }) => {
  // const id = params.id;
  const domain = process.env.WEBSITE_DOMAIN;
  const { locale, id } = params;
  const { results, relatednva } = await fetchData(
    `/page/${id}/${locale}`,
    {},
    "no-store"
  );
  const t = await getTranslations("DetailPage");
  const data =
    Array.isArray(results?.topic) && results.topic.length > 0
      ? results.topic[0]
      : {};

  const { photo_file, title, details, photos, attach_files, related_topics } =
    data;
  const { news, videos, prakas } = relatednva;
  const formatTitle = (text) => {
    return text.replace(
      /\[([^\]]+)\]/g,
      `<span class="khmer-text-moul:${locale}">$1</span>`
    );
  };

  return (
    <section key={id} className="container md:py-10 xs:py-5 ">
      <div className="flex justify-between gap-2">
        {Array.isArray(results?.topic) && results.topic.length > 0 ? (
          <div className="lg:basis-4/6 basis-full shadow-box-front md:px-5 xs:px-3 md:py-10 xs:py-5 mr-2 ml-2 rounded-xl bg-white">
            {title ? (
              <div>
                <BarTitle
                  title={<span dangerouslySetInnerHTML={{ __html: formatTitle(title) }} />}
                  marginBottom="mb-10"
                  textSize={`lg:text-size-28 text-size-23 khmer-text-odor:${locale}`}
                  textColor="text-default"
                  color="default"
                />
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
            {details ? (
              <div className="md:px-0 py-7 line-height-32 lg:text-size-18 xs:text-size-17 list-disc list-inside">
                <HtmlContent content={details?.replace('---', '') || ''} fontMoulSize={"text-size-17"} />                
                { id == 738 ? (
                    <DownloadLogoButton label={t("downloadlogo")} />
                ) : null }           
                <Social link={`${domain}default/${id}`} title={title} />
                              
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
                <div className={`flex gap-2 items-center border-b-2 pb-2 mt-16 khmer-text-odor:${locale} mb-5`}>
                  <Image src={documentIcon} width={30} height={30} alt="icon" />
                  <div>
                    <h1 className="text-size-28 mt-3"> {t("relateDoc")}</h1>
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
                <div className={`flex gap-2 items-center border-b-2 pb-2 mt-16 khmer-text-odor:${locale}`}>
                  <Image
                    src={relatedTopicIcon}
                    width={30}
                    height={30}
                    alt="icon"
                  />
                  <div>
                    <h1 className={`text-size-28 mt-3 khmer-text-odor:${locale}`}> {t("relateCon")} </h1>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 mt-5">
                    {related_topics.map((item, idx) => {
                      // Remove square brackets but keep the inner text
                      if (/\[([^\]]*)\]/.test(item.title)) {
                        item.title = item.title.replace(/\[([^\]]*)\]/g, "$1");
                      }

                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          className={`cursor-pointer hover:text-default lg:text-size-18 hover:ml-2 transition-all duration-300 flex items-center khmer-text-odor:${locale}`}
                        >
                          <IoMdArrowDropright /> {item.title}
                        </Link>
                      );
                    })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-size-25 text-gray-400 mb-4 text-center">
              {t("empty")}
            </h1>
            <Image
              src={no_data}
              alt="no data"
              width={400}
              height={400}
              className="mx-auto"
            />
          </div>
        )}

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

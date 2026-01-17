"use client";
import { useState } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import HtmlContent from "@/libs/htmlContent";
import BarTitle from "../section_title/BarTitle";
import sanitizeHtml from "sanitize-html";
import { useTranslations, useLocale } from "next-intl";
import logoPopup from "@/assets/logos/Logo-Base@2x.jpg";
import logoDownload from "@/assets/logos/Logo-Base@2x.png";

export default function Slideshow({ abouts = {}, ncdd = {} }) {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const [popupImage, setPopupImage] = useState(null);

  // safely destructure with defaults
  const { cards_top = {}, about_page = {}, photos = [] } = abouts;
  const subCommitte = cards_top.topics || [];
  const aboutNCDD = about_page.topic?.[0] || {};
  const about_ncdd = ncdd.topic?.[0] || {};

  const rawHTML = aboutNCDD.details?.split("---")[0] || "";
  const cleanedHTML = sanitizeHtml(rawHTML, {
    allowedTags: false,
    allowedAttributes: false,
    allowVulnerableTags: true,
  });

  const ncddCleanedHTML = sanitizeHtml(about_ncdd.details || "", {
    allowedTags: false,
    allowedAttributes: false,
    allowVulnerableTags: true,
  });

  // Handle instant download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = logoDownload.src; // use .src for imported Next.js image
    link.download = "Logo-Base@2x.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="container-fluid mx-auto sm:px-0">
      <div className="mx-2">
        <div className="relative z-10 md:mt-[-4%] xs:mt-[-8%] container bg-whiteColor shadow-box-front rounded-xl mb-6">
          {/* Welcome Section */}
          <div className="py-1 w-[93%] mx-auto">
            <div className="py-5 mb-0">
              <BarTitle
                title={aboutNCDD.title}
                marginBottom={"mb-10"}
                textSize={`lg:text-size-26 text-size-23 khmer-text-odor:${locale}`}
                color={"default"}
              />
              <div
                className="relative w-full h-[100%] cursor-pointer"
                onClick={() => setPopupImage(logoPopup)}
              >
                <Image
                  src={aboutNCDD.photo_file}
                  alt="Photo Logo"                                    
                  width={1145}
                  height={400}
                  className="object-cover"
                  sizes="100vw"                  
                />
              </div>
              {/* Popup Image */}
              {popupImage && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                  onClick={() => setPopupImage(null)} // close when clicking the dark area
                >
                  <div
                    className="relative bg-white w-[700px] max-w-4xl flex flex-col items-center rounded-xl"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                  >
                    <Image
                      src={popupImage}
                      alt="Popup"
                      width={800}
                      height={800}
                      className="rounded-xl object-contain"
                    />

                    {/* Close Button */}
                    <button
                      onClick={() => setPopupImage(null)}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
                    >
                      <IoMdClose size={30} />
                    </button>

                    {/* ✅ Centered Download Button */}
                    <button
                      onClick={handleDownload}
                      className="mb-4 bg-white text-default rounded-full px-5 py-2 shadow-md hover:bg-gray-200 transition flex items-center gap-2 justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 10.5l4.5 4.5m0 0l4.5-4.5m-4.5 4.5V3"
                        />
                      </svg>
                      <span className="text-sm font-medium">{t("download")}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* About Section */}
              <div className={`khmer-text-batr:${locale}`}>
                <HtmlContent
                  content={cleanedHTML}
                  className="text-size-18 line-height-32"
                  local={locale}
                />
              </div>
            </div>

            {/* Find More Button */}
            <div className="border-b border-gray-200 flex justify-end py-0 pb-5">
              <Link
                href={aboutNCDD.href}
                className="bg-[#E7EEF4] text-[#4270A5] xs:text-size-17 rounded-full px-5 py-2 hover:bg-cardDefault transition"
              >
                {t("findMore")}
              </Link>
            </div>
          </div>

          {/* NCDD Section */}
          <div className="py-1 w-[93%] mx-auto">
            <div className="py-5 mb-5">
              <BarTitle
                title={about_ncdd.title}
                marginBottom={"mb-10"}
                textSize={`lg:text-size-26 text-size-23 khmer-text-odor:${locale}`}
                color={"default"}
              />

              <div className="mt-5">
                <HtmlContent
                  content={ncddCleanedHTML}
                  className="text-size-18 line-height-32"
                  fontMoulSize={"text-size-17"}
                />
              </div>
            </div>
          </div>

          {/* Committee Section */}
          <div className="pb-[15px] w-[93%] mx-auto">
            <div className="pb-[15px] text-white mb-3">
              <BarTitle
                title={cards_top.cat_title}
                marginBottom={"mb-6"}
                textSize={`lg:text-size-26 text-size-21 khmer-text-odor:${locale} mb-0`}
              />
              <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 justify-between mt-5">
                {subCommitte.map((item, idx) => (
                  <Link
                    href={item.fields?.[0]?.value ?? "#"}
                    key={idx}
                    className="border border-gray-200 w-full rounded-lg py-6 px-5 hover:text-default cursor-pointer text-default duration-300 transform hover:bg-cardDefault from-default to-buttonBlue"
                  >
                    <div className="flex justify-center">
                      <Image
                        src={item.photo_file}
                        alt={item.photo_file}
                        width={145}
                        height={100}
                      />
                    </div>
                    <div
                      className={`text-center text-size-18 khmer-text-odor:${locale} font-bold mt-6 line-height-32`}
                    >
                      {item.title?.split("|")[0]}
                    </div>
                    <div
                      className={`text-center text-size-18 khmer-text-odor:${locale} font-bold mt-0 line-height-32`}
                    >
                      {item.title?.split("|")[1]}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

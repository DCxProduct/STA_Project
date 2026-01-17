"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useLocale } from "next-intl";

const PhotoAlbum = ({ imagesIcon, photos }) => {
  const locale = useLocale();
  const t = useTranslations("News");
  const [popupImage, setPopupImage] = useState(null); // stores the clicked image URL
  return (
    <div className="">
      <div className={`flex gap-2 items-center border-b-2 pb-2 khmer-text-odor:${locale} mb-5`}>
        <Image src={imagesIcon} width={30} height={30} alt="icon" />
        <div>
          <h1 className="text-size-28 mt-3">{t("gallery")}</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {photos.map((item, idx) => (
          <div
            className="relative  h-[170px] h-[170px] mt-0 overflow-hidden rounded border-gray-100 border-3px shadow-box-front-info cursor-pointer flex items-top"
            key={idx}
            onClick={() => setPopupImage(item.url)}
          >
            <Image
              src={item.url}
              alt="Banner"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      {popupImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setPopupImage(null)} // close when clicking the background
        >
          <div className="relative w-[95%] max-w-4xl">
            <Image
              src={popupImage}
              alt="Popup"
              width={1400}
              height={800}
              className="rounded-xl object-contain"
            />
            <button
              onClick={() => setPopupImage(null)}
              className="absolute top-2 right-2 bg-white text-default px-2 py-1 rounded"
            >
              <IoMdClose size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoAlbum;

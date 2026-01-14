import axios from "axios";
import Image from "next/image";
import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import ContactForm from "@/components/contact_form/ContactForm";
import { getTranslations } from "next-intl/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GOOGLE_MAP = process.env.NEXT_PUBLIC_GOOGLE_MAP;
const page = async ({ params }) => {
  const t = await getTranslations("Contact");
  const apiKey = process.env.API_KEY;
  const { locale } = params;
  const response = await axios.get(`${API_URL}/contact-us/${locale}`, {
    headers: { Authorization: apiKey },
  });
  const res = await response.data;
  const { cover_page, website_contacts } = res;
  const { photo_file, details, title } = cover_page.topic[0];
  const { address, phone, email } = website_contacts.details;

  return (
    <section>
      <div className="container-fluid">
        <div className="relative xl:h-[750px] lg:h-[600px] md:h-[500px] h-[300px]">
          <Image
            src={photo_file}
            alt={photo_file}
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
        <div className="lg:container-default px-4 lg:py-30 py-10">
          <div className="bg-backGroundDefault py-10 rounded-xl grid md:grid-cols-3 grid-cols-1 sm:gap-3">
            <div className="text-default leading-15  px-10 md:border-none border-b-1px border-black py-3">
              <MdOutlineEmail className="xl:text-size-40 lg:text-size-34 md:text-size-25 text-size-23" />
              <p className="xl:text-size-32 lg:text-size-26 md:text-size-22 text-size-19">
                {t("email")}
              </p>
              <p className="xl:text-size-23 lg:text-size-17 text-size-15 text-black ">
                {email}
              </p>
            </div>
            <div className="text-default leading-15 border-b md:border-b-0 md:border-l px-10 border-black py-3">
              <FiPhoneCall className="xl:text-size-40 lg:text-size-34 md:text-size-25 text-size-23" />
              <p className="xl:text-size-32 lg:text-size-26 md:text-size-22 text-size-19">
                {t("mobile")}
              </p>
              <p className="xl:text-size-23 lg:text-size-19 text-size-15 text-black">
                {phone}
              </p>
            </div>
            <div className="text-default leading-15 md:border-l-1px  px-10 border-black py-3">
              <SlLocationPin className="xl:text-size-40 lg:text-size-34 md:text-size-25 text-size-23" />
              <p className="xl:text-size-32 lg:text-size-26 md:text-size-22 text-size-19">
                {t("location")}
              </p>
              <p className="xl:text-size-23 lg:text-size-19 text-size-15 text-black">
                {address}
              </p>
            </div>
          </div>
        </div>
        <iframe
          src={GOOGLE_MAP}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full lg:h-[500px] md:h-[300px] h-[300px] pb-20"
        ></iframe>
      </div>
      <ContactForm apiKey={apiKey} />
    </section>
  );
};

export default page;

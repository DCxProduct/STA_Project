import React from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTelegramPlane,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdMail } from "react-icons/md";
('import { MdMail } from "react-icons/md";');
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Link from "next/link";

const FooterAbout = ({ data, info }) => {
  const { details } = data;
  const { logo } = info;
  const t = useTranslations("HomePage");
  const { social } = details;
  const socialMedia = social.details;

  return (
    <div>
      <div className="flex">
        <Image
          src={logo}
          width={300}
          height={300}
          className="rounded-full"
          alt="logo"
        />
        {/* <div className="ml-2">
          <h1 className="xl:text-size-32 md:text-size-28 text-size-25 font-bold">
            ក្រុងបានលុង
          </h1>

          <p className="font-hanuman text-size-15 md:text-size-23 sm:text-base ml-1">
            Krong Ban Loung
          </p>
        </div> */}
      </div>
      <div className="flex mt-4 gap-3 items-center md:text-size-17 xl:text-size-19 text-size-15">
        <FaPhoneAlt />
        <p className="">{details.mobile}</p>
      </div>
      <div className="flex mt-4 gap-3 items-center md:text-size-17 xl:text-size-19 text-size-15">
        <MdMail />
        <p className="">{details.email}</p>
      </div>
      <div className="flex mt-4 gap-3 items-center md:text-size-17 xl:text-size-19 text-size-15">
        <FaLocationDot />
        <p className="">
          {/* ភូមិជ័យជំនះ សង្កាត់ឡាបានសៀក ក្រុងបានលុង ខេត្តរតនគិរី */}
          {details.address}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-4 mb-6py-4 text-size-15 md:text-size-22 xl:text-size-26 mb-10 lg:mb-0">
        <p> {t("socialMedia")}</p>
        {socialMedia.facebook ? (
          <Link href={socialMedia.facebook ?? "#"} target="_blank">
            <div className="border-2 rounded-full px-2 hover: py-2 hover:bg-green-800 hover:border-green-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <FaFacebookF />
            </div>
          </Link>
        ) : (
          <span></span>
        )}
        {/* <div className="border-2 rounded-full px-2 hover: py-2 hover:bg-green-800 hover:border-green-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <FaTiktok />
        </div> */}
        {socialMedia.telegram ? (
          <Link href={socialMedia.telegram ?? "#"} target="_blank">
            <div className="border-2 rounded-full px-2 hover: py-2 hover:bg-green-800 hover:border-green-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <FaTelegramPlane />
            </div>
          </Link>
        ) : (
          ""
        )}
        {socialMedia.youtube ? (
          <Link href={socialMedia.youtube ?? "#"} target="_blank">
            <div className="border-2 rounded-full px-2 hover: py-2 hover:bg-green-800 hover:border-green-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <FaYoutube />
            </div>
          </Link>
        ) : (
          ""
        )}
        {socialMedia.linkedin ? (
          <Link href={socialMedia.linkedin ?? "#"} target="_blank">
            <div className="border-2 rounded-full px-2 hover: py-2 hover:bg-green-800 hover:border-green-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <FaLinkedinIn />
            </div>
          </Link>
        ) : (
          ""
        )}
        {socialMedia.whatsapp ? (
          <Link href={socialMedia.whatsapp ?? "#"} target="_blank">
            <div className="border-2 rounded-full px-2 hover: py-2 hover:bg-green-800 hover:border-green-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <FaWhatsapp />
            </div>
          </Link>
        ) : (
          ""
        )}
        {socialMedia.instagram ? (
          <Link href={socialMedia.instagram ?? "#"} target="_blank">
            <div className="border-2 rounded-full px-2 hover: py-2 hover:bg-green-800 hover:border-green-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <FaInstagram />
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FooterAbout;

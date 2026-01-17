import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";
import {
  SiInstagram,
  SiLinkedin,
  SiTelegram,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { FiFacebook } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import BarTitle from "../section_title/BarTitle";
import BarTitleWhite from "../section_title/BarTitleWhite";
import { useLocale } from "next-intl";

const FooterSocialMedia = ({ title, details, mobile_title, mobile_url }) => {
  const locale = useLocale();
  return (
    <div className="py-2">
      <BarTitleWhite
        title={title}
        marginBottom={"mb-2"}
        textSize={`lg:text-size-22 text-size-19 khmer-text-odor:${locale} text-[#DAE9F5] text-shadow`}        
      />
      <div className="flex gap-5 text-3xl mt-4 py-2">
        {details.facebook ? (
          <a
            href={details.facebook}
            className="cursor-pointer transform transition-transform duration-300 hover:scale-125 transition-all duration-75 bg-[#76A1C6] px-2 py-2 rounded-3xl text-[#DAE9F5]"
          >
            <FiFacebook />
          </a>
        ) : (
          ""
        )}
        {details.telegram ? (
          <a
            href={details.telegram}
            className="cursor-pointer transform transition-transform duration-300 hover:scale-125 transition-all duration-75 bg-[#76A1C6] px-2 py-2 rounded-3xl text-[#DAE9F5]"
          >
            <SiTelegram />
          </a>
        ) : (
          ""
        )}
        {details.youtube ? (
          <a
            href={details.youtube}
            className="cursor-pointer transform transition-transform duration-300 hover:scale-125 transition-all duration-75 bg-[#76A1C6] px-2 py-2 rounded-3xl text-[#DAE9F5]"
          >
            <SiYoutube />
          </a>
        ) : (
          ""
        )}
        {details.linkedin ? (
          <a
            href={details.linkedin}
            className="cursor-pointer hover:scale-125 transition-all duration-75"
          >
            <SiLinkedin />
          </a>
        ) : (
          ""
        )}
        {details.instagram ? (
          <a
            href={details.instagram}
            className="cursor-pointer hover:scale-125 transition-all duration-75"
          >
            <SiInstagram />
          </a>
        ) : (
          ""
        )}
        {details.whatsapp ? (
          <a
            href={`tel:` + details.whatsapp}
            className="cursor-pointer hover:scale-125 transition-all duration-75"
          >
            <SiWhatsapp />
          </a>
        ) : (
          ""
        )}
        {details.x ? (
          <a
            href={`tel:` + details.x}
            className="cursor-pointer hover:scale-125 transition-all duration-75"
          >
            <SiX />
          </a>
        ) : (
          ""
        )}

        {/* <a
          href=""
          className="cursor-pointer hover:scale-125 transition-all duration-75"
        >
          <SlSocialYoutube />
        </a>
        <a
          href=""
          className="cursor-pointer hover:scale-125 transition-all duration-75"
        >
          <PiTelegramLogo />
        </a>
        <a
          href=""
          className="cursor-pointer hover:scale-125 transition-all duration-75"
        >
          <BsTwitterX />
        </a> */}
      </div>
      <BarTitleWhite
        title={mobile_title}
        marginBottom={"mb-2 mt-5"}
        textSize={`lg:text-size-22 text-size-19 khmer-text-odor:${locale} text-[#DAE9F5] text-shadow`}        
      />
      <div className="flex gap-2 mt-5">
        {mobile_url.map((item, idx) => (
          <Link href={item.fields[0].value} target="blank" key={idx}>
            <Image
              src={item.photo_file}
              width={130}
              height={100}
              className="cursor-pointer"
              alt="Social Media"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterSocialMedia;

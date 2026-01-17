"use client";

import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import BarTitleWhite from "../section_title/BarTitleWhite";
import { Hanuman } from "next/font/google";
import { useLocale } from "next-intl";

const hanuman = Hanuman({
  weight: "400",
  subsets: ["khmer"],
  display: "swap",
});

const FooterAbout = ({ data, msg }) => {
  const { address, phone, email } = data;
  const locale = useLocale();
  return (
    <div>
      <div className="mx-auto">
        <BarTitleWhite
          title={msg}
          marginBottom={"mb-2"}
          textSize={`lg:text-size-22 line-height-32 text-size-19 khmer-text-odor:${locale} text-[#DAE9F5] text-shadow`}           
        />
      </div>
      <div className={`mt-3 grid grid-cols-1 gap-3 py-2 text-[#CBDAE8] line-height-28`}>
        <div className="flex items-start">
          <CiLocationOn className="text-xl md:text-3xl mr-2 shrink-0 leading-none align-top text-[#699ED4]" />
          <p className="xs:text-size-17 lg:text-size-18 ">{address}</p>
        </div>
        <div className="flex items-center khmer-text-batr">
          <CiPhone
            className="text-xl md:text-3xl mr-2 shrink-0 leading-none align-top text-[#699ED4]"
          />
          <p className="xs:text-size-17 lg:text-size-18 text-[#CBDAE8]">
            {phone}
          </p>
        </div>
        <div className="flex items-center khmer-text-batr">
          <CiMail
            className="text-xl md:text-3xl mr-2 shrink-0 leading-none align-top text-[#699ED4]"
          />
          <p className="xs:text-size-17 lg:text-size-18 text-[#CBDAE8]">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterAbout;

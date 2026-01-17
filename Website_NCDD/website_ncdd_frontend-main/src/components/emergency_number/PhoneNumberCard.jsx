import NumToKhmer from "@/libs/numToKhmer";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import React from "react";

const PhoneNumberCard = (props) => {
  const { type, number } = props;
  const t = useTranslations("HomePage");
  const locale = getLocale();
  return (
    <div className="px-4 lg:px-8 py-4 lg:py-6 bg-backGroundDefault rounded-2xl">
      <div className="flex justify-between">
        <p className=" text-size-17 lg:text-size-23 xl:text-2xl">
          {/* ប្រភេទលេខទូរសព្ទ */}
          {t("numberType")}
        </p>
        <h3 className=" text-size-19 lg:text-size-25 xl:text-4xl text-default font-bold">
          {type}
        </h3>
      </div>
      <div className="flex justify-between mt-5">
        <p className="text-size-17 lg:text-size-23 xl:text-2xl">
          {t("phoneNumber")}
        </p>
        <h3 className="text-size-19 lg:text-size-25 xl:text-4xl text-default font-bold">
          {NumToKhmer(number, locale)}
        </h3>
      </div>
    </div>
  );
};

export default PhoneNumberCard;

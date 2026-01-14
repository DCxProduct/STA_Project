import React from "react";
import PhoneNumberCard from "./PhoneNumberCard";
import { useTranslations } from "next-intl";

const Emergency = ({ data }) => {
  // const datas = [
  //   { type: "ប៉ូលីស", number: "099887765" },
  //   { type: "មេភូមិ", number: "099887765" },
  //   { type: "ចៅសង្កាត់", number: "099887765" },
  //   { type: "ប្រពន្ធ", number: "099887765" },
  //   { type: "ម៉ែក្មេក", number: "099887765" },
  //   { type: "មេការ", number: "099887765" },
  // ];
  const { topics } = data;
  const t = useTranslations("HomePage");
  return (
    <section>
      <div className="px-4 lg:container-default bg-white py-11">
        <button className="md:text-size-45 text-size-25 lg:text-size-50 font-bold bg-white text-black rounded-[50px] lg:mt-14">
          {/* លេខអាសន្ន */}
          {t("emergencyNumber")}
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 py-8 gap-x-3 lg:gap-x-16 gap-y-7 xs:gap-2">
          {topics.map((item, idx) => (
            <PhoneNumberCard
              key={idx}
              type={item.fields[0].value}
              number={item.fields[1].value}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Emergency;

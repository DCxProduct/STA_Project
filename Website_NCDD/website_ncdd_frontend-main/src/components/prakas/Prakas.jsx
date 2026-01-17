import React from "react";
import PrakasCard from "./PrakasCard";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SectionTitle from "../section_title/SectionTitle";
import BarTitle from "../section_title/BarTitle";

const Prakas = ({ data, lang }) => {
  const { cat_title, topics, route } = data;
  const t = useTranslations("HomePage");

  // Sort topics by id DESC
  const sortedTopics = [...topics].sort((a, b) => b.id - a.id);

  return (
    <section
      className="container-fluid py-10 mx-2 md:container "
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className=" ">
        <div className={`flex justify-between items-top khmer-text-odor:${lang}`}>
          <BarTitle
            title={cat_title}
            marginBottom={"mb-2"}
            textSize={"lg:text-size-26 text-size-23"}
            textColor={"text-default"}
            color={"default"}
          />

          <div className="">
            <Link
              href={route ?? "#"}
              className=" text-size-14 md:text-size-15 lg:text-size-15 bg-[#E7EEF4] lg:px-4 px-3 lg:py-2 py-2 rounded-3xl text-[#4270A5] cursor-pointer hover:bg-cardDefault hover:rounded-3xl hover:text-default"
            >
              {t("findMore")}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 items-center md:gap-4 gap-2 mt-2">
          {sortedTopics.map((item, idx) => (
            <PrakasCard
              key={idx}
              title={item.title}
              date={item.date}
              expire_date={item.expire_date}
              href={item.href}
              visits={item.visits}
              lang={lang}
              className="shadow-box-front"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prakas;

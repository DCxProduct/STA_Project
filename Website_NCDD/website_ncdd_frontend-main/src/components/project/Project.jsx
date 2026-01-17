"use client";
import React from "react";
import Slider from "react-slick";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { useTranslations } from "next-intl";

import BarTitle from "../section_title/BarTitle";

const Project = ({ projects, lang }) => {
  const t = useTranslations("HomePage");
  const { topics, section_title } = projects;
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // screen width <= 1024px (tablet/small laptop)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },{
        breakpoint: 460, // screen width <= 768px (mobile/tablet)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
    ],
    // appendDots: (dots) => (
    //   <div className="custom-dots-wrapper">
    //     <ul> {dots} </ul>
    //   </div>
    // ),
    // customPaging: () => <div className="dash-dot" />,
  };
  return (
    <section className="container-fluid xl:py-10 sm:py-0 md:container mr-2 ml-2">
      <div className="">
        <div className={`flex justify-between items-top khmer-text-odor:${lang}`}>
          <BarTitle
            title={section_title}
            marginBottom={"mb-2"}
            textSize={"lg:text-size-26 text-size-23"}
            textColor={"text-default"}
            color={"default"}
          />

          <div className="">
            <Link
              href={"/project/category/79"}
              className=" text-size-13 md:text-size-15 lg:text-size-15 bg-[#E7EEF4] text-[#4270A5] lg:px-4 px-3 lg:py-2 py-2 rounded-3xl  cursor-pointer hover:bg-cardDefault hover:rounded-3xl hover:text-default"
            >
              {/* ស្វែងយល់បន្ថែម */}
              {t("findMore")}
            </Link>
          </div>
        </div>
        <div className="slider-container">
          <Slider {...settings}>
            {topics.map((item) => (
              <ProjectCard
                key={item.id}
                title={item.title}
                detail={item.details}
                href={item.href.replace("category","detail")}
                date={item.date}
                lang={lang}
                description={item.description}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Project;

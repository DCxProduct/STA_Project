"use client";
import React from "react";
import VideoCard from "./VideoCard";
import Slider from "react-slick";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SectionTitle from "../section_title/SectionTitle";
import BarTitle from "../section_title/BarTitle";

const HomeVideo = ({ data, lang }) => {
  const t = useTranslations("HomePage");
  const { topics, section_title, video_file } = data;

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
  };

  // const slideData = [
  //   {
  //     id: 0,
  //     img: "/v1.jpg",
  //     title:
  //       "កំណែទម្រង់វិមជ្ឈការនិងវិសហមជ្ឈការជួយលើកកម្ពស់អភិបាលកិច្ចល្អការផ្តល់សេវានិងការអភិវឌ្ឍសេដ្ឋកិច្ច",
  //     dateTime: "10-10-2025",
  //     view: "50",
  //   },
  //   {
  //     id: 1,
  //     img: "/v2.jpg",
  //     title:
  //       "ទិដ្ឋភាពថ្ងៃទី២ នៃវេទិកាថ្នាក់ខេត្ត ស្តីពីកំណែទម្រង់វិមជ្ឈការ និងវិសហមជ្ឈការដើម្បីចូលរួមសម្រេចចក្ខុវិស័យកម្ពុជា ឆ្នាំ២០៥០",
  //     dateTime: "10-10-2025",
  //     view: "50",
  //   },
  //   {
  //     id: 2,
  //     img: "/v3.jpg",
  //     title:
  //       "កំណែទម្រង់វិមជ្ឈការនិងវិសហមជ្ឈការជួយលើកកម្ពស់អភិបាលកិច្ចល្អការផ្តល់សេវានិងការអភិវឌ្ឍសេដ្ឋកិច្ច",
  //     dateTime: "10-10-2025",
  //     view: "50",
  //   },
  //   {
  //     id: 2,
  //     img: "/v4.png",
  //     title:
  //       "ទិដ្ឋភាពថ្ងៃទី២ នៃវេទិកាថ្នាក់ខេត្ត ស្តីពីកំណែទម្រង់វិមជ្ឈការ និងវិសហមជ្ឈការដើម្បីចូលរួមសម្រេចចក្ខុវិស័យកម្ពុជា ឆ្នាំ២០៥០",
  //     dateTime: "10-10-2025",
  //     view: "50",
  //   },
  // ];

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="1000"
      className="px-4 sm:px-0 mt-4 md:container mx-auto py-10"
    >
      <div className={`flex justify-between items-top khmer-text-odor:${lang} mb-3`}>
        <BarTitle
          title={section_title}
          marginBottom={"mb-2"}
          textSize={"lg:text-size-26 text-size-23"}
          textColor={"text-default"}
          color={"default"}
        />

        <div className="">
          <Link
            href={"video"}
            className="text-size-14 md:text-size-16 lg:text-size-15 bg-[#E7EEF4] lg:px-4 px-3 lg:py-2 py-2 rounded-3xl text-[#4270A5] cursor-pointer hover:bg-cardDefault hover:rounded-3xl hover:text-default"
          >
            {/* ស្វែងយល់បន្ថែម */}
            {t("findMore")}
          </Link>
        </div>
      </div>
      <div className="slider-container pb-5">
        <Slider {...settings}>
          {topics.map((data) => (
            <VideoCard
              key={data.id}
              img={data.photo_file}
              title={data.title}
              date={data.date}
              visits={data.visits}
              href={data.href}
              video={data.video_file}
              lang={lang}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HomeVideo;

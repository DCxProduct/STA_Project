"use client";
import React from "react";
import VideoCard from "./VideoCard";
import Slider from "react-slick";

const HomeVideo = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };
  const slideData = [
    {
      id: 0,
      img: "/v1.jpg",
      title:
        "កំណែទម្រង់វិមជ្ឈការនិងវិសហមជ្ឈការជួយលើកកម្ពស់អភិបាលកិច្ចល្អការផ្តល់សេវានិងការអភិវឌ្ឍសេដ្ឋកិច្ច",
      dateTime: "10-10-2025",
      view: "50",
    },
    {
      id: 1,
      img: "/v2.jpg",
      title:
        "ទិដ្ឋភាពថ្ងៃទី២ នៃវេទិកាថ្នាក់ខេត្ត ស្តីពីកំណែទម្រង់វិមជ្ឈការ និងវិសហមជ្ឈការដើម្បីចូលរួមសម្រេចចក្ខុវិស័យកម្ពុជា ឆ្នាំ២០៥០",
      dateTime: "10-10-2025",
      view: "50",
    },
    {
      id: 2,
      img: "/v3.jpg",
      title:
        "កំណែទម្រង់វិមជ្ឈការនិងវិសហមជ្ឈការជួយលើកកម្ពស់អភិបាលកិច្ចល្អការផ្តល់សេវានិងការអភិវឌ្ឍសេដ្ឋកិច្ច",
      dateTime: "10-10-2025",
      view: "50",
    },
    {
      id: 2,
      img: "/v4.png",
      title:
        "ទិដ្ឋភាពថ្ងៃទី២ នៃវេទិកាថ្នាក់ខេត្ត ស្តីពីកំណែទម្រង់វិមជ្ឈការ និងវិសហមជ្ឈការដើម្បីចូលរួមសម្រេចចក្ខុវិស័យកម្ពុជា ឆ្នាំ២០៥០",
      dateTime: "10-10-2025",
      view: "50",
    },
  ];

  return (
    <section data-aos="fade-up" className="px-4 sm:px-0 mt-4 container mx-auto">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl sm:text-2xl font-bayon">វីដេអូ</h3>
        <p>
          <a
            href="className="
            className="text-xl sm:text-2xl font-bayon cursor-pointer hover:text-blueDefault hover:underline transition-all duration-300"
          >
            មើលបន្ថែម
          </a>
        </p>
      </div>
      <div className="">
        <Slider {...settings}>
          {slideData.map((data) => (
            <VideoCard
              key={data.id}
              img={data.img}
              title={data.title}
              date={data.dateTime}
              view={data.view}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HomeVideo;

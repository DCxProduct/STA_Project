import React from "react";
import XlCardNewEvenets from "./XlCardNewEvenets";

const NewsEvents = () => {
  return (
    <section data-aos="fade-up" className="container mx-auto px-6 sm:px-0 mt-6">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl sm:text-2xl font-bayon">ព័ត៌មានថ្មីៗ</h3>
        <p>
          <a
            href="className="
            className="text-xl sm:text-2xl font-bayon cursor-pointer hover:text-blueDefault hover:underline transition-all duration-300"
          >
            មើលបន្ថែម
          </a>
        </p>
      </div>
      <div className="sm:flex">
        <div className="basis-2/3">
          <div className="grid grid-cols-3 gap-3">
            <XlCardNewEvenets />
            <XlCardNewEvenets />
            <XlCardNewEvenets />
            <XlCardNewEvenets />
            <XlCardNewEvenets />
            <XlCardNewEvenets />
          </div>
        </div>
        <div className="basis-1/3 ml-2 rounded-md mt-3 sm:mt-0">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2Fncdds&tabs=timeline&width=400&height=830&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
            width="100%"
            height="100%"
            scrolling="no"
            // frameborder="0"
            // allowFullScreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;

import React from "react";
import AnnouncementCard from "./AnnouncementCard";

const Announcement = () => {
  return (
    <section data-aos="fade-up" className="container mx-auto px-6 sm:px-0 mt-4">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl sm:text-2xl font-bayon">សេចក្ដីប្រកាសផ្សេងៗ</h3>
        <p>
          <a
            href="className="
            className="text-xl sm:text-2xl font-bayon cursor-pointer hover:text-blueDefault hover:underline transition-all duration-300"
          >
            មើលបន្ថែម
          </a>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
      </div>
    </section>
  );
};

export default Announcement;

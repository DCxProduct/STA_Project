import Link from "next/link";
import React from "react";
import { BiSolidShoppingBags } from "react-icons/bi";
const LocalServiceCard = ({ title, link, icon }) => {
  return (
    <Link href={link}>
      <div className="py-20 px-8 w-full container bg-default rounded-lg text-white relative h-[230px] cursor-pointer  hover:-translate-y-2 transition-all duration-300 hover:bg-NavBar group">
        <div className="absolute top-4 left-4">
          <h1 className="text-size-23 md:text-size-25 lg:text-size-32 font-bold">
            {title}
          </h1>
        </div>
        <div className="absolute bottom-4 right-4  group-hover:opacity-100 text-size-65 md:text-size-90">
          {/* <BiSolidShoppingBags /> */}
          <img src={icon} alt="SVG file" className="lg:w-22 md:w-20 w-12 " />
        </div>
      </div>
    </Link>
  );
};

export default LocalServiceCard;

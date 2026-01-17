import React from "react";
import NumToKhmer from "@/libs/numToKhmer";

const LocalInformationCard = ({ title, info, icon, backGround, lang }) => {
  return (
    <div className={`py-1 px-3 text-white w-full ${backGround}`}>
      <p className="text-center text-size-23 lg:text-size-28">{title}</p>
      <h1 className="text-center text-size-19 md:text-size-28 lg:text-size-30 xl:text-size-40">
        {NumToKhmer(info, lang)}
      </h1>
      {/* <i className={icon}></i> */}
      {/* <IconButton Icon={icon} className="mb-5 ml-5" /> */}
      <img src={icon} alt="SVG file" className="lg:w-22 md:w-20 w-12 mx-auto" />
    </div>
  );
};

export default LocalInformationCard;

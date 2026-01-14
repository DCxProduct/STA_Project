import Image from "next/image";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";

const VideoCard = (props) => {
  const { img, title, date, view } = props;

  return (
    <div className="mr-1 px-2 text-sm sm:text-base rounded-md max-h-lvh h-[250px] border border-gray-300">
      <div className="flex justify-center">
        <iframe
          src="https://www.youtube.com/embed/VaOvsgoCw-I?si=MXXYB_CTkVyjV5Nu"
          className="w-[130px] sm:w-[380px]"
        ></iframe>
      </div>
      <h2 className="line-clamp-2 sm:line-clamp-4 mt-2 font-hanuman">
        {title}
      </h2>
      <div className="flex justify-between">
        <p className="text-size-12">{date}</p>
        <div className="flex items-center text-size-12">
          <IoEyeOutline />
          <p className="ml-2">{view}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

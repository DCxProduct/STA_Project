import Image from "next/image";
import React from "react";

const Slide = (props) => {
  const { title, img, mainTitle, price } = props;
  return (
    <div className="relative">
      <Image
        className="w-[100%] h-[310px] md:h-auto object-center md:object-left-bottom px-2 sm:px-0"
        src={img}
        alt="banner"
        width={1000}
        height={100}
      />
    </div>
  );
};

export default Slide;

import Image from "next/image";
import React from "react";
import spinnerImage from "@/assets/loader.png";
import Preloader from "../shared/others/Preloader";

const SlideLoading = () => {
  return (
    <div className="w-full h-[500px] lg:h-[785px] relative overflow-hidden rounded-lg ">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-400 via-gray-100 to-backGroundDefault">
        {/* <Image src={spinnerImage} alt="logo" /> */}
        {/* <div className="w-90px h-90px border-5px border-t-default border-r-default border-b-blue-light border-l-blue-light rounded-full animate-spin-infinit"></div> */}
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <Image
            src={spinnerImage}
            alt="Preloader"
            className="h-[200px] w-full block"
          />
        </div>
      </div>
    </div>
  );
};

export default SlideLoading;

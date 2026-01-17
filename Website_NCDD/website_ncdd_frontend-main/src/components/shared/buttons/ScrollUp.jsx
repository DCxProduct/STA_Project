"use client";

import scrollUp from "@/libs/scrollUp";
import { useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
// scroll up button
const Scrollup = () => {
  useEffect(() => {
    scrollUp();
  }, []);
  return (
    <div className="">
      {/* <button className=" w-50px h-50px leading-50px text-center text-primaryColor bg-white hover:text-whiteColor hover:bg-primaryColor rounded-full fixed right-5 bottom-[60px] shadow-scroll-up z-medium text-xl dark:text-whiteColor dark:bg-primaryColor dark:hover:text-whiteColor-dark hidden border border-blueDefault">
        <i className="icofont-rounded-up"></i>
      </button> */}

      <button className="scroll-up leading-50px text-center rounded-full fixed right-5 lg:right-16 bottom-[60px] text-red hover:before:bg-redborder-red-500  w-50px h-50px overflow-hidden border border-blue-light bg-white px-3 text-NavBar shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-NavBar before:transition-all before:duration-500 hover:text-white hover:shadow-NavBar hover:before:left-0 hover:before:w-full">
        {/* <span className="">Swipe</span> */}
        <i className="icofont-rounded-up relative z-10"></i>
        {/* <FaAngleDoubleUp className="w-full hover:text-white" /> */}
      </button>
    </div>
  );
};

export default Scrollup;

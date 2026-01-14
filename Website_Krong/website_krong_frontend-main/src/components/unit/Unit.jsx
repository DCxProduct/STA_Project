import React from "react";
import { RiGovernmentFill } from "react-icons/ri";

const Unit = () => {
  return (
    <section data-aos="fade-up" className="px-6 sm:px-0 mx-auto container mt-6">
      <h1 className="text-xl lg:text-2xl font-bayon mb-2">
        អង្គភាពចំណុះលេខាធិការដ្ឋាន
      </h1>
      <p className="text-justify text-sm lg:text-[15px] mt-2 mb-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quos, eum
        dolore modi tempore vero facilis iusto consectetur ipsum perspiciatis
        quas iste. Ducimus itaque est, officiis perferendis labore iure
        consequatur. Dolores quos aliquid nulla repudiandae reprehenderit libero
        velit quisquam nisi ducimus totam, nam expedita officiis alias ipsam
        debitis distinctio quas. Facere similique consequatur tempora quasi
        quibusdam architecto hic quos at.
      </p>

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 ">
        <div className="p-10 border border-blueDefault text-center rounded-md cursor-pointer hover:scale-105 transition-transform duration-500 hover:shadow-lg hover:opacity-100">
          <p className="text-2xl text-gray-400">PMSD</p>
          <RiGovernmentFill className="text-5xl text-blueDefault mx-auto mt-2" />
        </div>
        <div className="p-10 border border-blueDefault text-center rounded-md cursor-pointer hover:scale-105 transition-transform duration-500 hover:shadow-lg hover:opacity-100">
          <p className="text-2xl text-gray-400">PMSD</p>
          <RiGovernmentFill className="text-5xl text-blueDefault mx-auto mt-2" />
        </div>
        <div className="p-10 border border-blueDefault text-center rounded-md cursor-pointer hover:scale-105 transition-transform duration-500 hover:shadow-lg hover:opacity-100">
          <p className="text-2xl text-gray-400">PMSD</p>
          <RiGovernmentFill className="text-5xl text-blueDefault mx-auto mt-2" />
        </div>
        <div className="p-10 border border-blueDefault text-center rounded-md cursor-pointer hover:scale-105 transition-transform duration-500 hover:shadow-lg hover:opacity-100">
          <p className="text-2xl text-gray-400">PMSD</p>
          <RiGovernmentFill className="text-5xl text-blueDefault mx-auto mt-2" />
        </div>
        <div className="p-10 border border-blueDefault text-center rounded-md cursor-pointer hover:scale-105 transition-transform duration-500 hover:shadow-lg hover:opacity-100">
          <p className="text-2xl text-gray-400">PMSD</p>
          <RiGovernmentFill className="text-5xl text-blueDefault mx-auto mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Unit;

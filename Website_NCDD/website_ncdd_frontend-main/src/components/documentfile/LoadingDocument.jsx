import React from "react";

const LoadingDocument = () => {
  return (
    <div>
      <div className="h-6 w-40 bg-gray-300 rounded animate-pulse" />
      <br />
      <br />
      <div className="grid lg:flex md:grid-cols-5 grid-cols-5 gap-2 items-center">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="h-10 rounded-lg bg-gray-200 animate-pulse w-full text-center"
          ></div>
        ))}
      </div>
      <br />
      <br />
      <div className="flex gap-2 border rounded-md py-5 mb-3 px-5 animate-pulse">
        <div className="basis-1/4 relative lg:h-[250px] sm:h-[270px] h-[190px] bg-gray-200 rounded-md" />
        <div className="basis-3/4 px-4 space-y-3">
          <div className="h-5 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default LoadingDocument;

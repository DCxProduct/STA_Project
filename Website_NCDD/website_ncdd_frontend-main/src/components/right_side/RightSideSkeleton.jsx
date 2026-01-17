import React from "react";

const RightSideSkeleton = () => {
  return (
    <div className="basis-2/6 shadow-lg px-3 py-10 ml-1 rounded-xl hidden lg:block animate-pulse space-y-6">
      <div className="h-6 bg-gray-300 rounded w-2/3" />
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="h-24 bg-gray-200 rounded" />
      ))}
      <div className="h-6 bg-gray-300 rounded w-2/3 mt-14" />
      <div className="h-48 bg-gray-200 rounded" />
      <div className="h-6 bg-gray-300 rounded w-2/3 mt-14" />
      {[...Array(2)].map((_, idx) => (
        <div key={idx} className="h-20 bg-gray-200 rounded" />
      ))}
    </div>
  );
};

export default RightSideSkeleton;

import React from "react";

const BarTitle = ({
  title,
  textSize = "text-xl",
  textColor = "text-default",
}) => {
  return (
    <div className={`relative flex items-center mt-0`}>
      {/* Custom bar with 4 steps of different heights */}
      <div className="flex items-end  mr-2">
        {/* <div className="w-[3px] h-[8px] bg-blue-light"></div> */}

        <div className="w-[4px] h-[10px] bg-[#A7CAED]"></div>
        <div className="w-[4px] h-[15px] bg-[#84B1DF]"></div>
        <div className="w-[5px] h-[21px] bg-[#699ED4]"></div>
      </div>

      {/* Khmer Title Text */}
      <h1 className={`${textSize} ${textColor} font-bold`}>{title}</h1>
    </div>
  );
};

export default BarTitle;

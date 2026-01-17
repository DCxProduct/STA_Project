import React from "react";

const BarTitleWhite = ({
  title,
  marginBottom = "mb-4",
  textSize = "text-xl",
  textColor = "text-blue-900",
}) => {
  return (
    <div className={`relative flex items-center ${marginBottom}`}>
      {/* Custom bar with 4 steps of different heights */}
      <div className="flex items-end  mr-2">
        {/* <div className="w-[3px] h-[8px] bg-blue-light"></div> */}

        <div className="w-[5px] h-[10px] bg-[#A7CAED]"></div>
        <div className="w-[5px] h-[15px] bg-[#84B1DF]"></div>
        <div className="w-[5px] h-[21px] bg-[#699ED4]"></div>
      </div>

      {/* Khmer Title Text */}
      <h1 className={`${textSize} ${textColor} font-bold`}>{title}</h1>
    </div>
  );
};

export default BarTitleWhite;

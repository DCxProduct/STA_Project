import React from "react";

const SectionTitle = ({ title, marginBottom, textSize, textColor, color }) => {
  return (
    <div className={`relative ${marginBottom}`}>
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[85%] bg-${color}`}
      ></div>
      <h1
        className={`pl-3 text-size-25 leading-none text-${color} ${textSize} `}
      >
        {title}
      </h1>
    </div>
  );
};

export default SectionTitle;

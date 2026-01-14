import React from "react";

const StepButton = ({ text, active }) => {
  return (
    <div
      className={`relative px-6 py-4 text-white mb-1 ml-[-15px]
            ${active ? "bg-default border border-white" : "bg-gray-400"}`}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)",
      }}
    >
      {text}
    </div>
  );
};

export default StepButton;

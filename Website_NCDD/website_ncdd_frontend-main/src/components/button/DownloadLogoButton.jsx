"use client";

import React from "react";
import logoDownload from "@/assets/logos/Logo-Base@2x.png";


const DownloadLogoButton = ({ label }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = logoDownload.src;
    link.download = "Logo-Base@2x.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="mb-5 mt-5 bg-white text-default rounded-full px-5 py-2 shadow-md hover:bg-gray-200 transition flex items-center gap-2 justify-center mx-auto"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 10.5l4.5 4.5m0 0l4.5-4.5m-4.5 4.5V3"
        />
      </svg>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default DownloadLogoButton;

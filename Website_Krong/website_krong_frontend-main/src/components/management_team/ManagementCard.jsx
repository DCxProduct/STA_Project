import React from "react";
import Image from "next/image";

const ManagementCard = ({ img, name, position, title }) => {
  return (
    <div>
      <div className="flex flex-col items-center mt-6">
        <Image
          src={img}
          alt="management_image"
          className="w-80 h-auto rounded-lg bg-blue-500"
        />
        <h2 className="t font-bold mt-4 text-left text-size-15 md:text-size-21 lg:text-size-25">
          {title} {name}
        </h2>
        <p className="text-brown-800 mt-1 text-size-15 md:text-size-21 lg:text-size-25">
          {position}
        </p>
      </div>
    </div>
  );
};

export default ManagementCard;

import Image from "next/image";
import Link from "next/link";
import React from "react";

const DocumentCard = (props) => {
  const { photo_file, title, href } = props;
  return (
    <div className="border rounded-lg mb-1 bg-white overflow-hidden">
      <div className="relative w-full h-[350px] md:h-[460px] lg:h-[475px]">
        <Image
          className="object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
          src={photo_file}
          alt={title}
          fill
        />
      </div>
      <div className="px-4 py-4">
        <Link href={`${href}`}>
          <div className="">
            <h3 className="font-semibold text-size-15 lg:text-size-17 xl:text-size-21 line-clamp-3 mb-2">
              {title}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DocumentCard;

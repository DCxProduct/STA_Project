import Image from "next/image";
import Link from "next/link";
import React from "react";

const DocumentCard = (props) => {
  const { photo_file, title, href } = props;
  return (
    <div className="border rounded-lg mb-1 ">
      <div className="relative h-[230px] md:h-[290px] lg:h-[310px] lg:w-[235px] w-[190px] ">
        <Image
          className="object-contain transition-transform duration-500 hover:scale-110 cursor-pointer "
          src={photo_file}
          alt={title}
          fill
        />
      </div>
      <div className="lg:px-4 px-2 py-4">
        <Link href={`${href}`}>
          <div className="">
            <h3 className=" text-size-12 lg:text-size-15  line-clamp-3 mb-2">
              {title}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DocumentCard;

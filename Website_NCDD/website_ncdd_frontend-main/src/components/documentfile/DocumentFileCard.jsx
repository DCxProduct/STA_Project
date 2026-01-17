import Image from "next/image";
import Link from "next/link";
import React from "react";

const DocumentFileCard = ({ data }) => {
  //   const [year, month, day] = date.split("-");
  return (
    <div>
      {data.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          className="flex gap-2 border-1px rounded-md py-5 mb-3 px-5"
        >
          <div className="lg:basis-1/4 basis-2/4 relative lg:h-[250px] sm:h-[270px] h-[190px] py-5 border-1px rounded-md">
            <Image
              src={item.photo_file}
              alt="no image"
              fill
              className="object-fill shadow-lg px-1 py-1"
            />
          </div>
          <div className="basis-3/4 px-4">
            <div className=" text-black">
              <h1 className="line-clamp-3 text-size-13 lg:text-size-17 hover:text-default font-normal">
                {item.title}
              </h1>
              <div className="font-hanuman lg:text-size-15 mt-2">
                {item.fields.map((field, i) => (
                  <div key={i}>
                    <div className="flex gap-2 leading-6">
                      <span className="">{field.title} : </span>
                      <span className="text-gray-500">{field.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DocumentFileCard;

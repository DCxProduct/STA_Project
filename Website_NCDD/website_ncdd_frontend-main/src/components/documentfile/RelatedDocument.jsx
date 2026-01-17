import Link from "next/link";
import React from "react";

const RelatedDocument = ({ data, cateId }) => {
  return (
    <div className="grid lg:flex md:grid-cols-5 grid-cols-5 gap-2 items-center">
      {data.map((item, idx) => (
        <Link
          href={item.href}
          key={idx}
          className={`lg:text-size-15 line-clamp-2 text-size-12 text-center text-textButton rounded-lg py-2 px-2 border-[##C7DAED] border-1px ${
            cateId == item.id ? "bg-default text-white" : ""
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default RelatedDocument;

import Link from "next/link";
import React from "react";

const RelatedTopic = ({ data, catId }) => {
  const categoryId = catId ? catId : 0;
  return (
    <section className=" px-4 ">
      <div className="grid grid-cols-6 lg:flex gap-6 items-center">
        {data.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
            className={`text-size-17 text-center text-textButton rounded-xl py-4 px-4 border-[##C7DAED] border-1px ${
              categoryId == item.id ? "bg-buttonBlue text-white" : ""
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedTopic;

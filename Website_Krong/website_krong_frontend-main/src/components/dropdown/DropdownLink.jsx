import Link from "next/link";
import React from "react";

const DropdownLink = ({ item }) => {
  const { title, status, type, dropdown, href } = item;
  return (
    <div>
      {href ? (
        <Link
          href={href}
          className={`whitespace-nowrap text-sm 2xl:text-base font-semibold text-contentColor border-l-2 border-transparent transition-all duration-300 hover:border-overNavBar block hover:text-overNavBar leading-sm 3xl:leading-lg hover:ml-2 hover:transition-all ${
            type === "secondary" || dropdown
              ? "flex justify-between items-center px-25px py-10px"
              : "p-10px "
          }`}
        >
          {title}

          {dropdown && <i className="icofont-rounded-right"></i>}
        </Link>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default DropdownLink;

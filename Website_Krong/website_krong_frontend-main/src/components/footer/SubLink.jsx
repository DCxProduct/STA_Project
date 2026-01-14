import Link from "next/link";
import React from "react";

const SubLink = ({ linkTitle, link }) => {
  return (
    <li className="hover:ml-3 transform duration-200">
      <Link
        href={link || "#"}
        className="text-size-15 md:text-size-21 xl:text-size-21"
      >
        {linkTitle}
      </Link>
    </li>
  );
};

export default SubLink;

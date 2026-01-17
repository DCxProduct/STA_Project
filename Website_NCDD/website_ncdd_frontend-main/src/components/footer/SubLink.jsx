import { Hanuman } from "next/font/google";
import Link from "next/link";
import React from "react";

import { GoDot } from "react-icons/go";
const hanuman = Hanuman({
  weight: "400",
  subsets: ["khmer"],
  display: "swap",
});
const SubLink = ({ linkTitle, link }) => {
  return (
    <li className="hover:ml-3 transform duration-200">
      <Link
        href={link || "#"}
        className={`text-size-17 md:text-size-18 flex items-center gap-1 text-[#CBDAE8]`}
      >
        <GoDot />
        {linkTitle}
      </Link>
    </li>
  );
};

export default SubLink;

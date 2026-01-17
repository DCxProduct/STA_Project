'use client';

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const DropdownLink = ({ item }) => {
  const { title, status, type, dropdown, href } = item;
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <div>
      {href ? (
        <Link
          href={href}
          className={`rich-text whitespace-nowrap text-sm 2xl:text-base border-l-2  transition-all duration-300 block leading-sm 3xl:leading-lg
            ${isActive ? "ml-2 border-overNavBar text-overNavBar transition-all border-default" : "text-contentColor border-white border-transparent"}
            ${
              type === "secondary" || dropdown
                ? "flex justify-between items-center px-25px py-10px"
                : "p-10px"
            }
            hover:border-overNavBar  hover:text-overNavBar hover:ml-2 hover:transition-all`}
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

import Link from "next/link";
import React from "react";

const MobileLink = ({ item }) => {
  const { title, href } = item;
  return (
    <Link className="leading-1 py-11px text-darkdeep1 font-bold" href={href}>
      {title}
    </Link>
  );
};

export default MobileLink;

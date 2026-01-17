"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import mobileMenu from "@/libs/mobileMenu";
import { useLocale } from "next-intl";

const MobileLink = ({ item }) => {
  const locale = useLocale();
  const { title, href } = item;

  useEffect(() => {
    mobileMenu(); // attach event listeners on mount
  }, []);

  const handleClick = () => {
    const mobileMenuEl = document.querySelector(".mobile-menu");
    const closeOverlay = document.querySelector(".close-mobile-menu");

    setTimeout(() => {
      if (mobileMenuEl) mobileMenuEl.style.right = "-280px";
      if (closeOverlay) closeOverlay.style.display = "none";
    }, 1000);
  };
  return (
    <Link
      href={href}
      className={`leading-1 py-2.5 text-darkdeep1 khmer-text-odor:${locale}`}
      onClick={handleClick}
    >
      {title}
    </Link>
  );
};

export default MobileLink;

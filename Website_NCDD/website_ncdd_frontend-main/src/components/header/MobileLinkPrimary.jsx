"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import mobileMenu from "@/libs/mobileMenu";
import { useLocale } from "next-intl";

const MobileLinkPrimary = ({ item }) => {
  const { title, href, status } = item;
  const locale = useLocale();
  useEffect(() => {
    mobileMenu(); // attach event listeners on mount
  }, []);

  const handleClick = () => {
    const mobileMenuEl = document.querySelector(".mobile-menu");
    const closeOverlay = document.querySelector(".close-mobile-menu");

    if (mobileMenuEl && closeOverlay) {
      setTimeout(() => {
        mobileMenuEl.style.right = "-280px";
        closeOverlay.style.display = "none";
      }, 1000); // adjust delay to match your CSS transition
    }
  };
  return (
    <Link
      href={href || "#"}
      className={`leading-1 text-sm pl-15px pt-3 pb-7px khmer-text-odor:${locale} text-default line-height-24`}
      onClick={handleClick}
    >
      {title}
    </Link>
  );
};

export default MobileLinkPrimary;

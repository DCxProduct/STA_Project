"use client";

import mobileMenu from "@/libs/mobileMenu";
import { useEffect } from "react";

const MobileMenuOpen = () => {
  useEffect(() => {
    mobileMenu();
  }, []);
  return (
    <button className="open-mobile-menu text-2xl cursor-pointer hover:text-4xl">
      <i className="icofont-navigation-menu"></i>
    </button>
  );
};

export default MobileMenuOpen;

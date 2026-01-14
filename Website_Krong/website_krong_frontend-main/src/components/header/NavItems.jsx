import React from "react";
import Navitem from "./NavItem";
import { FaLanguage } from "react-icons/fa6";
import MobileMenuOpen from "../shared/buttons/MobileMenuOpen";
import Image from "next/image";
import FeedBackButton from "../button/FeedBackButton";
import SwitchLang from "../dropdown/SwitchLang";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";

const NavItems = ({ navItems, locale, footer }) => {
  return (
    <div className=" ">
      <div className="hidden lg:block">
        <ul className="nav-list flex justify-between items-center">
          {navItems.map((navItem, idx) => (
            <Navitem
              key={idx}
              idx={idx}
              locale={locale}
              navItem={{ ...navItem, idx: idx }}
            />
          ))}
        </ul>
      </div>
      <div className="flex justify-between px-4 lg:hidden items-center">
        {/* <p className="font-Koh_Santepheap font-bold">
          
        </p> */}
        <div>
          <Link href={"/"}>
            <Image
              src={footer.details.style.details.logo}
              width={180}
              height={100}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          {/* <FaLanguage size={25} /> */}
          <SwitchLang />
          <button className="cursor-pointer mt-1">
            <Link href={"/search"}>
              <IoSearch size={23} />
            </Link>
          </button>
          <FeedBackButton />
          <MobileMenuOpen />
        </div>
      </div>
    </div>
  );
};

export default NavItems;

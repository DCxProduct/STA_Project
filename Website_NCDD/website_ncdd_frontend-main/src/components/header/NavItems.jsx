import React from "react";
import Navitem from "./NavItem";
import MobileMenuOpen from "../shared/buttons/MobileMenuOpen";
import Image from "next/image";
import SwitchLang from "../dropdown/SwitchLang";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import logo_mobile_device from "@/assets/images/img/logo_mobile_device_v2.png";
import logo_mobile_device_old from "@/assets/images/img/Logo_Moble-v3.png";
import { useTranslations } from "next-intl";
import FeedBackButton from "@/components/button/FeedBackButton";

const NavItems = ({ navItems, locale, footer }) => {
  const t = useTranslations("NavBar");  
  return (
    <div className=" ">
      <div className="hidden lg:block">
        <ul className="nav-list flex justify-between items-center ">
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
        <div className="hidden lg:block">
          <Link href={"/"}>
            <Image
              src={footer.details.style.details.logo}
              width={180}
              height={100}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="lg:hidden block items-center flex">
          <Link href={"/"}>
            <div className="py-2 flex flex-row items-center justify-start">
              {/*Logo New version*/}
              <div className="relative w-[48px] h-[48px]">
                <Image
                  src={logo_mobile_device}
                  alt="logo_mobile_device"
                  fill
                  className="object-cover"
                  sizes="50px"
                />
              </div>
              
              {/*Logo Old version*/}
              <div className="relative w-[82px] h-[45px] hidden">
                <Image
                  src={logo_mobile_device_old}
                  alt="logo_mobile_device"
                  fill
                  className="object-cover"
                  sizes="50px"
                />
              </div>

              <div className={`khmer-text-odor:${locale} text-size-21 pl-5 text-shadow`}>
                {t("name")}
              </div>
            </div>
          </Link>
        </div>
        <div className="flex gap-5 items-center ">
          {/* <FaLanguage size={25} /> */}
          <div className="hidden xl:block">
            <SwitchLang />
          </div>
          
          <FeedBackButton/>

          <button className="cursor-pointer mt-1">
            <Link href={"/search"}>
              <IoSearch size={23} />
            </Link>
          </button>

          <MobileMenuOpen />
        </div>
      </div>
    </div>
  );
};

export default NavItems;

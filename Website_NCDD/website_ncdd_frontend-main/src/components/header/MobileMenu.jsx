"use client";

import SwitchLang from "../dropdown/SwitchLang";
import MobileMenuClose from "../shared/buttons/MobileMenuClose";
import MobileMenuItems from "./MobileMenuItems";
import MobileMenuSearch from "./MobileMenuSearch";
import MobileSocial from "./MobileSocial";

const MobileMenu = ({ links }) => {
  return (
    <div className="mobile-menu w-mobile-menu-sm md:w-mobile-menu-lg fixed top-0 -right-[280px] md:-right-[330px] transition-all duration-500 w-mobile-menu h-full shadow-dropdown-secodary bg-whiteColor dark:bg-whiteColor-dark z-high block lg:hidden">
      <MobileMenuClose />

      {/*  mobile menu wrapper */}
      <div className="px-5 md:px-30px pt-5 md:pt-10 pb-50px h-full overflow-y-auto">
        {/*  mobile menu accordions */}
        <MobileMenuItems links={links} />
        {/*  my account accordion */}
        {/* <MobileMyAccount /> */}
        {/*  Mobile menu social area */}

        {/* <MobileSocial /> */}
        <div className="flex items-center py-8 border-b-[1px]">
          {/* <MobileMenuSearch /> */}
          <SwitchLang />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

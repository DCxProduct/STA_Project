import Image from "next/image";

import SwitchLang from "../dropdown/SwitchLang";
import Link from "next/link";
import { fetchData } from "@/services/getApiService";
import { getLocale } from "next-intl/server";
import SearchEmailButton from "../button/SearchEmailButton";
import bg_header from "@/assets/images/img/bg_header.jpg";

const NavbarTop = async () => {
  const locale = await getLocale();
  const { info } = await fetchData(`/info/${locale}`, {}, "revalidation");
  const { logo, background } = info;
  return (
    <section 
      className="container-fluid mx-auto py-3 hidden lg:block bg-center bg-no-repeat bg-cover"
      style={{
        backgroundColor: "#effdfc", 
        backgroundImage: `url(${bg_header.src})`, 
        backgroundRepeat: "no-repeat",                     
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-between align-top container ">
        <div className="mt-2">
          <Link href={"/"} className="cursor-pointer">            
            <Image
              src={logo}
              alt="logo"
              width={792}
              height={138}
              style={{ width: '100%', height: 'auto' }} // ✅ Prevents the warning
            />

          </Link>
        </div>
        <div className="mt-5">
          <SearchEmailButton />
          <div className="mt-6 justify-end flex">
            <SwitchLang />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavbarTop;

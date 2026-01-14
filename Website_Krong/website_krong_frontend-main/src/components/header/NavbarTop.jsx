import Image from "next/image";
import logo from "@/assets/loader.png";
import { FcSearch } from "react-icons/fc";
import { IoSearch } from "react-icons/io5";
import SwitchLang from "../dropdown/SwitchLang";
import FeedBackButton from "../button/FeedBackButton";
import Link from "next/link";
import { fetchData } from "@/services/getApiService";
import { getLocale } from "next-intl/server";

const NavbarTop = async () => {
  const locale = await getLocale();
  const { info } = await fetchData(`/info/${locale}`, {}, "revalidation");
  const { logo } = info;

  return (
    <section className="container-fluid mx-auto py-2 hidden lg:block">
      <div className="flex justify-between items-center container-default ">
        <div>
          <Link href={"/"} className="cursor-pointer">
            <Image src={logo} alt="logo" width={326} height={125} />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <button className="cursor-pointer mr-2">
            <Link href={"/search"}>
              <IoSearch size={38} />
            </Link>
          </button>
          {/* <h1 className="text-size-40 text-gray-300 font-extralight">|</h1> */}
          <div className="px-5 relative items-center">
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[105%] bg-gray-300`}
            ></div>
            <SwitchLang />
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-[105%] bg-gray-300`}
            ></div>
          </div>
          {/* <h1 className="text-size-40 text-gray-300 font-extralight">|</h1> */}
          <FeedBackButton />
        </div>
      </div>
    </section>
  );
};

export default NavbarTop;

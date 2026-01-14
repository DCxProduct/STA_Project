"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import en from "@/assets/flag/en.png";
import km from "@/assets/flag/km.png";
import { useRouter } from "../../../navigation";
import { usePathname } from "next/navigation";

const languages = {
  ken: { label: "English", flag: en },
  km: { label: "Khmer", flag: km },
};
export default function SwitchLang() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = () => {
    if (!pathname) return; // Failsafe

    const newLocale = locale === "km" ? "ken" : "km";
    router.push(pathname, { locale: newLocale });
    // router.push(pathname, { locale: e.target.value });
  };

  return (
    <div>
      {/* <select
        onChange={handleChange}
        defaultValue={locale}
        className="bg-red border-none text-default text-size-19 cursor-pointer appearance-none  px-0 py-0"
      >
        <option value="km">KM</option>
        <option value="ken">EN</option>
      </select> */}
      <div className="cursor-pointer hover:scale-110 flex items-center">
        <button onClick={handleChange}>
          <Image
            src={languages[locale].flag}
            alt={languages[locale].label}
            className="lg:w-[35px] w-[30px]"
          />
        </button>
      </div>
    </div>
  );
}

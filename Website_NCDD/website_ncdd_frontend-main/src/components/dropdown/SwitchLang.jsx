"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import en from "@/assets/flag/en.png";
import km from "@/assets/flag/km.png";
import { useRouter } from "../../../navigation";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const langs = [
  { id: 1, label: "ភាសាខ្មែរ", flang: km, key: "km" },
  { id: 2, label: "English", flang: en, key: "ken" },
];

export default function SwitchLang() {
  const router = useRouter();
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState(locale);
  const containerRef = useRef(null);
  const [bgStyle, setBgStyle] = useState({});
  const pathname = usePathname();

  const handleChange = () => {
    if (!pathname) return; // Failsafe
    const newLocale = locale === "km" ? "ken" : "km";
    router.push(pathname, { locale: newLocale });
    // router.push(pathname, { locale: e.target.value });
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector(`[data-tab='${locale}']`);
    if (locale == "km") {
      const { offsetLeft, offsetWidth } = activeBtn;
      setBgStyle({
        transform: `translateX(${offsetLeft}px)`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeTab]);

  const onTabClick = (id) => {
    setActiveTab(id);
    handleChange();
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
      {/* <div className="cursor-pointer hover:scale-110 ">
        <button onClick={handleChange}>
          <Image
            src={languages[locale].flag}
            alt={languages[locale].label}
            className="lg:w-[35px] w-[30px]"
          />
        </button>
      </div> */}

      <div
        ref={containerRef}
        className="relative inline-flex rounded-full overflow-hidden bg-[#E2EEF3] p-1"
      >
        {/* Animated Background */}
        <div
          className="absolute h-full transition-all duration-300 rounded-full"
          style={{
            ...bgStyle,
            top: 0,
            bottom: 0,
          }}
        ></div>

        {/* Language Buttons */}
        {langs.map((tab, idx) => (
          <button
            key={tab.key}
            data-tab={tab.key}
            onClick={() => onTabClick(tab.key)} // 👈 click handler
            className={`relative z-10 flex items-center px-2 py-2 text-size-15 strong transition duration-300 rounded-full khmer-text-batr:${tab.key} ${
              activeTab == tab.key ? "bg-default" : ""
            }`}
          >            
            <div style={{ position: 'relative', width: '28px', height: '17px' }}>
              <Image
                src={tab.flang}
                alt={tab.label}
                fill
                sizes="28px"
                className="rounded"
                style={{ objectFit: 'contain' }} // or "cover", depending on your layout
              />
            </div>

            <span className={`px-2 font-normal ${activeTab == tab.key ? "text-whiteColor" : "text-default"}`}
            >{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

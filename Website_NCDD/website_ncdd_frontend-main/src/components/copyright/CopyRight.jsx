import NumToKhmer from "@/libs/numToKhmer";
import { useTranslations } from "next-intl";
import React from "react";
import logo_s_ncdd from "@/assets/images/img/logo-s-ncdd_v2.png";
import logo_s_japan from "@/assets/images/img/logo-s-japan.png";
import logo_s_unpd from "@/assets/images/img/logo-s-undp.png";
import Image from "next/image";

const CopyRight = ({ locale }) => {
  const t1 = useTranslations("CopyRight");
  const t2 = useTranslations("Copperation");
  const year = new Date().getFullYear();
  return (
    <div className="bg-[#0F467D] border-t border-[#34689B]">
      <div className="container mx-auto text-center text-white">
        <div className="text-size-17 md:text-size-18 text-[#B7C7D0] py-4 flex items-center justify-center xs:flex-col md:flex-row justify-between align-center items-center">
          
          <div className={`items-center line-height-32 khmer-text-odor:${locale} text-shadow`}>
            &copy;&nbsp;{t1("copyRight")}&nbsp;
            {NumToKhmer(year, locale)}
          </div>

          <div className={`flex flex-row items-center line-height-32 khmer-text-odor:${locale} text-shadow`}>
            <div>
              {t2("copperation")}&nbsp;
            </div>

            <div className="relative">
              <Image
                src={logo_s_ncdd}
                alt="logo_s_ncdd"
                width={60}
                height={60}
                className="object-cover w-full h-auto"
                sizes="100vw"
              />
            </div>

            <div className="relative px-2">
              <Image
                src={logo_s_japan}
                alt="logo_s_japan"
                width={30}
                height={60}
                className="object-cover w-full h-auto"
                sizes="100vw"
              />
            </div>
            
            <div className="relative">
              <Image
                src={logo_s_unpd}
                alt="UNDP"                
                width={40}
                height={60}
                className="object-cover w-full h-auto"
                sizes="100vw"
              />
              
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CopyRight;

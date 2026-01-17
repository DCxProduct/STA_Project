import React from "react";
import SubLink from "./SubLink";
import BarTitleWhite from "../section_title/BarTitleWhite";
import { useLocale } from "next-intl";

const FooterLink = ({ data }) => {
  const locale = useLocale();
  // const { links } = data;
  return (
    <div className=" md:mx-auto py-2">
      {data.map((item) => (
        <div className="" key={item.id}>
          <div className="">
            <BarTitleWhite
              title={item.title}
              marginBottom={"mb-2"}
              textSize={`lg:text-size-22 text-size-19 text-[#CBDAE8] line-height-28 khmer-text-odor:${locale} text-shadow`}              
            />
          </div>
          <ul className={`leading-9 `}>
            {item.sub_links.map((subLink, idx) => (
              <SubLink
                key={idx}
                linkTitle={subLink.title}
                link={subLink.href}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLink;

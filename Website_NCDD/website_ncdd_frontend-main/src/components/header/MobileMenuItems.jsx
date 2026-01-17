import React from "react";
import AccordionContainer from "../shared/containers/AccordionContainer";
import MobileMenuItem from "./MobileItem";
import { useLocale } from "next-intl";

const MobileMenuItems = ({ links }) => {
  const locale = useLocale();
  return (
    <div className={`pt-8 pb-6 border-b border-borderColor khmer-text-odor:${locale}`}>
      <AccordionContainer>
        {links.map((item, idx) => (
          <MobileMenuItem key={idx} item={item} />
        ))}
      </AccordionContainer>
    </div>
  );
};

export default MobileMenuItems;

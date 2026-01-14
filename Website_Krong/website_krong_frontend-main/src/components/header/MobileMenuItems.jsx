import React from "react";
import AccordionContainer from "../shared/containers/AccordionContainer";
import MobileMenuItem from "./MobileItem";

const MobileMenuItems = ({ links }) => {
  return (
    <div className="pt-8 pb-6 border-b border-borderColor font-bayon ">
      <AccordionContainer>
        {links.map((item, idx) => (
          <MobileMenuItem key={idx} item={item} />
        ))}
      </AccordionContainer>
    </div>
  );
};

export default MobileMenuItems;

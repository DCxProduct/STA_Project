import React from "react";
import MobileAccordion from "../header/MobileAccordion";

const DropdownMenuMobile = () => {
  const items = [
    {
      name: "សាវតា",
      //   status: "Online Store",
      path: "/ecommerce/shop",
    },
    {
      name: "អ្វីជា គ.ជ.អ.ប.?",
      path: "/ecommerce/products/1",
    },
    {
      name: "រចនាសម្ព័ន",
      path: "/ecommerce/cart",
    },
  ];
  return <MobileAccordion items={items} />;
};

export default DropdownMenuMobile;

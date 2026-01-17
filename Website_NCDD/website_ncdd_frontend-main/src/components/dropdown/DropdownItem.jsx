import React from "react";
import DropdownLink from "./DropdownLink";

const DropdownItem = ({ item }) => {
  const { title, status, type, dropdown, href } = item;
  return (
    <li className={`${dropdown ? "relative group/nested" : ""}`}>
      <DropdownLink item={item} />

      {/* {dropdown && (
        <DropdownWrapperPrimary>
          <DropdownPrimary items={dropdown} />
        </DropdownWrapperPrimary>
      )} */}
    </li>
  );
};

export default DropdownItem;

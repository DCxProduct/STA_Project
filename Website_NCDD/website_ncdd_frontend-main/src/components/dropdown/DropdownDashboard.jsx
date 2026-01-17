import React from "react";
import DropdownPrimary from "./DropdownPrimary";

const DropdownDashboard = () => {
  const items = [
    {
      id: 32,
      title: "អភិបាលក្រុង",
      section_id: 1,
      href: "អភិបាលក្រុង",
    },
    {
      id: 33,
      title: "ទិដ្ឋភាពទូទៅ",
      section_id: 1,
      href: "ទិដ្ឋភាពទូទៅ",
    },
    {
      id: 34,
      title: "ប្រវត្ដិ",
      section_id: 1,
      href: "ប្រវត្ដិ",
    },
    {
      id: 41,
      title: "រចនាសម្ព័ន្ធក្រុង",
      section_id: 1,
      href: "រចនាសម្ព័ន្ធក្រុង",
    },
    {
      id: 42,
      title: "ចម្ងាយពីក្រុងបានលុងទៅបណ្ដារាជធានី ខេត្ដ",
      section_id: 1,
      href: "ចម្ងាយពីក្រុងបានលុងទៅបណ្ដារាជធានី ខេត្ដ",
    },
  ];
  return <DropdownPrimary items={items} />;
};

export default DropdownDashboard;

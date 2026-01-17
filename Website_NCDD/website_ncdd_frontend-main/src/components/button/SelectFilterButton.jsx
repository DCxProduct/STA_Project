"use client";

import Select from "react-select";
import { useRouter, usePathname } from "next/navigation";

const SelectFilterButton = ({ data }) => {
  const { categories } = data;
  const router = useRouter();
  const pathname = usePathname();

  // Get category ID from URL
  const match = pathname.match(/\/opportunity\/category\/(\d+)/);
  const idFromUrl = match ? parseInt(match[1]) : null;

  // Convert categories to react-select format
  const options = categories.map((cat) => ({
    value: cat.id,
    label: cat.title,
    href: cat.href,
  }));

  // Dynamically compute selected option from id
  const selectedOption = options.find((opt) => opt.value === idFromUrl) || null;

  const handleChange = (selected) => {
    router.push(selected.href); // triggers soft navigation
  };

  return (
    <div className="w-full max-w-md px-0 pb-5 xs:mt-5">
      <Select
        instanceId="category-select"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="ជ្រើសរើសប្រភេទ"
        isSearchable={false}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "#f9fafb", // light gray background
            borderRadius: "0.5rem", // rounded-md
            borderColor: state.isFocused ? "#3b82f6" : "#d1d5db", // blue-500 on focus, gray-300 normal
            boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
            "&:hover": {
              borderColor: "#3b82f6",
            },
            padding: "4px 6px",
            minHeight: "40px",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
              ? "#e0f2fe" // light blue hover
              : state.isSelected
              ? "#bae6fd" // darker blue for selected
              : "#fff",
            color: "#000",
            padding: "10px 12px",
            cursor: "pointer",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "0.5rem",
            padding: "4px 0",
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#111827", // gray-900
            fontWeight: "500",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af", // gray-400
          }),
        }}
      />
    </div>
  );
};

export default SelectFilterButton;

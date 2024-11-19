import React, { useState } from "react";

interface SortDropdownProps {
  onSelect: (selectedOption: string) => void;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ onSelect }) => {
  const sortOptions = [
    "Most Popular",
    "Newest to Oldest",
    "Oldest to Newest",
    "Price - Low to High",
    "Price - High to Low",
    "Title A-Z",
    "Title Z-A",
  ];

  const [selected, setSelected] = useState(sortOptions[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="relative inline-block">
      <label className="text-sm font-medium mr-2" htmlFor="sort-dropdown">
        Sort by:
      </label>
      <select
        id="sort-dropdown"
        value={selected}
        onChange={handleChange}
        className="border rounded px-3 py-1 text-sm shadow-sm focus:ring focus:outline-none"
      >
        {sortOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
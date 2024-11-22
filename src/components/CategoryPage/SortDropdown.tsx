"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

interface SortDropdownProps {
  onSelect: (selectedOption: string) => void;
}

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

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(sortOptions[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false); // Close the menu after selection
  };

  return (
    <div className="relative inline-block">
      <button
        className="border rounded px-3 py-1 text-sm shadow-sm focus:ring focus:outline-none flex items-center justify-between w-48"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <span className="ml-2"><FaChevronDown/></span> {/* Down arrow */}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bg-white border rounded shadow-lg mt-1 w-48 z-50"
          >
            {sortOptions.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                  option === selected ? "font-semibold" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;

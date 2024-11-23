"use client";
import React, { useState, ReactNode } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

interface AccordionItem {
  title: string;
  isNested?: boolean;
  items?: AccordionItem[];
};

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  isActive,
  onToggle,
  children,
}) => {
  return (
    <div className="">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-3 border-b-2 transition-colors"
      >
        <span className="text-md font-semibold">{title}</span>
        {isActive ? (
          <FiChevronUp className="text-xl" />
        ) : (
          <FiChevronDown className="text-xl" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-1000 ${
          isActive ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-2 bg-white">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
import React, { useState, ReactNode } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

interface AccordionProductDetailProps {
  title: string;
  children: ReactNode;
  isOpenByDefault?: boolean;
}

const AccordionProductDetail: React.FC<AccordionProductDetailProps> = ({
  title,
  children,
  isOpenByDefault = false,
}) => {
  const [open, setOpen] = useState<boolean>(isOpenByDefault);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div
        onClick={toggleAccordion}
        className="flex flex-row justify-between items-center cursor-pointer"
      >
        <h1 className="text-lg font-semibold my-[2vh]">{title}</h1>
        {open ? (
          <FiChevronUp className="text-2xl" />
        ) : (
          <FiChevronDown className="text-2xl" />
        )}
      </div>
      {open && (
        <div className="transition-all duration-1000 ease-linear">
          {children}
        </div>
      )}
      <hr className="my-2" />
    </div>
  );
};

export default AccordionProductDetail;
"use client";
import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaCircle } from "react-icons/fa";
import Image from "next/image";
import { Product } from "@/types/product/product-types";
import AccordionProductDetail from "@/app/elements/AccordianProductDetail";
import FormattedDescription from "@/utils/parsedJson";
import ProductDescription from "./ProductDescription";
import FormattedTableofContents from "@/utils/parsedTableOfContents";
import { formatDate } from "@/utils/formatDate";

interface AdditionalContentsProps {
  productsDetails: Product;
};

const AdditionalContentSthethoscope: React.FC<AdditionalContentsProps> = ({
  productsDetails,
}) => {

  const [open, setOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div>

      <div className="my-4">
        <AccordionProductDetail title="Description">
          <div className="px-4">
            {productsDetails.description}
          </div>
        </AccordionProductDetail>
      </div>

    </div>
  );
};

export default AdditionalContentSthethoscope;
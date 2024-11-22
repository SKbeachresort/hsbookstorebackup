"use client";
import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaCircle } from "react-icons/fa";
import Image from "next/image";
import { Product, BookFormat } from "@/types/product/product-types";
import AccordionProductDetail from "@/elements/AccordianProductDetail";

interface AdditionalContentsProps {
  productsDetails: Product;
};

const AdditionalContents: React.FC<AdditionalContentsProps> = ({
  productsDetails,
}) => {
  
  const [open, setOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div>
        <hr />
        <AccordionProductDetail title="Book Details" isOpenByDefault={true}>
          <div className="flex flex-col px-4 md:flex-row md:gap-x-[4vh]">
            <div className="text-md">
              <h1 className="font-medium">
                ISBN-13:{" "}
                <span className="font-normal">{productsDetails.ISBN_NO}</span>
              </h1>
              <h1 className="font-medium">
                Series:{" "}
                <span className="font-normal">{productsDetails.Series}</span>
              </h1>
              <h1 className="font-medium">
                Publisher:{" "}
                <span className="font-normal">{productsDetails.Publisher}</span>
              </h1>
              <h1 className="font-medium">
                Publication Date:{" "}
                <span className="font-normal">
                  {productsDetails.PublicationDate}
                </span>
              </h1>
            </div>
            <div>
              <h1 className="font-medium text-md">
                Cover:{" "}
                <span className="font-normal">{productsDetails.Cover}</span>
              </h1>
              <h1 className="font-medium">
                Pages:{" "}
                <span className="font-normal">{productsDetails.Pages}</span>
              </h1>
              <h1 className="font-medium">
                Weight:{" "}
                <span className="font-normal">{productsDetails.Weight}</span>
              </h1>
            </div>
          </div>
        </AccordionProductDetail>
      </div>

      <div className="my-4">
        <AccordionProductDetail title="Description">
          <div className="px-4">
            <p className="text-sm md:text-md text-justify text-textgray">
              {productsDetails.description}
            </p>
          </div>
        </AccordionProductDetail>
      </div>

      <div>
        <AccordionProductDetail title="Table of Contents">
          <div className="px-4">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsam ipsum eius totam assumenda! Laborum quis explicabo, vel culpa nobis id, dolor earum ut, tempora odio reiciendis assumenda quia impedit.</p>
          </div>
        </AccordionProductDetail>
      </div>
    </div>
  );
};

export default AdditionalContents;
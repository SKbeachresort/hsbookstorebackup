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

const AdditionalContents: React.FC<AdditionalContentsProps> = ({
  productsDetails,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  const bookDetails = [
    {
      label: "ISBN-13",
      value: productsDetails.ISBN_NO,
    },
    {
      label: "Series",
      value: productsDetails.Series,
    },
    {
      label: "Publisher",
      value: productsDetails.Publisher,
    },
    {
      label: "Publication Date",
      value: productsDetails.PublicationDate
        ? formatDate(productsDetails.PublicationDate)
        : null,
    },
    {
      label: "Cover",
      value: productsDetails.Cover,
    },
    {
      label: "Pages",
      value: productsDetails.Pages,
    },
    {
      label: "Weight",
      value: productsDetails.Weight,
    },
  ];

  const column1 = bookDetails.slice(0, 4);
  const column2 = bookDetails.slice(4);

  return (
    <div>
      <div>
        <hr />
        <AccordionProductDetail title="Book Details" isOpenByDefault={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              {column1.map(
                (item, index) =>
                  item.value && (
                    <h1 key={index} className="font-bold text-sm">
                      {item.label}:{" "}
                      <span className="font-normal">{item.value}</span>
                    </h1>
                  )
              )}
            </div>
            <div className="flex flex-col gap-2">
              {column2.map(
                (item, index) =>
                  item.value && (
                    <h1 key={index} className="font-bold text-sm">
                      {item.label}:{" "}
                      <span className="font-normal">{item.value}</span>
                    </h1>
                  )
              )}
            </div>
          </div>
        </AccordionProductDetail>
      </div>

      <div className="my-4">
        <AccordionProductDetail title="Description">
          <div className="px-4">
            <FormattedDescription description={productsDetails.description} />
          </div>
        </AccordionProductDetail>
      </div>

      <div>
        {productsDetails?.tableOfContents && (
          <AccordionProductDetail title="Table of Contents">
            <div className="">
              <FormattedTableofContents
                description={productsDetails.tableOfContents}
              />
            </div>
          </AccordionProductDetail>
        )}
      </div>
    </div>
  );
};

export default AdditionalContents;
"use client";
import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaCircle } from "react-icons/fa";
import Image from "next/image";
import { Product } from "@/types/product/product-types";
import AccordionProductDetail from "@/app/elements/AccordianProductDetail";
import FormattedDescription from "@/utils/parsedJson";

interface AdditionalContentsProps {
  productsDetails: Product;
}

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
              {productsDetails.ISBN_NO && (
                <h1 className="font-medium">
                  ISBN-13:{" "}
                  <span className="font-normal">{productsDetails.ISBN_NO}</span>
                </h1>
              )}

              {productsDetails.Series && (
                <h1 className="font-medium">
                  Series:{" "}
                  <span className="font-normal">{productsDetails.Series}</span>
                </h1>
              )}

              {productsDetails.Publisher && (
                <h1 className="font-medium">
                  Publisher:{" "}
                  <span className="font-normal">
                    {productsDetails.Publisher}
                  </span>
                </h1>
              )}

              {productsDetails.PublicationDate && (
                <h1 className="font-medium">
                  Publication Date:{" "}
                  <span className="font-normal">
                    {productsDetails.PublicationDate}
                  </span>
                </h1>
              )}
            </div>
            <div>
              {productsDetails.Cover && (
                <h1 className="font-medium text-md">
                  Cover:{" "}
                  <span className="font-normal">{productsDetails.Cover}</span>
                </h1>
              )}

              {productsDetails.Pages && (
                <h1 className="font-medium">
                  Pages:{" "}
                  <span className="font-normal">{productsDetails.Pages}</span>
                </h1>
              )}

              {productsDetails.Weight && (
                <h1 className="font-medium">
                  Weight:{" "}
                  <span className="font-normal">{productsDetails.Weight}</span>
                </h1>
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
            {/* <div
            className="text-sm md:text-md text-justify text-textgray"
            dangerouslySetInnerHTML={{
              __html: productsDetails.tableOfContents
                .replace(/\\r\\n/g, "<br>") 
                .replace(/^\s+/gm, "")
                .replace(/(\r\n|\n|\r)/gm, " ") 
                .trim(), 
            }}
          ></div> */}
          <FormattedDescription
            description={productsDetails.tableOfContents}
          />
          </AccordionProductDetail>
        )}
      </div>
    </div>
  );
};

export default AdditionalContents;
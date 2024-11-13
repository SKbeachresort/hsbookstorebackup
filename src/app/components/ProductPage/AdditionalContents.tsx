"use client";
import React from "react";
import { FaHeart, FaRegHeart, FaCircle } from "react-icons/fa";
import Image from "next/image";
import { Product, BookFormat } from "@/app/types/product/product-types";
import exp from "constants";

interface AdditionalContentsProps {
  productsDetails: Product;
}

const AdditionalContents: React.FC<AdditionalContentsProps> = ({
  productsDetails,
}) => {
  return (
    <div>
      <div>
        <hr />
        <h1 className="text-lg font-semibold my-[2vh]">Book Details</h1>
        <div className="flex flex-col md:flex-row md:gap-x-[4vh]">
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
      </div>

      <div className="my-4">
        <hr />
        <h1 className="text-lg font-semibold my-4">Description</h1>
        <p className="text-sm md:text-md text-justify text-textgray">
          {productsDetails.description}
        </p>
      </div>
    </div>
  );
};

export default AdditionalContents;
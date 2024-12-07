"use client";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { FaHeart, FaRegHeart, FaCircle } from "react-icons/fa";
import Image from "next/image";
import { Product, BookFormat } from "@/types/product/product-types";

interface NewReleaseSectionProps {
  productsDetails: Product;
}

const NewReleaseSection: React.FC<NewReleaseSectionProps> = ({
  productsDetails,
}) => {
  return (
    <div className="my-10">
      <hr />
      <div className="flex flex-row gap-x-1 items-center mt-6">
        <div>
          <FaCircle
            color="#5CBD76"
            className="text-sm md:text-md text-success"
          />
        </div>
        <p className="text-sm md:text-md text-textgray">
          New Release Available (In Stock)
        </p>
      </div>

      <div className="flex flex-row gap-x-6 my-3">
        <div className="w-[35%] md:w-24">
          <Image
            src={productsDetails.mainImage}
            width={100}
            height={100}
            className="md:w-full"
            alt={productsDetails.name}
          />
        </div>
        <div className="w-[55%] md:w-auto">
          <p className="text-md text-textColor">
            {productsDetails.name}
          </p>
          <div className="flex flex-row justify-start gap-x-4 my-1 md:my-2 items-center">
            <p className="text-md font-semibold">
              {productsDetails.currency} {productsDetails.price}
            </p>
            <p className="line-through text-textgray text-xs font-medium">
              {productsDetails.currencySymbol}{" "}
              {productsDetails.cuttedPrice}
            </p>
          </div>

          <div>
            <button className="bg-secondary rounded-full text-sm md:text-md font-semibold text-white px-4 py-1">
              + Add
            </button>
          </div>

          <div className="flex items-center">
            <StarRatings
              rating={productsDetails.ratings}
              starRatedColor="#FFCE60"
              numberOfStars={5}
              starDimension="16px"
              starSpacing="1px"
              name="product-rating"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReleaseSection;

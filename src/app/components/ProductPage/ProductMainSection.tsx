"use client";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { FaHeart, FaRegHeart, FaCircle } from "react-icons/fa";
import Image from "next/image";
import { Product, BookFormat } from "@/app/types/product/product-types";

interface ProductDetailsProps {
  productsDetails: Product;
  isFav: boolean;
  toggleFav: () => void;
  cartItem?: { quantity: number };
  handleAddToCart: () => void;
  handleDecrement: () => void;
  incrementQuantity: (id: number) => void;
  bookFormats: BookFormat[];
};

const ProductMainSection: React.FC<ProductDetailsProps> = ({
  productsDetails,
  isFav,
  toggleFav,
  cartItem,
  handleAddToCart,
  handleDecrement,
  incrementQuantity,
  bookFormats,
}) => {

  const [selectedFormat, setSelectedFormat] = useState<string>(
    bookFormats[0]?.label || ""
  );

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-x-2 justify-start">
        <div className="flex p-2 flex-col-reverse md:flex-row gap-x-2">
          {/* Sub Images */}
          <div className="flex flex-row my-3 md:my-0 md:flex-col gap-4 w-[20%]">
            {productsDetails.subImage.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={100}
                height={100}
                alt="Product Image"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="relative">
            <Image
              src={productsDetails.mainImage}
              width={400}
              height={600}
              alt="Product Image"
              className="md:w-full lg:w-[86%] "
            />
            {isFav ? (
              <>
                <FaHeart
                  className="absolute z-40 top-0 -right-4 lg:right-10 cursor-pointer text-secondary text-xl"
                  onClick={toggleFav}
                />
              </>
            ) : (
              <>
                <FaRegHeart
                  className="absolute z-40 top-0 -right-4 lg:right-10 cursor-pointer text-secondary text-xl"
                  onClick={toggleFav}
                />
              </>
            )}
          </div>
        </div>

        <div className="p-1 md:p-2">
          <span className="bg-[#69BBE940] mb-2 font-normal text-primary w-fit text-xs md:text-sm p-1">
            Best Seller
          </span>

          {/* Title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl my-1 font-medium">
            {productsDetails.name}
          </h1>

          {/* Author Name */}
          <p className="text-xs md:text-sm text-textgray">
            by <span className="underline">{productsDetails.Author}</span>
          </p>

          {/* Reviews */}
          <div className="flex flex-row items-center gap-x-1">
            <StarRatings
              rating={3}
              starRatedColor="#FFCE60"
              numberOfStars={5}
              starDimension="16px"
              starSpacing="1px"
              name="product-rating"
            />
            <p className="text-xs md:text-sm mt-1 text-textgray">195 reviews</p>
          </div>

          <p className="text-sm md:text-md my-1 text-textgray">
            Ships from and sold by hsbookstore.com
          </p>

          {/* Price Section */}
          <div>
            <div className="flex flex-row gap-x-2 my-2">
              <p className="text-xl md:text-2xl font-semibold">
                {productsDetails.currency} {productsDetails.price.toFixed(3)}
              </p>
              <p className="line-through text-textgray text-sm md:text-md font-medium">
                {productsDetails.currencySymbol}{" "}
                {productsDetails.cuttedPrice.toFixed(3)}
              </p>
            </div>
          </div>

          {/* Availiablity Section */}
          <div className="flex flex-row gap-x-1 items-center">
            <div>
              <FaCircle
                color="#5CBD76"
                className="text-sm md:text-md text-success"
              />
            </div>
            <p className="text-sm md:text-md text-textgray">
              Available (In Stock)
            </p>
          </div>

          {/* Add to Cart */}
          {cartItem ? (
            <div className="flex bg-secondary w-fit px-4 py-2 rounded-full items-center gap-4 my-3">
              <button
                onClick={handleDecrement}
                className="text-white text-md font-medium  rounded-full "
              >
                -
              </button>
              <span className="text-md text-white font-medium">
                {cartItem.quantity} Added
              </span>
              <button
                onClick={() => incrementQuantity(productsDetails.id)}
                className="text-white text-md font-medium "
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="text-white text-md font-medium bg-secondary rounded-full px-6 py-2 my-3"
            >
              + Add to Cart
            </button>
          )}

          {/* Book Format */}
          <p className="text-lg">
            <span className="font-medium ">Book Format: </span>
            <span>{selectedFormat}</span>
          </p>

          {/* Select Book Format */}
          <div className="flex flex-wrap gap-4 mt-4">
            {bookFormats.map((format) => (
              <button
                key={format.label}
                onClick={() => setSelectedFormat(format.label)}
                className={`px-4 w-[45%] py-2 rounded-md 
              ${
                selectedFormat === format.label
                  ? "border-2 text-black font-medium border-secondary"
                  : "border-2 text-[#cccccc] font-medium border-disableGray"
              }`}
              >
                <div className="text-md">{format.label}</div>
                <div className="text-sm">{`${format.currency} ${format.price}`}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMainSection;
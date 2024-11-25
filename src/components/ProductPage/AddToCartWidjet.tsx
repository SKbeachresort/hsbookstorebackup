"use client";
import React, { useState } from "react";
import { Product, BookFormat } from "@/types/product/product-types";
import { FaCircle } from "react-icons/fa";

interface AddToCartWidjetProps {
  productsDetails: Product;
  cartItem?: { quantity: number };
  handleAddToCart: () => void;
  handleDecrement: () => void;
  incrementQuantity: (id: string) => void;
  bookFormats: BookFormat[];
}

const AddToCartWidjet: React.FC<AddToCartWidjetProps> = ({
  productsDetails,
  handleAddToCart,
  handleDecrement,
  incrementQuantity,
  bookFormats,
  cartItem,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>(
    bookFormats[0]?.label || ""
  );
  return (
      <div className="border-[1px] border-disableGray p-4 rounded-xl">
        <p className="text-sm md:text-md my-1 text-textgray">
          Ships from and sold by hsbookstore.com
        </p>

        {/* Price Section */}
        <div>
          <div className="flex flex-row gap-x-4 my-2">
            <p className="text-xl md:text-2xl font-semibold">
              {productsDetails.currency} {productsDetails.price.toFixed(3)}
            </p>
            <p className="line-through text-textgray text-sm md:text-md font-normal">
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
              size={10}
              className="text-sm md:text-sm text-success"
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
        <p className="text-sm">
          <span className="font-medium ">Book Format: </span>
          <span>{selectedFormat}</span>
        </p>
      </div>
  );
};

export default AddToCartWidjet;

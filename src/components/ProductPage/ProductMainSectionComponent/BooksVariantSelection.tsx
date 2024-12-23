"use client";
import React, { useEffect } from "react";
import { Product } from "@/types/product/product-types";

const booksVariants = [
  { id: "1", name: "Softcover" },
  { id: "2", name: "Hardcover" },
  { id: "3", name: "Paperback" },
  { id: "4", name: "Ebook" },
];

interface BooksVariantSelectionProps {
  productsDetails: Product;
  selectedVariant: Product | null;
  onVariantSelect: (variant: any) => void;
}

const BooksVariantSelection: React.FC<BooksVariantSelectionProps> = ({
  productsDetails,
  selectedVariant,
  onVariantSelect,
}) => {
  console.log("Product Variant Selection", productsDetails.variantObj);

  useEffect(() => {
    if (productsDetails.variantObj.length > 0 && !selectedVariant) {
      onVariantSelect(productsDetails.variantObj[0]);
    }
  }, [productsDetails.variantObj, selectedVariant, onVariantSelect]);

  const availableVariants = productsDetails.variantObj.map((variant) => ({
    id: variant.id,
    name: variant.name,
    currency: variant.pricing.priceUndiscounted.gross.currency,
    price: variant.pricing.priceUndiscounted.gross.amount,
  }));

  const sortedVariants = [
    ...(selectedVariant
      ? [availableVariants.find((v) => v.name === selectedVariant.name)]
      : []),
    ...availableVariants.filter((v) => v.name !== selectedVariant?.name),
    ...booksVariants.filter(
      (bv) => !availableVariants.find((av) => av.name === bv.name)
    ),
  ];

  return (
    <div className="mt-4">
      <p className="text-md font-medium text-textColor">
        <span className="font-semibold text-black">Bookformat:</span>{" "}
        {selectedVariant?.name}
      </p>
      <div className="flex flex-row justify-between flex-wrap gap-2 mt-2">
        {sortedVariants.map((variant) => {
          const isAvailable = availableVariants.find(
            (v) => v.name === variant?.name
          );
          return (
            <button
              key={variant?.name}
              onClick={() => isAvailable && onVariantSelect(variant)}
              className={`px-4 w-[48%] py-2 rounded-xl text-md font-medium ${
                isAvailable
                  ? selectedVariant?.name === variant?.name
                    ? "border-[3px] border-secondary font-semibold text-black"
                    : "border-2 border-disableGray text-black"
                  : "border-2 border-disableGray text-[#cccccc] cursor-not-allowed"
              }`}
              disabled={!isAvailable}
            >
              <p>{variant?.name}</p>
              <p className="text-sm">
                {isAvailable?.price
                  ? `${isAvailable.currency} ${isAvailable.price}`
                  : "N/A"}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BooksVariantSelection;
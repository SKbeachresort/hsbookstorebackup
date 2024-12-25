"use client";
import React, { useEffect } from "react";
import { Product } from "@/types/product/product-types";

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
  useEffect(() => {
    // Auto-select the first available variant if none is selected
    if (productsDetails.variantObj.length > 0 && !selectedVariant) {
      onVariantSelect(productsDetails.variantObj[0]);
    }
  }, [productsDetails.variantObj, selectedVariant, onVariantSelect]);

  // Map only the variants provided by the backend
  const availableVariants = productsDetails.variantObj.map((variant) => ({
    id: variant.id,
    name: variant.name,
    currency: variant.pricing.priceUndiscounted.gross.currency,
    price: variant.pricing.priceUndiscounted.gross.amount,
  }));

  return (
    <div className="mt-1 lg:mt-2 xl:mt-4">
      <p className="text-md font-medium text-textColor">
        <span className="font-semibold text-black">Book Format:</span>{" "}
        {selectedVariant?.name}
      </p>
      <div className="flex flex-row justify-between flex-wrap gap-2 mt-2">
        {availableVariants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onVariantSelect(variant)}
            className={`px-4 w-[48%] py-1 rounded-xl text-md font-medium ${
              selectedVariant?.id === variant.id
                ? "border-[3px] border-secondary font-medium"
                : "border-2 border-disableGray"
            }`}
          >
            <p
              className={`font-semibold ${
                selectedVariant?.id === variant.id
                  ? "text-textColor"
                  : "text-disableGray"
              }`}
            >
              {variant.name}
            </p>
            <p className={`text-sm ${
                selectedVariant?.id === variant.id
                  ? "text-textgray"
                  : "text-disableGray"
              }`}>
              {variant.price ? `${variant.currency} ${variant.price}` : "N/A"}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BooksVariantSelection;

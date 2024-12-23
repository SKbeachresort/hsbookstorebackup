"use client";
import React, { useState } from "react";
import { Product } from "@/types/product/product-types";
import ColorCircle from "../CustomColors";

const COLOR_MAP: { [key: string]: string } = {
  Black: "#000000",
  Burgundy: "#800020",
  Raspberry: "#E30B5D",
  Champagne: "#F7E7CE",
  Rainbow:
    "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
  Smoke: "#708090",
};

interface AttributeValue {
  name: string;
  slug: string;
}

interface Attribute {
  attribute: {
    name: string;
    slug: string;
  };
  values: AttributeValue[];
}

interface Variant extends Product {
  attributes: Attribute[];
}

interface StethoscopeVariantProps {
  productsDetails: {
    variantObj: Variant[];
  } & Product;
  selectedVariant: Product | null;
  availableAttributes: {
    [key: string]: string[];
  };
  selectedAttributes: {
    [key: string]: string;
  };
  onVariantSelect: (attributeName: string, value: string) => void;
}

const SthethescopeVariantSelection: React.FC<StethoscopeVariantProps> = ({
  productsDetails,
  selectedVariant,
  availableAttributes,
  selectedAttributes,
  onVariantSelect,
}) => {
    
  const findVariantByColor = (color: string) => {
    return productsDetails.variantObj.find((variant) =>
      variant.attributes.some((attr) =>
        attr.values.some((value: any) => value.name === color)
      )
    );
  };

  const handleColorSelection = (attributeName: string, value: string) => {
    const variant = findVariantByColor(value);
    onVariantSelect(attributeName, value);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">
        Selected Variant: {selectedVariant?.name}
      </h3>

      {Object.entries(availableAttributes).map(([attributeName, values]) => (
        <div key={attributeName} className="mb-4">
          <p className="text-sm font-medium mb-2">{attributeName}:</p>
          <div className="flex flex-wrap gap-2 items-center">
            {values.map((value) => {
              const color = COLOR_MAP[value] || "#808080";
              return (
                <div key={value} className="flex flex-col items-center gap-1">
                  <ColorCircle
                    color={color}
                    isSelected={selectedAttributes[attributeName] === value}
                    onClick={() => handleColorSelection(attributeName, value)}
                  />
                  <span className="text-xs text-gray-600">{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SthethescopeVariantSelection;

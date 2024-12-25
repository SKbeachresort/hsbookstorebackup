import React, { useState, useEffect } from "react";
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

const StethoscopeVariantSelection: React.FC<StethoscopeVariantProps> = ({
  productsDetails,
  selectedVariant,
  availableAttributes,
  selectedAttributes,
  onVariantSelect,
}) => {
  const [validCombinations, setValidCombinations] = useState<{
    [key: string]: { [key: string]: string[] };
  }>({});

  useEffect(() => {
    if (productsDetails.variantObj.length > 0) {
      const firstVariant = productsDetails.variantObj[0];
      const initialAttributes: { [key: string]: string } = {};

      firstVariant.attributes.forEach((attr: any) => {
        if (attr.values.length > 0) {
          initialAttributes[attr.attribute.name] = attr.values[0].name;
        }
      });

      Object.entries(initialAttributes).forEach(([name, value]) => {
        onVariantSelect(name, value);
      });

      calculateValidCombinations();
    }
  }, [productsDetails.variantObj]);

  const calculateValidCombinations = () => {
    const combinations: { [key: string]: { [key: string]: string[] } } = {};

    productsDetails.variantObj.forEach((variant) => {
      variant.attributes.forEach((attr1) => {
        if (!combinations[attr1.attribute.name]) {
          combinations[attr1.attribute.name] = {};
        }

        if (attr1.values.length > 0) {
          const value1 = attr1.values[0].name;

          variant.attributes.forEach((attr2) => {
            if (
              attr1.attribute.name !== attr2.attribute.name &&
              attr2.values.length > 0
            ) {
              if (!combinations[attr1.attribute.name][value1]) {
                combinations[attr1.attribute.name][value1] = [];
              }
              combinations[attr1.attribute.name][value1].push(
                attr2.values[0].name
              );
            }
          });
        }
      });
    });

    setValidCombinations(combinations);
  };

  const isValueDisabled = (attributeName: string, value: string) => {
    if (attributeName === "Tube color") return false;

    const selectedTubeColor = selectedAttributes["Tube color"];
    if (!selectedTubeColor) return false;

    const validValuesForTubeColor = productsDetails.variantObj
      .filter((variant) =>
        variant.attributes.some(
          (attr) =>
            attr.attribute.name === "Tube color" &&
            attr.values.some((val) => val.name === selectedTubeColor)
        )
      )
      .flatMap((variant) =>
        variant.attributes
          .filter((attr) => attr.attribute.name === attributeName)
          .flatMap((attr) => attr.values.map((val) => val.name))
      );

    return !validValuesForTubeColor.includes(value);
  };

  return (
    <>
      <div className="mt-4">
        {Object.entries(availableAttributes)
          .slice(0, 3)
          .map(([attributeName, values]) => (
            <div key={attributeName} className="mb-2">
              <p className="text-sm font-medium mt-2">
                {attributeName}: {selectedAttributes[attributeName]}
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                {values.map((value) => {
                  const color = COLOR_MAP[value] || "#808080";
                  const isDisabled = isValueDisabled(attributeName, value);
                  return (
                    <div
                      key={value}
                      className="flex flex-col items-center gap-1"
                    >
                      <ColorCircle
                        color={color}
                        isSelected={selectedAttributes[attributeName] === value}
                        onClick={() =>
                          !isDisabled && onVariantSelect(attributeName, value)
                        }
                        className={`${
                          isDisabled
                            ? "opacity-50 border-none cursor-not-allowed"
                            : ""
                        } ${
                          selectedAttributes[attributeName] === value
                            ? "border-2 border-secondary"
                            : ""
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default StethoscopeVariantSelection;

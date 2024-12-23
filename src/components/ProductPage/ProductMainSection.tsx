"use client";
import React, { useState, useEffect } from "react";
import { Product, VariantFormat } from "@/types/product/product-types";
import MainImageComponent from "./ProductMainSectionComponent/MainImageComponent";
import SthethescopeVariantSelection from "./ProductMainSectionComponent/SthethescopeVariantSelection";
import BooksVariantSelection from "./ProductMainSectionComponent/BooksVariantSelection";
import ProductDetailsSectionUI from "./ProductMainSectionComponent/ProductDetailsSectionUI";

interface ProductDetailsProps {
  productsDetails: Product;
  channel: string;
  cartItem?: { quantity: number };
  handleAddToCart: () => void;
  handleDecrement: () => void;
  incrementQuantity: (id: string) => void;
  removeFromCart?: (id: string) => void;
  VariantDefault: VariantFormat[];
};

const ProductMainSection: React.FC<ProductDetailsProps> = ({
  productsDetails,
  channel,
  cartItem,
  handleAddToCart,
  handleDecrement,
  incrementQuantity,
  removeFromCart,
  VariantDefault,
}) => {
  
  const [selectedVariant, setSelectedVariant] = useState<Product | null>(null);
  const variants = productsDetails.variantObj;

  const handleMagnifyClick = () => {
    setIsZoomed(!isZoomed);
  };

  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

  const [availableAttributes, setAvailableAttributes] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    if (variants && variants.length > 0) {
      const attributes: { [key: string]: Set<string> } = {};

      variants.forEach((variant) => {
        variant.attributes.forEach((attr: any) => {
          const attrName = attr.attribute.name;
          if (!attributes[attrName]) {
            attributes[attrName] = new Set();
          }

          attr.values.forEach((value: any) => {
            if (value.name) {
              attributes[attrName].add(value.name);
            }
          });
        });
      });

      const processedAttributes: { [key: string]: string[] } = {};
      Object.keys(attributes).forEach((key) => {
        processedAttributes[key] = Array.from(attributes[key]);
      });

      setAvailableAttributes(processedAttributes);
    }
  }, [variants]);

  const handleAttributeSelection = (attributeName: string, value: string) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
      [attributeName]: value,
    };
    setSelectedAttributes(newSelectedAttributes);

    const matchedVariant = findMatchingVariant(newSelectedAttributes);
    if (matchedVariant) {
      handleVariantSelection(matchedVariant);
    }
  };

  const findMatchingVariant = (selectedAttrs: { [key: string]: string }) => {
    return variants.find((variant) => {
      return Object.entries(selectedAttrs).every(([attrName, attrValue]) => {
        return variant.attributes.some(
          (attr: any) =>
            attr.attribute.name === attrName &&
            attr.values.some((value: any) => value.name === attrValue)
        );
      });
    });
  };

  const [selectImage, setSelectImage] = useState<string>(
    productsDetails.mainImage
  );

  const [isZoomed, setIsZoomed] = useState(false);

  const handleVariantSelection = (variant: any) => {
    const updatedVariant = {
      ...productsDetails,
      id: variant.id,
      variantId: variant.id,
      mainImage: variant.media?.[0]?.url || productsDetails.mainImage,
      subImage:
        variant.media &&
        Array.isArray(variant.media) &&
        variant.media.length > 0
          ? variant.media.map((media: any) => media.url)
          : productsDetails.subImage,
      price: variant?.pricing?.price?.gross.amount,
      cuttedPrice: variant?.pricing?.priceUndiscounted?.gross.amount,
      currency: variant?.pricing?.price?.gross.currency,
      ISBN_NO: variant.sku || "N/A",
      name: variant.name || productsDetails.name,
      attributes: variant.attributes,
    };

    setSelectedVariant(updatedVariant);
    setSelectImage(updatedVariant.mainImage);
  };

  useEffect(() => {
    if (variants && variants.length > 0) {
      handleVariantSelection(variants[0]);
    }
  }, [variants]);

  const handleDecrementLogic = () => {
    if (cartItem?.quantity === 1 && removeFromCart) {
      removeFromCart(productsDetails.id);
    } else {
      handleDecrement();
    }
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-4 justify-start md:justify-between items-start">
        
        {/* Main Image Component */}
        <MainImageComponent
          productsDetails={productsDetails}
          selectedVariant={selectedVariant}
        />

        {/* Product Details */}
        <div className="p-2 md:p-4 w-full md:w-[35%] h-auto md:border-[1px] border-disableGray rounded-lg">

          {/* Product Details Section UI */}
          <ProductDetailsSectionUI
            channel={channel}
            productsDetails={productsDetails}
            selectedVariant={selectedVariant}
            cartItem={cartItem}
            handleAddToCart={handleAddToCart}
            handleDecrement={handleDecrementLogic}
            incrementQuantity={incrementQuantity}
            removeFromCart={removeFromCart}
          />

          {/* Variant Selection only for Books */}
          {productsDetails?.variantType === "Book" && (
            <BooksVariantSelection
              productsDetails={productsDetails}
              selectedVariant={selectedVariant}
              onVariantSelect={handleVariantSelection}
            />
          )}

          {/* Variant Selection for Sthethoscopes */}
          {productsDetails?.variantType === "Stethoscopes" && (
            <SthethescopeVariantSelection
              productsDetails={productsDetails}
              selectedVariant={selectedVariant}
              availableAttributes={availableAttributes}
              selectedAttributes={selectedAttributes}
              onVariantSelect={handleAttributeSelection}
            />
          )}

          {/* Quantity Selection */}
        </div>
      </div>
    </div>
  );
};

export default ProductMainSection;
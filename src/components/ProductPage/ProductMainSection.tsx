"use client";
import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import {
  FaHeart,
  FaRegHeart,
  FaCircle,
  FaSearchPlus,
  FaPlus,
  FaTrashAlt,
  FaMinus,
} from "react-icons/fa";
import Image from "next/image";
import { Product, VariantFormat } from "@/types/product/product-types";
import { ProductBySlugDocument } from "../../../gql/graphql-documents";
import ColorCircle from "./CustomColors";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useAddProductToWishlistMutation } from "../../../gql/graphql";
import { useUser } from "@/hooks/useUser";

const COLOR_MAP: { [key: string]: string } = {
  Black: "#000000",
  Burgundy: "#800020",
  Raspberry: "#E30B5D",

  Champagne: "#F7E7CE",
  Rainbow:
    "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",

  Smoke: "#708090",
};

interface ProductDetailsProps {
  productsDetails: Product;
  channel: string;
  cartItem?: { quantity: number };
  handleAddToCart: () => void;
  handleDecrement: () => void;
  incrementQuantity: (id: string) => void;
  removeFromCart?: (id: string) => void;
  VariantDefault: VariantFormat[];
}

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

 

  const [isZoomed, setIsZoomed] = useState<boolean>(false);

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

  console.log("Selected Variant", selectedVariant);

  useEffect(() => {
    if (variants && variants.length > 0) {
      handleVariantSelection(variants[0]);
    }
  }, [variants]);

  const hasMultipleVariants = productsDetails.variantObj.length > 1;
  console.log("Variant Object", productsDetails.variantObj);

  const handleDecrementLogic = () => {
    if (cartItem?.quantity === 1 && removeFromCart) {
      removeFromCart(productsDetails.id);
    } else {
      handleDecrement();
    }
  };

  // Wishlist Logic
  const { user } = useUser();
  const [isFav, setIsFav] = useState<boolean>(false);
  const userId = user?.id;

  const [addProductToWishlist] = useAddProductToWishlistMutation();

  const toggleFav = async () => {
    if (!userId) {
      toast.error("Please login to add product to wishlist");
      return;
    }

    try {
      const action = isFav ? "delete" : "add";
      const response = await addProductToWishlist({
        variables: {
          productId: productsDetails.id,
          userId: userId as string,
          action,
        },
      });
      if (response?.data?.wishlistAdd?.success) {
        setIsFav(!isFav);
        if (action === "add") {
          toast.success("Product added to wishlist!");
        } else if (action === "delete") {
          toast.success("Product removed from wishlist!");
        }
      } else {
        toast.error(`${response?.data?.wishlistAdd?.message}`);
      }
    } catch (error) {
      console.log("Error in adding product to wishlist", error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-4 justify-start md:justify-between items-start">
        <div className="flex p-2 flex-col-reverse md:flex-row justify-between md:w-[60%] gap-2">
          <div className="flex flex-row my-3 p-2 md:my-0 md:flex-col gap-4 w-[20%]">
            {selectedVariant?.subImage &&
              selectedVariant?.subImage.length > 0 ? (
              selectedVariant.subImage.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  width={100}
                  height={100}
                  alt={`Product sub-image ${index + 1}`}
                  className="cursor-pointer shadow-md shadow-slate-100"
                  onClick={() => setSelectImage(image)}
                  onMouseEnter={() => setSelectImage(image)}
                />
              ))
            ) : (
              <p></p>
            )}
          </div>

          {/* Main Image */}
          <div className="relative md:w-[80%] flex flex-col items-end">
            <Image
              src={selectImage}
              width={400}
              height={600}
              alt="Product Image"
              className={`w-full md:w-[80%] ${isZoomed ? "scale-150" : ""}`}
            />
            {/* Heart Icon */}
            <div className="absolute z-40 top-0 bg-white rounded-full p-2 shadow-lg -right-4">
              {isFav ? (
                <FaHeart
                  className="cursor-pointer text-secondary text-2xl"
                  onClick={toggleFav}
                />
              ) : (
                <FaRegHeart
                  className="cursor-pointer text-secondary text-2xl"
                  onClick={toggleFav}
                />
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-1 md:p-4 md:w-[35%] h-auto border-[1px] border-disableGray rounded-lg">
          <span className="bg-[#69BBE940] mb-2 font-normal text-primary w-fit text-xs md:text-sm p-1">
            Best Seller
          </span>
          <h1 className="text-xl 3xl:text-3xl my-1 font-medium">
            {productsDetails?.name}
          </h1>
          <p className="text-xs text-textgray">
            by <span className="underline">{productsDetails.Author}</span>
          </p>

          <div className="flex flex-row items-center gap-x-1">
            <StarRatings
              rating={productsDetails?.ratings}
              starRatedColor="#FFCE60"
              numberOfStars={5}
              starDimension="16px"
              starSpacing="1px"
              name="product-rating"
            />
            <p className="text-xs mt-1 text-textgray">
              {productsDetails?.ratings} ratings
            </p>
          </div>

          <p className="text-sm my-1 text-textgray">
            Ships from and sold by hsbookstore.com
          </p>

          {/* Price Section */}
          <div className="flex flex-row gap-x-2 my-2">
            <p className="text-xl font-semibold">
              {selectedVariant?.currency} {selectedVariant?.price}
            </p>
            <p className="line-through text-textgray text-sm font-medium">
              {selectedVariant?.currencySymbol} {selectedVariant?.cuttedPrice}
            </p>
          </div>

          {/* Availability */}
          <div className="flex flex-row gap-x-1 items-center">
            <FaCircle color="#5CBD76" className="text-sm text-success" />
            <p className="text-sm text-textgray">Available (In Stock)</p>
          </div>

          {/* Add to Cart */}
          {cartItem ? (
            <div className="flex bg-secondary w-fit px-4 py-2 rounded-full items-center gap-4 my-3">
              <button
                onClick={handleDecrementLogic}
                className="text-white text-sm font-medium flex items-center gap-1"
              >
                {cartItem.quantity === 1 ? (
                  <FaTrashAlt className="text-white" />
                ) : (
                  <FaMinus />
                )}
              </button>

              <span className="text-sm text-white font-medium">
                {cartItem.quantity} Added
              </span>

              <button
                onClick={() => incrementQuantity(productsDetails.id)}
                className="text-white text-sm font-medium"
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="text-white text-sm font-medium bg-secondary rounded-full px-6 py-2 my-3"
            >
              + Add to Cart
            </button>
          )}

          {/* Variant Selection only for Books */}
          {productsDetails?.variantType === "Book" && (
            <div>
              <p className="text-sm font-medium">
                {productsDetails?.variantType === "Book"
                  ? `Bookformat`
                  : `Variant`}
                : {selectedVariant?.name}
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                {productsDetails.variantObj.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantSelection(variant)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      selectedVariant?.id === variant.id
                        ? "border-2 border-secondary text-black"
                        : "border-2 border-disableGray text-[#cccccc]"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variant Selection for Sthethoscopes */}
          {productsDetails?.variantType === "Stethoscopes" && (
            <div className="mt-2">
              <p>Selected Variant: {selectedVariant?.name}</p>
              {Object.entries(availableAttributes).map(
                ([attributeName, values]) => (
                  <div key={attributeName} className="my-2">
                    <p className="text-sm font-medium mb-2">{attributeName}:</p>
                    <div className="flex flex-wrap gap-1 items-center">
                      {values.map((value) => {
                        const color = COLOR_MAP[value] || "#808080";

                        return (
                          <ColorCircle
                            key={value}
                            color={color}
                            isSelected={
                              selectedAttributes[attributeName] === value
                            }
                            onClick={() =>
                              handleAttributeSelection(attributeName, value)
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Quantity Selection */}
        </div>
      </div>
    </div>
  );
};

export default ProductMainSection;

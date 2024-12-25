"use client";
import React from "react";
import StarRatings from "react-star-ratings";
import { FaCircle, FaPlus, FaTrashAlt, FaMinus } from "react-icons/fa";
import { Product } from "@/types/product/product-types";
import ProductAuthorSection from "./ProductAuthorSection";
import { useGetProductReviewByIdQuery } from "../../../../gql/graphql";

interface ProductDetailsProps {
  channel: string;
  productsDetails: Product;
  selectedVariant: Product | null;
  cartItem?: { quantity: number };
  handleAddToCart: () => void;
  handleDecrement: () => void;
  incrementQuantity: (id: string) => void;
  removeFromCart?: (id: string) => void;
};

const ProductDetailsSectionUI: React.FC<ProductDetailsProps> = ({
  channel,
  productsDetails,
  selectedVariant,
  cartItem,
  handleAddToCart,
  handleDecrement,
  incrementQuantity,
  removeFromCart,
}) => {

  const handleDecrementLogic = () => {
    if (cartItem?.quantity === 1 && removeFromCart) {
      removeFromCart(productsDetails.id);
    } else {
      handleDecrement();
    }
  };

  const productId = productsDetails.id;

  const { data, loading, error, refetch } = useGetProductReviewByIdQuery({
    variables: { productId, channel },
  });

  const reviews = data?.getProductReviews || [];
  const totalReviews = reviews.length;

  const totalRatings = reviews.reduce(
    (sum, review) => sum + (review?.rating || 0),
    0
  );
  
  const averageRating = totalReviews > 0 ? totalRatings / totalReviews : 0;

  return (
    <div className="flex flex-col">
      {/* Best Seller Badge */}
      <span className="bg-[#69BBE940] mb-1 lg:mb-2 font-normal text-primary w-fit text-xs md:text-sm p-1">
        Best Seller
      </span>

      {/* Product Name */}
      <h1 className="text-lg xl:text-xl 3xl:text-3xl my-1 font-medium">
        {productsDetails?.name}
      </h1>

      {/* Author Section for Books */}
      {productsDetails?.variantType === "Book" && (
        <ProductAuthorSection authorName={productsDetails.Author} />
      )}

      {/* Ratings */}
      <div className="flex flex-row items-center gap-x-1">
        <StarRatings
          rating={averageRating}
          starRatedColor="#FFCE60"
          numberOfStars={5}
          starDimension="16px"
          starSpacing="1px"
          name="product-rating"
        />
        <p className="text-xs mt-1 text-textgray">
          {totalReviews} ratings
        </p>
      </div>

      {/* Shipping Info */}
      <p className="text-sm my-1 text-textgray">
        Ships from and sold by hsbookstore.com
      </p>

      {/* Price Section */}
      <div className="flex flex-row gap-x-2 mt-2 mb-1">
        <p className="text-xl xl:text-2xl font-semibold">
          {selectedVariant?.currency} {selectedVariant?.price}
        </p>
        {(selectedVariant?.cuttedPrice ?? 0) >
          (selectedVariant?.price ?? 0) && (
          <p className="line-through text-textgray text-sm font-medium">
            {selectedVariant?.currencySymbol} {selectedVariant?.cuttedPrice.toFixed(3)}
          </p>
        )}
      </div>

      {/* Availability */}
      {productsDetails?.available ? (
        <div className="flex flex-row gap-x-1 items-center">
          <FaCircle color="#5CBD76" className="text-sm text-success" />
          <p className="text-sm text-textgray">Available (In Stock)</p>
        </div>
      ) : (
        <div className="flex flex-row gap-x-1 items-center">
          <FaCircle color="#FF0000" className="text-sm text-danger" />
          <p className="text-sm text-red-500">Out of Stock</p>
        </div>
      )}

      {/* Add to Cart Section */}
      <div className="w-[65%]">
        {cartItem ? (
          <div className="flex flex-row justify-center bg-secondary w-full px-4 py-2 rounded-full items-center gap-4 my-3">
            <button
              onClick={handleDecrementLogic}
              className="text-white text-md font-medium flex items-center gap-1"
            >
              {cartItem.quantity === 1 ? (
                <FaTrashAlt className="text-white" />
              ) : (
                <FaMinus />
              )}
            </button>

            <span className="text-md text-white font-medium">
              {cartItem.quantity} Added
            </span>

            <button
              onClick={() => incrementQuantity(productsDetails.id)}
              className="text-white text-md font-medium"
            >
              <FaPlus />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="text-white w-full text-md font-medium bg-secondary rounded-full px-6 py-2 my-3"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsSectionUI;

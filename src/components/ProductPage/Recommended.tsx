"use client";
import React, { useState, useRef } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "@/data/Products";
import MiniCarousel from "@/app/elements/MiniCarousel";
import ZoomInSlideUp from "../Animated/ZoomInSlideUp";
import { useProductRecommendationsQuery } from "../../../gql/graphql";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface RecommendedProps {
  channel: string;
  id: string;
};

export const Recommended: React.FC<RecommendedProps> = ({ channel, id }) => {
  
  const { data, loading, error } = useProductRecommendationsQuery({
    variables: {
      productId: id,
      channel,
    },
  });

  const products = data?.recommendations || [];

  return (
    <div className="my-8 hidden md:block">
      {products.length > 0 && (
        <>
          <div className="flex flex-row justify-between items-center my-4">
            <h1 className="text-md md:text-lg font-semibold">Recommended</h1>
            <p className="text-sm md:text-md font-semibold text-secondary underline">
              See all
            </p>
          </div>

          <div className="">
            <MiniCarousel
              slides={products.map((recommendations, index) => {
                const product = recommendations?.product;
                const productImage =
                  product?.media?.[0]?.url || "/placeholder.png";

                return (
                  <ProductCard
                    id={product?.id || ""}
                    key={index}
                    name={product?.name || ""}
                    image={productImage}
                    currency={
                      product?.pricing?.priceRangeUndiscounted?.start?.currency
                    }
                    currencySymbol="$"
                    price={
                      product?.pricing?.priceRangeUndiscounted?.start?.net
                        ?.amount
                    }
                    cuttedPrice={product?.pricing?.discount?.net?.amount}
                    ratings={product?.rating || 0}
                    navigate={product?.slug}
                    variantId={product?.variants?.[0]?.id || ""}
                  />
                );
              })}
            />
          </div>
        </>
      )}
    </div>
  );
};
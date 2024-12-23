"use client";
import React, { useState, useRef } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "@/data/Products";
import Carousel from "@/app/elements/Carousel";
import ZoomInSlideUp from "../Animated/ZoomInSlideUp";
import { useFetchProductsRecommendationQuery } from "../../../gql/graphql";
import { useUser } from "@/hooks/useUser";
import { useRecentlyViewedProductsQuery } from "../../../gql/graphql";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface RecentlyViewedProps {
  channel: string;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ channel }) => {
  const { user, authenticated } = useUser();
  const userId = user?.id || "";

  const { data, loading, error } = useRecentlyViewedProductsQuery({
    variables: {
      channel,
      userId,
    },
  });

  const products =
    data?.userProductHistory?.map((history) => {
      const product = history?.product;

      return {
        id: product?.id,
        name: product?.name,
        slug: product?.slug,
        image: product?.thumbnail?.url || "/placeholder.png",
        currency:
          product?.pricing?.priceRangeUndiscounted?.start?.currency || "KWD",
        price:
          product?.pricing?.priceRangeUndiscounted?.start?.net?.amount || 0,
        cuttedPrice:
          product?.pricing?.discount?.net?.amount ||
          product?.pricing?.priceRangeUndiscounted?.start?.net?.amount ||
          0,
        ratings: product?.rating || 0,
        variantId: product?.variants?.[0]?.id || "",
      };
    }) || [];

  return (
    <>
      {authenticated && (
        <div className="my-8 relative">
          <div className="flex flex-row justify-between items-center my-4">
            <h1 className="text-md md:text-lg font-semibold">
              Recently Viewed
            </h1>
            <p className="text-sm md:text-md font-semibold text-secondary underline">
              See all
            </p>
          </div>

          <div className="relative">
            {(products ?? []).length > 0 && (
              <Carousel
                slides={products.map((product, index) => (
                  <ProductCard
                    key={index}
                    id={product.id || ""}
                    name={product.name || "Unknown Product"}
                    image={product.image}
                    currency={product.currency}
                    currencySymbol="$"
                    price={product.price}
                    cuttedPrice={product.cuttedPrice}
                    ratings={product.ratings}
                    navigate={product.slug}
                    variantId={product.variantId}
                  />
                ))}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

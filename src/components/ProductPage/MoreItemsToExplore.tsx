"use client";
import React, { useState, useRef } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "@/data/Products";
import Carousel from "@/app/elements/Carousel";
import ZoomInSlideUp from "../Animated/ZoomInSlideUp";
import { useFetchProductsRecommendationQuery } from "../../../gql/graphql";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface MoreItemsToExploreProps {
  channel: string;
};

export const MoreItemsToExplore:React.FC<MoreItemsToExploreProps> = ({channel}) => {

  const { data, loading, error } = useFetchProductsRecommendationQuery({
    variables: {
      channel,
    },
  });

  const products = data?.products?.edges || [];
  return (
    <div className="my-8 relative">

      <div className="flex flex-row justify-between items-center my-4">
        <h1 className="text-md md:text-lg font-semibold">More Items to Explore</h1>
        <p className="text-sm md:text-md font-semibold text-secondary underline">
          See all
        </p>
      </div>

      <div className="relative">
      <Carousel
          slides={products.map(({ node }, index) => {
            // const slug = node.name.replace(/\s+/g, "-").toLowerCase();
            const productImage = node.media?.[0]?.url || "/placeholder.png";
            return (
              <ProductCard
                id={node.id}
                key={index}
                name={node.name}
                image={productImage}
                currency={node.pricing?.priceRangeUndiscounted?.start?.currency}
                currencySymbol="$"
                price={node.pricing?.priceRangeUndiscounted?.start?.net?.amount}
                cuttedPrice={node.pricing?.discount?.net?.amount}
                ratings={node.rating || 0}
                navigate={node.slug}
                variantId={node.variants?.[0]?.id || ""}
              />
            );
          })}
        />
      </div>

    </div>
  )
};
"use client";
import React, { useState, useRef } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "@/data/Products";
import MiniCarousel from "@/app/elements/MiniCarousel";
import ZoomInSlideUp from "../Animated/ZoomInSlideUp";
import { useFetchProductsQuery } from "../../../gql/graphql";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const PeopleWhoBoughtThis = () => {
  const { data, loading, error } = useFetchProductsQuery();

  const products = data?.products?.edges || [];
  return (
    <div className="my-8 hidden md:block">
      <div className="flex flex-row justify-between items-center my-4">
        <h1 className="text-md md:text-lg font-semibold">
          People Who Bought This
        </h1>
        <p className="text-sm md:text-md font-semibold text-secondary underline">
          See all
        </p>
      </div>

      <div className="">
        <MiniCarousel
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
              />
            );
          })}
        />
      </div>
    </div>
  );
};

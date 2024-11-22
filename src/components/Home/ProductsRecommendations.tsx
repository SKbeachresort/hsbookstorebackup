"use client";
import React, { useState, useRef } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "@/data/Products";
import Carousel from "@/elements/Carousel";
import ZoomInSlideUp from "../Animated/ZoomInSlideUp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const ProductsRecommendations = () => {

  return (
    <div className="my-8 relative">

      <div className="flex flex-row justify-between items-center my-4">
        <h1 className="text-md md:text-lg font-semibold">Recommended for you</h1>
        <p className="text-sm md:text-md font-semibold text-secondary underline">
          See all
        </p>
      </div>

      <div className="relative">
        <Carousel
          slides={products.map((product, index) => {
            const slug = product.name.replace(/\s+/g, "-").toLowerCase();
            return (
              <ProductCard
                key={index}
                id={product.id}
                name={product.name}
                image={product.image}
                currency={product.currency}
                currencySymbol="$"
                price={product.price}
                cuttedPrice={product.cuttedPrice}
                ratings={product.ratings}
                navigate={slug}
              />
            );
          })}
        />
      </div>

    </div>
  );
};
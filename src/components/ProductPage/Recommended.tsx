"use client";
import React, { useState, useRef } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "@/data/Products";
import MiniCarousel from "@/elements/MiniCarousel";
import ZoomInSlideUp from "../Animated/ZoomInSlideUp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const Recommended = () => {
  return (
    <div className="my-8 hidden md:block">

    <div className="flex flex-row justify-between items-center my-4">
      <h1 className="text-md md:text-lg font-semibold">Recommended</h1>
      <p className="text-sm md:text-md font-semibold text-secondary underline">
        See all
      </p>
    </div>

    <div className="">
      <MiniCarousel
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
  )
};
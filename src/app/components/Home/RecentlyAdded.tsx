"use client";
import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "@/app/data/Products";
import { Swiper, SwiperSlide } from "swiper/react";
import Carousel from "@/app/elements/Carousel";

export const RecentlyAdded = () => {
  return (
    <div className="my-10 relative">
      <div className="flex flex-row justify-between items-center my-4">
        <h1 className="text-md md:text-lg font-semibold">Recently Added</h1>
        <p className="text-sm md:textmd font-semibold text-secondary underline">
          See all
        </p>
      </div>

      <div className="relative">
        <Carousel
          slides={products.map((product, index) => {
            const slug = product.name.replace(/\s+/g, "-").toLowerCase();
            return (
              <ProductCard
                id={product.id}
                key={index}
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

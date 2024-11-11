"use client";
import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { products } from "@/app/data/Products";

export const ProductsRecommendations = () => {

  return (
    <div className="w-[90%] mx-auto my-[7vh] md:w-[75%]">
      
      <div className="flex flex-row justify-between items-center my-[2vh]">
        <h1 className="text-[2.6vh] font-medium">Recommended for you</h1>
        <p className="text-[2.3vh] font-semibold text-secondary underline">
          See all
        </p>
      </div>

      <div className="px-[2vh] gap-x-[1vh] gap-y-[2vh] flex flex-row items-center flex-wrap justify-between overflow-x-scroll">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            image={product.image}
            currency={product.currency}
            currencySymbol="$"
            price={product.price}
            cuttedPrice={product.cuttedPrice}
            ratings={product.ratings}
          />
        ))}
      </div>
    </div>
  );
};

"use client";
import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";

export const RecentlyAdded = () => {
  const products = [
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/book.png",
      currency: "KWD",
      price: 1.99,
      cuttedPrice: 2.5,
      ratings: 4,
    },
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/book2.png",
      currency: "KWD",
      price: 3.5,
      cuttedPrice: 4.0,
      ratings: 5,
    },
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/book3.png",
      currency: "KWD",
      price: 6.99,
      cuttedPrice: 8.0,
      ratings: 4.5,
    },
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/pen.png",
      currency: "KWD",
      price: 6.99,
      cuttedPrice: 8.0,
      ratings: 4.5,
    },
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/shirt.png",
      currency: "KWD",
      price: 6.99,
      cuttedPrice: 8.0,
      ratings: 4.5,
    },
    {
      name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders ...",
      image: "/products/stethoscope.png",
      currency: "KWD",
      price: 6.99,
      cuttedPrice: 8.0,
      ratings: 4.5,
    },
    
  ];

  return (
    <div className="w-[95%] mx-auto my-[7vh] md:w-[75%]">
      <div className="flex flex-row justify-between items-center my-[2vh]">
        <h1 className="text-[2.3vh] md:text-[2.6vh] font-medium">Recently Added</h1>
        <p className="text-[2vh] md:text-[2.3vh] font-semibold text-secondary underline">
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

"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/app/components/ProductCard/ProductCard";
import { products } from "@/app/data/Products";
import { capitalizeWords } from "@/app/utils/Capitalize";

const CategoryPage = () => {

  const { categoryslug } = useParams();

  const formattedSlug =
    typeof categoryslug === "string" ? capitalizeWords(categoryslug) : "";

  return (
    <>
      <div className="w-[100%] px-5 h-full">
        <h1 className="text-lg my-4 font-medium">
          Explore {formattedSlug}
        </h1>
        <div className="px-2 gap-x-4 md:gap-x-10 gap-y-10 flex flex-row items-center flex-wrap justify-between md:justify-center overflow-x-scroll">
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
    </>
  );
};

export default CategoryPage;
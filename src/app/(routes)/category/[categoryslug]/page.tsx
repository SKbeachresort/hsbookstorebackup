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
        <h1 className="text-lg my-4 font-medium">Explore {formattedSlug}</h1>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {products.map((product, index) => (
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
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;

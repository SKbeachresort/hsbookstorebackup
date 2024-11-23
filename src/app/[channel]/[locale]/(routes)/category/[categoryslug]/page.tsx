"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { products } from "@/data/Products";
import { capitalizeWords } from "@/utils/Capitalize";
import SortDropdown from "@/components/CategoryPage/SortDropdown";

const CategoryPage = () => {
  const { categoryslug } = useParams();

  const formattedSlug =
    typeof categoryslug === "string" ? capitalizeWords(categoryslug) : "";

  const handleSortSelect = (selectedOption: string) => {
    console.log("Selected sort option:", selectedOption);
  };
  
  return (
    <>
      <div className="w-[100%] px-5 pb-10 h-full">
        <div className="flex items-center justify-between my-5">
          <h1 className="text-lg font-medium ">Explore {formattedSlug}</h1>
          <SortDropdown onSelect={handleSortSelect} />
        </div>
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

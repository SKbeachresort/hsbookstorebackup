"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/app/components/ProductCard/ProductCard";
import { products } from "@/app/data/Products";
import { capitalizeWords } from "@/app/utils/Capitalize";
import SortDropdown from "@/app/components/CategoryPage/SortDropdown";

const SubCategoryProducts = () => {
  const { categoryslug, subcategoryslug } = useParams();

  const formattedCategorySlug =
    typeof categoryslug === "string" ? capitalizeWords(categoryslug) : "";

  const formattedSubCategorySlug =
    typeof subcategoryslug === "string" ? capitalizeWords(subcategoryslug) : "";

  const handleSortSelect = (selectedOption: string) => {
    console.log("Selected sort option:", selectedOption);
  };

  return (
    <div className="w-[100%] py-2 px-5 h-full">
      <div>
        <span className="text-md my-4 text-textgray">
          {formattedCategorySlug}/{formattedSubCategorySlug}
        </span>
      </div>

      <div className="">
        
        <div className="flex items-center justify-between my-5">
          <h1 className="text-lg font-medium ">
            Explore {formattedSubCategorySlug}
          </h1>
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
    </div>
  );
};

export default SubCategoryProducts;

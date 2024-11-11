"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/app/components/ProductCard/ProductCard";
import { products } from "@/app/data/Products";
import { capitalizeWords } from "@/app/utils/Capitalize";

const SubCategoryProducts = () => {
  const { categoryslug, subcategoryslug } = useParams();

  const formattedCategorySlug =
    typeof categoryslug === "string" ? capitalizeWords(categoryslug) : "";

  const formattedSubCategorySlug =
    typeof subcategoryslug === "string" ? capitalizeWords(subcategoryslug) : "";

  return (
    <div className="w-[100%] py-[2vh] px-[5vh] h-full">
      <div>
        <span className="text-[2vh] my-[3vh] text-textgray">
          {formattedCategorySlug}/{formattedSubCategorySlug}
        </span>
      </div>

      <div className="">
        <h1 className="text-[3vh] my-[2vh] font-medium">
          Explore {formattedSubCategorySlug}
        </h1>
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
    </div>
  );
};

export default SubCategoryProducts;
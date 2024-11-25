"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { products } from "@/data/Products";
import { capitalizeWords } from "@/utils/Capitalize";
import SortDropdown from "@/components/CategoryPage/SortDropdown";
import { useFetchProductsQuery } from "../../../../../../../../gql/graphql";

const SubCategoryProducts = () => {
  const { categoryslug, subcategoryslug } = useParams();

  const formattedCategorySlug =
    typeof categoryslug === "string" ? capitalizeWords(categoryslug) : "";

  const formattedSubCategorySlug =
    typeof subcategoryslug === "string" ? capitalizeWords(subcategoryslug) : "";

  const handleSortSelect = (selectedOption: string) => {
    console.log("Selected sort option:", selectedOption);
  };

  const { data, loading, error } = useFetchProductsQuery();

  const products = data?.products?.edges || [];

  return (
    <div className="w-[100%] py-2 px-5 pb-10 h-full">
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
          {products.map(({ node }, index) => {
            // const slug = node.name.replace(/\s+/g, "-").toLowerCase();
            const productImage = node.media?.[0]?.url || "/placeholder.png";
            return (
              <ProductCard
                id={node.id}
                key={index}
                name={node.name}
                image={productImage}
                currency={node.pricing?.priceRangeUndiscounted?.start?.currency}
                currencySymbol="$"
                price={node.pricing?.priceRangeUndiscounted?.start?.net?.amount}
                cuttedPrice={node.pricing?.discount?.net?.amount}
                ratings={node.rating || 0}
                navigate={node.slug}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryProducts;

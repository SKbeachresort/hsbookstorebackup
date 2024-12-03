"use server";
import React from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { capitalizeWords } from "@/utils/Capitalize";
// import SortDropdown from "@/components/CategoryPage/SortDropdown";
import { executeGraphQL } from "@/lib/graphql";
import { FetchAllProductsByCategorySlugDocument } from "../../../../../../../../gql/graphql-documents";

interface CategoryPageProps {
  params: {
    channel: string;
    locale: string;
    categoryslug: string;
    subcategoryslug: string;
  };
};

const SubCategoryProducts = async ({ params }: CategoryPageProps) => {
  const { channel, categoryslug, subcategoryslug } = await params;

  const formattedCategorySlug =
    typeof categoryslug === "string" ? capitalizeWords(categoryslug) : "";

  const formattedSubCategorySlug =
    typeof subcategoryslug === "string" ? capitalizeWords(subcategoryslug) : "";

  const handleSortSelect = (selectedOption: string) => {
    console.log("Selected sort option:", selectedOption);
  };

  const data = await executeGraphQL(FetchAllProductsByCategorySlugDocument, {
    variables: {
      channel: channel,
      slug: subcategoryslug,
      after: "",
    },
  });

  const products = data?.category?.products?.edges || [];
  console.log("Products in", subcategoryslug, products);

  if(products.length === 0) {
    return (
      <div className="my-6">
        <h1 className="text-md text-center">No Products Found</h1>
      </div>
    );
  };

  return (
    <div className="w-[100%] py-2 px-5 pb-10 h-full">
      <div>
        <span className="text-sm my-4 text-textgray">
          {formattedCategorySlug}/{formattedSubCategorySlug}
        </span>
      </div>

      <div className="">
        <div className="flex items-center justify-between my-3">
          <h1 className="text-md font-medium ">
            Explore {formattedSubCategorySlug}
          </h1>
          {/* <SortDropdown onSelect={handleSortSelect} /> */}
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {products.map(({ node }, index) => {
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
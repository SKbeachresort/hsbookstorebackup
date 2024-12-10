"use server";
import React from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { capitalizeWords } from "@/utils/Capitalize";
import { executeGraphQL } from "@/lib/graphql";
import { FetchProductListPaginatedBySlugDocument } from "../../../../../../../../gql/graphql-documents";
import Image from "next/image";
import slider3 from "../../../../../../../../public/slider3.png";
import { SubFeaturedCategories } from "@/components/CategoryPage/PageComponents/SubCategoriesFeatured";
import Pagination from "@/app/elements/Pagination";
import { BestSellers } from "@/components/CategoryPage/PageComponents/BestSellers";
import { RecentlyAdded } from "@/components/CategoryPage/PageComponents/RecentlyAdded";

const PRODUCTS_PER_PAGE = 50;

interface CategoryPageProps {
  params: {
    channel: string;
    locale: string;
    categoryslug: string;
    subcategoryslug: string;
  };
  searchParams: {
    page?: string;
    after?: string;
    before?: string;
  };
}

export default async function SubCategoryProducts({
  params: { categoryslug, subcategoryslug, channel, locale },
  searchParams,
}: CategoryPageProps) {
  const page = searchParams.page ?? "1";
  const after = searchParams.after ?? "";
  const before = searchParams.before ?? "";

  const path = `/category/${categoryslug}/${subcategoryslug}`;

  const formattedCategorySlug =
    typeof categoryslug === "string" ? capitalizeWords(categoryslug) : "";

  const formattedSubCategorySlug =
    typeof subcategoryslug === "string" ? capitalizeWords(subcategoryslug) : "";

  const handleSortSelect = (selectedOption: string) => {
    console.log("Selected sort option:", selectedOption);
  };

  const variables: any = {
    channel,
    slug: subcategoryslug,
  };

  if (before) {
    variables.last = PRODUCTS_PER_PAGE;
    variables.before = before;
  } else {
    variables.first = PRODUCTS_PER_PAGE;
    if (after) {
      variables.after = after;
    }
  }

  const data = await executeGraphQL(FetchProductListPaginatedBySlugDocument, {
    variables,
  });

  const products = data?.category?.products?.edges || [];
  const pageInfo = data?.category?.products?.pageInfo;
  const totalCount = data?.category?.products?.totalCount || 0;

  const currentPage = parseInt(page, 10);
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  const safeEndCursor = pageInfo?.endCursor || "";
  const safeStartCursor = pageInfo?.startCursor || "";

  if (products.length === 0) {
    return (
      <div className="my-6">
        <h1 className="text-md text-center">No Products Found</h1>
      </div>
    );
  }

  return (
    <div className="w-[100%] py-5 px-5 pb-10 h-full">
      <Image
        src={slider3}
        width={1000}
        height={10}
        alt="slider"
        className="w-full md:w-[80%] mx-auto"
      />

      <SubFeaturedCategories
        categoryslug={categoryslug}
        subcategoryslug={subcategoryslug}
        channel={channel}
        locale={locale}
      />

      <BestSellers
        slug={subcategoryslug}
        channel={channel}
        after=""
      />  

      <RecentlyAdded
        slug={subcategoryslug}
        channel={channel}
        after=""
      />

      <div className="">
        <div className="flex justify-center items-center my-3">
          <h1 className="text-lg my-3 text-center font-medium ">
            Explore {formattedSubCategorySlug}
          </h1>
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

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="my-6 mx-auto">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              path={path}
              safeEndCursor={safeEndCursor}
              safeStartCursor={safeStartCursor}
            />
          </div>
        )}
        
      </div>
    </div>
  );
}

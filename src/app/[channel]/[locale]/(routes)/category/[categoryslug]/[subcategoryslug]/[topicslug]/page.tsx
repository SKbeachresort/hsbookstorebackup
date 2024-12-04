"use server";
import React from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { executeGraphQL } from "@/lib/graphql";
import { FetchProductListPaginatedBySlugDocument } from "../../../../../../../../../gql/graphql-documents";
import { capitalizeWords } from "@/utils/Capitalize";
import Pagination from "@/app/elements/Pagination";

const PRODUCTS_PER_PAGE = 50;

interface CategoryPageProps {
  params: {
    channel: string;
    locale: string;
    categoryslug: string;
    subcategoryslug: string;
    topicslug: string;
  };
  searchParams: {
    page?: string;
    after?: string;
    before?: string;
  };
}

export default async function NestedSubCategory({
  params: { categoryslug, subcategoryslug, topicslug, channel, locale },
  searchParams,
}: CategoryPageProps) {
  const page = searchParams.page ?? "1";
  const after = searchParams.after ?? "";
  const before = searchParams.before ?? "";

  const path = `/category/${categoryslug}/${subcategoryslug}/${topicslug}`;

  const formattedCategorySlug =
    typeof categoryslug === "string" ? capitalizeWords(categoryslug) : "";

  const formattedSubCategorySlug =
    typeof subcategoryslug === "string" ? capitalizeWords(subcategoryslug) : "";

  const formattedTopicSlug =
    typeof topicslug === "string" ? capitalizeWords(topicslug) : "";

  const variables: any = {
    channel,
    slug: topicslug,
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
    <div className="w-[100%] py-2 px-5 h-full">
      <div>
        <span className="text-md my-4 text-textgray">
          {formattedCategorySlug}/{formattedSubCategorySlug}/
          {formattedTopicSlug}
        </span>
      </div>

      <div>
        <h1 className="text-xl my-4 font-medium">
          Explore {formattedTopicSlug}
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
  );
}

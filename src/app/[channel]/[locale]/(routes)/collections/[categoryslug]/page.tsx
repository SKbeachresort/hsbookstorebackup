"use server";
import React from "react";
import { FetchProductListPaginatedBySlugDocument } from "../../../../../../../gql/graphql-documents";
import { executeGraphQL } from "@/lib/graphql";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { capitalizeWords } from "@/utils/Capitalize";
import Pagination from "@/app/elements/Pagination";
import Link from "next/link";

const PRODUCTS_PER_PAGE = 50;

interface CollectionPageProps {
  params: {
    categoryslug: string;
    channel: string;
    locale: string;
  };
  searchParams: {
    page?: string;
    after?: string;
    before?: string;
  };
};

export default async function CollectionsPage({
  params: { categoryslug, channel, locale },
  searchParams,
}: CollectionPageProps) {
  const page = searchParams.page ?? "1";
  const after = searchParams.after ?? "";
  const before = searchParams.before ?? "";

  const variables: any = {
    channel,
    slug: categoryslug,
  };

  if (before) {
    variables.last = PRODUCTS_PER_PAGE;
    variables.before = before;
  } else {
    variables.first = PRODUCTS_PER_PAGE;
    if (after) {
      variables.after = after;
    }
  };

  const data = await executeGraphQL(FetchProductListPaginatedBySlugDocument, {
    variables,
  });

  const products = data?.category?.products?.edges || [];
  const pageInfo = data?.category?.products?.pageInfo;
  const totalCount = data?.category?.products?.totalCount || 0;

  const currentPage = parseInt(page, 10);
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);
  const formattedCategorySlug = capitalizeWords(categoryslug);

  const safeEndCursor = pageInfo?.endCursor || "";
  const safeStartCursor = pageInfo?.startCursor || "";

  return (
    <div className="w-[95%] xl:w-[75%] 3xl:w-full mx-auto sm:px-10 lg:px-12 my-10">
      <h1 className="text-lg font-semibold my-6 text-center">
        {formattedCategorySlug} Collections
      </h1>

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
      <div className="my-6 mx-auto">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          categoryslug={categoryslug}
          safeEndCursor={safeEndCursor}
          safeStartCursor={safeStartCursor}
        />
      </div>

    </div>
  );
}

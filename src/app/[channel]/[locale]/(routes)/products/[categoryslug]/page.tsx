"use client";
import React from "react";
import { FetchProductListPaginatedBySlugDocument } from "../../../../../../../gql/graphql-documents";
import { useFetchProductListPaginatedBySlugQuery } from "../../../../../../../gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { capitalizeWords } from "@/utils/Capitalize";
import Pagination from "@/app/elements/Pagination";
import Link from "next/link";
import Select from "react-select";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const PRODUCTS_PER_PAGE = 50;

const sortOptions = [
  { value: "NAME", label: "Name" },
  { value: "RANK", label: "Rank" },
  { value: "PRICE", label: "Price" },
  { value: "MINIMAL_PRICE", label: "Minimal Price" },
  { value: "LAST_MODIFIED", label: "Last Modified" },
  { value: "DATE", label: "Date" },
  { value: "TYPE", label: "Type" },
  { value: "PUBLISHED", label: "Published" },
  { value: "PUBLISHED_AT", label: "Published At" },
  { value: "LAST_MODIFIED_AT", label: "Last Modified At" },
  { value: "COLLECTION", label: "Collection" },
  { value: "CREATED_AT", label: "Created At" },
];

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
    sortby?: string;
  };
};

export default function CollectionsPage({
}: CollectionPageProps) {

  const { categoryslug, channel, locale } = useParams();
  const searchParams = useSearchParams();

  const router = useRouter();
  const page = searchParams.get("page") ?? "1";
  const after = searchParams.get("after") ?? "";
  const before = searchParams.get("before") ?? "";
  const sortByName = searchParams.get("sortby")?.toUpperCase() || "NAME";

  const variables: any = {
    channel,
    slug: categoryslug,
    field: sortByName,
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

  const {data, loading} = useFetchProductListPaginatedBySlugQuery({
    variables,
  });

  const products = data?.category?.products?.edges || [];
  const pageInfo = data?.category?.products?.pageInfo;
  const totalCount = data?.category?.products?.totalCount || 0;

  const currentPage = parseInt(page, 10);
  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);
  const formattedCategorySlug = capitalizeWords(categoryslug as string);

  const safeEndCursor = pageInfo?.endCursor || "";
  const safeStartCursor = pageInfo?.startCursor || "";

  const handleSortChange = (selectedOption: any) => {
    const selectedValue = selectedOption.value.toLowerCase();
    router.push(`/products/${categoryslug}?sortby=${selectedValue}`);
  };

  const defaultSortOption = sortOptions.find(
    (option) => option.value === sortByName
  );

  return (
    <div className="w-[95%] xl:w-[75%] 3xl:w-full mx-auto sm:px-10 lg:px-12 my-10">
      <div className="flex flex-row justify-between items-center my-10">
        <h1 className="text-lg font-semibold text-center">
          {formattedCategorySlug}
        </h1>

        <div className="z-50 flex justify-end mb-4">
          <Select
            options={sortOptions}
            defaultValue={defaultSortOption}
            onChange={handleSortChange}
            className="w-64"
          />
        </div>
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
              variantId={node.variants?.[0]?.id || ""}
            />
          );
        })}
      </div>

      {/* Pagination Section */}
      <div className="my-6 mx-auto">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          categoryslug={categoryslug as string}
          safeEndCursor={safeEndCursor}
          safeStartCursor={safeStartCursor}
          path={`${categoryslug}`}
          loading={loading}
        />
      </div>
    </div>
  );
}
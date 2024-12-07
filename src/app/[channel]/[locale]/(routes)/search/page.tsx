import React from "react";
import { SearchProductsQueryVariables } from "../../../../../../gql/graphql";
import { SearchProductsDocument } from "../../../../../../gql/graphql-documents";
import { executeGraphQL } from "@/lib/graphql";
import { ProductCard } from "@/components/ProductCard/ProductCard";

type Props = {
  params: {
    locale: string;
    channel: string;
  };
  searchParams: Record<
    "query" | "after" | "before" | "first" | "last" | "author",
    string | undefined
  >;
};

export default async function SearchPage({
  params: { locale, channel },
  searchParams,
}: Props) {
  const after =
    typeof searchParams.after === "string" ? searchParams.after : null;
  const before =
    typeof searchParams.before === "string" ? searchParams.before : null;
  const first =
    typeof searchParams.first === "string" ? searchParams.first : null;
  const last = typeof searchParams.last === "string" ? searchParams.last : null;

  const searchValue =
    typeof searchParams.query === "string" ? searchParams.query : null;
  const searchAuthor =
    typeof searchParams.author === "string" ? searchParams.author : null;

  const variables: SearchProductsQueryVariables = before
    ? {
        last: last ? parseInt(last) : 10,
        before: before,
        channel: channel,
        search: searchAuthor ? searchAuthor : undefined,
        where: searchValue
          ? {
              name: {
                oneOf: [searchValue],
              },
            }
          : undefined,
      }
    : {
        first: first ? parseInt(first) : 10,
        after: after,
        channel: channel,
        search: searchAuthor ? searchAuthor : undefined,
        where: searchValue
          ? {
              name: {
                oneOf: [searchValue],
              },
            }
          : undefined,
      };

  const { products } = await executeGraphQL(SearchProductsDocument, {
    variables: variables,
    revalidate: 60,
  });

  console.log("Search products", products);

  const query =
    searchValue && searchAuthor
      ? `${searchValue} ${searchAuthor}`
      : searchValue && !searchAuthor
      ? searchValue
      : !searchValue && searchAuthor
      ? searchAuthor
      : "";

  return (
    <div className="w-[95%] xl:w-[75%] 3xl:w-full mx-auto sm:px-10 lg:px-12 my-10">

      <h1 className="text-lg my-4 font-semibold">Search Results for {searchValue}</h1>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {products?.edges?.map(({ node }) => {
          return (
            <ProductCard
              id={node.id}
              name={node.name}
              image={node.thumbnail?.url || "/placeholder.png"}
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
  );
}

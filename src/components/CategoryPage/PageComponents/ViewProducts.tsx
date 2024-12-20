"use server";
import React from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { executeGraphQL } from "@/lib/graphql";
import { FetchAllProductsByCategorySlugDocument } from "../../../../gql/graphql-documents";
import Link from "next/link";
import { getRegionUrl } from "@/utils/regionUrl";

interface ViewProductsProps {
  channel: string;
  locale: string;
  slug: string;
  after: string;
};

export const ViewProducts: React.FC<ViewProductsProps> = async ({
  channel,
  locale,
  slug,
  after,
}) => {

  const data = await executeGraphQL(FetchAllProductsByCategorySlugDocument, {
    variables: {
      channel,
      slug,
      after,
    },
  });

  const products = data?.category?.products?.edges || [];
  const totalCount = data?.category?.products?.totalCount || 0;

  if (products.length === 0) {
    return (
      <div>
        <h1 className="text-md text-center my-4">No Products Found</h1>
      </div>
    );
  };

  return (
    <div className="my-10">
      <div className="flex flex-row justify-between items-center my-4">
        <h1 className="text-sm lg:text-md font-normal">
          Items 1-20 of {totalCount} results in {"  "}
          <span className="text-sm lg:text-md text-secondary underline font-bold">
            {data.category?.name}
          </span>
        </h1>

        <Link
          href={getRegionUrl(
            channel,
            locale,
            `products/${slug}`
          )}
        >
          <p className="text-sm md:textmd font-semibold text-secondary underline">
            See all
          </p>
        </Link>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {products.slice(0,20).map(({ node }, index) => {
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
              variantId={node.variants?.[0]?.id || ""}
            />
          );
        })}
      </div>

      <div className="flex mx-auto flex-col justify-center items-center my-6">
        <Link
          href={getRegionUrl(
            channel,
            locale,
            `products/${slug}`
          )}
        >
          <button className="text-sm w-fit text-center mx-auto text-textgray font-bold px-4 py-2 rounded-full border-2 border-borderColor">
            View all results
          </button>
        </Link>
      </div>
    </div>
  );
};

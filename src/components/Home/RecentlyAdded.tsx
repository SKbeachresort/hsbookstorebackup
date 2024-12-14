"use client";
import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import Carousel from "@/app/elements/Carousel";
import { useHomeRecentlyAddedQuery } from "../../../gql/graphql";
import { useRegionUrl } from "@/hooks/useRegionUrl";
import Link from "next/link";

interface RecentlyAddedProps {
  channel: string;
}

export const RecentlyAdded: React.FC<RecentlyAddedProps> = ({ channel }) => {
  const { data, loading, error } = useHomeRecentlyAddedQuery({
    variables: {
      channel,
    },
  });

  const products = data?.products?.edges || [];

  const { getRegionUrl } = useRegionUrl();

  return (
    <div className="my-10 relative">
      {products.length > 0 && (
        <>
          <div className="flex flex-row justify-between items-center my-4">
            <h1 className="text-md md:text-lg font-semibold">Recently Added</h1>

            <Link href={getRegionUrl(`/products/books?sortby=created_at`)}>
              <p className="text-sm md:textmd font-semibold text-secondary underline">
                See all
              </p>
            </Link>
          </div>

          <div className="relative">
            <Carousel
              slides={products.map(({ node }, index) => {
                // const slug = node.name.replace(/\s+/g, "-").toLowerCase();
                const productImage = node.media?.[0]?.url || "/placeholder.png";
                return (
                  <ProductCard
                    id={node.id}
                    key={index}
                    name={node.name}
                    image={productImage}
                    currency={
                      node.pricing?.priceRangeUndiscounted?.start?.currency
                    }
                    currencySymbol="$"
                    price={
                      node.pricing?.priceRangeUndiscounted?.start?.net?.amount
                    }
                    cuttedPrice={node.pricing?.discount?.net?.amount}
                    ratings={node.rating || 0}
                    navigate={node.slug}
                    variantId={node.variants?.[0]?.id || ""}
                  />
                );
              })}
            />
          </div>
        </>
      )}
    </div>
  );
};

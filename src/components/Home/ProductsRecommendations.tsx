"use client";
import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import Carousel from "@/app/elements/Carousel";
import { useHomeProductsRecommendationsQuery } from "../../../gql/graphql";
import { useRegionUrl } from "@/hooks/useRegionUrl";
import Link from "next/link";

interface ProductsRecommendationsProps {
  channel: string;
}

export const ProductsRecommendations: React.FC<
  ProductsRecommendationsProps
> = ({ channel }) => {
  
  const { data, loading, error } = useHomeProductsRecommendationsQuery({
    variables: {
      channel: channel,
      includeOrderData: true,
      includeSessionData: true,
      productId: "UHJvZHVjdDoyMDQyOA==",
    },
  });

  const products = data?.recommendations || [];

  const { getRegionUrl } = useRegionUrl();

  return (
    <div className="my-8 relative">
      {products.length > 0 && (
        <>
          <div className="flex flex-row justify-between items-center my-4">
            <h1 className="text-md md:text-lg font-semibold">
              Recommended for you
            </h1>
            <Link href={getRegionUrl(`/products/books`)}>
              <p className="text-sm md:textmd font-semibold text-secondary underline">
                See all
              </p>
            </Link>
          </div>

          <div className="relative">
            <Carousel
              slides={products.map((recommendations, index) => {
                const product = recommendations?.product;
                const productImage =
                  product?.media?.[0]?.url || "/placeholder.png";

                return (
                  <ProductCard
                    id={product?.id || ""}
                    key={index}
                    name={product?.name || ""}
                    image={productImage}
                    currency={
                      product?.pricing?.priceRangeUndiscounted?.start?.currency
                    }
                    currencySymbol="$"
                    price={
                      product?.pricing?.priceRangeUndiscounted?.start?.net
                        ?.amount
                    }
                    cuttedPrice={product?.pricing?.discount?.net?.amount}
                    ratings={product?.rating || 0}
                    navigate={product?.slug}
                    variantId={product?.variants?.[0]?.id || ""}
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

"use server";
import React from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import Carousel from "@/app/elements/Carousel";
import { FetchBestSellerProductsByCategoryDocument } from "../../../../gql/graphql-documents";
import { executeGraphQL } from "@/lib/graphql";

interface BestSellersProps {
  channel: string;
  slug: string;
  after: string;
};

export const  BestSellers: React.FC<BestSellersProps> = async({
  channel,
  slug,
  after,
}) => {

  const res = await executeGraphQL(FetchBestSellerProductsByCategoryDocument,{
    variables: {
      channel,
      slug,
      after,
    },
  });

  const products = res?.category?.products?.edges || [];

  return (
    <div className="">
      <div className="my-10 relative">
        <div className="flex flex-row justify-between items-center my-4">
          <h1 className="text-md md:text-lg font-semibold">Best Sellers</h1>
          <p className="text-sm md:textmd font-semibold text-secondary underline">
            See all
          </p>
        </div>

        <div className="relative">
          <Carousel
            slides={products.map(({ node }, index) => {
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
                />
              );
            })}
          />
        </div>
      </div>
    </div>
  );
};
"use client";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { FaHeart, FaRegHeart, FaCircle } from "react-icons/fa";
import Image from "next/image";
import { Product } from "@/types/product/product-types";
import { useNewReleaseQuery } from "../../../gql/graphql";
import Link from "next/link";
import { useRegionUrl } from "@/hooks/useRegionUrl";

interface NewReleaseSectionProps {
  channel: string;
  productsDetails: Product;
};

const NewReleaseSection: React.FC<NewReleaseSectionProps> = ({
  channel,
  productsDetails,
}) => {

  const { getRegionUrl } = useRegionUrl();
  const newRelaeaseSKU = productsDetails?.newReleaseSKU;
  console.log("New Release SKU", newRelaeaseSKU);

  const { data } = useNewReleaseQuery({
    variables: {
      channel: channel,
      sku: newRelaeaseSKU,
    },
  });

  // console.log("New Release Data", data);
  const newReleaseProductData = data?.productVariant;

  return (
    <>
      {newReleaseProductData && (
        <div className="my-10">
          <hr />
          <div className="flex flex-row gap-x-1 items-center mt-6">
            <div>
              <FaCircle
                color="#5CBD76"
                className="text-sm md:text-md text-success"
              />
            </div>
            <p className="text-sm md:text-md text-textgray">
              New Release Available (In Stock)
            </p>
          </div>

          <div className="flex flex-row gap-x-6 my-3">
            <div className="w-[35%] md:w-24">
              <Image
                src={newReleaseProductData?.product?.media?.[0]?.url || ""}
                width={100}
                height={100}
                className="md:w-full"
                alt={newReleaseProductData?.product?.name}
              />
            </div>
            <div className="w-[55%] md:w-auto">
              <p className="text-md text-textColor">
                {newReleaseProductData?.product?.name}
              </p>
              <div className="flex flex-row justify-start gap-x-4 my-1 md:my-2 items-center">
                <p className="text-md font-semibold">
                  {newReleaseProductData?.product?.pricing?.priceRangeUndiscounted?.start?.currency}{" "}
                  {newReleaseProductData?.product?.pricing?.priceRangeUndiscounted?.start?.net?.amount}
                </p>
              </div>

              <div>
                <Link
                  href={getRegionUrl(
                    `/product/${newReleaseProductData?.product?.slug}`
                  )}
                >
                  <button className="bg-secondary rounded-full text-sm md:text-md font-semibold text-white px-4 py-1">
                    View
                  </button>
                </Link>
              </div>

              <div className="flex items-center">
                <StarRatings
                  rating={newReleaseProductData?.product?.rating || 0}
                  starRatedColor="#FFCE60"
                  numberOfStars={5}
                  starDimension="16px"
                  starSpacing="1px"
                  name="product-rating"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewReleaseSection;
"use client";
import React from "react";
import StarRatings from "react-star-ratings";
import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "../Animated/AnimateOnScroll";

interface ProductCardProps {
  name: string;
  image: string;
  currency: string;
  currencySymbol: string;
  price: number;
  cuttedPrice: number;
  ratings: number;
  navigate?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  currency,
  currencySymbol,
  price,
  cuttedPrice,
  ratings,
  navigate,
}) => {
  return (
    <Link href={`/product/${navigate}`}>
      <div className="relative w-32 md:w-36">
        <AnimateOnScroll animationType="fade-up">
          <Image
            src={image}
            width={120}
            height={170}
            className="object-cover max-h-[170px] 3xl:w-[230px] 3x:h-[270px] w-full"
            layout="responsive"
            objectFit="cover"
            alt={name}
          />
        </AnimateOnScroll>

        <p className="text-xs mt-3 md:mt-1 text-textColor">{name}</p>
        <div className="flex flex-row justify-between mt-1 md:my-0 items-center">
          <p className="text-md font-semibold">
            {currency} {price.toFixed(3)}
          </p>
          <p className="line-through text-textgray text-xs font-medium">
            {currencySymbol} {cuttedPrice.toFixed(3)}
          </p>
        </div>
        <div>
          <button className="absolute top-[53%] -left-[5%] md:-left-[10%] z-40 bg-secondary rounded-full text-sm md:text-md font-semibold text-white px-2 py-1">
            + Add
          </button>
        </div>
        <div className="flex items-center">
          <StarRatings
            rating={ratings}
            starRatedColor="#FFCE60"
            numberOfStars={5}
            starDimension="16px"
            starSpacing="1px"
            name="product-rating"
          />
        </div>
      </div>
    </Link>
  );
};

"use client";
import React from "react";
import StarRatings from "react-star-ratings";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  image: string;
  currency: string;
  currencySymbol: string;
  price: number;
  cuttedPrice: number;
  ratings: number;
  navigate?:string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  currency,
  currencySymbol,
  price,
  cuttedPrice,
  ratings,
  navigate
}) => {
  return (
    <Link href={`/product/${navigate}`}>
      <div className="relative w-[40%] md:w-[16vh]">
        <img src={image} className="w-full md:h-[20vh]" alt={name} />
        <p className="text-[1.9vh] mt-[3vh] md:mt-[1vh] text-textColor">{name}</p>
        <div className="flex flex-row justify-between mt-[0.5vh] md:my-[0vh] items-center">
          <p className="text-[2vh] font-semibold">
            {currency} {price.toFixed(3)}
          </p>
          <p className="line-through text-textgray text-[1.4vh] font-medium">
            {currencySymbol} {cuttedPrice.toFixed(3)}
          </p>
        </div>
        <div>
          <button className="absolute top-[53%] -left-[5%] md:-left-[10%] z-40 bg-secondary rounded-full text-[2vh] md:text-[2.2vh] font-semibold text-white px-[2vh] py-[0.5vh]">+ Add</button>
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
"use client";
import React from "react";
import StarRatings from "react-star-ratings";

interface ProductCardProps {
  name: string;
  image: string;
  currency: string;
  currencySymbol: string;
  price: number;
  cuttedPrice: number;
  ratings: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  currency,
  currencySymbol,
  price,
  cuttedPrice,
  ratings,
}) => {
  return (
    <div className="relative w-[45%] md:w-[20vh]">
      <img src={image} className=" w-full h-[25vh] bg-gray-100" alt={name} />
      <p className="text-[1.8vh] md:text-[2vh] mt-[3vh] text-textColor">{name}</p>
      <div className="flex flex-row justify-between mt-[0.5vh] md:my-[0vh] items-center">
        <p className="text-[1.8vh] md:text-[2.3vh] font-semibold">
          {currency} {price.toFixed(3)}
        </p>
        <p className="line-through text-textgray text-[1.5vh] md:text-[1.8vh] font-medium">
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
  );
};

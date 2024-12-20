"use client";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import AnimateOnScroll from "../Animated/AnimateOnScroll";
import { useCart } from "@/context/CartContext";
import { FaPlus, FaTrashAlt, FaMinus } from "react-icons/fa";
import { useRegionUrl } from "@/hooks/useRegionUrl";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  currency?: string;
  currencySymbol: string;
  price?: number;
  cuttedPrice?: number;
  ratings?: number;
  navigate?: string;
  variantId: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  currency,
  currencySymbol,
  price,
  cuttedPrice,
  ratings,
  navigate,
  variantId,
}) => {
  const { getRegionUrl } = useRegionUrl();

  const {
    addToCart,
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCart();

  const [isInCart, setIsInCart] = useState(
    cartItems.some((item) => item.id === id)
  );

  const productInCart = cartItems.find((item) => item.id === id);
  const quantity = productInCart ? productInCart.quantity : 0;

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      currency,
      mainImage: image,
      quantity: 1,
      variantId,
    });
    setIsInCart(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
    setIsInCart(false);
  };

  const handleIncrement = () => {
    incrementQuantity(id);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      handleRemoveFromCart();
    } else {
      decrementQuantity(id);
    }
  };

  return (
    <div className="relative w-32 md:w-28 lg:w-[6.5rem] xl:w-32 mx-4">
      <AnimateOnScroll animationType="fade-up">
        <Link href={getRegionUrl(`product/${navigate}`)}>
          <div>
            <Image
              src={image}
              width={120}
              height={170}
              className="object-fill aspect-[3/4] resize lg:max-h-[135px] xl:max-h-[170px] 3xl:w-[230px] 3x:h-[270px] w-full hover:scale-110 transition-all duration-300"
              
              alt={name}
            />
          </div>
        </Link>
      </AnimateOnScroll>

      <p className="text-[0.6rem] lg:text-xs mt-3 md:mt-2 text-textColor">
        {name.length > 30 ? name.slice(0, 30) + "..." : name}
      </p>

      <div className="flex flex-row justify-between mt-1 md:my-0 items-center">
        <p className="text-xs xl:text-sm font-semibold">
          {currency} {(price ?? 0).toFixed(3)}
        </p>
        <p className="line-through text-textgray text-[0.5rem] lg:text-[0.6rem] font-normal">
          {currencySymbol} {(cuttedPrice ?? 0).toFixed(3)}
        </p>
      </div>

      <div>
        {isInCart ? (
          <div className="absolute top-[48%] xl:top-[53%] -left-[2%] xl:-left-[10%] z-40 bg-secondary rounded-full text-xs xl:text-sm font-semibold text-white py-1 px-3 xl:px-4 xl:py-2">
            <div className="flex items-center justify-center space-x-2">
              {quantity === 1 ? (
                <FaTrashAlt
                  className="cursor-pointer text-xs"
                  onClick={handleRemoveFromCart}
                />
              ) : (
                <FaMinus
                  className="cursor-pointer text-xs"
                  onClick={handleDecrement}
                />
              )}
              <span className="text-xs">{quantity}</span>
              <FaPlus
                className="cursor-pointer text-xs"
                onClick={handleIncrement}
              />
            </div>
          </div>
        ) : (
          <button
            className="absolute top-[48%] xl:top-[53%] -left-[5%] xl:-left-[10%] z-40 bg-secondary rounded-full text-xs font-semibold text-white py-1 px-3 xl:px-4 xl:py-2"
            onClick={handleAddToCart}
          >
            + Add
          </button>
        )}
      </div>

      <div className="flex items-center -mt-1">
        <StarRatings
          rating={ratings || 0}
          starRatedColor="#FFCE60"
          numberOfStars={5}
          starDimension="12px"
          starSpacing="0.5px"
          name="product-rating"
        />
      </div>
    </div>
  );
};
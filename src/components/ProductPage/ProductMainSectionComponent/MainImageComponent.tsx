"use client";
import React, { useState, useEffect } from "react";
import { Product, VariantFormat } from "@/types/product/product-types";
import { useAddProductToWishlistMutation } from "../../../../gql/graphql";
import { useUser } from "@/hooks/useUser";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import Magnifier from "react-magnifier";
import toast from "react-hot-toast";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface MainImageComponentProps {
  productsDetails: Product;
  selectedVariant: Product | null;
}

const MainImageComponent: React.FC<MainImageComponentProps> = ({
  selectedVariant,
  productsDetails,
}) => {
  const variants = productsDetails.variantObj;

  const [selectImage, setSelectImage] = useState<string>(
    productsDetails.mainImage
  );

  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (selectedVariant?.mainImage) {
      setSelectImage(selectedVariant.mainImage);
    }
  }, [selectedVariant]);

  const { user } = useUser();
  const [isFav, setIsFav] = useState<boolean>(false);
  const userId = user?.id;

  const [addProductToWishlist] = useAddProductToWishlistMutation();

  const toggleFav = async () => {
    if (!userId) {
      toast.error("Please login to add product to wishlist");
      return;
    }

    try {
      const action = isFav ? "delete" : "add";
      const response = await addProductToWishlist({
        variables: {
          productId: productsDetails.id,
          userId: userId as string,
          action,
        },
      });
      if (response?.data?.wishlistAdd?.success) {
        setIsFav(!isFav);
        if (action === "add") {
          toast.success("Product added to wishlist!");
        } else if (action === "delete") {
          toast.success("Product removed from wishlist!");
        }
      } else {
        toast.error(`${response?.data?.wishlistAdd?.message}`);
      }
    } catch (error) {
      console.log("Error in adding product to wishlist", error);
    }
  };

  return (
    <div className="flex p-2 w-full flex-col-reverse md:flex-row justify-between md:w-[60%] gap-2">
      <div className="flex flex-row my-3 p-2 md:my-0 md:flex-col gap-4 w-full md:w-[20%]">
        {selectedVariant?.subImage.map((image, index) => (
          <Image
            key={index}
            src={image}
            width={90}
            height={90}
            alt={`Product sub-image ${index + 1}`}
            className="cursor-pointer shadow-md shadow-slate-100"
            onClick={() => setSelectImage(image)}
            onMouseEnter={() => setSelectImage(image)}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-[100%] md:w-[80%] p-2 flex flex-col items-end">
        {isZoomed ? (
          <Magnifier
            src={selectImage}
            width={390}
            zoomFactor={2}
            mgWidth={150}
            mgHeight={150}
            mgBorderWidth={2}
            mgShape="square"
            mgShowOverflow={false}
            className="w-full md:w-[70%] md:mr-10"
          />
        ) : (
          <Image
            src={selectImage}
            width={500}
            height={700}
            alt="Product Image"
            className="w-full md:w-[90%] h-full lg:w-[70%] md:mr-10"
          />
        )}

        {/* Heart Icon */}
        <div className="absolute z-40 top-0 -right-4">
          <div className=" bg-white border-[1px] border-disableGray rounded-full p-2 shadow-lg">
            {isFav ? (
              <FaHeart
                className="cursor-pointer text-secondary text-2xl"
                onClick={toggleFav}
              />
            ) : (
              <FaRegHeart
                className="cursor-pointer text-secondary text-2xl"
                onClick={toggleFav}
              />
            )}
          </div>

          <div
            className={`${
              isZoomed ? "bg-secondary" : "bg-white"
            } border-[1px] border-disableGray rounded-full my-2 p-2 shadow-lg`}
          >
            <HiMagnifyingGlassPlus
              className={`cursor-pointer ${
                isZoomed ? "text-white" : "text-secondary"
              } text-2xl`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainImageComponent;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import ProductMainSection from "@/components/ProductPage/ProductMainSection";
import NewReleaseSection from "@/components/ProductPage/NewReleaseSection";
import AdditionalContents from "@/components/ProductPage/AdditionalContents";
import SavingsPackage from "@/components/ProductPage/SavingsPackage";
import CustomerReviewsRatings from "@/components/ProductPage/CustomerReviewsRatings";
import AddToCartWidjet from "@/components/ProductPage/AddToCartWidjet";
import { BestSellers } from "@/components/ProductPage/BestSellers";
import { RecentlyViewed } from "@/components/ProductPage/RecentlyViewed";
import { MoreItemsToExplore } from "@/components/ProductPage/MoreItemsToExplore";
import { PeopleWhoBoughtThis } from "@/components/ProductPage/PeopleWhoBoughtThis";
import { Recommended } from "@/components/ProductPage/Recommended";
import AnimateOnScroll from "@/components/Animated/AnimateOnScroll";
import { useProductBySlugQuery } from "../../../../../../../gql/graphql";
import BackDropLoader from "@/app/elements/BackdropLoader";

const ProductDetailPage = () => {
  const { slug, channel } = useParams();

  const {
    addToCart,
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCart();

  const [isFav, setIsFav] = useState(false);

  const [showAddToCartWidget, setShowAddToCartWidget] = useState(false);
  const subsectionRef = useRef<HTMLDivElement | null>(null);

  const { data, loading, error } = useProductBySlugQuery({
    variables: {
      channel: (channel as string) || "default-channel",
      slug: slug as string,
    },
  });

  console.log("Fetched Data", data);

  const productsDetails = {
    id: data?.product?.id || data?.product?.variants?.[0]?.id || "",
    name: data?.product?.name || data?.product?.variants?.[0]?.name || "N/A",
    mainImage:
      data?.product?.media?.[0]?.url ||
      data?.product?.variants?.[0]?.media?.[0]?.url ||
      "/placeholder-image.png",
    subImage:
      data?.product?.media?.map((media) => media.url) ||
      data?.product?.variants?.[0]?.media?.map((media) => media.url) ||
      [],
    Author:
      data?.product?.attributes.find(
        (attr) => attr.attribute.name === "Authors"
      )?.values[0]?.name || "Unknown Author",
    currency:
      data?.product?.pricing?.priceRangeUndiscounted?.start?.currency || "KWD",
    currencySymbol: "$",
    available: data?.product?.isAvailableForPurchase ?? true,
    price:
      data?.product?.pricing?.priceRangeUndiscounted?.start?.net?.amount ?? 0,
    cuttedPrice: data?.product?.pricing?.discount?.net?.amount ?? 0,
    ratings: data?.product?.rating ?? 0,
    description: data?.product?.seoDescription || "N/A",
    ISBN_NO: data?.product?.variants?.[0]?.sku || "N/A",
    Series: "N/A",
    Cover:
      data?.product?.variants?.[0]?.attributes.find(
        (attr) => attr.attribute.name === "Cover"
      )?.values[0]?.name || "N/A",
    Publisher:
      data?.product?.attributes.find((attr) => attr.attribute.name === "Pub")
        ?.values[0]?.name || "Unknown Publisher",
    PublicationDate:
      data?.product?.attributes.find(
        (attr) => attr.attribute.name === "Pub Date"
      )?.values[0]?.name || "N/A",
    Pages:
      Number(
        data?.product?.attributes.find(
          (attr) => attr.attribute.name === "Pages"
        )?.values[0]?.name
      ) || 0,
    Weight: `${data?.product?.weight?.value || 0} ${
      data?.product?.weight?.unit || ""
    }`.trim(),
    VariantType: data?.product?.productType?.name || "N/A",
    variantId: data?.product?.variants?.[0]?.id || "",
    variantObj: data?.product?.variants || [],
    variantType: data?.product?.productType?.name || "N/A",
  };

  const VariantDefault = [
    {
      label:
        data?.product?.variants?.[0]?.attributes.find(
          (attr) => attr.attribute.name === "Cover"
        )?.values[0]?.name || "N/A",
      price:
        data?.product?.pricing?.priceRangeUndiscounted?.start?.net?.amount ?? 0,
      currency: "KWD",
    },
  ];

  const toggleFav = () => {
    setIsFav(!isFav);
  };

  const cartItem = cartItems.find((item) => item.id === productsDetails.id);

  const handleAddToCart = () => {
    addToCart({ ...productsDetails, quantity: 1 });
    toast.success("Product added to cart");
  };

  const handleDecrement = () => {
    decrementQuantity(productsDetails.id);
    if (cartItem && cartItem.quantity === 1) {
      toast.error("Product removed from cart");
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(productsDetails.id);
    toast.error("Product removed from cart");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (subsectionRef.current) {
        const rect = subsectionRef.current.getBoundingClientRect();
        setShowAddToCartWidget(rect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return <BackDropLoader open={loading} />;
  };

  return (
    <div className="w-[95%] mx-auto xl:w-[80%] p-2 py-5">
      {/* Main Section  */}
      <ProductMainSection
        productsDetails={productsDetails}
        channel={channel as string}
        cartItem={cartItem}
        handleAddToCart={handleAddToCart}
        handleDecrement={handleDecrement}
        incrementQuantity={incrementQuantity}
        removeFromCart={removeFromCart}
        VariantDefault={VariantDefault}
      />

      {/* Sub Section */}
      <div
        ref={subsectionRef}
        className="md:relative flex flex-row justify-between my-3"
      >
        <div className="md:w-[63%] ">
          {/* New Release Section */}
          <NewReleaseSection productsDetails={productsDetails} />

          {/* Product Details */}
          <AdditionalContents productsDetails={productsDetails} />

          {/* Saving Packages */}
          {/* <SavingsPackage /> */}

          {/* People who bought this */}
          <PeopleWhoBoughtThis
            channel={channel as string}
            id={productsDetails.id}
          />

          {/* Recommended */}
          <Recommended channel={channel as string} id={productsDetails.id} />

          {/* Customer Reviews & Ratings */}
          {/* <CustomerReviewsRatings /> */}
        </div>

        <div className="h-auto w-[33%] hidden md:block">
          {/* Add to Cart Widget Container */}
          <div className="sticky top-10 z-30 py-10">
            <AnimateOnScroll animationType="zoom-in-up">
              <AddToCartWidjet
                productsDetails={productsDetails}
                cartItem={cartItem}
                handleAddToCart={handleAddToCart}
                handleDecrement={handleDecrement}
                incrementQuantity={incrementQuantity}
                VariantDefault={VariantDefault}
              />
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      <div>
        {/* Best Sellers */}
        <BestSellers channel={channel as string} />

        {/* Recently Viewed */}
        {/* <RecentlyViewed channel={channel as string}/> */}

        {/* More Items to Explore */}
        <MoreItemsToExplore channel={channel as string} />
      </div>
    </div>
  );
};

export default ProductDetailPage;

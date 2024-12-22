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
  const { slug, channel, locale } = useParams();

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
  const mainSectionRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const cartWidgetRef = useRef(null);

  const { data, loading, error } = useProductBySlugQuery({
    variables: {
      channel: channel as string,
      slug: slug as string,
    },
  });

  // console.log("Fetched Data", data);

  const productsDetails = {
    id: data?.product?.id || data?.product?.variants?.[0]?.id || "",
    name: data?.product?.name || data?.product?.variants?.[0]?.name,
    mainImage:
      data?.product?.media?.[0]?.url ||
      data?.product?.variants?.[0]?.media?.[0]?.url ||
      "/placeholder.jpg",
    subImage:
      data?.product?.media?.map((media) => media.url) ||
      data?.product?.variants?.[0]?.media?.map((media) => media.url) ||
      [],
    Author: data?.product?.attributes.find(
      (attr) => attr.attribute.name === "Authors"
    )?.values[0]?.name,
    currency: data?.product?.pricing?.priceRangeUndiscounted?.start?.currency,
    currencySymbol: "$",
    available: data?.product?.isAvailableForPurchase ?? true,
    price:
      data?.product?.pricing?.priceRangeUndiscounted?.start?.net?.amount ?? 0,
    cuttedPrice: data?.product?.pricing?.discount?.net?.amount ?? 0,
    ratings: data?.product?.rating ?? 0,
    description: data?.product?.description,
    ISBN_NO: data?.product?.variants?.[0]?.sku,
    Series: data?.product?.attributes.find(
      (attr) => attr.attribute.slug === "book-series"
    )?.values[0]?.name,
    Cover: data?.product?.variants?.[0]?.attributes.find(
      (attr) => attr.attribute.name === "Cover"
    )?.values[0]?.name,
    Publisher: data?.product?.attributes.find(
      (attr) => attr.attribute.name === "Pub"
    )?.values[0]?.name,
    PublicationDate: data?.product?.attributes.find(
      (attr) => attr.attribute.name === "Pub Date"
    )?.values[0]?.name,
    Pages: Number(
      data?.product?.attributes.find((attr) => attr.attribute.name === "Pages")
        ?.values[0]?.name
    ),
    Weight:
      `${data?.product?.weight?.value} ${data?.product?.weight?.unit}`.trim(),
    VariantType: data?.product?.productType?.name,
    variantId: data?.product?.variants?.[0]?.id,
    variantObj: data?.product?.variants,
    variantType: data?.product?.productType?.name,
    newReleaseSKU: data?.product?.attributes.find(
      (attr) => attr.attribute.slug === "new-release-sku"
    )?.values[0]?.name,
    tableOfContents: data?.product?.attributes.find(
      (attr) => attr.attribute.slug === "table-of-contents"
    )?.values[0]?.richText,
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
      if (mainSectionRef.current) {
        const mainRect = mainSectionRef.current.getBoundingClientRect();
        const shouldBeSticky = mainRect.bottom <= 0;
        setIsSticky(shouldBeSticky);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return <BackDropLoader open={loading} />;
  }

  return (
    <div className="w-[95%] mx-auto xl:w-[80%] p-2 py-5">
      <div ref={mainSectionRef}>
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
      </div>

      {/* Sub Section */}
      <div
        ref={subsectionRef}
        className="relative md:relative flex flex-row justify-between my-3"
      >
        <div className="w-full md:w-[63%] ">
          {/* New Release Section */}
          <NewReleaseSection
            productsDetails={productsDetails}
            channel={channel as string}
          />

          {/* Product Details */}
          <AdditionalContents productsDetails={productsDetails} />

          {/* Saving Packages */}
          <SavingsPackage productId={productsDetails.id} channel={channel as string}/>

          {/* People who bought this */}
          <PeopleWhoBoughtThis
            channel={channel as string}
            id={productsDetails.id}
          />

          {/* Recommended */}
          <Recommended channel={channel as string} id={productsDetails.id} />

          {/* Customer Reviews & Ratings */}
          <CustomerReviewsRatings
            productId={productsDetails.id}
            channel={channel as string}
            locale={locale as string}
          />
        </div>

        <div
          ref={cartWidgetRef}
          className={`hidden md:block w-[33%] ${
            isSticky ? "md:fixed md:right-[5%] md:top-4" : "md:relative"
          }`}
          style={{
            transition: "all 0.3s ease-in-out",
          }}
        >
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

      <div className="">
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
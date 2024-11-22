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

const bookFormats = [
  { label: "Hardcover", price: 3990, currency: "KWD" },
  { label: "Paperback", price: 3990, currency: "KWD" },
  { label: "EBook", price: 3990, currency: "KWD" },
  { label: "Audiobook", price: 3990, currency: "KWD" },
];

const productsDetails = {
  id: 1,
  name: "Lean Six Sigma For Leaders: A Practical Guide For Leaders",
  Author: "Simon Sinek",
  mainImage: "/products/book.png",
  subImage: [
    "/products/book.png",
    "/products/book2.png",
    "/products/book3.png",
  ],
  available: true,
  currency: "KWD",
  price: 6.99,
  cuttedPrice: 8.0,
  currencySymbol: "$",
  ratings: 4.5,
  description:
    "The inspirational bestseller that ignited a movement and asked us to find our WHY Discover the book that is captivating millions on TikTok and that served as the basis for one of the most popular TED Talks of all time--with more than 56 million views and counting. Over a decade ago, Simon Sinek started a movement that inspired millions to demand purpose at work, to ask what was the WHY of their organization. Since then, millions have been touched by the power of his ideas, and these ideas remain as relevant and timely as ever.",
  ISBN_NO: "9781119374749",
  Series: "Book Series Name",
  Publisher: "Wiley",
  PublicationDate: "June, 2018",
  Cover: "Hardcover",
  Pages: 320,
  Weight: "0.544 kg",
};

const ProductDetailPage = () => {
  
  const { productslug } = useParams();
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

  return (
    <div className="w-[95%] mx-auto xl:w-[80%] p-2 py-5">
      {/* Main Section  */}
      <ProductMainSection
        productsDetails={productsDetails}
        isFav={isFav}
        toggleFav={toggleFav}
        cartItem={cartItem}
        handleAddToCart={handleAddToCart}
        handleDecrement={handleDecrement}
        incrementQuantity={incrementQuantity}
        removeFromCart={removeFromCart}
        bookFormats={bookFormats}
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
          <SavingsPackage />

          {/* People who bought this */}
          <PeopleWhoBoughtThis />

          {/* Recommended */}
          <Recommended />

          {/* Customer Reviews & Ratings */}
          <CustomerReviewsRatings />
        </div>
        <div className="h-auto w-[33%] hidden md:block">
          {/* Add to Cart Widget */}
          <div className="sticky top-10 z-30 py-10">
            {showAddToCartWidget && (
              <AnimateOnScroll animationType="zoom-in-up">
                <AddToCartWidjet
                  productsDetails={productsDetails}
                  cartItem={cartItem}
                  handleAddToCart={handleAddToCart}
                  handleDecrement={handleDecrement}
                  incrementQuantity={incrementQuantity}
                  bookFormats={bookFormats}
                />
              </AnimateOnScroll>
            )}
          </div>
        </div>
      </div>

      <div>
        {/* Best Sellers */}
        <BestSellers />

        {/* Recently Viewed */}
        <RecentlyViewed />

        {/* More Items to Explore */}
        <MoreItemsToExplore />
      </div>
    </div>
  );
};

export default ProductDetailPage;

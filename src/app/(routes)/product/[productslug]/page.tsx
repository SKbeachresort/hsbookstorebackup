"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import toast from "react-hot-toast";
import ProductMainSection from "@/app/components/ProductPage/ProductMainSection";
import NewReleaseSection from "@/app/components/ProductPage/NewReleaseSection";
import AdditionalContents from "@/app/components/ProductPage/AdditionalContents";
import SavingsPackage from "@/app/components/ProductPage/SavingsPackage";
import CustomerReviewsRatings from "@/app/components/ProductPage/CustomerReviewsRatings";

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
  const { addToCart, cartItems, incrementQuantity, decrementQuantity } =
    useCart();

  const [isFav, setIsFav] = useState(false);
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
        bookFormats={bookFormats}
      />

      {/* New Release Section */}
      <NewReleaseSection productsDetails={productsDetails} />

      {/* Product Details */}
      <AdditionalContents productsDetails={productsDetails} />

      {/* Saving Packages */}
      <SavingsPackage/>

      {/* Customer Reviews & Ratings */}
      <CustomerReviewsRatings />
    </div>
  );
};

export default ProductDetailPage;

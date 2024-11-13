"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { FaCircle } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import toast from "react-hot-toast";
import Image from "next/image";

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
  ISBN_NO: 9781119374749,
  Series: "Book Series Name",
  Publisher: "Wiley",
  PublicationDate: "June, 2018",
  Cover: "Hardcover",
  Pages: 320,
  Weight: "0.544 kg",
};

const ProductDetailPage = () => {
  const { addToCart, cartItems, incrementQuantity, decrementQuantity } =
    useCart();
  const { productslug } = useParams();

  const [selectedFormat, setSelectedFormat] = useState(bookFormats[0].label);

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
    <div className="p-2 w-[95%] h-auto mx-auto">
      {/* Main Section  */}
      <div className="flex flex-col md:flex-row gap-x-2 justify-start">
        <div className="flex md:w-[50%] lg:w-[45%] p-2 flex-col-reverse md:flex-row gap-x-2">
          {/* Sub Images */}
          <div className="flex flex-row my-3 md:my-0 md:flex-col gap-4 w-[20%]">
            {productsDetails.subImage.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={100}
                height={100}
                alt="Product Image"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full">
            <Image 
              src="/products/book.png"
              width={400}
              height={400}
              alt="Product Image" 
              // className="w-full" 
            />
            {isFav ? (
              <>
                <FaHeart
                  className="absolute cursor-pointer top-0 -right-3 md:-right-6 text-secondary text-xl"
                  onClick={toggleFav}
                />
              </>
            ) : (
              <>
                <FaRegHeart
                  className="absolute cursor-pointer top-0 -right-3 md:-right-6 text-secondary text-xl"
                  onClick={toggleFav}
                />
              </>
            )}
          </div>
        </div>

        <div className="md:w-[47%] lg:w-[55%] p-1 md:p-2 3xl:mt-10">
          <span className="bg-[#69BBE940] mb-2 font-normal text-primary w-fit text-xs md:text-sm p-1">
            Best Seller
          </span>

          {/* Title */}
          <h1 className="text-xl md:text-2xl my-1 font-medium">
            {productsDetails.name}
          </h1>

          {/* Author Name */}
          <p className="text-xs md:text-sm text-textgray">
            by <span className="underline">{productsDetails.Author}</span>
          </p>

          {/* Reviews */}
          <div className="flex flex-row items-center gap-x-1">
            <StarRatings
              rating={3}
              starRatedColor="#FFCE60"
              numberOfStars={5}
              starDimension="16px"
              starSpacing="1px"
              name="product-rating"
            />
            <p className="text-xs md:text-sm mt-1 text-textgray">
              195 reviews
            </p>
          </div>

          <p className="text-sm md:text-md my-1 text-textgray">
            Ships from and sold by hsbookstore.com
          </p>

          {/* Price Section */}
          <div>
            <div className="flex flex-row gap-x-2 mt-2">
              <p className="text-xl md:text-2xl font-semibold">
                {productsDetails.currency} {productsDetails.price.toFixed(3)}
              </p>
              <p className="line-through text-textgray text-sm md:text-md font-medium">
                {productsDetails.currencySymbol}{" "}
                {productsDetails.cuttedPrice.toFixed(3)}
              </p>
            </div>
          </div>

          {/* Availiablity Section */}
          <div className="flex flex-row gap-x-1 items-center">
            <div>
              <FaCircle
                color="#5CBD76"
                className="text-sm md:text-md text-success"
              />
            </div>
            <p className="text-sm md:text-md text-textgray">
              Available (In Stock)
            </p>
          </div>

          {/* Add to Cart */}
          {cartItem ? (
            <div className="flex bg-secondary w-fit px-2 py-1 rounded-full items-center gap-4 my-3">
              <button
                onClick={handleDecrement}
                className="text-white text-md font-medium  rounded-full "
              >
                -
              </button>
              <span className="text-md text-white font-medium">
                {cartItem.quantity} Added
              </span>
              <button
                onClick={() => incrementQuantity(productsDetails.id)}
                className="text-white text-md font-medium "
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="text-white text-md font-medium bg-secondary rounded-full px-4 py-2 my-3"
            >
              + Add to Cart
            </button>
          )}

          {/* Book Format */}
          <p className="text-lg">
            <span className="font-medium ">Book Format: </span>
            <span>{selectedFormat}</span>
          </p>

          {/* Select Book Format */}
          <div className="flex flex-wrap gap-4 mt-4">
            {bookFormats.map((format) => (
              <button
                key={format.label}
                onClick={() => setSelectedFormat(format.label)}
                className={`px-4 w-[45%] py-2 rounded-md 
              ${
                selectedFormat === format.label
                  ? "border-2 text-black  font-medium border-secondary"
                  : "border-2 text-[#cccccc] font-medium border-disableGray"
              }`}
              >
                <div className="text-md">{format.label}</div>
                <div className="text-sm">{`${format.currency} ${format.price}`}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* New Release Section */}
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

      <div className="flex flex-row gap-x-2 my-3">
        <div className="w-[35%] md:w-[20vh]">
          <img
            src={productsDetails.mainImage}
            className="w-full md:h-[25vh]"
            alt={productsDetails.name}
          />
        </div>
        <div className="w-[55%] md:w-auto">
          <p className="text-[1.9vh] md:text-[2.3vh] text-textColor">
            {productsDetails.name}
          </p>
          <div className="flex flex-row justify-start gap-x-[2vh] my-[0.5vh] md:my-[2vh] items-center">
            <p className="text-[2vh] font-semibold">
              {productsDetails.currency} {productsDetails.price.toFixed(3)}
            </p>
            <p className="line-through text-textgray text-[1.4vh] font-medium">
              {productsDetails.currencySymbol}{" "}
              {productsDetails.cuttedPrice.toFixed(3)}
            </p>
          </div>

          <div>
            <button className="bg-secondary rounded-full text-[1.6vh] md:text-[2.2vh] font-semibold text-white px-[2vh] py-[0.5vh]">
              + Add
            </button>
          </div>

          <div className="flex items-center">
            <StarRatings
              rating={productsDetails.ratings}
              starRatedColor="#FFCE60"
              numberOfStars={5}
              starDimension="16px"
              starSpacing="1px"
              name="product-rating"
            />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div>
        <hr />
        <h1 className="text-lg font-semibold my-[2vh]">Book Details</h1>
        <div className="flex flex-col md:flex-row md:gap-x-[4vh]">
          <div className="text-md">
            <h1 className="font-medium">
              ISBN-13:{" "}
              <span className="font-normal">{productsDetails.ISBN_NO}</span>
            </h1>
            <h1 className="font-medium">
              Series:{" "}
              <span className="font-normal">{productsDetails.Series}</span>
            </h1>
            <h1 className="font-medium">
              Publisher:{" "}
              <span className="font-normal">{productsDetails.Publisher}</span>
            </h1>
            <h1 className="font-medium">
              Publication Date:{" "}
              <span className="font-normal">
                {productsDetails.PublicationDate}
              </span>
            </h1>
          </div>
          <div>
            <h1 className="font-medium text-md">
              Cover:{" "}
              <span className="font-normal">{productsDetails.Cover}</span>
            </h1>
            <h1 className="font-medium">
              Pages:{" "}
              <span className="font-normal">{productsDetails.Pages}</span>
            </h1>
            <h1 className="font-medium">
              Weight:{" "}
              <span className="font-normal">{productsDetails.Weight}</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="my-4">
        <hr />
        <h1 className="text-lg font-semibold my-4">Description</h1>
        <p className="text-sm md:text-md text-justify text-textgray">
          {productsDetails.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;

"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { FaCircle } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import toast from "react-hot-toast";

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
    <div className="p-[1vh] md:p-[2vh] md:w-[85%] w-[95%] h-auto mx-auto">
      {/* Main Section  */}
      <div className="flex flex-col md:flex-row gap-x-[2vh] justify-between">
        <div className="flex md:w-[45%] p-[2vh] flex-col-reverse md:flex-row gap-x-[2vh]">
          {/* Sub Images */}
          <div className="flex flex-row my-[2vh] md:my-0 md:flex-col gap-[2vh] w-[20%]">
            <img src="/products/book.png" className="w-[12vh]" />
            <img src="/products/book2.png" className="w-[12vh]" />
            <img src="/products/book3.png" className="w-[12vh]" />
          </div>

          {/* Main Image */}
          <div className="relative w-full">
            <img src="/products/book.png" className="w-full" />
            {isFav ? (
              <>
                <FaHeart
                  className="absolute cursor-pointer top-0 -right-[3vh] md:-right-[4vh] text-secondary text-[3vh]"
                  onClick={toggleFav}
                />
              </>
            ) : (
              <>
                <FaRegHeart
                  className="absolute cursor-pointer top-0 -right-[3vh] md:-right-[4vh] text-secondary text-[3vh]"
                  onClick={toggleFav}
                />
              </>
            )}
          </div>
        </div>

        <div className="md:w-[50%] p-[1vh] md:p-[2vh]">
          <span className="bg-[#69BBE940] mb-[2vh] font-normal text-primary w-fit text-[1.5vh] md:text-[1.8vh] p-[1vh]">
            Best Seller
          </span>

          {/* Title */}
          <h1 className="text-[2.5vh] md:text-[3vh] my-[1vh] font-medium">
            {productsDetails.name}
          </h1>

          {/* Author Name */}
          <p className="text-[1.8vh] md:text-[2.1vh] text-textgray">
            by <span className="underline">{productsDetails.Author}</span>
          </p>

          {/* Reviews */}
          <div className="flex flex-row items-center gap-x-[1vh]">
            <StarRatings
              rating={3}
              starRatedColor="#FFCE60"
              numberOfStars={5}
              starDimension="16px"
              starSpacing="1px"
              name="product-rating"
            />
            <p className="text-[1.6vh] md:text-[2vh] mt-1 text-textgray">
              195 reviews
            </p>
          </div>

          <p className="text-[1.8vh] md:text-[2.1vh] my-[1vh] text-textgray">
            Ships from and sold by hsbookstore.com
          </p>

          {/* Price Section */}
          <div>
            <div className="flex flex-row gap-x-[2vh] mt-[2vh] md:my-[0vh] ">
              <p className="text-[2.7vh] md:text-[4vh] font-semibold">
                {productsDetails.currency} {productsDetails.price.toFixed(3)}
              </p>
              <p className="line-through text-textgray text-[1.5vh] md:text-[2vh] font-medium">
                {productsDetails.currencySymbol}{" "}
                {productsDetails.cuttedPrice.toFixed(3)}
              </p>
            </div>
          </div>

          {/* Availiablity Section */}
          <div className="flex flex-row gap-x-[1vh] items-center">
            <div>
              <FaCircle
                color="#5CBD76"
                className="text-[1.7vh] md:text-[2vh] text-success"
              />
            </div>
            <p className="text-[1.8vh] md:text-[2.3vh] text-textgray">
              Available (In Stock)
            </p>
          </div>

          {/* Add to Cart */}
          {cartItem ? (
            <div className="flex bg-secondary w-fit px-[2vh] py-[1vh] rounded-full items-center gap-4 my-[3vh]">
              <button
                onClick={handleDecrement}
                className="text-white text-[2.1vh] md:text-[2.5vh] font-medium  rounded-full "
              >
                -
              </button>
              <span className="text-[2.1vh] text-white md:text-[2.5vh] font-medium">
                {cartItem.quantity} Added
              </span>
              <button
                onClick={() => incrementQuantity(productsDetails.id)}
                className="text-white text-[2.1vh] md:text-[2.5vh] font-medium "
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="text-white text-[2.1vh] md:text-[2.5vh] font-medium bg-secondary rounded-full px-[4vh] py-[1vh] my-[3vh]"
            >
              + Add to Cart
            </button>
          )}

          {/* Book Format */}
          <p className="text-[2.6vh]">
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
                <div className="text-[2.2vh">{format.label}</div>
                <div className="text-[2vh]">{`${format.currency} ${format.price}`}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* New Release Section */}
      <div className="flex flex-row gap-x-[1vh] items-center mt-[5vh]">
        <div>
          <FaCircle
            color="#5CBD76"
            className="text-[1.7vh] md:text-[2vh] text-success"
          />
        </div>
        <p className="text-[1.8vh] md:text-[2.3vh] text-textgray">
          New Release Available (In Stock)
        </p>
      </div>

      <div className="flex flex-row  gap-x-[2vh] my-[3vh]">
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
        <h1 className="text-[2.5vh] font-medium my-[2vh]">Book Details</h1>
        <div className="flex flex-col md:flex-row md:gap-x-[4vh]">
          <div className="">
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
            <h1 className="font-medium">
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

      <div className="my-[2vh]">
        <hr />
        <h1 className="text-[2.5vh] font-medium my-[2vh]">Description</h1>
        <p className="text-[1.8vh] md:text-[2vh] text-textgray">
          {productsDetails.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;

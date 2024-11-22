"use client";
import React from "react";
import { LinearProgress } from "@mui/material";
import StarRatings from "react-star-ratings";
import { Reviews } from "@/data/Reviews";
import Image from "next/image";

const ratings = [
  { label: "5 star", value: 62 },
  { label: "4 star", value: 22 },
  { label: "3 star", value: 5 },
  { label: "2 star", value: 0 },
  { label: "1 star", value: 11 },
];

const CustomerReviewsRatings = () => {
  return (
    <div className="my-4">
      <hr />
      <h2 className="text-xl font-medium my-4">Customer Ratings & Reviews</h2>

      {/* Overall Rating */}
      <div className="mb-2">
        <span className="text-3xl font-semibold">4.6 out of 5</span>
      </div>
      <div className="flex flex-row items-center gap-2 my-3">
        <StarRatings
          rating={4.6}
          starRatedColor="gold"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
        />
        <p className="text-textgray">196 reviews</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 border-2 border-textgray rounded-md">
          View all reviews
        </button>
        <button className="px-4 py-2 bg-secondary text-white rounded-md">
          Write a review
        </button>
      </div>

      {/* Ratings Breakdown */}
      <div className="md:w-[45%] lg:w-[30%] space-y-2 mb-8">
        {ratings.map((rating, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-16 text-textgray">{rating.label}</span>
            <LinearProgress
              variant="determinate"
              value={rating.value}
              className="flex-1"
              color="primary"
              sx={{ height: 8, borderRadius: 2 }}
            />
            <span className="w-10 text-textgray text-sm">{rating.value}%</span>
          </div>
        ))}
      </div>

      {/* Reviews List */}
      {Reviews.map((review) => (
        <div key={review.id} className="pt-4 mb-4">
          <div className="flex items-center">
            <Image
              src="/useravatar.png"
              alt="User avatar"
              width={40}
              height={40}
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="font-medium text-textgray text-md">{review.name}</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <StarRatings
              rating={review.rating}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="14px"
              starSpacing="1px"
            />
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>

          <p className="font-semibold text-md mt-2 mb-1">{review.title}</p>
          <p className="text-textgray text-sm">{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviewsRatings;

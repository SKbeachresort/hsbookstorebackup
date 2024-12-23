"use client";
import React, { useState } from "react";
import { LinearProgress } from "@mui/material";
import StarRatings from "react-star-ratings";
import { Reviews } from "@/data/Reviews";
import Image from "next/image";
import useravatar from "../../../public/useravatar.png";
import { useUser } from "@/hooks/useUser";
import Modal from "@/app/elements/Modal";
import SubmitProductReviewModal from "./ProductReview/SubmitProductReviewModal";
import { useGetProductReviewByIdQuery } from "../../../gql/graphql";
import { formatDate } from "@/utils/formatDate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useRegionUrl } from "@/hooks/useRegionUrl";
import ModalWidthless from "@/app/elements/ModalWidthless";

interface ReviewProps {
  productId: string;
  channel: string;
  locale: string;
};

const CustomerReviewsRatings: React.FC<ReviewProps> = ({
  productId,
  channel,
  locale,
}) => {

  const { getRegionUrl } = useRegionUrl();
  const { user, authenticated } = useUser();
  const userId = user?.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [viewReviewsModal, setViewReviewsModal] = useState(false);

  const handleViewReviewsModalOpen = () => {
    if (authenticated) {
      setViewReviewsModal(true);
    } else {
      setIsAlertOpen(true);
    }
  };

  const handleViewReviewsModalClose = () => {
    setViewReviewsModal(false);
  };

  const handleModalOpen = () => {
    if (authenticated) {
      setIsModalOpen(true);
    } else {
      setIsAlertOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const { data, loading, error, refetch } = useGetProductReviewByIdQuery({
    variables: { productId, channel },
  });

  // console.log("Review Data:", data);
  const reviews = data?.getProductReviews || [];
  const totalReviews = reviews.length;

  const ratingsCount = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    if (
      review &&
      review.rating !== null &&
      review.rating !== undefined &&
      review.rating >= 1 &&
      review.rating <= 5
    ) {
      ratingsCount[5 - review.rating]++;
    }
  });

  const ratings = ratingsCount.map((count, index) => ({
    label: `${5 - index} star`,
    value: totalReviews ? (count / totalReviews) * 100 : 0,
  }));

  const totalRatings = reviews.reduce(
    (sum, review) => sum + (review?.rating || 0),
    0
  );
  const averageRating = totalReviews > 0 ? totalRatings / totalReviews : 0;

  return (
    <>
      <div className="my-4">
        <hr />
        <h2 className="text-xl font-medium my-4">Customer Ratings & Reviews</h2>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={handleViewReviewsModalOpen}
            className="px-4 py-2 border-2 border-textgray rounded-full"
          >
            View all reviews
          </button>
          <button
            onClick={handleModalOpen}
            className="px-4 py-2 bg-secondary text-white rounded-full"
          >
            Write a review
          </button>
        </div>

        {totalReviews > 0 ? (
          <>
            {/* Overall Rating */}
            <div className="mb-2">
              <span className="text-3xl font-semibold">
                {averageRating.toFixed(1)} out of 5
              </span>
            </div>
            <div className="flex flex-row items-center gap-2 my-3">
              <StarRatings
                rating={4.6}
                starRatedColor="gold"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="2px"
              />
              <p className="text-textgray">{totalReviews} reviews</p>
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
                  <span className="w-10 text-textgray text-sm">
                    {rating.value.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Reviews List */}
            {reviews.slice(0, 5).map((review) => (
              <div key={review?.id} className="pt-4 mb-4">
                <div className="flex items-center">
                  <Image
                    src={useravatar}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-textgray text-md">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <StarRatings
                    rating={review?.rating || 0}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="14px"
                    starSpacing="1px"
                  />
                  <p className="text-xs text-gray-500">
                    {formatDate(review?.createdAt || "")}
                  </p>
                </div>
                <p className="font-semibold text-md mt-2 mb-1">
                  {review?.title}
                </p>
                <p className="text-textgray text-sm">{review?.review || ""}</p>
              </div>
            ))}
          </>
        ) : (
          <p>No reviews, be the first one to write a review!</p>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <SubmitProductReviewModal
          productId={productId}
          channel={channel}
          userId={userId}
          locale={locale}
          closeModal={handleModalClose}
          refetch={refetch}
        />
      </Modal>

      {/* All Reviews Modal */}
      <ModalWidthless isOpen={viewReviewsModal} onClose={handleViewReviewsModalClose}>
        <div className="relative">
          <button
            onClick={handleViewReviewsModalClose}
            className="absolute top-0 right-4 text-3xl text-gray-500  hover:text-black"
          >
            ✕
          </button>
          <h2 className="text-xl font-medium mb-4">All Reviews</h2>
          <div className="overflow-y-auto h-[80vh] p-4">
            {reviews.slice(0, 5).map((review) => (
              <div key={review?.id} className="pt-4 mb-4">
                <div className="flex items-center">
                  <Image
                    src={useravatar}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-textgray text-md">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <StarRatings
                    rating={review?.rating || 0}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="14px"
                    starSpacing="1px"
                  />
                  <p className="text-xs text-gray-500">
                    {formatDate(review?.createdAt || "")}
                  </p>
                </div>
                <p className="font-semibold text-md mt-2 mb-1">
                  {review?.title}
                </p>
                <p className="text-textgray text-sm">{review?.review || ""}</p>
              </div>
            ))}
          </div>
        </div>
      </ModalWidthless>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Please Login</AlertDialogTitle>
            <AlertDialogDescription>
              You need to login to write a review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleAlertClose}>
              Cancel
            </AlertDialogCancel>
            <Link href={getRegionUrl(`/auth/login`)}>
              <AlertDialogAction>Continue to Login</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomerReviewsRatings;

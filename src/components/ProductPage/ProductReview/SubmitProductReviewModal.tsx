"use client";
import React, { useState, ChangeEvent } from "react";
import {
  LanguageCodeEnum,
  useSubmitProductReviewMutation,
} from "../../../../gql/graphql";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommentRatings } from "@/components/ui/shared/RatingInput";
import Loader from "@/app/elements/Loader";
import { Textarea } from "@/components/ui/textarea";
import { localeToEnum } from "@/lib/regions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import BackDropLoader from "@/app/elements/BackdropLoader";

import {
  NewProductReviewForm,
  NewProductReviewSchema,
} from "./ProductReviewValidations";

function getImageData(
  event: ChangeEvent<HTMLInputElement>,
  type: "image" | "video"
) {
  let isValid = true;
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((file) => {
    const result =
      type === "video"
        ? NewProductReviewSchema.shape.video.safeParse(file)
        : NewProductReviewSchema.shape.image.safeParse(file);
    if (!result.success) {
      isValid = false;
    }
    dataTransfer.items.add(file);
  });

  const firstFile = dataTransfer.files[0];
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { firstFile, displayUrl, isValid };
}

interface SubmitProductReviewModalProps {
  channel: string;
  productId: string;
  userId?: string | undefined;
  locale: string;
  closeModal: () => void;
  refetch?: () => void;
}

const SubmitProductReviewModal: React.FC<SubmitProductReviewModalProps> = ({
  channel,
  userId,
  locale,
  productId,
  closeModal,
  refetch,
}) => {
  const [imgPreview, setImgPreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  console.log("Product ID", productId);
  console.log("Channel", channel);
  console.log("Locale", locale);
  console.log("User ID", userId);

  const form = useForm<NewProductReviewForm>({
    defaultValues: {
      channel,
      locale: localeToEnum(locale),
      productId,
      rating: 0,
      title: "",
      review: "",
      userId,
      image: undefined,
      video: undefined,
    },
    resolver: zodResolver(NewProductReviewSchema),
  });

  const [submitProductReviewMutation, { data, loading, error }] =
    useSubmitProductReviewMutation();

  const onSubmit = async (values: NewProductReviewForm) => {

    if(!values.title || values.rating === 0 || !values.review) {
      toast.error("Please write a review, give a rating and a title to submit a review");
      return;
    };

    try {
      const result = await submitProductReviewMutation({
        variables: {
          channel: channel,
          productId: productId,
          rating: values.rating,
          title: values.title,
          review: values.review,
          userId: userId,
          image: values.image,
          video: values.video,
        },
      });

      const errors = result.errors;
      if (result.data?.submitProductReview?.review) {
        toast.success("Review Submitted Successfully");
        refetch && refetch();
        closeModal();
      } else {
        toast.error("Failed to submit review");
        closeModal();
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to submit review")
      closeModal();
    }
  };

  const onError = (err: FieldErrors<NewProductReviewForm>) => {
    console.log("Errors", err);
  };

  return (
    <div className="relative p-4 bg-white rounded-lg shadow-lg">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
      >
        ✕
      </button>
      <div className="overflow-y-auto h-[80%] p-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="w-full space-y-4"
            noValidate
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about the product"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <CommentRatings
                      rating={field.value}
                      onRatingChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imgPreview ? (
              <div className="relative w-fit">
                <Image
                  src={imgPreview}
                  alt="product review"
                  width={100}
                  height={100}
                  sizes="200"
                  className="rounded-lg object-contain object-center"
                />
                <Button
                  onClick={() => setImgPreview("")}
                  className="absolute -top-2 -right-3 bg-red-500 px-2"
                  type="button"
                >
                  <Trash2 className="h-6 w-6" />
                </Button>
              </div>
            ) : null}
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormLabel>Received Product Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...rest}
                        onChange={(event) => {
                          const { firstFile, displayUrl, isValid } =
                            getImageData(event, "image");
                          if (!isValid) {
                            toast.error(
                              "Please use a valid image format like jpg, jpeg or png"
                            );
                            return;
                          }
                          setImgPreview(displayUrl);
                          onChange(firstFile);
                        }}
                        multiple={false}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose the image which most accurately represents your
                      opinion.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            {videoPreview ? (
              <div className="relative mx-auto w-full">
                <video
                  src={videoPreview}
                  className="mx-auto aspect-video w-full rounded-lg sm:w-2/3"
                  controls
                />
                <Button type="button" size="icon" variant="destructive">
                  <Trash2 className="h-6 w-6" />
                </Button>
              </div>
            ) : null}
            <FormField
              control={form.control}
              name="video"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormLabel>Received Product Video</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...rest}
                        onChange={(event) => {
                          const { firstFile, displayUrl, isValid } =
                            getImageData(event, "video");
                          if (!isValid) {
                            toast.error(
                              "Please use a valid video format like mp4, ogg or webm"
                            );
                            return;
                          }
                          setVideoPreview(displayUrl);
                          onChange(firstFile);
                        }}
                        multiple={false}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose the video which most accurately represents your
                      opinion.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "Submit"}
            </Button>
          </form>
        </Form>
      </div>

      {loading && <BackDropLoader open={loading} />}
    </div>
  );
};

export default SubmitProductReviewModal;

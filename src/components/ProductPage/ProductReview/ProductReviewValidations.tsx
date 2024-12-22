import { LanguageCodeEnum } from "../../../../gql/graphql"
import { z } from "zod"

export const NewProductReviewSchema = z.object({
  channel: z
    .string({
      required_error: "Current channel is required",
    })
    .trim(),
  locale: z.nativeEnum(LanguageCodeEnum),
  productId: z
    .string({
      required_error: "Product identifier is required",
    })
    .trim(),
  rating: z
    .number({
      required_error: "Rating is required",
    })
    .min(1, "The minimum number for rating is one")
    .max(5, "The maximum number for rating is 5"),
  title: z
    .string({
      required_error: "title is required",
    })
    .min(3, "title is required")
    .trim(),
  review: z.string().optional(),
  userId: z.string().optional(),
  image: z
    .instanceof(File, { message: "Please use a valid image file" })
    .refine((file) => file.size < 5000000, {
      message: "Image can't be bigger than 5MB.",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      {
        message: "Image format must be either jpg, jpeg or png.",
      }
    )
    .optional(),
  video: z
    .instanceof(File, { message: "Please use a valid video file" })
    .refine((file) => file.size < 50000000, {
      message: "Image can't be bigger than 50MB.",
    })
    .refine(
      (file) => ["video/mp4", "video/ogg", "video/webm"].includes(file.type),
      {
        message: "Image format must be either mp4, ogg or webm.",
      }
    )
    .optional(),
})

export type NewProductReviewForm = z.infer<typeof NewProductReviewSchema>
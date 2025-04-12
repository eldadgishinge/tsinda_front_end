import * as z from "zod"

export const createCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  language: z.enum(["English", "French", "Kinyarwanda"], {
    required_error: "Please select a language",
  }),
  category: z.string({
    required_error: "Please select a category",
  }),
  instructor: z.string({
    required_error: "Please select an instructor",
  }),
  thumbnail: z.any()
    .refine((file) => file?.length > 0, "Thumbnail is required")
    .refine(
      (file) => file?.[0]?.size <= 5 * 1024 * 1024,
      "Thumbnail must be less than 5MB"
    ),
  video: z.any()
    .optional()
    .refine(
      (file) => !file || file?.[0]?.size <= 100 * 1024 * 1024,
      "Video must be less than 100MB"
    ),
  document: z.any()
    .optional()
    .refine(
      (file) => !file || file?.[0]?.size <= 10 * 1024 * 1024,
      "Document must be less than 10MB"
    ),
})

export type CreateCourseForm = z.infer<typeof createCourseSchema>

export interface Course {
  _id: string
  title: string
  description: string
  language: string
  category: {
    _id: string
    categoryName: string
  }
  instructor: {
    _id: string
    name: string
    email: string
  }
  thumbnailUrl: string
  videoUrl?: string
  documentUrl?: string
  isPublished: boolean
  createdAt: string
}
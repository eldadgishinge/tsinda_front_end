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
  videoUrl: z.string().url("Please enter a valid video URL").optional(),
  documentUrl: z.string().url("Please enter a valid document URL").optional(),
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
  videoUrl?: string
  documentUrl?: string
  isPublished: boolean
  createdAt: string
}
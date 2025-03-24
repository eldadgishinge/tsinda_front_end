import * as z from "zod"

export const createCategorySchema = z.object({
  categoryName: z.string().min(3, "Category name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

export type CreateCategoryForm = z.infer<typeof createCategorySchema>
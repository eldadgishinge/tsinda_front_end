import * as z from "zod";

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
  thumbnailUrl: z
    .string({
      required_error: "Please upload a thumbnail",
    })
    .url({
      message: "Thumbnail URL must be a valid URL",
    }),
  videoUrl: z
    .string({
      required_error: "Please upload a video",
    })
    .url({
      message: "Video URL must be a valid URL",
    }),
  documentUrl: z
    .string({
      required_error: "Please upload a document",
    })
    .url({
      message: "Document URL must be a valid URL",
    }),
});

export type CreateCourseForm = z.infer<typeof createCourseSchema>;

export interface Course {
  _id: string;
  title: string;
  description: string;
  language: string;
  category: {
    _id: string;
    categoryName: string;
  };
  instructor: {
    _id: string;
    name: string;
    email: string;
  };
  thumbnailUrl: string;
  videoUrl?: string;
  documentUrl?: string;
  isPublished: boolean;
  createdAt: string;
}
